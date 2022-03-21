import type { EleButtonType } from '@/components/ElementPlus'

import { useI18n } from '@/hooks/web/useI18n'
import { EleDrawerProps } from '@/components/ElementPlus'
const { t } = useI18n()

export const footerProps = {
  /**
   * Whether to show the confirm button
   */
  showConfirmBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * Confirm Text
   */
  confirmText: {
    type: String,
    default: t('common.confirmText'),
  },
  /**
   * Confirm Type
   */
  confirmType: {
    type: String as PropType<EleButtonType>,
    default: 'primary',
  },
  /**
   * Whether to display the status of continuing to load
   */
  confirmLoading: {
    type: Boolean,
  },
  /**
   * Whether to show the cancel button
   */
  showCancelBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * Cancel text
   */
  cancelText: {
    type: String,
    default: t('common.cancelText'),
  },
  /**
   * Cancel type
   */
  cancelType: {
    type: String as PropType<EleButtonType>,
    default: 'default',
  },
  /**
   * whether to show footer
   */
  showFooter: {
    type: Boolean,
  },
  /**
   * Footer height
   */
  footerHeight: {
    type: Number,
    default: 60,
  },
}

// Advanced
export const extProps = {
  /**
   * Whether the details mode
   */
  isDetail: { type: Boolean },
  /**
    * Whether to display the details return button
    */
  showDetailBack: { type: Boolean, default: true },
  /**
    * whether to show loading
    */
  loading: { type: Boolean },
  /**
    * Loading text
    */
  loadingText: { type: String },
  /**
    * Method triggered on close
    */
  closeFunc: {
    type: [Function, Object] as PropType<any>,
    default: null,
  },
}

export const basicProps = {
  ...EleDrawerProps,
  title: { type: String },
  modelValue: { type: Boolean },
  ...extProps,
  ...footerProps,
}
