<template>
  <ElDialog
    v-model="sourceVisible"
    title="头像上传"
    destroy-on-close
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <div :class="prefixCls">
      <div :class="`${prefixCls}-left`">
        <div :class="`${prefixCls}-cropper`">
          <CropperImage
            v-if="src"
            :src="src"
            :height="300"
            :circled="circled"
            @cropend="handleCropend"
            @ready="handleReady" />
        </div>

        <div :class="`${prefixCls}-toolbar`">
          <ElUpload
            :file-list="[]"
            accept="image/*"
            action="blockit"
            :before-upload="handleBeforeUpload">
            <ElTooltip
              content="selectImage"
              placement="bottom">
              <ElButton
                type="success"><Icon name="ep:upload-filled" /></ElButton>
            </ElTooltip>
          </ElUpload>
          <ElSpace>
            <ElTooltip
              content="重置"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('reset')"><Icon name="ep:refresh-right" /></ElButton>
            </ElTooltip>
            <ElTooltip
              content="逆时针旋转"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', -45)"><Icon name="ic:baseline-rotate-90-degrees-ccw" /></ElButton>
            </ElTooltip>
            <ElTooltip
              content="顺时针旋转"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', 45)"><Icon name="ic:baseline-rotate-90-degrees-ccw" /></ElButton>
            </ElTooltip>
            <ElTooltip
              content="水平翻转"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleX')"><Icon name="vaadin:arrows-long-h" /></ElButton>
            </ElTooltip>
            <ElTooltip
              content="垂直翻转"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleY')"><Icon name="vaadin:arrows-long-v" /></ElButton>
            </ElTooltip>
            <ElTooltip
              content="放大"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', 0.1)"><Icon name="ep:zoom-in" /></ElButton>
            </ElTooltip>
            <ElTooltip
              content="缩小"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', -0.1)"><Icon name="ep:zoom-out" /></ElButton>
            </ElTooltip>
          </ElSpace>
        </div>
      </div>
      <div :class="`${prefixCls}-right`">
        <div :class="`${prefixCls}-preview`">
          <img
            :src="previewSource"
            v-if="previewSource"
            alt="预览" />
        </div>
        <template v-if="previewSource">
          <div :class="`${prefixCls}-group`">
            <ElAvatar
              :src="previewSource"
              :size="64" />
            <ElAvatar
              :src="previewSource"
              :size="48" />
            <ElAvatar
              :src="previewSource"
              :size="72" />
            <ElAvatar
              :src="previewSource"
              :size="96" />
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="handleClose()">取消</ElButton>
        <ElButton
          type="primary"
          :disabled="!previewSource"
          @click="handleOk()">确认并上传</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts">
import type { UploadFileParams } from '#/axios'
import type { CropendResult, Cropper } from './typing'

import { defineComponent, ref, watchEffect, watch } from 'vue'
import { ElDialog, ElUpload, ElTooltip, ElButton, ElAvatar, ElSpace } from 'element-plus'
import CropperImage from './Cropper.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { dataURLtoBlob } from '@/utils/file/base64Conver'
import { isFunction } from '@/utils/is'
import { Icon } from '@/components/Icon'
import { FileHandler } from 'element-plus/es/components/upload/src/upload.type'

export default defineComponent({
  name: 'CropperModal',
  components: {
    ElDialog,
    ElUpload,
    ElTooltip,
    ElButton,
    ElAvatar,
    ElSpace,
    CropperImage,
    Icon,
  },
  props: {
    circled: {
      type: Boolean,
      default: true,
    },
    uploadApi: {
      type: Function as PropType<(
        params: UploadFileParams,
        onUploadProgress?: (progressEvent: ProgressEvent) => void
      ) => Promise<any>>,
    },
    uploadName: {
      type: String,
      default: 'file',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'fail', 'success'],
  setup(props, { emit }) {
    let filename = ''
    const src = ref('')
    const previewSource = ref('')
    const cropper = ref<Cropper>()
    let scaleX = 1
    const sourceVisible = ref(props.visible || false)
    let scaleY = 1

    const { prefixCls } = useDesign('cropper-am')

    watchEffect(() => {
      sourceVisible.value = props.visible || false
    })

    watch(
      () => sourceVisible.value,
      (v: boolean) => {
        emit('update:visible', v)
      }
    )

    // Block upload
    function handleBeforeUpload(file: File):FileHandler<void> {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      src.value = ''
      previewSource.value = ''
      reader.onload = function (e) {
        src.value = (e.target?.result as string) ?? ''
        filename = file.name
      }
      return false as any
    }

    function handleCropend({ imgBase64 }: CropendResult) {
      previewSource.value = imgBase64
    }

    function handleReady(cropperInstance: Cropper) {
      cropper.value = cropperInstance
    }

    function handlerToolbar(event: string, arg?: number) {
      if (event === 'scaleX') {
        scaleX = arg = scaleX === -1 ? 1 : -1
      }
      if (event === 'scaleY') {
        scaleY = arg = scaleY === -1 ? 1 : -1
      }
      cropper?.value?.[event]?.(arg)
    }

    async function handleOk() {
      const uploadApi = props.uploadApi
      if (uploadApi && isFunction(uploadApi)) {
        const blob = dataURLtoBlob(previewSource.value)
        try {
          const result = await uploadApi({ name: props.uploadName, file: blob, filename })
          emit('success', { source: previewSource.value, data: result.data })
        } catch (e) {
          console.error('Upload Fail', e)
        }
        handleClose()
      }
    }
    function handleClose() {
      sourceVisible.value = false
    }

    return {
      prefixCls,
      src,
      previewSource,
      sourceVisible,
      handleBeforeUpload,
      handleCropend,
      handleReady,
      handlerToolbar,
      handleClose,
      handleOk,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-cropper-am';

.#{$prefix-cls} {
  display: flex;

  &-left,
  &-right {
    height: 340px;
  }

  &-left {
    width: 55%;
  }

  &-right {
    width: 45%;
  }

  &-cropper {
    height: 300px;
    background: #eee;
    background-image: linear-gradient(
      45deg,
      rgb(0, 0, 0, 0.25) 25%,
      transparent 0,
      transparent 75%,
      rgb(0, 0, 0, 0.25) 0
    ),
      linear-gradient(45deg, rgb(0, 0, 0, 0.25) 25%, transparent 0, transparent 75%, rgb(0, 0, 0, 0.25) 0);
    background-position: 0 0, 12px 12px;
    background-size: 24px 24px;
  }

  &-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  &-preview {
    width: 220px;
    height: 220px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-group {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    padding-top: 8px;
    margin-top: 8px;
    border-top: 1px solid var(--border-color);
  }
}
</style>
