/*
 * @Author: crlang
 * @Date: 2021-12-25 18:14:32
 * @Description: Ele props - Button
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-02 21:58:42
 */
import { Component } from 'vue'
import { EleButtonNativeType, EleButtonType, EleButtonSize } from './types'

// export const EleButtonType = [
//   'default',
//   'primary',
//   'success',
//   'warning',
//   'info',
//   'danger',
//   'text',
//   '',
// ]
// export const EleButtonSize = ['', 'large', 'medium', 'small', 'mini']
// export const EleButtonNativeType = ['button', 'submit', 'reset']

export const EleButtonGroupProps = {
  size: {
    type: String as PropType<EleButtonSize>,
    default: '',
  },
  type: {
    type: String as PropType<EleButtonType>,
    default: '',
  },
}

export const EleButtonProps = {
  ...EleButtonGroupProps,
  disabled: Boolean,
  icon: {
    type: [String, Object] as PropType<string | Component>,
    default: '',
  },
  nativeType: {
    type: String as PropType<EleButtonNativeType>,
    default: 'button',
  },
  loading: Boolean,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
}
