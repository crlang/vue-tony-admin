import type { ComputedRef } from 'vue'
import type { EleButton, EleDrawer } from '@/components/ElementPlus'

/**
 * 抽屉基础Props
 */
export interface BasicDrawerProps extends EleDrawer {
  /**
   * 绑定的值（显示/隐藏）
   */
  modelValue?: boolean
  /**
   * 抽屉标题
   */
  title?: string
  /**
   * 是否为详情模式（带返回按钮）
   */
  isDetail?: boolean
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 加载提示文字
   */
  loadingText?: string
  /**
   * 关闭前触发的方法
   */
  closeFn?: () => Promise<boolean>
  /**
   * 是否显示脚部
   */
  showFooter?: boolean
  /**
   * 是否显示确认按钮
   */
  showConfirmBtn?: boolean
  /**
   * 确认按钮配置，同 ElButton
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
 * 抽屉实例方法
 */
export interface DrawerInstanceMethods {
  /**
   * 设置抽屉props
   */
  setDrawerProps: (props: Partial<BasicDrawerProps> | boolean) => void
  /**
   * 显示/隐藏抽屉-方法内部生成
   */
  emitVisible?: (visible: boolean, uid: number) => void
}

/**
 * 实例支持的方法
 */
export interface DrawerActionMethods extends DrawerInstanceMethods {
  /**
   * 打开抽屉
   */
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void
  /**
   * 关闭抽屉
   */
  closeDrawer: () => void
  /**
   * 获取抽屉状态
   */
  getVisible?: ComputedRef<boolean>
}

/**
 * 注册实例方法
 */
export type RegisterFn = (drawerInstance: DrawerInstanceMethods, uuid?: string) => void

/**
 * 内部实例支持的方法
 */
export interface ReturnInnerMethods extends DrawerInstanceMethods {
  /**
   * 关闭抽屉
   */
  closeDrawer: () => void
  /**
   * 改变内容loading状态
   */
  changeLoading: (loading: boolean) => void
  /**
   * 改变确认按钮loading状态
   */
  changeConfirmLoading: (loading: boolean) => void
  /**
   * 获取抽屉状态
   */
  getVisible?: ComputedRef<boolean>
}

/**
 * 定义实例内容
 */
export type UseDrawerReturnType = [RegisterFn, DrawerActionMethods]

/**
 * 定义内部实例返回内容
 */
export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods]
