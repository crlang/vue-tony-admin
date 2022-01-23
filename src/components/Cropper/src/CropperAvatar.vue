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
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img
        :src="sourceValue"
        v-if="sourceValue"
        alt="avatar" />
    </div>
    <el-button
      :class="`${prefixCls}-upload-btn`"
      @click="openModal=true"
      v-if="showBtn">
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </el-button>
    <CopperModal
      v-model:visible="openModal"
      @fail="handleUploadFail"
      @success="handleUploadSuccess"
      :uploadApi="uploadApi" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties, unref, ref, watchEffect, watch } from 'vue'
import CopperModal from './CopperModal.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useMessage } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'
import Icon from '@/components/Icon'
import type { EleButton } from '@/components/ElementPlus'

const props = {
  width: { type: [String, Number], default: '200px' },
  value: { type: String },
  showBtn: { type: Boolean, default: true },
  btnProps: { type: Object as PropType<EleButton> },
  btnText: { type: String, default: '' },
  uploadName: { type: String, default: 'file' },
  uploadApi: { type: Function as PropType<({ file: Blob, name: string }) => Promise<void>> },
}

export default defineComponent({
  name: 'CropperAvatar',
  components: { CopperModal, Icon },
  props,
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const sourceValue = ref(props.value || '')
    const { prefixCls } = useDesign('cropper-avatar')
    const openModal = ref(false)
    const { createMessage } = useMessage()
    const { t } = useI18n()

    const getClass = computed(() => [prefixCls])

    const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px')

    const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px')

    const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }))

    const getImageWrapperStyle = computed((): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }))

    watchEffect(() => {
      sourceValue.value = props.value || ''
    })

    watch(
      () => sourceValue.value,
      (v: string) => {
        emit('update:value', v)
      }
    )

    function handleUploadFail() {
      openModal.value = false
      // createMessage.error(t('component.upload.uploadError'))
    }
    function handleUploadSuccess({ source }) {
      sourceValue.value = source
      emit('change', source)
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
      handleUploadFail,
    }
  },
})
</script>

<style lang="scss" scoped>
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

    ::v-deep(svg) {
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
