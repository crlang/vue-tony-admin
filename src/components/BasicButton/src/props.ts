import { EleButtonProps } from '@/components/ElementPlus'

export const customProps = {
  /**
   * 按钮阴影
   */
  shadow: { type: Boolean },
  /**
   * 文本前图标
   */
  preIcon: { type: String },
  /**
   * 文本后图标
   */
  sufIcon: { type: String },
  /**
   * 图标大小
   */
  iconSize: {
    type: Number,
    default: 14,
  },
  /**
   * 点击事件
   */
  onClick: {
    type: Function as PropType<(...args) => any>,
    default: null,
  },
}

export const basicProps = {
  ...EleButtonProps,
  ...customProps,
}
