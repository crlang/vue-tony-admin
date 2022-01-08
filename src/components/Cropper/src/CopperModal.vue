<template>
  <el-dialog
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
            height="300px"
            :circled="circled"
            @cropend="handleCropend"
            @ready="handleReady"
          />
        </div>

        <div :class="`${prefixCls}-toolbar`">
          <el-upload
            :file-list="[]"
            accept="image/*"
            action="blockit"
            :before-upload="handleBeforeUpload">
            <el-tooltip
              :content="t('component.cropper.selectImage')"
              placement="bottom">
              <el-button
                size="small"
                type="primary"><Icon icon="ant-design:upload-outlined" /></el-button>
            </el-tooltip>
          </el-upload>
          <el-space>
            <el-tooltip
              :content="t('component.cropper.btn_reset')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('reset')"><Icon icon="ant-design:reload-outlined" /></el-button>
            </el-tooltip>
            <el-tooltip
              :content="t('component.cropper.btn_rotate_left')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', -45)"><Icon icon="ant-design:rotate-left-outlined" /></el-button>
            </el-tooltip>
            <el-tooltip
              :content="t('component.cropper.btn_rotate_right')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', 45)"><Icon icon="ant-design:rotate-right-outlined" /></el-button>
            </el-tooltip>
            <el-tooltip
              :content="t('component.cropper.btn_scale_x')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleX')"><Icon icon="vaadin:arrows-long-h" /></el-button>
            </el-tooltip>
            <el-tooltip
              :content="t('component.cropper.btn_scale_y')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleY')"><Icon icon="vaadin:arrows-long-v" /></el-button>
            </el-tooltip>
            <el-tooltip
              :content="t('component.cropper.btn_zoom_in')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', 0.1)"><Icon icon="ant-design:zoom-in-outlined" /></el-button>
            </el-tooltip>
            <el-tooltip
              :content="t('component.cropper.btn_zoom_out')"
              placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', -0.1)"><Icon icon="ant-design:zoom-out-outlined" /></el-button>
            </el-tooltip>
          </el-space>
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
            <el-avatar
              :src="previewSource"
              size="large" />
            <el-avatar
              :src="previewSource"
              :size="48" />
            <el-avatar
              :src="previewSource"
              :size="64" />
            <el-avatar
              :src="previewSource"
              :size="80" />
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose('cancel')">{{ t('common.cancelText') }}</el-button>
        <el-button
          type="primary"
          :disabled="!previewSource"
          @click="handleOk()">{{ t('component.cropper.confirmText') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { CropendResult, Cropper } from './typing'
import { defineComponent, ref, watchEffect, watch } from 'vue'
import CropperImage from './Cropper.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { dataURLtoBlob } from '@/utils/file/base64Conver'
import { isFunction } from '@/utils/is'
import { useI18n } from '@/hooks/web/useI18n'
import { Icon } from '@/components/Icon/index'

type apiFunParams = { file: Blob; name: string; filename: string }

const props = {
  circled: {
    type: Boolean,
    default: true,
  },
  uploadApi: {
    type: Function as PropType<(params: apiFunParams) => Promise<any>>,
  },
  uploadName: {
    type: String,
    default: 'file',
  },
  visible: {
    type: Boolean,
    default: false,
  },
}

export default defineComponent({
  name: 'CropperModal',
  components: { CropperImage, Icon },
  props,
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
    function handleBeforeUpload(file: File) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      src.value = ''
      previewSource.value = ''
      reader.onload = function (e) {
        src.value = (e.target?.result as string) ?? ''
        filename = file.name
      }
      return false
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
          handleClose('success')
        } finally {
          handleClose('catch')
        }
      }
    }
    function handleClose(type:String) {
      emit('fail', { type })
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
$prefix-cls: '#{$namespace}-cropper-am';

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
      rgb(0, 0, 0, 25%) 25%,
      transparent 0,
      transparent 75%,
      rgb(0, 0, 0, 25%) 0
    ),
      linear-gradient(45deg, rgb(0, 0, 0, 25%) 25%, transparent 0, transparent 75%, rgb(0, 0, 0, 25%) 0);
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
    border: 1px solid $border-color-base;
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
    border-top: 1px solid $border-color-base;
  }
}
</style>
