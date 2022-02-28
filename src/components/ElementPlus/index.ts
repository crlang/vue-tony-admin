/*
 * @Author: crlang
 * @Date: 2021-12-24 17:24:14
 * @Description: Element Plus Type and Props
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-02-28 10:45:03
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
  CardProps,
  TagProps
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
  tagProps
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

export const EleTagProps = tagProps
export type EleTag = TagProps

// 临时方案
import { dropdownProps, dropdownItemProps } from 'element-plus/es/components/dropdown/src/dropdown'
import type {
  IDescriptionsInject,
  IDescriptionsItemInject
} from 'element-plus/es/components/descriptions/src/descriptions.type'
import { isValidComponentSize } from '@/utils/validators'
import type { ComponentSize } from '@/utils/types'
import type { FormItemRule, FormRulesMap } from 'element-plus/es/components/form/src/form.type'
import type { TableProps } from 'element-plus/es/components/table/src/table/defaults'
import TableDefault from 'element-plus/es/components/table/src/table/defaults'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import TableColumn from 'element-plus/es/components/table/src/table-column/defaults'

export const EleDropdownProps = dropdownProps
export type EleDropdown = ExtractPropTypes<typeof dropdownProps>

export const EleDropdownItemProps = dropdownItemProps
export type EleDropdownItem = ExtractPropTypes<typeof dropdownItemProps>

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

export type EleFormItemRule = FormItemRule

export type EleFormRulesMap = FormRulesMap

export const EleFormProps = {
  model: Object,
  rules: Object as PropType<FormRulesMap>,
  labelPosition: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  scrollToError: Boolean,
}

export interface EleForm {
  model: object
  rules: FormRulesMap
  labelPosition: string
  labelWidth: string | number
  labelSuffix: string
  inline: boolean
  inlineMessage: boolean
  statusIcon: boolean
  showMessage: boolean
  size: ComponentSize
  disabled: boolean
  validateOnRuleChange: boolean
  hideRequiredAsterisk: boolean
  scrollToError: boolean
}

export const EleFormItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  prop: String,
  required: {
    type: Boolean,
    default: undefined,
  },
  rules: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
  error: String,
  validateStatus: String,
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: '',
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
}
export interface EleFormItem {
  label: string
  labelWidth: string | number
  prop: string
  required: boolean
  rules: FormItemRule | FormItemRule[]
  error: string
  validateStatus: string
  for: string
  inlineMessage: string | boolean
  showMessage: boolean
  size: ComponentSize
}

export const EleTableProps = TableDefault
export type EleTable = TableProps

export const EleTableColumnProps = TableColumn
export type EleTableColumn = TableColumnCtx
