/*
 * @Description: Element Plus Type and Props
 */
import type { CSSProperties, ExtractPropTypes } from 'vue';

// baisc element-plus
import type {
  ButtonProps,
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
  PopconfirmProps,
  ElMessageBoxOptions,
  NotificationOptions,
  Action,
  FormProps,
  FormItemProps,
  TableInstance,
  TableColumnInstance,
  CheckboxProps,
  CheckTagProps,
  CheckboxGroupProps,
  RadioProps,
  RadioButtonProps,
  RadioGroupProps,
  DividerProps,
  DatePickerProps,
  TimePickerDefaultProps,
} from 'element-plus';

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
  descriptionProps,
  formProps,
  formItemProps,
  dropdownMenuProps,
  dropdownProps,
  dropdownItemProps,
  checkboxProps,
  checkTagProps,
  checkboxGroupProps,
  radioProps,
  radioGroupProps,
  radioButtonProps,
  dividerProps,
  datePickerProps,
  timePickerDefaultProps,
  // --
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElCheckboxButton,
  ElTree,
  ElTreeSelect,
  ElCascader,
  ElCascaderPanel,
} from 'element-plus';

export const EleButtonProps = buttonProps;
export type EleButton = Partial<ButtonProps> & { btnText?: string; class?: string };

export const EleColProps = colProps;
export type EleCol = ColProps & { style?: CSSProperties };

export const EleRowProps = rowProps;
export type EleRow = RowProps;

export const EleImageProps = imageProps;
export type EleImage = ImageProps;

export const EleDialogProps = dialogProps;
export type EleDialog = DialogProps & { class?: string; customClass?: string };

export const EleDrawerProps = drawerProps;
export type EleDrawer = DrawerProps & { class?: string; customClass?: string };

export const EleMessageProps = messageProps;
export type EleMessage = MessageProps;

export const EleCardProps = cardProps;
export type EleCard = CardProps;

export const EleTagProps = tagProps;
export type EleTag = TagProps;

export const ElePaginationProps = paginationProps;
export type ElePagination = PaginationProps;

export const ElePopconfirmProps = popconfirmProps;
export type ElePopconfirm = PopconfirmProps;

export const EleElMessageBoxProps = null;
export type EleElMessageBox = ElMessageBoxOptions;

export const EleNotificationProps = notificationProps;
export type EleNotification = NotificationOptions;

export const EleFormProps = formProps;
export type EleForm = FormProps;
export type EleFormRules = FormRules;

export const EleFormItemProps = formItemProps;
export type EleFormItem = FormItemProps;
export type EleFormItemRule = FormItemRule;

export const EleDropdownProps = dropdownProps;
export type EleDropdown = ExtractPropTypes<typeof dropdownProps>;

export const EleDropdownMenuProps = dropdownMenuProps;
export type EleDropdownMenu = ExtractPropTypes<typeof dropdownMenuProps>;

export const EleDropdownItemProps = dropdownItemProps;
export type EleDropdownItem = ExtractPropTypes<typeof dropdownItemProps>;

export const EleDescriptionsProps = descriptionProps;
export type EleDescriptions = ExtractPropTypes<typeof descriptionProps>;

export const EleTableProps = ElTable['props'];
export type EleTable = TableInstance['$props'];

export const EleTableColumnProps = ElTableColumn['props'];
export type EleTableColumn = TableColumnInstance['$props'];

export const EleSelectProps = ElSelect['props'];
export type EleSelect = InstanceType<typeof ElSelect>['$props'];

export const EleOptionProps = ElOption['props'];
export type EleOption = InstanceType<typeof ElOption>['$props'];

export const EleOptionGroupProps = ElOptionGroup['props'];
export type EleOptionGroup = InstanceType<typeof ElOptionGroup>['$props'];

export const EleCheckboxProps = checkboxProps;
export type EleCheckbox = CheckboxProps;

export const EleCheckTagProps = checkTagProps;
export type EleCheckTag = CheckTagProps;

export const EleCheckboxGroupProps = checkboxGroupProps;
export type EleCheckboxGroup = CheckboxGroupProps;

export const EleCheckboxButtonProps = ElCheckboxButton['props'];
export type EleCheckboxButton = InstanceType<typeof ElCheckboxButton>['$props'];

export const EleRadioProps = radioProps;
export type EleRadio = RadioProps;

export const EleRadioGroupProps = radioGroupProps;
export type EleRadioGroup = RadioGroupProps;

export const EleRadioButtonProps = radioButtonProps;
export type EleRadioButton = RadioButtonProps;

export const EleTreeProps = ElTree['props'];
export type EleTree = InstanceType<typeof ElTree>['$props'];

export const EleTreeSelectProps = ElTreeSelect['props'];
export type EleTreeSelect = InstanceType<typeof ElTreeSelect>['$props'];

export const EleDividerProps = dividerProps;
export type EleDivider = DividerProps;

export const EleCascaderProps = ElCascader['props'];
export type EleCascader = InstanceType<typeof ElCascader>['$props'];

export const EleCascaderPanelProps = ElCascaderPanel['props'];
export type EleCascaderPanel = InstanceType<typeof ElCascaderPanel>['$props'];

export const EleDatePickerProps = datePickerProps;
export type EleDatePicker = DatePickerProps;

export const EleTimePickerProps = timePickerDefaultProps;
export type EleTimePicker = TimePickerDefaultProps;

// 杂项
// MISC
export type EleActionPopconfirmAction = Action;
