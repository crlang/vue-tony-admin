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
import { computed, defineComponent, ref, toRefs, unref, watchEffect } from 'vue'
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/useModalDrag'
import { useAttrs } from '@/hooks/core/useAttrs'
import { ElDialog } from 'element-plus'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'BasicDialog',
  components: { ElDialog },
  inheritAttrs: false,
  props: basicProps,
  emits: ['open', 'opend', 'close', 'closed'],
  setup(props, { emit }) {
    const { modelValue, draggable, destroyOnClose } = toRefs(props)
    const visibleRef = ref(false)
    const attrs = useAttrs()
    useModalDragMove({
      modelValue,
      destroyOnClose,
      draggable,
    })

    const getBindValue = computed(() => {
      const propsData = { ...unref(attrs), ...props } as Recordable
      const propx = omit(propsData, ['helpMessage', 'closeFunc', 'loadingTip', 'wrapperProps', 'footer', 'confirmButtonProps', 'cancelButtonProps', 'scrollTop', 'draggable', 'centered', 'cancelText', 'confirmText', 'defaultFullscreen', 'canFullscreen', 'wrapperFooterOffset', 'useWrapper', 'loading', 'showCancelBtn', 'showConfirmBtn', 'confirmLoading', 'keyboard', 'confirmType', 'userData'])
      // Force hide the built-in close button
      propx.showClose = false
      propx.onOpen = () => emit('open')
      propx.onOpened = () => emit('opend')
      propx.onClose = () => emit('close')
      propx.onClosed = () => emit('closed')
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
