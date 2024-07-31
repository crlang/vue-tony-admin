import type { EleButton } from '@/components/ElementPlus'

import { EleDrawerProps } from '@/components/ElementPlus'

export const customProps = {
  modelValue: { type: Boolean },
  /**
   * 抽屉标题
   */
  title: { type: String },
  /**
   * 是否为详情模式（带返回按钮）
   */
  isDetail: Boolean,
  /**
   * 是否显示加载状态
   */
  loading: Boolean,
  /**
   * 加载提示文字
   */
  loadingText: String,
  /**
   * 关闭前触发的方法
   */
  closeFn: {
    type: Function as PropType<(arg?: Recordable) => Promise<boolean>>,
    default: null,
  },
  /**
   * 是否显示脚部
   */
  showFooter: Boolean,
  /**
   * 是否显示确认按钮
   */
  showConfirmBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认按钮配置，同 ElButton
   */
  confirmOptions: {
    type: Object as PropType<EleButton>,
    default: {
      btnText: '确认',
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

export const basicProps = {
  ...EleDrawerProps,
  appendToBody: {
    type: Boolean,
    default: true,
  },
  modelValue: { type: Boolean },
  ...customProps,
}
