/*
 * @Author: crlang
 * @Date: 2021-12-24 17:24:14
 * @Description: Element Plus Type and Props
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-27 17:19:30
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
export declare type EleButton = ButtonProps & { text?: string }
export type EleButtonType = ButtonType
export type EleButtonNativeType = ButtonNativeType

export const EleColProps = colProps
export declare type EleCol = ColProps

export const EleRowProps = rowProps
export declare type EleRow = RowProps

export const EleImageProps = imageProps
export declare type EleImage = ImageProps

export const EleDialogProps = dialogProps
export declare type EleDialog = DialogProps

export const EleDrawerProps = drawerProps
export declare type EleDrawer = DrawerProps

export const EleMessageProps = messageProps
export declare type EleMessage = MessageProps

export const EleCardProps = cardProps
export declare type EleCard = CardProps

// 临时方案
import { dropdownProps, dropdownItemProps } from 'element-plus/es/components/dropdown/src/dropdown'

export const EleDropdownProps = dropdownProps
export declare type EleDropdown = ExtractPropTypes<typeof dropdownProps>

export const EleDropdownItemProps = dropdownItemProps
export declare type EleDropdownItem = ExtractPropTypes<typeof dropdownItemProps>
