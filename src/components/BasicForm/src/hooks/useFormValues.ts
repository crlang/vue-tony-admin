import type { Ref, ComputedRef } from 'vue'
import type { BasicProps, BasicFormSchema } from '../types/form'

import { unref } from 'vue'
import { set } from 'lodash-es'
import dayjs from 'dayjs'

interface UseFormValuesContext {
  defaultValueRef: Ref<any>
  getSchema: ComputedRef<BasicFormSchema[]>
  getProps: ComputedRef<BasicProps>
  formModel: Recordable
}

/**
 * 处理表单的值
 *
 * Process the value of the form
 */
export function useFormValues({
  defaultValueRef,
  getSchema,
  formModel,
  getProps,
}: UseFormValuesContext) {
  /**
   * 处理表单项值
   *
   * Handling form item values
   * @param values
   */
  function handleFormValues(values: Recordable) {
    if (values === null || typeof values !== 'object') {
      return {}
    }
    const res: Recordable = {}
    for (const item of Object.entries(values)) {
      const key = item[0]
      if (!key) continue

      let value = item[1]
      // 跳过空数组或者函数
      // skip empty arrays or functions
      if ((Array.isArray(value) && value.length === 0) || typeof value === 'function') {
        continue
      }

      // 尝试处理时间值
      // try processing time value
      const { transformDateFunc } = unref(getProps)
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] instanceof dayjs) {
            value[i] = transformDateFunc?.(item)
          }
        }
      } else {
        if (value instanceof dayjs) {
          value = transformDateFunc?.(value)
        }
      }

      // 移除空格
      // Remove spaces
      if (typeof value === 'string') {
        value = value.trim()
      }
      set(res, key, value)
    }
    return res
  }

  /**
   * 初始化默认值
   *
   * Initialize default values
   */
  function initDefault() {
    const schemas = unref(getSchema)
    const obj: Recordable = {}
    schemas.forEach((item) => {
      const { defaultValue, component } = item
      if (!defaultValue || defaultValue === 0) {
        obj[item.field] = defaultValue
        formModel[item.field] = defaultValue

        // 如果是日期组件，尝试格式化默认内容
        // If it is a date component, try to format the defaultValue
        const dateComponent = ['ElDatePicker', 'ElTimePicker']
        if (defaultValue && dateComponent.includes(component)) {
          if (Array.isArray(defaultValue)) {
            schema.defaultValue = defaultValue.map(k => dayjs(k))
          } else {
            schema.defaultValue = dayjs(defaultValue)
          }
        }
      }
    })

    defaultValueRef.value = obj
  }

  return { handleFormValues, initDefault }
}
