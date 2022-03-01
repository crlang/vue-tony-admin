import type { FormSchema, FormActionType, FormProps } from './types/form'
import type { CSSProperties } from 'vue'
import type { TableActionType } from '@/components/Table'
import type { EleButton, EleCol, EleRow } from '@/components/ElementPlus'

import { EleFormProps } from '@/components/ElementPlus'

export const basicFormActionProps = {
  /**
   * 是否显示操作按钮
   */
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  /**
   * 操作列配置
   */
  actionColOptions: {
    type: Object as PropType<Partial<EleCol>>,
    default: () => ({}),
  },
  /**
   * 是否显示确认按钮
   */
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认按钮配置
   */
  submitButtonOptions: {
    type: Object as PropType<Partial<EleButton>>,
    default: () => {},
  },
  /**
   * 是否显示重置按钮
   */
  showResetButton: {
    type: Boolean,
    default: true,
  },

  /**
   * 重置按钮配置
   */
  resetButtonOptions: {
    type: Object as PropType<Partial<EleButton>>,
    default: () => {},
  },
  /**
   * 是否显示展开收起按钮
   */
  showAdvancedButton: { type: Boolean },
}

export const basicProps = {
  ...EleFormProps,
  ...basicFormActionProps,
  /**
   * 表单配置项数组
   */
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  /**
   * row配置
   */
  rowProps: Object as PropType<Partial<EleRow>>,
  /**
   * row样式
   */
  rowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * col基础配置
   */
  colProps: {
    type: Object as PropType<Partial<EleCol>>,
  },
  /**
   * 用于合并到动态控件表单项中的函数值
   */
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 是否自动添加placeholder
   */
  autoSetPlaceHolder: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在input组件上单击回车时自动提交
   */
  autoSubmitOnEnter: { type: Boolean },
  /**
   * 是否重置时提交表单
   */
  submitOnReset: { type: Boolean },
  /**
   * 空行跨度
   */
  emptySpan: {
    type: [Number, Object] as PropType<number | Partial<EleCol>>,
    default: 0,
  },
  /**
   * 如果表单项有校验时，是否将字段中文名字拼接到自动生成的校验信息后方
   */
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true,
  },
  /**
   * 自动折叠指定的行数
   */
  autoAdvancedLine: {
    type: Number,
    default: 3,
  },
  /**
   * 不受折叠影响的行数
   */
  alwaysShowLines: {
    type: Number,
    default: 1,
  },
  /**
   * 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
   */
  autoFocusFirstItem: { type: Boolean },
  /**
   * 自定义重置函数
   */
  resetFunc: Function as PropType<() => Promise<void>>,
  /**
   * 自定义确认函数
   */
  submitFunc: Function as PropType<() => Promise<void>>,
  /**
   * 转化时间函数
   */
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date
    },
  },
  /**
   * 表格操作项
   */
  tableAction: {
    type: Object as PropType<TableActionType>,
  },
}

export const formActionProps = {
  ...basicFormActionProps,
  /**
   * 操作项间距跨度
   */
  actionSpan: {
    type: Number,
    default: 6,
  },
  /**
   * 展开收缩状态
   */
  isAdvanced: { type: Boolean },
  /**
   * 隐藏展开/收缩按钮
   */
  hideAdvanceBtn: { type: Boolean },
}

export const basicFormItemProps = {
  /**
   * 表单配置项内容
   */
  schema: {
    type: Object as PropType<FormSchema>,
    default: () => ({}),
  },
  /**
   * 继承表单props
   */
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({}),
  },
  /**
   * 表单项默认值
   */
  defaultValues: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  /**
   * 表单model
   */
  formModel: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  /**
   * 设置表单model
   */
  setFormModel: {
    type: Function as PropType<(key: string, value: any) => void>,
    default: null,
  },
  /**
   * 表单项所属的表格操作项
   */
  tableAction: {
    type: Object as PropType<TableActionType>,
  },
  /**
   * 表单操作项类型
   */
  formActionType: {
    type: Object as PropType<FormActionType>,
  },
}
