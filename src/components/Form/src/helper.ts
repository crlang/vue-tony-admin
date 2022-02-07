import type { ComponentType } from './types'
import { useI18n } from '@/hooks/web/useI18n'
import { dateUtil } from '@/utils/dateUtil'
import { isNumber, isObject } from '@/utils/is'
// import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'

const { t } = useI18n()

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('Complete')) {
    return t('common.inputText')
  }
  if (component.includes('Picker')) {
    return t('common.chooseText')
  }
  if (['Select', 'Cascader', 'Checkbox', 'Radio', 'Switch'].includes(component)) {
    return t('common.chooseText')
  }
  return ''
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker']

function genType() {
  return [...DATE_TYPE, 'ElDateRangePicker', 'RangePicker']
}

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

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr
  if (valueFormat) {
    attr.value = isObject(value) ? dateUtil(value).format(valueFormat) : value
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dateUtil(attr.value)
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val
  }
  return val
}

/**
 * 时间字段
 */
export const dateItemType = genType()
