import type { VNode, CSSProperties } from 'vue';
import { TableActionMethods } from '@/components/BasicTable';
import { ComponentType } from './index';
import { FormActionMethods } from './formItem';
import { EleButton, EleCol, EleForm, EleFormItem, EleFormItemRule, EleRow } from '@/components/ElementPlus';

/**
 * 渲染函数的回调参数
 *
 * The callback parameter of the render function
 */
export interface RenderCallbackParams {
  schema: BasicFormSchema;
  model: Recordable;
  values: Recordable;
  field: string;
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
  field: string;
  /**
   * 标签名称
   *
   * Label name
   */
  label: string;
  /**
   * 标签右侧的副标签
   *
   * Sublabel to the right of the label
   */
  subLabel?: string;
  /**
   * 组件的值发生变化时触发的事件名称
   *
   * The name of the event that fires when the value of the component changes
   */
  changeEvent?: string;
  /**
   * 绑定到 v-model 的变量名
   *
   * Variable name bound to v-model
   */
  valueField?: string;
  /**
   * 默认值
   *
   * Default Value
   */
  defaultValue?: any;
  /**
   * 标签右侧的帮助提示
   *
   * Help tip text to the right of the label
   */
  helpMessage?: string | string[] | ((rcp: RenderCallbackParams) => string | string[]);
  /**
   * 标签宽度
   *
   * Label width
   */
  labelWidth?: string | number;
  /**
   * 支持渲染的表单组件
   *
   * Form components that support rendering
   */
  component: ComponentType;
  /**
   * 渲染的表单组件的参数
   *
   * Parameters of the rendered form component
   */
  componentProps?: ((opt: { schema: BasicFormSchema; tableAction?: TableActionMethods; formAction: FormActionMethods; formModel: Recordable }) => Recordable) | object;
  /**
   * 是否必填，当 rules 为空时生效
   *
   * Required or not, it takes effect when rules is empty
   */
  required?: boolean | ((rcp: RenderCallbackParams) => boolean);
  /**
   * 表单组件验证规则
   *
   * Form Component Validation Rules
   */
  rules?: EleFormItemRule[];
  /**
   * 验证信息是否加入标签，具有高优先级
   *
   * Verify message is add to the label, with high priority
   */
  rulesMessageJoinLabel?: boolean;
  /**
   * 表单项的Props
   *
   * Form item props
   */
  itemProps?: Partial<EleFormItem>;
  /**
   * 表单项所在列的Props
   *
   * Props of the column where the form item is located
   */
  colProps?: Partial<EleCol>;
  /**
   * 展开/收起状态，当 showAdvancedButton 为 true 时生效
   *
   * Expand/collapse state, the premise is that showAdvancedButton is true
   */
  isAdvanced?: boolean;
  /**
   * 动态判断当前组件是否显示，css 控制显示
   *
   * Dynamically determine whether the current component is displayed, in css
   */
  ifShow?: boolean | ((rcp: RenderCallbackParams) => boolean);
  /**
   * 动态判断当前组件是否显示，js 控制显示
   *
   * Dynamically determine whether the current component is displayed, in js
   */
  show?: boolean | ((rcp: RenderCallbackParams) => boolean);
  /**
   * 自定义渲染表单项
   *
   * Custom rendered form items
   */
  renderColContent?: (rcp: RenderCallbackParams) => VNode | VNode[] | string;
  /**
   * 自定义渲染表单项插槽
   *
   * Custom rendered form item slot
   */
  colSlot?: string;
  /**
   * 自定义渲染表单项组件
   *
   * Custom components that render form items
   */
  render?: (rcp: RenderCallbackParams) => VNode | VNode[] | string;
  /**
   * 自定义渲染表单项组件插槽
   *
   * Custom rendered form item component slot
   */
  slot?: string;
  /**
   * 自定义渲染表单项组件内容
   *
   * Custom rendering form item component content
   */
  renderComponentContent?: ((rcp: RenderCallbackParams) => any) | VNode | VNode[] | string;
  /**
   * 是否禁用当前表单项
   *
   * Whether to disable the current form item
   */
  dynamicDisabled?: boolean | ((rcp: RenderCallbackParams) => boolean);
  /**
   * 动态返回当前表单项的校验规则
   *
   * Dynamically returns the validation rules for the current form item
   */
  dynamicRules?: (rcp: RenderCallbackParams) => EleFormItemRule[];
}

/**
 * 表单基础Props
 *
 * Form Basic Props
 */
export interface BasicFormProps extends Partial<EleForm> {
  /**
   * 表单数据项架构的数组
   *
   * Array of form data item schemas
   */
  schemas?: BasicFormSchema[];
  /**
   * 表单的行的配置
   *
   * Row configuration for the form
   */
  rowProps?: Partial<EleRow>;
  /**
   * 表单的行的样式
   *
   * Row style for the form
   */
  rowStyle?: CSSProperties;
  /**
   * 表单的列的样式
   *
   * Column configuration for the form
   */
  colProps?: Partial<EleCol>;
  /**
   * 合并到动态控件表单项中值
   *
   * Merge values into dynamic control form items
   */
  mergeDynamicData?: Recordable;
  /**
   * 是否自动设置占位符
   *
   * Whether to automatically set placeholders
   */
  autoSetPlaceHolder?: boolean;
  /**
   * 是否在input组件按回车时提交整个表单
   *
   * Whether to submit the entire form when the input component presses enter
   */
  autoSubmitOnEnter?: boolean;
  /**
   * 是否在重置表单后提交表单
   *
   * Whether to submit the form after resetting the form
   */
  submitAfterReset?: boolean;
  /**
   * 是否把验证信息附加到标签中
   *
   * Whether to append verification information to the label
   */
  rulesMessageJoinLabel?: boolean;
  /**
   * 在支持展开/收起模式下，收起时显示多少行
   *
   * In support expand-collapse mode, how many rows to display after collapse
   */
  alwaysShowLines?: number;
  /**
   * 是否显示操作按钮组
   *
   * Whether to display the action button group
   */
  showActionButtonGroup?: boolean;
  /**
   * 操作按钮所在的列的配置
   *
   * Operation column configuration
   */
  actionColProps?: Partial<EleCol>;
  /**
   * 是否显示提交按钮
   *
   * whether to show the submit button
   */
  showSubmitButton?: boolean;
  /**
   * 提交按钮的配置项
   *
   * Submit button configuration
   */
  submitButtonOptions?: EleButton;
  /**
   * 是否显示重置按钮
   *
   * Whether to show the reset button
   */
  showResetButton?: boolean;
  /**
   * 重置按钮的配置项
   *
   * Reset button configuration
   */
  resetButtonOptions?: EleButton;
  /**
   * 是否显示展开/收起按钮
   *
   * Whether to show collapse and expand buttons
   */
  showAdvancedButton?: boolean;
  /**
   * 格式化表单项时间函数
   *
   * Format the form item time function
   */
  transformDateFn?: (date: number | string | object) => string;
  /**
   * 自定义提交函数
   *
   * Custom submit function
   */
  submitFn?: () => Promise<void>;
  /**
   * 自定义重置函数
   *
   * Custom reset function
   */
  resetFn?: () => void;
  /**
   * 表格操作项，当和表格组合时存在
   *
   * Table action item, which exists when combined with a table
   */
  tableAction?: TableActionMethods;
}
