import type { FormItemProp } from 'element-plus'
import type { ValidateFieldsError } from 'async-validator'

import type { Ref } from 'vue'

import type { FormActionMethods } from '../types/formItem'
import { getUseInstance } from '@/utils'

interface UseBasicFnContext {
  formElRef: Ref<FormActionMethods | null>
  emit: EmitType
}

/**
 * 方法使用请参考 Element Plus 文档
 */
export function useBasicFormFn({ formElRef, emit }: UseBasicFnContext) {
  function validate(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void): Promise<void> {
    return getUseInstance<FormActionMethods>(formElRef, 'form')?.validate(callback)
  }
  function validateField(props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void): Promise<void> {
    return getUseInstance<FormActionMethods>(formElRef, 'form')?.validateField(props, callback)
  }
  function resetFields(props?: Arrayable<FormItemProp>): void {
    return getUseInstance<FormActionMethods>(formElRef, 'form')?.resetFields(props)
  }
  function scrollToField(prop: FormItemProp): void {
    return getUseInstance<FormActionMethods>(formElRef, 'form')?.scrollToField(prop)
  }
  function clearValidate(props?: Arrayable<FormItemProp>): void {
    return getUseInstance<FormActionMethods>(formElRef, 'form')?.clearValidate(props)
  }

  const getBasicEmits = {
    onValidate: (prop: FormItemProp, isValid: boolean, message: string) => {
      emit('validate', prop, isValid, message)
    },
  }

  return {
    // Element plus Events
    getBasicEmits,
    // Element plus Methods
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
  }
}
