import { EleButtonProps } from '@/components/ElementPlus'

export const buttonProps = {
  ...EleButtonProps,
  /**
   * button shadow
   */
  shadow: { type: Boolean },
  /**
   * Text before icon.
   */
  preIcon: { type: String },
  /**
   * Text after icon.
   */
  sufIcon: { type: String },
  /**
   * Icon size.
   */
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function as PropType<(...args) => any>, default: null },
}
