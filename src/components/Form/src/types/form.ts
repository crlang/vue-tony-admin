import type { VNode } from 'vue'
import type { ButtonProps as ButtonProps2 } from '@/components/Button'
import type { FormItem } from './formItem'
import type { ColEx, ComponentType } from './index'
import type { TableActionType } from '@/components/Table/src/types/table'
import type { CSSProperties } from 'vue'
import type { EleRow } from '@/components/ElementPlus'
import { EleForm, FormItemRule } from '@/components/ElementPlus'

export type FieldMapToTime = [string, [string, string], string?][]

type NamePath = string | number | (string | number)[];

export interface RenderCallbackParams {
  schema: FormSchema
  values: Recordable
  model: Recordable
  field: string
}

export interface ButtonProps extends ButtonProps2 {
  text?: string
}

export interface FormActionType {
  submit: () => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  resetFields: () => Promise<void>
  getFieldsValue: () => Recordable
  clearValidate: (name?: string | string[]) => Promise<void>
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  removeSchemaByField: (field: string | string[]) => Promise<void>
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>
  validateField: (nameList?: NamePath[]) => Promise<any>
  validate: (nameList?: NamePath[]) => Promise<any>
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]

export interface FormProps extends EleForm {
  // Row configuration for the entire form
  rowProps?: EleRow
  // Submit form on reset
  submitOnReset?: boolean

  // General row style
  baseRowStyle?: CSSProperties

  // General col configuration
  baseColProps?: Partial<ColEx>

  // Form configuration rules
  schemas?: FormSchema[]
  // Function values used to merge into dynamic control form items
  mergeDynamicData?: Recordable
  // Blank line span
  emptySpan?: number | Partial<ColEx>
  // Placeholder is set automatically
  autoSetPlaceHolder?: boolean
  // Auto submit on press enter on input
  autoSubmitOnEnter?: boolean
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean
  // Whether to show collapse and expand buttons
  showAdvancedButton?: boolean
  // Whether to focus on the first input box, only works when the first form item is input
  autoFocusFirstItem?: boolean
  // Automatically collapse over the specified number of rows
  autoAdvancedLine?: number
  // Always show lines
  alwaysShowLines?: number
  // Whether to show the operation button
  showActionButtonGroup?: boolean

  // Reset button configuration
  resetButtonOptions?: Partial<ButtonProps>

  // Confirm button configuration
  submitButtonOptions?: Partial<ButtonProps>

  // Operation column configuration
  actionColOptions?: Partial<ColEx>

  // Show reset button
  showResetButton?: boolean
  // Show confirmation button
  showSubmitButton?: boolean

  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  transformDateFunc?: (date: any) => string
}

export interface FormSchema {
  // Field name
  field: string
  // Label name
  label: string
  // Event name triggered by internal value change, default change
  changeEvent?: string
  // Variable name bound to v-model Default modelValue
  valueField?: string

  // Auxiliary text
  subLabel?: string
  // Help text on the right side of the text
  helpMessage?: string | string[] | ((renderCallbackParams: RenderCallbackParams) => string | string[])
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number

  // render component
  component: ComponentType
  // Component parameters
  componentProps?:
  | ((opt: {
    schema: FormSchema
    tableAction: TableActionType
    formActionType: FormActionType
    formModel: Recordable
  }) => Recordable)
  | object
  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  prefix?: string | number | ((values: RenderCallbackParams) => string | number)

  suffix?: string | number | ((values: RenderCallbackParams) => string | number)

  prepend?: string | number | ((values: RenderCallbackParams) => string | number)

  append?: string | number | ((values: RenderCallbackParams) => string | number)

  empty?: string | number | ((values: RenderCallbackParams) => string | number)

  // Validation rules
  rules?: FormItemRule[]
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean

  // Reference formModelItem
  itemProps?: Partial<FormItem>

  // col configuration outside formModelItem
  colProps?: Partial<ColEx>

  // 默认值
  defaultValue?: any
  isAdvanced?: boolean

  // Matching details components
  span?: number

  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  // Render the content in the form-item tag
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string

  // Rendering col content requires outer wrapper form-item
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string

  renderComponentContent?: ((renderCallbackParams: RenderCallbackParams) => any) | VNode | VNode[] | string

  // Custom slot, in from-item
  slot?: string

  // Custom slot, similar to renderColContent
  colSlot?: string

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormItemRule[]
}
export interface HelpComponentProps {
  maxWidth: string
  // Whether to display the serial number
  showIndex: boolean
  // Text list
  text: any
  // colour
  color: string
  // font size
  fontSize: string
  icon: string
  absolute: boolean
  // Positioning
  position: any
}
