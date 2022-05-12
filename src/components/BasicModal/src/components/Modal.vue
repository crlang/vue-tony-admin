<template>
  <ElDialog
    v-bind="getBindValue"
    v-model:modelValue="visibleRef">
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watchEffect } from 'vue'
import { basicProps } from '../props'
import { useAttrs } from '@/hooks/core/useAttrs'
import { ElDialog } from 'element-plus'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'BasicDialog',
  components: { ElDialog },
  inheritAttrs: false,
  props: basicProps,
  setup(props) {
    const visibleRef = ref(false)
    const attrs = useAttrs()

    const getBindValue = computed(() => {
      const propsData = { ...unref(attrs), ...props }
      const propx = omit(propsData, [
        'showFullscreen', 'helpMessage', 'useWrapper', 'footerOffset', 'loading', 'scrollTop', 'loadingTip', 'modalHeaderHeight', 'modalFooterHeight', 'showFooter', 'showCancel', 'cancelText', 'showConfirm', 'confirmText', 'closeFunc', 'draggable', 'confirmButton', 'cancelButton',
      ])
      // Force hide the built-in close button
      propx.showClose = false
      return propx
    })

    watchEffect(() => {
      visibleRef.value = !!props.modelValue
    })

    return {
      visibleRef,
      getBindValue,
    }
  },
})

</script>
