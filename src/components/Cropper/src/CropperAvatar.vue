<template>
  <div
    :class="getClass"
    :style="getStyle">
    <div
      :class="`${prefixCls}-image-wrapper`"
      :style="getImageWrapperStyle"
      @click="openModal=true">
      <div
        :class="`${prefixCls}-image-mask`"
        :style="getImageWrapperStyle">
        <Icon
          icon="ep:upload-filled"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6" />
      </div>
      <img
        :src="sourceValue"
        v-if="sourceValue"
        alt="avatar" />
    </div>
    <ElButton
      :class="`${prefixCls}-upload-btn`"
      @click="openModal=true"
      :type="btnType"
      v-if="showBtn">
      {{ btnText || t('component.cropper.selectImage') }}
    </ElButton>
    <CopperModal
      v-model:visible="openModal"
      @success="handleUploadSuccess"
      :uploadApi="uploadApi" />
  </div>
</template>

<script lang="ts">
import type { EleButtonType } from '@/components/ElementPlus'
import type { successReturnType } from './typing'
import type { UploadFileParams } from '#/axios'

import { defineComponent, computed, CSSProperties, ref, watchEffect, watch } from 'vue'
import { ElButton } from 'element-plus'
import CopperModal from './CopperModal.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useMessage } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'
import Icon from '@/components/Icon'

export default defineComponent({
  name: 'CropperAvatar',
  components: { ElButton, CopperModal, Icon },
  props: {
    /**
     * Avatar size
     */
    size: { type: Number, default: 200 },
    /**
     * Default avatar URL
     */
    value: { type: String },
    /**
     * Whether to show the upload button
     */
    showBtn: { type: Boolean, default: true },
    /**
     * Upload button type
     */
    btnType: { type: String as PropType<EleButtonType>, default: '' },
    /**
     * Upload button text
     */
    btnText: { type: String, default: '' },
    /**
     * Upload name
     */
    uploadName: { type: String, default: 'file' },
    /**
     * Uploaded promise method
     */
    uploadApi: {
      type: Function as PropType<(
        params: UploadFileParams,
        onUploadProgress?: (progressEvent: ProgressEvent) => void
      ) => Promise<any>>,
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const sourceValue = ref(props.value || '')
    const { prefixCls } = useDesign('cropper-avatar')
    const openModal = ref(false)
    const { createMessage } = useMessage()
    const { t } = useI18n()

    const getClass = computed(() => [prefixCls])

    const getSize = computed(() => {
      const { size } = props
      return (size + 'px')
    })

    const getIconWidth = computed(() => (parseInt(getSize.value) / 2))

    const getStyle = computed((): CSSProperties => ({ width: getSize.value }))

    const getImageWrapperStyle = computed((): CSSProperties => ({ width: getSize.value, height: getSize.value }))

    watchEffect(() => {
      sourceValue.value = props.value || ''
    })

    watch(
      () => sourceValue.value,
      (v: string) => {
        emit('update:value', v)
      }
    )

    function handleUploadSuccess(data:successReturnType) {
      sourceValue.value = data.source
      emit('change', data)
      createMessage.success(t('component.cropper.uploadSuccess'))
    }

    return {
      t,
      prefixCls,
      openModal,
      getIconWidth,
      sourceValue,
      getClass,
      getImageWrapperStyle,
      getStyle,
      handleUploadSuccess,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-cropper-avatar';

.#{$prefix-cls} {
  display: inline-block;
  text-align: center;

  &-image-wrapper {
    overflow: hidden;
    cursor: pointer;
    background: var(--background-secondary-color);
    border: 1px solid var(--border-grey-color);
    border-radius: 50%;

    img {
      width: 100%;
    }
  }

  &-image-mask {
    position: absolute;
    width: inherit;
    height: inherit;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.4);
    border: inherit;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.4s;

    svg {
      margin: auto;
    }
  }

  &-image-mask:hover {
    opacity: 40;
  }

  &-upload-btn {
    margin: 10px auto;
  }
}
</style>
