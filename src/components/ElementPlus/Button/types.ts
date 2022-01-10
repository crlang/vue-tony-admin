/*
 * @Author: crlang
 * @Date: 2021-12-25 18:14:24
 * @Description: Ele types - Button
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-10 11:30:57
 */

import type { Component } from 'vue'

export type EleButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'text'
  | ''

export type EleButtonSize =
  | ''
  | 'large'
  | 'default'
  | 'small'

export type EleButtonNativeType = 'button' | 'submit' | 'reset'

export interface EleButtonGroup {
  size?: EleButtonSize
  type?: EleButtonType
}

export interface EleButton extends EleButtonGroup{
  disabled?: boolean
  icon?: string | Component
  nativeType?: EleButtonNativeType
  loading?: boolean
  plain?: boolean
  autofocus?: boolean
  round?: boolean
  circle?: boolean
  color?: string
  autoInsertSpace?: boolean
}
