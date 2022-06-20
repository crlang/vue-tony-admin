import type { ComponentType } from './typing'

/**
 * 创建表单项占位符
 *
 * Create form item placeholders
 * @param component ComponentType
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (['ElInput', 'ElInputNumber'].includes(component)) {
    return '请输入'
  }
  if (['ElSelect', 'ElCascader', 'ElDatePicker', 'ElTimePicker', 'ElTimeSelect', 'ElSelectV2'].includes(component)) {
    return '请选择'
  }
  return ''
}
