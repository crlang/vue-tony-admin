/*
 * @Author: crlang
 * @Date: 2021-12-30 16:49:06
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-30 17:09:56
 */
import { EleDialogProps } from '../Dialog/props'

export const EleDrawerProps = {
  ...EleDialogProps,
  direction: {
    type: String,
    default: 'rtl',
    values: ['ltr', 'rtl', 'ttb', 'btt'],
  },
  size: {
    type: [String, Number],
    default: '30%',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  modalFade: {
    type: Boolean,
    default: true,
  },
}
