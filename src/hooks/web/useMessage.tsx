import { h } from 'vue'
import { ElMessage, ElIcon, ElMessageBox, ElNotification, MessageBoxData } from 'element-plus'
import { Loading } from '@element-plus/icons'

export type IconType = 'success' | 'info' | 'error' | 'warning'

interface MessageBoxOptions {
  content: string | JSX.Element<RendererNode, RendererElement>,
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
      confirmButtonText: options.nextButton || '确认',
      cancelButtonText: options.cancelButton || '取消',
      type: options.type,
    }
  ) as unknown as MessageBoxOptions
}

function createModalOptions(options: MessageBoxOptions, icon: IconType): Promise<MessageBoxData> {
  return ElMessageBox.alert(
    options.content,
    options.title,
    {
      confirmButtonText: options.nextButton || '确认',
      cancelButtonText: options.cancelButton || '取消',
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
