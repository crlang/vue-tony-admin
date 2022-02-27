import type { EleButton } from '@/components/ElementPlus'

import { EleDialogProps } from '@/components/ElementPlus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const headerProps = {
  showClose: { type: Boolean, default: true },
  showFullscreen: { type: Boolean, default: true },
  helpMessage: { type: [String, Array] as PropType<string | string[]>, default: '' },
}

export const wrapperProps = {
  useWrapper: { type: Boolean, default: true },
  footerOffset: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
  loadingTip: { type: String, default: t('common.loadingText') },
  modalHeaderHeight: { type: Number, default: 56 },
  modalFooterHeight: { type: Number, default: 70 },
}

export const footerProps = {
  showFooter: { type: Boolean, default: true },
  showCancel: { type: Boolean, default: true },
  cancelText: { type: String, default: t('common.cancelText') },
  cancelButton: { type: Object as PropType<Partial<EleButton>> },
  showConfirm: { type: Boolean, default: true },
  confirmText: { type: String, default: t('common.confirmText') },
  confirmButton: { type: Object as PropType<Partial<EleButton>> },
}

export const basicProps = {
  ...EleDialogProps,
  ...headerProps,
  ...wrapperProps,
  ...footerProps,
  modelValue: { type: Boolean },

  scrollTop: { type: Boolean, default: true },

  draggable: { type: Boolean, default: true },

  closeFunc: Function as PropType<() => Promise<boolean>>,
  onOpen: Function as PropType<() => void>,
  onOpened: Function as PropType<() => void>,
  onClose: Function as PropType<() => void>,
  onClosed: Function as PropType<() => void>,
}
