/*
 * @Description: Element Plus Type and Props
 */
import type { CSSProperties, ExtractPropTypes } from 'vue'

// baisc element-plus
import {
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
  TagProps,
  PaginationProps,
  FormItemRule,
  FormRulesMap,
  ComponentSize,
  componentSizes
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
  tagProps,
  paginationProps
} from 'element-plus'

export const EleButtonProps = buttonProps
export type EleButton = ButtonProps & { text?: string }
export type EleButtonType = ButtonType
export type EleButtonNativeType = ButtonNativeType

export const EleColProps = colProps
export type EleCol = ColProps & { style?: CSSProperties }

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

export const ElePaginationProps = paginationProps
export type ElePagination = PaginationProps

// 以下为临时方案，由于 Element Plus 未全局导出 Prop ，只能自建或通过引入组件方式定义组件 Prop
// The following is a temporary solution. Since Element Plus does not export Prop globally, it can only define component Prop by itself or by introducing components
import { dropdownProps, dropdownItemProps } from 'element-plus/es/components/dropdown/src/dropdown'
import TableDefault from 'element-plus/es/components/table/src/table/defaults'
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
    validator: (v:string) => componentSizes.includes(v),
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
export type EleDescriptions = ExtractPropTypes<typeof EleDescriptionsProps>

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
export type EleDescriptionsItem = Partial<ExtractPropTypes<typeof EleDescriptionsItemProps>>

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

type FormItemValidateStatus = '' | 'success' | 'warning' | 'error' | 'validating'

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
  validateStatus: String as PropType<FormItemValidateStatus>,
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
    validator: (v:string) => componentSizes.includes(v),
  },
}

export interface EleFormItem {
  label: string
  labelWidth: string | number
  prop: string
  required: boolean
  rules: FormItemRule | FormItemRule[]
  error: string
  validateStatus: FormItemValidateStatus
  for: string
  inlineMessage: string | boolean
  showMessage: boolean
  size: ComponentSize
}

export const EleTableProps = TableDefault
export type EleTable = Partial<ExtractPropTypes<typeof TableDefault>>

export const EleTableColumnProps = TableColumn
export type EleTableColumn = Partial<ExtractPropTypes<typeof TableColumn>>
