import type { Ref, ComputedRef } from 'vue';

import { unref } from 'vue';
import { isObject } from '@vueuse/core';

import { set } from 'lodash-es';
import dayjs from 'dayjs';
import { BasicFormProps, BasicFormSchema } from '../types/form';
import { isFunction, isString } from '@/utils/is';
import { logError } from '@/utils/log';

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<BasicFormSchema[]>;
  getProps: ComputedRef<BasicFormProps>;
  formModel: Recordable;
}

/**
 * 处理表单的值
 *
 * Process the value of the form
 */
export function useFormValues({ defaultValueRef, getSchema, formModel, getProps }: UseFormValuesContext) {
  // check dayjs
  const isDayjsVal = (v) => v instanceof dayjs;

  /**
   * 处理表单项值
   *
   * Handling form item values
   * @param values
   */
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      const key = item[0];
      if (!key) continue;

      let value = item[1];
      // 跳过空数组或者函数
      // skip empty arrays or functions
      if ((Array.isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }

      // 移除空格
      // Remove spaces
      if (isString(value)) {
        value = value.trim();
      }

      // 尝试处理时间值
      // try processing time value
      const { transformDateFn } = unref(getProps);
      if (isFunction(transformDateFn)) {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            value[i] = isDayjsVal(value[i]) ? transformDateFn?.(value[i]) : value[i];
          }
        } else {
          value = isDayjsVal(value) ? transformDateFn?.(value) : value;
        }
      }

      set(res, key, value);
    }
    return res;
  }

  /**
   * 初始化默认值
   *
   * Initialize default values
   */
  async function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    const fieldArray = [];
    for (let i = 0; i < schemas.length; i++) {
      const item = schemas[i];
      const { defaultValue, component, field, componentProps } = item;
      obj[field] = defaultValue;

      if (fieldArray.includes(field)) {
        logError(`BasicForm：存在相同的 [${field}] 字段`);
      } else {
        fieldArray.push(field);
      }

      if (isFunction(componentProps?.itemsApi)) {
        if (!componentProps?.items || componentProps.items?.length === 0) {
          continue;
        }
        let params;

        if (isFunction(componentProps?.apiRequestFn)) {
          params = componentProps.apiRequestFn(item, schemas);
        }

        let res = (await componentProps.itemsApi(params)) || [];
        if (isFunction(componentProps?.apiResponseFn)) {
          res = componentProps.apiResponseFn(res, item);
        }

        item.componentProps.items = res;
        if (component === 'CustomTreeSelect') {
          item.componentProps.data = res;
        }
      }

      if (component === 'ElDivider') {
        continue;
      }

      // array
      const arrayComponent = ['ElCheckboxGroup'];
      if (arrayComponent.includes(component)) {
        if (!Array.isArray(defaultValue)) {
          item.defaultValue = [];
        }
      }

      // number
      const numberComponent = ['ElInputNumber'];
      if (numberComponent.includes(component)) {
        if (!defaultValue || defaultValue !== 0) {
          item.defaultValue = 0;
        }
      }

      // date - dayjs
      const dateComponent = ['CustomDatePicker', 'CustomTimePicker'];
      if (dateComponent.includes(component)) {
        const { transformDateFn } = unref(getProps);
        if (isFunction(transformDateFn)) {
          if (Array.isArray(defaultValue)) {
            for (let i = 0; i < defaultValue.length; i++) {
              item.defaultValue[i] = isDayjsVal(defaultValue[i]) ? transformDateFn?.(defaultValue[i]) : defaultValue[i];
            }
          } else {
            item.defaultValue = isDayjsVal(defaultValue) ? transformDateFn?.(defaultValue) : defaultValue;
          }
        }
      }

      formModel[item.field] = item.defaultValue;
    }

    defaultValueRef.value = obj;
  }

  return { handleFormValues, initDefault };
}
