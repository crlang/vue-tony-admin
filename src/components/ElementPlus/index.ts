/*
 * @Author: crlang
 * @Date: 2021-12-24 17:24:14
 * @Description: Element Plus Type and Props
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-02-09 09:26:05
 */
import { ExtractPropTypes } from 'vue'

// 引入 element-plus
import type {
  ButtonProps,
  ButtonType,
  ButtonNativeType,
  ColProps,
  RowProps,
  ImageProps,
  DialogProps,
  DrawerProps,
  MessageProps,
  CardProps
} from 'element-plus'

import {
  buttonProps,
  colProps,
  rowProps,
  imageProps,
  dialogProps,
  drawerProps,
  messageProps,
  cardProps,
} from 'element-plus'

export const EleButtonProps = buttonProps
export type EleButton = ButtonProps & { text?: string }
export type EleButtonType = ButtonType
export type EleButtonNativeType = ButtonNativeType

export const EleColProps = colProps
export type EleCol = ColProps

export const EleRowProps = rowProps
export type EleRow = RowProps

export const EleImageProps = imageProps
export type EleImage = ImageProps

export const EleDialogProps = dialogProps
export type EleDialog = DialogProps

export const EleDrawerProps = drawerProps
export type EleDrawer = DrawerProps

export const EleMessageProps = messageProps
export type EleMessage = MessageProps

export const EleCardProps = cardProps
export type EleCard = CardProps

// 临时方案
import { dropdownProps, dropdownItemProps } from 'element-plus/es/components/dropdown/src/dropdown'

export const EleDropdownProps = dropdownProps
export type EleDropdown = ExtractPropTypes<typeof dropdownProps>

export const EleDropdownItemProps = dropdownItemProps
export type EleDropdownItem = ExtractPropTypes<typeof dropdownItemProps>

import { IDescriptionsInject, IDescriptionsItemInject } from 'element-plus/es/components/descriptions/src/descriptions.type'
import { isValidComponentSize } from '@/utils/validators'
import { ComponentSize } from '@/utils/types'

export const EleDescriptionsProps = {
  border: {
    type: Boolean,
    default: false,
  },
  column: {
    type: Number,
    default: 3,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  title: {
    type: String,
    default: '',
  },
  extra: {
    type: String,
    default: '',
  },
}
export type EleDescriptions = IDescriptionsInject

export const EleDescriptionsItemProps = {
  label: {
    type: String,
    default: '',
  },
  span: {
    type: Number,
    default: 1,
  },
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  labelClassName: {
    type: String,
    default: '',
  },
}
export type EleDescriptionsItem = IDescriptionsItemInject
