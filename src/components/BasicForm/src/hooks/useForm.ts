import type { BasicProps, FormActionMethods, UseFormReturnType, BasicFormSchema } from '../types/form'
import type { DynamicProps } from '#/utils'

import { ref, onUnmounted, unref, watch, WatchStopHandle } from 'vue'
import { isProdMode } from '@/utils/env'
import { getDynamicProps, getUseInstance } from '@/utils'
import { ValidateFieldsError } from 'async-validator'
import { FormItemProp } from 'element-plus'

type Props = Partial<DynamicProps<BasicProps>>

export function useForm(formProps?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionMethods>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)

  let stopWatch: WatchStopHandle

  function register(instance: FormActionMethods) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null
        loadedRef.value = null
      })
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return

    formRef.value = instance
    loadedRef.value = true

    stopWatch?.()

    stopWatch = watch(
      () => formProps,
      () => {
        formProps && instance.setFormProps(getDynamicProps(formProps))
      },
      {
        immediate: true,
        deep: true,
      }
    )
  }

  const methods: FormActionMethods = {
    // Element Plus
    validate: (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.validate(callback)
    },
    validateField: (
      props?: Arrayable<FormItemProp>,
      callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void
    ) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.validateField(props, callback)
    },
    resetFields: (props?: Arrayable<FormItemProp>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.resetFields(props)
    },
    scrollToField: (prop: FormItemProp) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.scrollToField(prop)
    },
    clearValidate: (props?: Arrayable<FormItemProp>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.clearValidate(props)
    },
    // Advanced
    setFormProps: (formProps: Partial<BasicProps>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.setFormProps(formProps)
    },

    updateSchema: (data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.updateSchema(data)
    },

    resetSchema: (data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.resetSchema(data)
    },

    removeSchemaByField: (field: string | string[]) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.removeSchemaByField(field)
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.getFieldsValue() as T
    },

    setFieldsValue: <T>(values: T) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.setFieldsValue<T>(values)
    },

    appendSchemaByField: (
      schema: BasicFormSchema,
      prefixField: string | undefined,
      first: boolean
    ) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.appendSchemaByField(schema, prefixField, first)
    },
  }

  return [register, methods]
}
