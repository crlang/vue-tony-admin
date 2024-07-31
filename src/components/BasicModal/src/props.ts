import type { EleButton } from '@/components/ElementPlus'

import { EleDialogProps } from '@/components/ElementPlus'

export const headerProps = {
  /**
   * 是否显示关闭图标
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示全屏图标
   */
  showFullscreen: {
    type: Boolean,
    default: true,
  },
  /**
   * 标题帮助文本
   */
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
}

export const wrapperProps = {
  /**
   * 是否开启自适应高度
   */
  dyncHeight: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示加载状态
   */
  loading: Boolean,
  /**
   * 加载提示文本
   */
  loadingText: {
    type: String,
    default: '加载中...',
  },
}

export const footerProps = {
  /**
   * 是否显示确认按钮
   */
  showConfirmBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * 确定按钮配置，同 ElButton
   */
  confirmOptions: {
    type: Object as PropType<EleButton>,
    default: {
      btnText: '确定',
      type: 'primary',
    },
  },
  /**
   * 是否显示取消按钮
   */
  showCancelBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * 取消按钮配置，同 ElButton
   */
  cancelOptions: {
    type: Object as PropType<EleButton>,
    default: {
      btnText: '取消',
      type: 'default',
    },
  },
}

export const customProps = {
  modelValue: Boolean,
  ...headerProps,
  ...wrapperProps,
  ...footerProps,
  /**
   * 是否显示脚部
   */
  showFooter: {
    type: Boolean,
    default: true,
  },
  /**
   * 关闭后是否滚动回顶部
   */
  scrollTop: {
    type: Boolean,
    default: true,
  },
  /**
   * 关闭前执行函数方法
   */
  closeFn: Function as PropType<() => Promise<boolean>>,
}

export const basicProps = {
  ...EleDialogProps,
  ...customProps,
  // 继承Element Plus的事件
  appendToBody: {
    type: Boolean,
    default: true,
  },
  onOpen: Function as PropType<() => void>,
  onOpened: Function as PropType<() => void>,
  onClose: Function as PropType<() => void>,
  onClosed: Function as PropType<() => void>,
}
