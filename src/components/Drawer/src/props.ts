import type { PropType } from 'vue'

import { useI18n } from '@/hooks/web/useI18n'
import { EleDrawerProps } from '@/components/ElementPlus'
const { t } = useI18n()

export const footerProps = {
  showCancelBtn: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: t('common.cancelText'),
  },
  cancelType: {
    type: String,
    default: 'default',
  },
  showConfirmBtn: {
    type: Boolean,
    default: true,
  },
  confirmText: {
    type: String,
    default: t('common.confirmText'),
  },
  confirmType: {
    type: String,
    default: 'primary',
  },
  confirmLoading: {
    type: Boolean,
  },
  showFooter: {
    type: Boolean,
  },
  footerHeight: {
    type: Number,
    default: 60,
  },
}

export const basicProps = {
  ...EleDrawerProps,
  isDetail: { type: Boolean },
  title: { type: String, default: '' },
  loadingText: { type: String },
  showDetailBack: { type: Boolean, default: true },
  loading: { type: Boolean },
  modelValue: { type: Boolean },
  closeFunc: {
    type: [Function, Object] as PropType<any>,
    default: null,
  },
  ...footerProps,
}
