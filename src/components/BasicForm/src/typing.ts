import type { VNode, CSSProperties } from 'vue'
import type { TableActionMethods } from '@/components/BasicTable'
import type { EleButton, EleCol, EleForm, EleFormItem, EleFormItemRule, EleRow } from '@/components/ElementPlus'

/**
 * 表单项支持的组件
 *
 * Components supported by form items
 */
export type ComponentType =
  | 'ElDivider'
  | 'ElInput'
  | 'ElSelect'
  | 'ElDatePicker'
  | 'ElTimePicker'
  | 'ElRadio'
  | 'ElRadioGroup'
  | 'ElRadioButton'
  | 'ElCheckbox'
  | 'ElCheckboxGroup'
  | 'ElSwitch'
  | 'ElCascader'
  | 'ElRate'
  | 'ElSlider'
  | 'ElInputNumber'

/**
 * 展开/收起状态
 *
 * Expand/Collapse state
 */
export interface AdvanceState {
  /**
   * 展开/收起按钮的状态
   *
   * Expand/Collapse button state
   */
  isAdvanced: boolean
  /**
   * 是否隐藏展开/收起按钮
   *
   * Whether to hide the expand/collapse button
   */
  hideAdvanceBtn: boolean
  /**
   * 操作项的列的大小
   *
   * The size of the column for the action item
   */
  actionSpan: number
}

/**
 * 表单项Prop
 *
 * Form item prop
 */
export type FormItemProp = string | string[]

/**
 * 渲染函数的回调参数
 *
 * The callback parameter of the render function
 */
export interface RenderCallbackParams {
  schema: BasicFormSchema
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
  /**
   * 提交表单
   *
   * Submit form
   */
  submit: () => Promise<Recordable>
  /**
   * 重置表单
   *
   * Reset form
   */
  reset: () => void
  /**
   * 更新表单Props
   *
   * Set form props
   */
  setFormProps: (formProps: Partial<BasicProps>) => void
  /**
   * 更新表单内容
   *
   * Set form field values
   */
  setFieldsValue: (values: Recordable) => void
  /**
   * 获取表单内容
   *
   * Get form field values
   */
  getFieldsValue: () => Recordable
  /**
   * 更新表单架构数据
   *
   * Update form schema data
   */
  updateSchema: (schema: Partial<BasicFormSchema>) => boolean
  /**
   * 重置表单数据架构，需要传入重置的架构数据
   *
   * To reset the form data schema, the reset schema data needs to be passed in
   */
  resetSchema: (schemaData: BasicFormSchema[]) => void
  /**
   * 插入一个结构数据到表单架构中
   *
   * Insert a structure data into the form schema
   */
  appendSchemaByField: (schema: BasicFormSchema, beforeField?: string, first?: boolean) => void
  /**
   * 根据字段删除表单架构内容
   *
   * Delete form schema content based on fields
   */
  removeSchemaByField: (field: string | string[]) => void

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

/**
 * 注册实例方法
 *
 * Register instance function
 */
export type RegisterFn = (formInstance: FormActionMethods) => void

/**
 * 定义实例内容
 *
 * Define instance content
 */
export type UseFormReturnType = [RegisterFn, FormActionMethods]

export interface BasicProps extends EleForm {
  /**
   * 表单数据项架构的数组
   *
   * Array of form data item schemas
   */
  schemas?: BasicFormSchema[]
  /**
   * 表单的行的配置
   *
   * Row configuration for the form
   */
  rowProps?: Partial<EleRow>
  /**
   * 表单的行的样式
   *
   * Row style for the form
   */
  rowStyle?: CSSProperties
  /**
   * 表单的列的样式
   *
   * Column configuration for the form
   */
  colProps?: Partial<EleCol>
  /**
   * 合并到动态控件表单项中值
   *
   * Merge values into dynamic control form items
   */
  mergeDynamicData?: Recordable
  /**
   * 是否自动设置占位符
   *
   * Whether to automatically set placeholders
   */
  autoSetPlaceHolder?: boolean
  /**
   * 是否在input组件按回车时提交整个表单
   *
   * Whether to submit the entire form when the input component presses enter
   */
  autoSubmitOnEnter?: boolean
  /**
   * 是否在重置表单后提交表单
   *
   * Whether to submit the form after resetting the form
   */
  submitAfterReset?: boolean
  /**
   * 是否把验证信息附加到标签中
   *
   * Whether to append verification information to the label
   */
  rulesMessageJoinLabel?: boolean
  /**
   * 在支持展开/收起模式下，收起时显示多少行
   *
   * In support expand-collapse mode, how many rows to display after collapse
   */
  alwaysShowLines?: number
  /**
   * 是否显示操作按钮组
   *
   * Whether to display the action button group
   */
  showActionButtonGroup?: boolean
  /**
   * 操作按钮所在的列的配置
   *
   * Operation column configuration
   */
  actionColProps?: Partial<EleCol>
  /**
   * 是否显示提交按钮
   *
   * whether to show the submit button
   */
  showSubmitButton?: boolean
  /**
   * 提交按钮的配置项
   *
   * Submit button configuration
   */
  submitButtonOptions?: EleButton
  /**
   * 是否显示重置按钮
   *
   * Whether to show the reset button
   */
  showResetButton?: boolean
  /**
   * 重置按钮的配置项
   *
   * Reset button configuration
   */
  resetButtonOptions?: EleButton
  /**
   * 是否显示展开/收起按钮
   *
   * Whether to show collapse and expand buttons
   */
  showAdvancedButton?: boolean
  /**
   * 格式化表单项时间函数
   *
   * Format the form item time function
   */
  transformDateFn?: (date: number | string | object) => string
  /**
   * 自定义提交函数
   *
   * Custom submit function
   */
  submitFn?: () => Promise<void>
  /**
   * 自定义重置函数
   *
   * Custom reset function
   */
  resetFn?: () => void
  /**
   * 表格操作项，当和表格组合时存在
   *
   * Table action item, which exists when combined with a table
   */
  tableAction?: TableActionMethods
}

/**
 * 表单的数据架构
 *
 * Form data schema
 */
export interface BasicFormSchema {
  /**
   * 字段名称
   *
   * Field name
   */
  field: string
  /**
   * 标签名称
   *
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
  itemProps?: Partial<EleFormItem>
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
}
