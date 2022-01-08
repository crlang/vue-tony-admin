/*
 * @Author: crlang
 * @Date: 2021-12-25 18:14:24
 * @Description: Ele types - Button
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-28 11:04:36
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
  | 'medium'
  | 'small'
  | 'mini'

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
