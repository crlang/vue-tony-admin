/*
 * @Author: crlang
 * @Date: 2022-01-01 19:05:27
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-01 19:34:48
 */

import { Component } from 'vue'
import { EleButtonType } from '../Button/types'

export enum Effect {
  DARK = 'dark',
  LIGHT = 'light',
}

export type TriggerType = 'click' | 'hover' | 'focus' | 'manual'

export const EleDropdownProps = {
  trigger: {
    type: String as PropType<TriggerType | 'contextmenu'>,
    default: 'hover',
  },
  type: String as PropType<EleButtonType>,
  size: {
    type: String,
    default: '',
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
  showTimeout: {
    type: Number,
    default: 150,
  },
  hideTimeout: {
    type: Number,
    default: 150,
  },
  tabindex: {
    type: [Number, String],
    default: 0,
  },
  effect: {
    type: String as PropType<Effect>,
    default: Effect.LIGHT,
  },
  maxHeight: {
    type: [Number, String],
    default: '',
  },
}

export const EleDropdownItemProps = {
  command: {
    type: [Object, String, Number],
    default: () => ({}),
  },
  disabled: Boolean,
  divided: Boolean,
  icon: {
    type: [String, Object] as PropType<string | Component>,
  },
  text: {
    type: [String, Number],
  },
}
