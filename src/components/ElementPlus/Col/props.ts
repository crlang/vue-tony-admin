/*
 * @Author: crlang
 * @Date: 2022-01-03 21:33:56
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-03 21:35:24
 */

type SizeObject = {
  span?: number
  offset?: number
}
type Size = number | SizeObject

export const EleColProps = {
  tag: {
    type: String,
    default: 'div',
  },
  span: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  xs: {
    type: [Number, Object] as PropType<Size>,
    default: () => {},
  },
  sm: {
    type: [Number, Object] as PropType<Size>,
    default: () => {},
  },
  md: {
    type: [Number, Object] as PropType<Size>,
    default: () => {},
  },
  lg: {
    type: [Number, Object] as PropType<Size>,
    default: () => {},
  },
  xl: {
    type: [Number, Object] as PropType<Size>,
    default: () => {},
  },
}
