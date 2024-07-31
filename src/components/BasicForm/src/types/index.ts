import type { FormActionMethods } from './formItem'

/**
 * 表单项支持的组件
 */
export type ComponentType =
  | 'ElInput'
  | 'ElSwitch'
  | 'ElRate'
  | 'ElSlider'
  | 'ElInputNumber'
  | 'CustomCascader'
  | 'CustomCheckbox'
  | 'CustomDatePicker'
  | 'CustomColorPicker'
  | 'CustomDivider'
  | 'CustomRadio'
  | 'CustomSelect'
  | 'CustomTimePicker'
  | 'CustomTree'
  | 'CustomAutocomplete'
  | 'CustomTreeSelect'

/**
 * 注册实例方法
 */
export type RegisterFn = (formInstance: FormActionMethods) => void

/**
 * 定义实例内容
 */
export type UseFormReturnType = [RegisterFn, FormActionMethods]
