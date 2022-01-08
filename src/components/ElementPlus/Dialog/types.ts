/*
 * @Author: crlang
 * @Date: 2021-12-30 16:51:49
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-07 15:52:47
 */

import { Component } from 'vue'

export interface EleDialog {
  appendToBody?: boolean
  beforeClose?: any
  destroyOnClose?: boolean
  center?: boolean
  customClass?: string
  closeIcon?: string | Component
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  fullscreen?: boolean
  lockScroll?: boolean
  modal?: boolean
  showClose?: boolean
  title?: string | Component
  openDelay?: number
  closeDelay?: number
  top?: string
  modelValue?: boolean
  modalClass?: String,
  width?: string | number
  zIndex?: number
  footer?: string | Component
}
