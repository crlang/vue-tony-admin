import type { ComputedRef, Ref } from 'vue'
import type { BasicProps, BasicFormSchema, FormActionMethods } from '../types/form'
import { unref, toRaw } from 'vue'
import { isArray, isFunction, isObject, isString } from '@/utils/is'
import { deepMerge } from '@/utils'
// import { dateUtil } from '@/utils/dateUtil'
import { cloneDeep, uniqBy } from 'lodash-es'
import { error } from '@/utils/log'

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<BasicProps>
  getSchema: ComputedRef<BasicFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  formElRef: Ref<FormActionMethods>
  schemaRef: Ref<BasicFormSchema[]>
  handleFormValues: Fn
}
export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues,
}: UseFormActionContext) {
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps)
    resetFunc && isFunction(resetFunc) && (await resetFunc())

    const formEl = unref(formElRef)
    if (!formEl) return

    Object.keys(formModel).forEach((key) => {
      formModel[key] = defaultValueRef.value[key]
    })
    clearValidate()
    emit('reset', toRaw(formModel))
    submitOnReset && handleSubmit()
  }

  /**
   * Set form value
   */
  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean)

    const validKeys: string[] = []
    Object.keys(values).forEach((key) => {
      const value = values[key]

      const hasKey = Reflect.has(values, key)

      // 0| '' is allow
      if (hasKey && fields.includes(key)) {
        // time type
        // if (itemIsDateType(key)) {
        //   if (Array.isArray(value)) {
        //     const arr: any[] = []
        //     for (const ele of value) {
        //       arr.push(ele ? dateUtil(ele) : null)
        //     }
        //     formModel[key] = arr
        //   } else {
        //     const { componentProps } = schema || {}
        //     let _props = componentProps as any
        //     if (typeof componentProps === 'function') {
        //       _props = _props({ formModel })
        //     }
        //     formModel[key] = value ? (_props?.valueFormat ? value : dateUtil(value)) : null
        //   }
        // } else {
        formModel[key] = value
        // }
        validKeys.push(key)
      }
    })
    validateField(validKeys).catch((_) => {})
  }
  /**
   * Delete based on field name
   */
  async function removeSchemaByField(fields: string | string[]): Promise<void> {
    const schemaList: BasicFormSchema[] = cloneDeep(unref(getSchema))
    if (!fields) {
      return
    }

    let fieldList: string[] = isString(fields) ? [fields] : fields
    if (isString(fields)) {
      fieldList = [fields]
    }
    for (const field of fieldList) {
      _removeSchemaByField(field, schemaList)
    }
    schemaRef.value = schemaList
  }

  /**
   * Delete based on field name
   */
  function _removeSchemaByField(field: string, schemaList: BasicFormSchema[]): void {
    if (isString(field)) {
      const index = schemaList.findIndex((schema) => schema.field === field)
      if (index !== -1) {
        delete formModel[field]
        schemaList.splice(index, 1)
      }
    }
  }

  /**
   * Insert after a certain field, if not insert the last
   */
  async function appendSchemaByField(schema: BasicFormSchema, prefixField?: string, first = false) {
    const schemaList: BasicFormSchema[] = cloneDeep(unref(getSchema))

    const index = schemaList.findIndex((schema) => schema.field === prefixField)
    const hasInList = schemaList.some((item) => item.field === prefixField || schema.field)

    if (!hasInList) return

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(schema)
      schemaRef.value = schemaList
      return
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema)
    }
    schemaRef.value = schemaList
  }

  async function resetSchema(data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) {
    let updateData: Partial<BasicFormSchema>[] = []
    if (isObject(data)) {
      updateData.push(data as BasicFormSchema)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) => item.component === 'ElDivider' || (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    schemaRef.value = updateData as BasicFormSchema[]
  }

  async function updateSchema(data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) {
    let updateData: Partial<BasicFormSchema>[] = []
    if (isObject(data)) {
      updateData.push(data as BasicFormSchema)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) => item.component === 'ElDivider' || (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    const schema: BasicFormSchema[] = []
    updateData.forEach((item) => {
      unref(getSchema).forEach((val) => {
        if (val.field === item.field) {
          const newSchema = deepMerge(val, item)
          schema.push(newSchema as BasicFormSchema)
        } else {
          schema.push(val)
        }
      })
    })
    schemaRef.value = uniqBy(schema, 'field')
  }

  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef)
    if (!formEl) return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  /**
   * Is it time
   */
  // function itemIsDateType(key: string) {
  //   return unref(getSchema).some((item) => {
  //     return item.field === key ? dateItemType.includes(item.component) : false
  //   })
  // }

  async function validateField(nameList?: string | string[]) {
    return nameList ? unref(formElRef)?.validateField(nameList) : validate()
  }

  async function validate() {
    return await unref(formElRef)?.validate()
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef)?.clearValidate(name)
  }

  async function scrollToField(name?: string) {
    await unref(formElRef)?.scrollToField(name)
  }

  /**
   * Form submission
   */
  async function handleSubmit(e?: Event): Promise<Recordable> {
    e && e.preventDefault()
    const { submitFunc } = unref(getProps)
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      return
    }
    const formEl = unref(formElRef)
    if (!formEl) return
    try {
      await validate()
      const res = handleFormValues(getFieldsValue())
      emit('submit', res)
    } catch (error) {
      console.error(JSON.stringify(error))
      throw new Error(error)
    }
  }

  return {
    handleSubmit,
    clearValidate,
    validate,
    validateField,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
    resetFields,
    setFieldsValue,
    scrollToField,
  }
}
