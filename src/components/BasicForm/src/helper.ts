import type { ComponentType } from './types'
// import { dateUtil } from '@/utils/dateUtil'
// import { isNumber, isObject } from '@/utils/is'
// import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'

/**
 * generate placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (['ElInput', 'ElInputNumber'].includes(component)) {
    return '请输入'
  }
  if (['ElSelect', 'ElSelectV2', 'ElCascader', 'ElDatePicker', 'ElTimePicker', 'ElTimeSelect'].includes(component)) {
    return '请选择'
  }
  return ''
}

const DATE_TYPE = ['ElDatePicker', 'ElTimePicker']

// export function setComponentRuleType(
//   rule: FormItemRule,
//   component: ComponentType,
//   valueFormat: string
// ) {
//   if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
//     rule.type = valueFormat ? 'string' : 'object'
//   } else if (['ElDateRangePicker', 'RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker', 'ElCheckboxGroup'].includes(component)) {
//     rule.type = 'array'
//   } else if (['InputNumber'].includes(component)) {
//     rule.type = 'number'
//   }
// }

// export function processDateValue(attr: Recordable, component: string) {
//   const { valueFormat, value } = attr
//   if (valueFormat) {
//     attr.value = isObject(value) ? dateUtil(value).format(valueFormat) : value
//   } else if (DATE_TYPE.includes(component) && value) {
//     attr.value = dateUtil(attr.value)
//   }
// }

export const dateItemType = DATE_TYPE
