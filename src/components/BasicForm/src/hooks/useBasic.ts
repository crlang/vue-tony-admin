import type { FormItemProp } from 'element-plus'
import type { ValidateFieldsError } from 'async-validator'
import type { FormActionMethods } from '../types/form'

import { Ref, unref } from 'vue'

import { error } from '@/utils/log'

interface UseBasicFnContext {
  formElRef: Ref<FormActionMethods | null>
  emit: EmitType
}

/**
 * 方法使用请参考 Element Plus 文档
 *
 * Please refer to Element Plus documentation for method usage
 */
export function useBasicFormFn({
  formElRef,
  emit,
}: UseBasicFnContext) {
  function getForm() {
    const form = unref(formElRef)
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    return form as FormActionMethods
  }
  function validate(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void): Promise<void> {
    return getForm().validate(callback)
  }
  function validateField(
    props?: Arrayable<FormItemProp>,
    callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void
  ): Promise<void> {
    return getForm().validateField(props, callback)
  }
  function resetFields(props?: Arrayable<FormItemProp>): void {
    return getForm().resetFields(props)
  }
  function scrollToField(prop: FormItemProp): void {
    return getForm().scrollToField(prop)
  }
  function clearValidate(props?: Arrayable<FormItemProp>): void {
    return getForm().clearValidate(props)
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
