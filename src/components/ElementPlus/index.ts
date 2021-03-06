/*
 * @Description: Element Plus Type and Props
 */
import type { CSSProperties, ExtractPropTypes } from 'vue'

// baisc element-plus
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
  TagProps,
  PaginationProps,
  FormItemRule,
  FormRules,
  ComponentSize,
  PopconfirmProps,
  ElMessageBoxOptions,
  NotificationOptions,
  Action,
  FormProps,
  FormItemProps,
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
  paginationProps,
  popconfirmProps,
  notificationProps,
  componentSizes,
  formProps,
  formItemProps,
  dropdownMenuProps,
  dropdownProps,
  dropdownItemProps,
} from 'element-plus'

export const EleButtonProps = buttonProps
export type EleButton = Partial<ButtonProps> & { btnText?: string }
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

export const ElePopconfirmProps = popconfirmProps
export type ElePopconfirm = PopconfirmProps

// export const EleElMessageBoxProps = // todo
export type EleElMessageBox = ElMessageBoxOptions

export const EleNotificationProps = notificationProps
export type EleNotification = NotificationOptions

export const EleFormProps = formProps
export type EleForm = FormProps

export const EleFormItemProps = formItemProps
export type EleFormItem = FormItemProps

export type EleFormItemRule = FormItemRule

export type EleFormRules = FormRules

export const EleDropdownProps = dropdownProps
export type EleDropdown = ExtractPropTypes<typeof dropdownProps>

export const EleDropdownMenuProps = dropdownMenuProps
export type EleDropdownMenu = ExtractPropTypes<typeof dropdownMenuProps>

export const EleDropdownItemProps = dropdownItemProps
export type EleDropdownItem = ExtractPropTypes<typeof dropdownItemProps>

//
// ??????
// MISC
export type EleActionPopconfirmAction = Action

// ?????????????????????????????? Element Plus ??????????????? Prop ?????????????????????????????????????????????????????? Prop
// The following is a temporary solution. Since Element Plus does not export Prop globally, it can only define component Prop by itself or by introducing components
import TableDefault from 'element-plus/es/components/table/src/table/defaults'
import TableColumn from 'element-plus/es/components/table/src/table-column/defaults'

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
    validator: (v: string) => componentSizes.includes(v),
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

export const EleTableProps = TableDefault
export type EleTable = Partial<ExtractPropTypes<typeof TableDefault>>

export const EleTableColumnProps = TableColumn
export type EleTableColumn = Partial<ExtractPropTypes<typeof TableColumn>>
