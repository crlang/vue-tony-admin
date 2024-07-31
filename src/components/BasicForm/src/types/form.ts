import type { CSSProperties, VNode } from 'vue'
import type { FormActionMethods } from './formItem'
import type { ComponentType } from './index'
import type { TableActionMethods } from '@/components/BasicTable'
import type { EleButton, EleCol, EleForm, EleFormItem, EleFormItemRule, EleRow } from '@/components/ElementPlus'

/**
 * 渲染函数的回调参数
 */
export interface RenderCallbackParams {
  schema: BasicFormSchema
  model: Recordable
  values: Recordable
  field: string
}

/**
 * 表单的数据架构
 */
export interface BasicFormSchema {
  /**
   * 字段名称
   */
  field: string
  /**
   * 标签名称
   */
  label: string
  /**
   * 标签右侧的副标签
   */
  subLabel?: string
  /**
   * 组件的值发生变化时触发的事件名称
   */
  changeEvent?: string
  /**
   * 绑定到 v-model 的变量名
   */
  valueField?: string
  /**
   * 默认值
   */
  defaultValue?: any
  /**
   * 标签右侧的帮助提示
   */
  helpMessage?: string | string[] | ((rcp: RenderCallbackParams) => string | string[])
  /**
   * 标签宽度
   */
  labelWidth?: string | number
  /**
   * 支持渲染的表单组件
   */
  component: ComponentType
  /**
   * 渲染的表单组件的参数
   */
  componentProps?: ((opt: { schema: BasicFormSchema, tableAction?: TableActionMethods, formAction: FormActionMethods, formModel: Recordable }) => Recordable) | object
  /**
   * 是否必填，当 rules 为空时生效
   */
  required?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * 表单组件验证规则
   */
  rules?: EleFormItemRule[]
  /**
   * 验证信息是否加入标签，具有高优先级
   */
  rulesMessageJoinLabel?: boolean
  /**
   * 表单项的Props
   */
  itemProps?: Partial<EleFormItem>
  /**
   * 表单项所在列的Props
   */
  colProps?: Partial<EleCol>
  /**
   * 展开/收起状态，当 showAdvancedButton 为 true 时生效
   */
  isAdvanced?: boolean
  /**
   * 动态判断当前组件是否显示，css 控制显示
   */
  ifShow?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * 动态判断当前组件是否显示，js 控制显示
   */
  show?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * 自定义渲染表单项
   */
  renderColContent?: (rcp: RenderCallbackParams) => VNode | VNode[] | string
  /**
   * 自定义渲染表单项插槽
   */
  colSlot?: string
  /**
   * 自定义渲染表单项组件
   */
  render?: (rcp: RenderCallbackParams) => VNode | VNode[] | string
  /**
   * 自定义渲染表单项组件插槽
   */
  slot?: string
  /**
   * 自定义渲染表单项组件内容
   */
  renderComponentContent?: ((rcp: RenderCallbackParams) => any) | VNode | VNode[] | string
  /**
   * 是否禁用当前表单项
   */
  dynamicDisabled?: boolean | ((rcp: RenderCallbackParams) => boolean)
  /**
   * 动态返回当前表单项的校验规则
   */
  dynamicRules?: (rcp: RenderCallbackParams) => EleFormItemRule[]
  /**
   * 表单项类名
   */
  class?: string
}

/**
 * 表单基础Props
 */
export interface BasicFormProps extends Partial<EleForm> {
  /**
   * 表单数据项架构的数组
   */
  schemas?: BasicFormSchema[]
  /**
   * 表单的行的配置
   */
  rowProps?: Partial<EleRow>
  /**
   * 表单的行的样式
   */
  rowStyle?: CSSProperties
  /**
   * 表单的列的样式
   */
  colProps?: Partial<EleCol>
  /**
   * 合并到动态控件表单项中值
   */
  mergeDynamicData?: Recordable
  /**
   * 是否自动设置占位符
   */
  autoSetPlaceHolder?: boolean
  /**
   * 是否在input组件按回车时提交整个表单
   */
  autoSubmitOnEnter?: boolean
  /**
   * 是否在重置表单后提交表单
   */
  submitAfterReset?: boolean
  /**
   * 是否把验证信息附加到标签中
   */
  rulesMessageJoinLabel?: boolean
  /**
   * 在支持展开/收起模式下，收起时显示多少行
   */
  alwaysShowLines?: number
  /**
   * 是否显示操作按钮组
   */
  showActionButtonGroup?: boolean
  /**
   * 操作按钮所在的列的配置
   */
  actionColProps?: Partial<EleCol>
  /**
   * 是否显示提交按钮
   */
  showSubmitButton?: boolean
  /**
   * 提交按钮的配置项
   */
  submitButtonOptions?: EleButton
  /**
   * 是否显示重置按钮
   */
  showResetButton?: boolean
  /**
   * 重置按钮的配置项
   */
  resetButtonOptions?: EleButton
  /**
   * 是否显示展开/收起按钮
   */
  showAdvancedButton?: boolean
  /**
   * 格式化表单项时间函数
   */
  transformDateFn?: (date: number | string | object) => string
  /**
   * 自定义提交函数
   */
  submitFn?: () => Promise<void>
  /**
   * 自定义重置函数
   */
  resetFn?: () => void
  /**
   * 表格操作项，当和表格组合时存在
   */
  tableAction?: TableActionMethods
}
