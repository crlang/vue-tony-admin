import type { PropType } from 'vue'
import type { ModalWrapperProps } from './typing'
import { useI18n } from '@/hooks/web/useI18n'
import { EleDialogProps, EleButtonProps } from '@/components/ElementPlus'

const { t } = useI18n()

export const modalProps = {
  ...EleDialogProps,
  scrollTop: { type: Boolean, default: true },
  // open drag
  draggable: { type: Boolean, default: true },
  cancelText: { type: String, default: t('common.cancelText') },
  confirmText: { type: String, default: t('common.confirmText') },

  closeFunc: Function as PropType<() => Promise<boolean>>,
}

export const basicProps = {
  ...modalProps,

  modelValue: { type: Boolean },

  defaultFullscreen: { type: Boolean },
  // Can it be full screen
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  /**
   * @description: Show close button
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * @description: Show confirmation button
   */
  showConfirmBtn: { type: Boolean, default: true },
  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  confirmLoading: { type: Boolean },

  keyboard: { type: Boolean, default: true },

  confirmType: { type: String, default: 'primary' },

  confirmButtonProps: Object as PropType<EleButtonProps>,

  cancelButtonProps: Object as PropType<EleButtonProps>,
}
