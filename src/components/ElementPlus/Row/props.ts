/*
 * @Author: crlang
 * @Date: 2022-01-03 21:37:28
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-03 21:39:14
 */
type justify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'
type align = 'top' | 'middle' | 'bottom'

export const EleRowProps = {
  tag: {
    type: String,
    default: 'div',
  },
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String as PropType<justify>,
    default: 'start',
  },
  align: {
    type: String as PropType<align>,
    default: 'top',
  },
}
