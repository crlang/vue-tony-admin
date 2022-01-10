/*
 * @Author: crlang
 * @Date: 2021-12-24 17:24:14
 * @Description: Element Plus Type and Props
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-10 17:54:11
 */
// type
export * from './Form/types'
export * from './Form/types.rule'
export * from './FormItem/types'
export * from './Table/types'
export * from './TableColumn/types'
export * from './Dropdown/types'

// prop
export * from './Form/props'
export * from './FormItem/props'
export * from './Table/props'
export * from './TableColumn/props'
export * from './Dropdown/props'

// 引入 element-plus
import type {
  ButtonProps,
  ColProps,
  RowProps,
  ImageProps,
  DialogProps,
  DrawerProps,
  MessageProps,
} from 'element-plus/lib/components/index'
import type { ButtonGroupProps } from 'element-plus/lib/components/button/src/button-group'

import {
  buttonProps,
  colProps,
  rowProps,
  imageProps,
  dialogProps,
  drawerProps,
  messageProps,
} from 'element-plus/lib/components/index'
import { buttonGroupProps } from 'element-plus/lib/components/button/src/button-group'

export const EleButtonProps = buttonProps
export declare type EleButton = ButtonProps & { text?: string }

export const EleButtonGroupProps = buttonGroupProps
export declare type EleButtonGroup = ButtonGroupProps

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
