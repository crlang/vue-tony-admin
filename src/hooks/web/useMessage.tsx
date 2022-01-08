import { h, VNode } from 'vue'
// import { useI18n } from './useI18n'
// ele
import { ElMessage, ElIcon, ElMessageBox, ElNotification, MessageBoxData } from 'element-plus'
import { Loading } from '@element-plus/icons'
import { useI18n } from '@/hooks/web/useI18n'

export type IconType = 'success' | 'info' | 'error' | 'warning'

interface MessageBoxOptions {
  content: string | VNode<RendererNode, RendererElement>,
  title: string,
  type?: IconType,
  nextButton?: string,
  cancelButton?: string
}

/**
 * @description: Create confirmation box
 */
function createConfirm(options: MessageBoxOptions): Promise<MessageBoxData> {
  return ElMessageBox.confirm(
    options.content,
    options.title,
    {
      confirmButtonText: options.nextButton || useI18n().t('common.confirmText'),
      cancelButtonText: options.cancelButton || useI18n().t('common.cancelText'),
      type: options.type,
    }
  ) as unknown as MessageBoxOptions
}

function createModalOptions(options: MessageBoxOptions, icon: IconType): Promise<MessageBoxData> {
  return ElMessageBox.alert(
    options.content,
    options.title,
    {
      confirmButtonText: options.nextButton || useI18n().t('common.confirmText'),
      cancelButtonText: options.cancelButton || useI18n().t('common.cancelText'),
      type: icon,
    }
  ) as unknown as MessageBoxOptions
}

function createSuccessModal(options: MessageBoxOptions) {
  return createModalOptions(options, 'success')
}

function createErrorModal(options: MessageBoxOptions) {
  return createModalOptions(options, 'error')
}

function createInfoModal(options: MessageBoxOptions) {
  return createModalOptions(options, 'info')
}

function createWarningModal(options: MessageBoxOptions) {
  return createModalOptions(options, 'warning')
}

const createMessage = {
  info: ElMessage.info,
  success: ElMessage.success,
  warning: ElMessage.warning,
  error: ElMessage.error,
  loading: (title:string, duration = 0) => ElMessage({
    type: 'info',
    customClass: 'el-message--loading',
    duration,
    message: h(
      'div',
      { style: 'display:flex;align-items:center;' },
      [
        h(
          ElIcon,
          { class: 'is-loading' },
          {
            default: () => h(Loading),
            content: () => {},
          }
        ),
        h(
          'span',
          { style: 'margin-left: 12px' },
          title
        ),
      ]
    ),
  }),
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage,
    notification: ElNotification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  }
}
