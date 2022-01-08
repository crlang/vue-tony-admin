/*
 * @Author: crlang
 * @Date: 2021-12-30 16:51:42
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-07 16:47:37
 */

import { isValidWidthUnit } from '@/utils/validators'
import { Component } from 'vue'

export const EleDialogProps = {
  appendToBody: {
    type: Boolean,
    default: false,
  },
  beforeClose: {
    type: Function,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
  closeIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: '',
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  title: {
    type: [String, Object] as PropType<string | Component>,
    default: '',
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  top: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    // required: true,
  },
  modalClass: String,
  width: {
    type: [String, Number],
    validator: isValidWidthUnit,
  },
  zIndex: {
    type: Number,
  },
  footer: {
    type: Object as PropType<Component>,
  },
}
