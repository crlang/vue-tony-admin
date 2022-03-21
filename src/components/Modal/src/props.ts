import type { EleButton } from '@/components/ElementPlus'

import { EleDialogProps } from '@/components/ElementPlus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const headerProps = {
  /**
   * whether to show the close icon
   */
  showClose: { type: Boolean, default: true },
  /**
   * Whether to show the full screen icon
   */
  showFullscreen: { type: Boolean, default: true },
  /**
   * Help text to the right of the title
   */
  helpMessage: { type: [String, Array] as PropType<string | string[]>, default: '' },
}

export const wrapperProps = {
  /**
   * Whether to enable adaptive height
   */
  useWrapper: { type: Boolean, default: true },
  /**
   * more bottom distance, the default is the same distance up and down
   */
  footerOffset: { type: Number, default: 0 },
  /**
   * Whether to show loading
   */
  loading: { type: Boolean, default: false },
  /**
   * load text
   */
  loadingTip: { type: String, default: t('common.loadingText') },
  /**
   * The height of the module's head
   */
  modalHeaderHeight: { type: Number, default: 56 },
  /**
   * Module foot height
   */
  modalFooterHeight: { type: Number, default: 70 },
}

export const footerProps = {
  /**
   * Whether to show the feet
   */
  showFooter: { type: Boolean, default: true },
  /**
   * Whether to show the cancel button
   */
  showCancel: { type: Boolean, default: true },
  /**
   * Cancel text
   */
  cancelText: { type: String, default: t('common.cancelText') },
  /**
   * Cancel button properties, refer to ElButton
   */
  cancelButton: { type: Object as PropType<Partial<EleButton>> },
  /**
   * Whether to show the confirmation button
   */
  showConfirm: { type: Boolean, default: true },
  /**
   * confirmation text
   */
  confirmText: { type: String, default: t('common.confirmText') },
  /**
   * Confirm button properties, refer to ElButton
   */
  confirmButton: { type: Object as PropType<Partial<EleButton>> },
}

export const basicProps = {
  ...EleDialogProps,
  ...headerProps,
  ...wrapperProps,
  ...footerProps,
  /**
   * model value
   */
  modelValue: { type: Boolean },
  /**
   * Whether the head can be dragged
   */
  draggable: { type: Boolean, default: true },
  /**
   * Whether to scroll back to the top after closing
   */
  scrollTop: { type: Boolean, default: true },
  /**
   * Close function, execute before closing, return true to close
   */
  closeFunc: Function as PropType<() => Promise<boolean>>,
  // Events that inherit Element Plus
  onOpen: Function as PropType<() => void>,
  onOpened: Function as PropType<() => void>,
  onClose: Function as PropType<() => void>,
  onClosed: Function as PropType<() => void>,
}
