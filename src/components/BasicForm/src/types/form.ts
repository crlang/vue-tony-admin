import type { VNode } from 'vue'
import type { FormItem } from './formItem'
import type { ComponentType } from './index'
import type { TableActionMethods } from '@/components/BasicTable'
import type { CSSProperties } from 'vue'
import type { EleButton, EleCol, EleForm, EleFormItemRule, EleRow } from '@/components/ElementPlus'
import { FormItemProp } from 'element-plus'

export type FieldMapToTime = [string, [string, string], string?][]

/**
 * 渲染函数的回调参数
 *
 * The callback parameter of the render function
 */
export interface RenderCallbackParams {
  schema: BasicFormSchema
  values: Recordable
  model: Recordable
  field: string
}

/**
 * 实例支持的方法
 *
 * Instance Supported Methods
 */
export interface FormActionMethods {
  // Custom
  submit: () => Promise<Recordable>
  reset: () => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  getFieldsValue: () => Recordable
  updateSchema: (data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) => Promise<void>
  resetSchema: (data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) => Promise<void>
  setFormProps: (formProps: Partial<BasicFormSchema>) => void
  removeSchemaByField: (field: string | string[]) => Promise<void>
  appendSchemaByField: (
    schema: BasicFormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>

  // Element Plus
  /**
   * 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
   */
  validate: (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>
  /**
   * 验证具体的某个字段。
   */
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void
  ) => Promise<void>
  /**
   * 重置该表单项，将其值重置为初始值，并移除校验结果
   */
  resetFields: (props?: Arrayable<FormItemProp>) => void
  /**
   * 滚动到指定的字段
   */
  scrollToField: (prop: FormItemProp) => void
  /**
   * 清理某个字段的表单验证信息。
   */
  clearValidate: (props?: Arrayable<FormItemProp>) => void
}

export type RegisterFn = (formInstance: FormActionMethods) => void

export type UseFormReturnType = [RegisterFn, FormActionMethods]

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
  submitButtonOptions?: EleButton
  /**
   * Show reset button
   */
  showResetButton?: boolean
  /**
   * Reset button configuration
   */
  resetButtonOptions?: EleButton
  /**
   * 是否显示展开/收起按钮
   *
   * Whether to show collapse and expand buttons
   */
  showAdvancedButton?: boolean
}

export interface BasicProps extends EleForm, basicFormAction {
  /**
   * Array of form configuration items
   */
  schemas?: BasicFormSchema[]
  /**
   * 整个表单的行配置
   *
   * Row configuration for the entire form
   */
  rowProps?: Partial<EleRow>
  /**
   * 整个表单的行样式
   *
   * Row style for the entire form
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
   * Check whether the information is added to the label
   */
  rulesMessageJoinLabel?: boolean
  /**
   * Always show lines
   */
  alwaysShowLines?: number
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  transformDateFunc?: (date: any) => string
}

/**
 * 表单的数据架构
 *
 * Form data schema
 */
export interface BasicFormSchema {
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
   * Default Value
   */
  defaultValue?: any
  /**
   * Help text on the right side of the text
   */
  helpMessage?: string | string[] | ((rcp: RenderCallbackParams) => string | string[])
  /**
   * Label width
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
    schema: BasicFormSchema
    tableAction: TableActionMethods
    formActionType: FormActionMethods
    formModel: Recordable
  }) => Recordable)
  | object
  /**
   * Is it required
   */
  required?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * Validation rules
   */
  rules?: EleFormItemRule[]
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
   * Expanded contracted state
   */
  isAdvanced?: boolean
  /**
   * Dynamically determine whether the current component is displayed, in css
   */
  ifShow?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * Dynamically determine whether the current component is displayed, in js
   */
  show?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * Render the content in the form-item tag
   */
  render?: (rcp: RenderCallbackParams) => VNode | VNode[] | string
  /**
   * Rendering col content requires outer wrapper form-item
   */
  renderColContent?: (rcp: RenderCallbackParams) => VNode | VNode[] | string
  /**
   * Render the component content
   */
  renderComponentContent?: ((rcp: RenderCallbackParams) => any) | VNode | VNode[] | string
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
  dynamicDisabled?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * Dynamic validation rules based on conditions
   */
  dynamicRules?: (rcp: RenderCallbackParams) => EleFormItemRule[]
  /**
   * Input/Select component prefix
   */
  // prefix?: string | number | ((rcp: RenderCallbackParams) => string | number)
  /**
   * Input component suffix
   */
  // suffix?: string | number | ((rcp: RenderCallbackParams) => string | number)
  /**
   * Input component prepend
   */
  // prepend?: string | number | ((rcp: RenderCallbackParams) => string | number)
  /**
   * Input component append
   */
  // append?: string | number | ((rcp: RenderCallbackParams) => string | number)
  /**
   * Select component empty
   */
  // empty?: string | number | ((rcp: RenderCallbackParams) => string | number)
}
