import { dateType } from '../data'

export interface BasicProps {
  width: string
  height: string
}
export const basicProps = {
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '280px',
  },
  type: {
    type: String as PropType<dateType>,
    default: 'day',
  },
}
