import { h } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'

import type { EleActionPopconfirmAction, EleElMessageBox, EleNotification } from '@/components/ElementPlus'

/**
 * 基础信息选项
 */
interface BasicMessageOptions {
  /**
   * 标题
   */
  title?: string
  /**
   * 内容，支持 VNode
   */
  message?: string | JSX.Element
  /**
   * 自定义消息类
   */
  customClass?: string
  /**
   * 消息支持的类型
   */
  type?: EleElMessageBox['type']
}

/**
 * 提示信息选项
 */
export interface MessageBoxOptions extends BasicMessageOptions {
  /**
   * 确定文本
   */
  confirmText?: string
  /**
   * 取消文本
   */
  cancelText?: string
}

/**
 * 通知信息选项
 */
export interface NotificationOptions extends BasicMessageOptions {
  /**
   * 通知延迟关闭
   */
  duration?: EleNotification['duration']
  /**
   * 通知方位
   */
  position?: EleNotification['position']
}

/**
 * 定义轻消息提示中心
 */
export function useMessage() {
  /**
   * 创建通知消息
   *
   * @param options NotificationOptions
   */
  function createNotification(options: NotificationOptions): Promise<EleActionPopconfirmAction> {
    const { title, message, position = 'top-right', type, duration = 4500, customClass } = options

    return ElNotification({
      title,
      message,
      class: customClass, // compatible 2.3+
      customClass,
      type,
      position,
      duration,
    })
  }

  /**
   * 创建确认弹窗
   *
   * @param options MessageBoxOptions
   */
  function createConfirm(options: MessageBoxOptions): Promise<EleActionPopconfirmAction> {
    const { title, message, confirmText = '确认', cancelText = '取消', type, customClass = '' } = options
    const { prefixCls } = 'global-confirm-popup'
    const className = `${prefixCls} ${prefixCls}__${type} ${customClass}`

    return ElMessageBox.confirm(message, title, {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      showClose: false,
      class: className, // compatible 2.3+
      customClass: className,
    })
  }

  /**
   * 创建简易弹窗信息
   *
   * @param options MessageBoxOptions
   * @param type EleElMessageBox['type']
   */
  function createModalOptions(options: MessageBoxOptions, type: EleElMessageBox['type']): Promise<EleActionPopconfirmAction> {
    const { title, message, confirmText, cancelText, customClass } = options

    return ElMessageBox.alert(message, title, {
      confirmButtonText: confirmText || '确认',
      cancelButtonText: cancelText || '取消',
      type,
      class: customClass, // compatible 2.3+
      customClass,
    })
  }

  /**
   * 创建成功弹窗信息
   *
   * @param options MessageBoxOptions
   */
  function createSuccessModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'success')
  }

  /**
   * 创建成功弹窗信息
   *
   * @param options MessageBoxOptions
   */
  function createErrorModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'error')
  }

  /**
   * 创建信息弹窗信息
   *
   * @param options MessageBoxOptions
   */
  function createInfoModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'info')
  }

  /**
   * 创建警告弹窗信息
   *
   * @param options MessageBoxOptions
   */
  function createWarningModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'warning')
  }

  /**
   * 创建加载消息
   *
   * @param title msg
   * @param duration 单位毫秒，如果为0，则需要执行 ElMessage.closeAll() 关闭
   */
  const createLoading = (title: string, duration = 0) =>
    ElMessage({
      type: 'info',
      class: 'el-message--loading', // compatible 2.3+
      customClass: 'el-message--loading',
      duration, // If 0, you need to run ElMessage.closeAll() to close
      message: h('div', { style: 'display:flex;align-items:center;' }, [h(SvgIcon, { name: 'loading', spin: true }), h('span', { style: 'margin-left: 12px' }, title)]),
    })

  /**
   * 创建消息提示中心
   */
  const createMessage = {
    /**
     * 普通消息
     */
    info: ElMessage.info,
    /**
     * 成功消息
     */
    success: ElMessage.success,
    /**
     * 警告消息
     */
    warning: ElMessage.warning,
    /**
     * 错误消息
     */
    error: ElMessage.error,
    /**
     * 加载消息
     */
    loading: createLoading,
    /**
     * 关闭所有弹出的消息
     */
    closeAll: ElMessage.closeAll,
  }

  return {
    createMessage,
    createNotification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  }
}
