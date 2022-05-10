import type { EleButton } from '@/components/ElementPlus'

import { EleDrawerProps } from '@/components/ElementPlus'

export const basicProps = {
  ...EleDrawerProps,
  appendToBody: {
    type: Boolean,
    default: true,
  },

  /**
   * 绑定的值（显示/隐藏）
   *
   * Bind value (show/hide)
   */
  modelValue: { type: Boolean },
  /**
   * 抽屉标题
   *
   * Drawer title
   */
  title: { type: String },
  /**
   * 是否为详情模式（带返回按钮）
   *
   * Whether it is in detail mode (with back button)
   */
  isDetail: Boolean,
  /**
   * 是否显示加载状态
   *
   * Whether to show loading
   */
  loading: Boolean,
  /**
   * 加载提示文字
   *
   * Loading text
   */
  loadingText: String,
  /**
   * 关闭前触发的方法
   *
   * Method triggered before closing
   */
  closeFunc: {
    type: Function as PropType<(arg?: Recordable) => Promise<boolean>>,
    default: null,
  },
  /**
   * 是否显示脚部
   *
   * Whether to display the footer
   */
  showFooter: Boolean,
  /**
   * 是否显示确认按钮
   *
   * Whether to show the confirm button
   */
  showConfirmBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认按钮配置，同 ElButton
   *
   * Confirm button configuration, same as ElButton
   */
  confirmOptions: {
    type: Object as PropType<Partial<EleButton>>,
    default: {
      text: '确认',
      type: 'primary',
    },
  },
  /**
   * 是否显示取消按钮
   *
   * Whether to show the cancel button
   */
  showCancelBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * 取消按钮配置，同 ElButton
   *
   * Confirm button configuration, same as ElButton
   */
  cancelOptions: {
    type: Object as PropType<Partial<EleButton>>,
    default: {
      text: '取消',
      type: 'default',
    },
  },
}
