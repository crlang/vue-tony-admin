<template>
  <ElDialog
    v-model="sourceVisible"
    :title="t('component.cropper.modalTitle')"
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
              :content="t('component.cropper.selectImage')"
              placement="bottom">
              <ElButton
                type="success"><Icon icon="ant-design:upload-outlined" /></ElButton>
            </ElTooltip>
          </ElUpload>
          <ElSpace>
            <ElTooltip
              :content="t('component.cropper.btn_reset')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('reset')"><Icon icon="ant-design:reload-outlined" /></ElButton>
            </ElTooltip>
            <ElTooltip
              :content="t('component.cropper.btn_rotate_left')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', -45)"><Icon icon="ant-design:rotate-left-outlined" /></ElButton>
            </ElTooltip>
            <ElTooltip
              :content="t('component.cropper.btn_rotate_right')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', 45)"><Icon icon="ant-design:rotate-right-outlined" /></ElButton>
            </ElTooltip>
            <ElTooltip
              :content="t('component.cropper.btn_scale_x')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleX')"><Icon icon="vaadin:arrows-long-h" /></ElButton>
            </ElTooltip>
            <ElTooltip
              :content="t('component.cropper.btn_scale_y')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleY')"><Icon icon="vaadin:arrows-long-v" /></ElButton>
            </ElTooltip>
            <ElTooltip
              :content="t('component.cropper.btn_zoom_in')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', 0.1)"><Icon icon="ant-design:zoom-in-outlined" /></ElButton>
            </ElTooltip>
            <ElTooltip
              :content="t('component.cropper.btn_zoom_out')"
              placement="bottom">
              <ElButton
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', -0.1)"><Icon icon="ant-design:zoom-out-outlined" /></ElButton>
            </ElTooltip>
          </ElSpace>
        </div>
      </div>
      <div :class="`${prefixCls}-right`">
        <div :class="`${prefixCls}-preview`">
          <img
            :src="previewSource"
            v-if="previewSource"
            :alt="t('component.cropper.preview')" />
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
        <ElButton @click="handleClose()">{{ t('common.cancelText') }}</ElButton>
        <ElButton
          type="primary"
          :disabled="!previewSource"
          @click="handleOk()">{{ t('component.cropper.confirmText') }}</ElButton>
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
import { useI18n } from '@/hooks/web/useI18n'
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
    const { t } = useI18n()

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
      t,
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
    border: 1px solid var(--border-grey-color);
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
    border-top: 1px solid var(--border-grey-color);
  }
}
</style>
