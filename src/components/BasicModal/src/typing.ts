import type { ComputedRef } from 'vue'
import type { EleButton, EleDialog } from '@/components/ElementPlus'

/**
 * 弹窗基础Props
 */
export interface BasicModalProps extends EleDialog, ModalCustomHeader, ModalCustomContent, ModalCustomFooter {
  modelValue: boolean
  /**
   * 是否显示脚部
   */
  showFooter?: boolean
  /**
   * 关闭后是否滚动回顶部
   */
  scrollTop?: boolean
  /**
   * 关闭前执行函数方法
   */
  closeFn?: () => Promise<boolean>
}

export interface ModalCustomHeader {
  /**
   * 是否显示关闭图标
   */
  showClose?: boolean
  /**
   * 是否显示全屏图标
   */
  showFullscreen?: boolean
  /**
   * 标题帮助文本
   */
  helpMessage?: string | string[]
}

export interface ModalCustomContent {
  /**
   * 是否开启自适应高度
   */
  dyncHeight?: boolean
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 加载提示文本
   */
  loadingText?: string
}

export interface ModalCustomFooter {
  /**
   * 是否显示确认按钮
   */
  showConfirmBtn?: boolean
  /**
   * 确定按钮配置，同 ElButton
   */
  confirmOptions?: EleButton
  /**
   * 是否显示取消按钮
   */
  showCancelBtn?: boolean
  /**
   * 取消按钮配置，同 ElButton
   */
  cancelOptions?: EleButton
}

/**
 * 弹窗实例方法
 */
export interface ModalInstanceMethods {
  /**
   * 设置弹窗props
   */
  setModalProps: (props: Partial<BasicModalProps>) => void
  /**
   * 显示/隐藏弹窗-方法内部生成
   */
  emitVisible?: (visible: boolean, uid: number) => void
  /**
   * 刷新弹窗高度
   */
  redoModalHeight?: () => void
}

/**
 * 实例支持的方法
 */
export interface ModalActionMethods extends ModalInstanceMethods {
  /**
   * 打开弹窗
   */
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  /**
   * 关闭弹窗
   */
  closeModal: () => void
  /**
   * 获取弹窗状态
   */
  getVisible?: ComputedRef<boolean>
}

/**
 * 注册实例方法
 */
export type RegisterFn = (modalMethods: ModalInstanceMethods, uuid?: string) => void

/**
 * 内部实例支持的方法
 */
export interface ReturnInnerMethods extends ModalInstanceMethods {
  /**
   * 关闭弹窗
   */
  closeModal: () => void
  /**
   * 改变内容loading状态
   */
  changeLoading: (loading: boolean) => void
  /**
   * 改变确认按钮loading状态
   */
  changeConfirmLoading: (loading: boolean) => void
  /**
   * 获取弹窗状态
   */
  getVisible?: ComputedRef<boolean>
  /**
   * 刷新弹窗高度
   */
  redoModalHeight: () => void
}

/**
 * 定义实例内容
 */
export type UseModalReturnType = [RegisterFn, ModalActionMethods]

/**
 * 定义内部实例返回内容
 */
export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods]
