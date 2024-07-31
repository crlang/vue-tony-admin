import type { CSSProperties } from 'vue'
import type { Dayjs } from 'dayjs'
import type { BasicFormProps, BasicFormSchema, FormActionMethods } from './typing'
import type { TableActionMethods } from '@/components/BasicTable'
import type { EleButton, EleCol, EleRow } from '@/components/ElementPlus'

import { EleFormProps } from '@/components/ElementPlus'

/**
 * 表单操作项基础Props
 */
export const basicFormActionProps = {
  /**
   * 操作按钮所在的列的配置
   */
  actionColProps: {
    type: Object as PropType<Partial<EleCol>>,
  },
  /**
   * 是否显示提交按钮
   */
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 提交按钮的配置项
   */
  submitButtonOptions: {
    type: Object as PropType<EleButton>,
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
   * 重置按钮的配置项
   */
  resetButtonOptions: {
    type: Object as PropType<EleButton>,
    default: () => {},
  },
  /**
   * 是否显示展开/收起按钮
   */
  showAdvancedButton: Boolean,
  /**
   * 在支持展开/收起模式下，收起时显示多少行
   */
  alwaysShowLines: {
    type: Number,
    default: 1,
  },
}

/**
 * 表单自定义Props
 */
export const customProps = {
  ...basicFormActionProps,
  /**
   * 表单数据项架构的数组
   */
  schemas: {
    type: Array as PropType<BasicFormSchema[]>,
    default: () => [],
  },
  /**
   * 表单的行的配置
   */
  rowProps: {
    type: Object as PropType<Partial<EleRow>>,
  },
  /**
   * 表单的行的样式
   */
  rowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 表单的列的样式
   */
  colProps: {
    type: Object as PropType<Partial<EleCol>>,
  },
  /**
   * 合并到动态控件表单项中值
   */
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 是否自动设置占位符
   */
  autoSetPlaceHolder: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在input组件按回车时提交整个表单
   */
  autoSubmitOnEnter: Boolean,
  /**
   * 是否在重置表单后提交表单
   */
  submitAfterReset: Boolean,
  /**
   * 是否把验证信息附加到标签中
   */
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示操作按钮组
   */
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  /**
   * 格式化表单项时间函数
   */
  transformDateFn: {
    type: Function as PropType<Fn>,
    default: (date: Dayjs) => {
      return date?.format('YYYY-MM-DD HH:mm:ss')
    },
  },
  /**
   * 自定义提交函数
   */
  resetFn: Function as PropType<() => Promise<void>>,
  /**
   * 自定义重置函数
   */
  submitFn: Function as PropType<() => Promise<void>>,
  /**
   * 表格操作项，当和表格组合时存在
   */
  tableAction: {
    type: Object as PropType<TableActionMethods>,
  },
}

/**
 * 表单Props
 */
export const basicProps = {
  ...EleFormProps,
  ...customProps,
}

/**
 * 表单操作项Props
 */
export const formActionProps = {
  ...basicFormActionProps,
  /**
   * 操作项的列的大小
   */
  actionSpan: {
    type: Number,
    default: 6,
  },
  /**
   * 是否显示展开/收起按钮-通过计算判断
   */
  showAdvanced: {
    type: Boolean,
    default: true,
  },
  /**
   * 展开/收起按钮的状态
   */
  isAdvanced: Boolean,
}

/**
 * 表单项的基础Props
 */
export const basicFormItemProps = {
  /**
   * 表单项结构数据
   */
  schema: {
    type: Object as PropType<BasicFormSchema>,
    default: () => ({}),
  },
  /**
   * 表单Props
   */
  formProps: {
    type: Object as PropType<BasicFormProps>,
    default: () => ({}),
  },
  /**
   * 表单绑定的值
   */
  formModel: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  /**
   * 表单默认的值
   */
  defaultValues: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 更新表单数据，并尝试验证
   */
  setFormModel: {
    type: Function as PropType<(field: string, value: any) => void>,
    default: null,
  },
  /**
   * 表格操作项，当和表格组合时存在
   */
  tableAction: {
    type: Object as PropType<TableActionMethods>,
  },
  /**
   * 实例支持的方法
   */
  formAction: {
    type: Object as PropType<FormActionMethods>,
    default: null,
  },
}
