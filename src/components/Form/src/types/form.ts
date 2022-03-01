import type { VNode } from 'vue'
import type { FormItem } from './formItem'
import type { ComponentType } from './index'
import type { TableActionType } from '@/components/Table/src/types/table'
import type { CSSProperties } from 'vue'
import type { EleButton, EleCol, EleForm, EleRow } from '@/components/ElementPlus'
import type { BasicHelpTyping } from '@/components/Basic'

export type FieldMapToTime = [string, [string, string], string?][]

type NamePath = string | number | (string | number)[];

export interface RenderCallbackParams {
  schema: FormSchema
  values: Recordable
  model: Recordable
  field: string
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

export interface basicFormAction {
  /**
   * Whether to show the operation button
   */
  showActionButtonGroup?: boolean
  /**
   * Operation column configuration
   */
  actionColOptions?: Partial<EleCol>
  /**
   * Show confirmation button
   */
  showSubmitButton?: boolean
  /**
   * Confirm button configuration
   */
  submitButtonOptions?: Partial<EleButton>
  /**
   * Show reset button
   */
  showResetButton?: boolean
  /**
   * Reset button configuration
   */
  resetButtonOptions?: Partial<EleButton>
  /**
   * Whether to show collapse and expand buttons
   */
  showAdvancedButton?: boolean
}

export interface FormProps extends EleForm, basicFormAction {
  /**
   * Array of form configuration items
   */
  schemas?: FormSchema[]
  /**
   * Row configuration for the entire form
   */
  rowProps?: Partial<EleRow>
  /**
   * General row style
   */
  rowStyle?: CSSProperties
  /**
   * General col configuration
   */
  colProps?: Partial<EleCol>
  /**
   * Function values used to merge into dynamic control form items
   */
  mergeDynamicData?: Recordable
  /**
   * Placeholder is set automatically
   */
  autoSetPlaceHolder?: boolean
  /**
   * Auto submit on press enter on input
   */
  autoSubmitOnEnter?: boolean
  /**
   * Submit form on reset
   */
  submitOnReset?: boolean
  /**
   * Blank line span
   */
  emptySpan?: number | Partial<EleCol>
  /**
   * Check whether the information is added to the label
   */
  rulesMessageJoinLabel?: boolean
  /**
   * Automatically collapse over the specified number of rows
   */
  autoAdvancedLine?: number
  /**
   * Always show lines
   */
  alwaysShowLines?: number
  /**
   * Whether to focus on the first input box, only works when the first form item is input
   */
  autoFocusFirstItem?: boolean
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  transformDateFunc?: (date: any) => string
}

export interface FormSchema {
  //
  /**
   * Field name
   */
  field: string
  /**
   * Label name
   */
  label: string
  /**
   * Auxiliary text
   */
  subLabel?: string
  /**
   * Event name triggered by internal value change
   * @default change
   */
  changeEvent?: string
  /**
   * Variable name bound to v-model
   * @default modelValue
   */
  valueField?: string
  /**
   * Help text on the right side of the text
   */
  helpMessage?: string | string[] | ((renderCallbackParams: RenderCallbackParams) => string | string[])
  /**
   * BaseHelp component props
   */
  helpComponentProps?: Partial<BasicHelpTyping>
  /**
   * Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
   */
  labelWidth?: string | number
  /**
   * Render component
   */
  component: ComponentType
  /**
   * Component parameters
   */
  componentProps?:
  | ((opt: {
    schema: FormSchema
    tableAction: TableActionType
    formActionType: FormActionType
    formModel: Recordable
  }) => Recordable)
  | object
  /**
   * Is it required
   */
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  /**
   * Input/Select component prefix
   */
  prefix?: string | number | ((values: RenderCallbackParams) => string | number)
  /**
   * Input component suffix
   */
  suffix?: string | number | ((values: RenderCallbackParams) => string | number)
  /**
   * Input component prepend
   */
  prepend?: string | number | ((values: RenderCallbackParams) => string | number)
  /**
   * Input component append
   */
  append?: string | number | ((values: RenderCallbackParams) => string | number)
  /**
   * Select component empty
   */
  empty?: string | number | ((values: RenderCallbackParams) => string | number)
  /**
   * Validation rules
   */
  rules?: FormItemRule[]
  /**
   * Check whether the information is added to the label
   */
  rulesMessageJoinLabel?: boolean
  /**
   * Reference formModelItem
   */
  itemProps?: Partial<FormItem>
  /**
   * Column configuration outside formModelItem
   */
  colProps?: Partial<EleCol>
  /**
   * Default Value
   */
  defaultValue?: any
  /**
   * Expanded contracted state
   */
  isAdvanced?: boolean
  /**
   * Matching details components
   */
  span?: number
  /**
   * Dynamically determine whether the current component is displayed, in css
   */
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  /**
   * Dynamically determine whether the current component is displayed, in js
   */
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  /**
   * Render the content in the form-item tag
   */
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string
  /**
   * Rendering col content requires outer wrapper form-item
   */
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string
  /**
   * Render the component content
   */
  renderComponentContent?: ((renderCallbackParams: RenderCallbackParams) => any) | VNode | VNode[] | string
  /**
   * Custom slot, in from-item
   */
  slot?: string
  /**
   * Custom slot, similar to renderColContent
   */
  colSlot?: string
  /**
   * Dynamically disable an item based on conditions
   */
  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  /**
   * Dynamic validation rules based on conditions
   */
  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormItemRule[]
}
