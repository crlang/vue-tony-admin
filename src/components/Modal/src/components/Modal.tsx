import { defineComponent, toRefs, unref } from 'vue'
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/useModalDrag'
import { useAttrs } from '@/hooks/core/useAttrs'
import { extendSlots } from '@/utils/helper/tsxHelper'
import { ElDialog } from 'element-plus'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'BasicDialog',
  inheritAttrs: false,
  props: basicProps,
  setup(props, { slots }) {
    const { modelValue, draggable, destroyOnClose } = toRefs(props)
    const attrs = useAttrs()
    useModalDragMove({
      modelValue,
      destroyOnClose,
      draggable,
    })

    return () => {
      const propsData = { ...unref(attrs), ...props } as Recordable
      const propx = omit(propsData, ['helpMessage', 'closeFunc', 'loadingTip', 'wrapperProps', 'footer', 'confirmButtonProps', 'cancelButtonProps', 'scrollTop', 'draggable', 'centered', 'cancelText', 'confirmText', 'defaultFullscreen', 'canFullscreen', 'wrapperFooterOffset', 'useWrapper', 'loading', 'showCancelBtn', 'showConfirmBtn', 'confirmLoading', 'keyboard', 'confirmType', 'userData'])
      // Force hide the built-in close button
      propx.showClose = false
      return <ElDialog {...propx}>{extendSlots(slots)}</ElDialog>
    }
  },
})
