import type { GlobalThemeType } from '@/utils/types'
import type { UsePopperCoreConfigProps } from 'element-plus'
import type { ArrowDirection } from './typing'

export const basicArrowProps = {
  expand: { type: Boolean },
  direction: { type: String as PropType<ArrowDirection>, default: 'down' },
}

export const basicHelpProps = {
  showIndex: { type: Boolean },
  effect: { type: String as PropType<GlobalThemeType>, default: 'dark' },
  placement: { type: String as PropType<UsePopperCoreConfigProps['placement']>, default: 'right' },
  text: { type: [Array, String] as PropType<string[] | string> },
}

export const basicTitleProps = {
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  span: { type: Boolean },
  bold: { type: Boolean },
}
