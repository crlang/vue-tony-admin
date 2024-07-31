import type { ComputedRef, Ref } from 'vue'
import { toRaw, unref } from 'vue'
import type { BasicFormProps, BasicFormSchema, FormActionMethods } from '../typing'

import { error } from '@/utils/log'

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<BasicFormProps>
  getSchema: ComputedRef<BasicFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  formElRef: Ref<FormActionMethods | null>
  schemaRef: Ref<BasicFormSchema[]>
  validate: FormActionMethods['validate']
  resetFields: FormActionMethods['resetFields']
  validateField: FormActionMethods['validateField']
  handleFormValues: Fn
}

/**
 * 处理表单的事件、方法
 */
export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues,
  validate,
  validateField,
  resetFields,
}: UseFormActionContext) {
  /**
   * 更新表单内容
   */
  function setFieldsValue(values: Recordable): void {
    const fields = unref(getSchema)
      .map(item => item.field)
      .filter(Boolean)
    const validKeys: string[] = []
    Object.keys(values).forEach((key) => {
      const value = values[key]

      const hasKey = Reflect.has(values, key)

      if (hasKey && fields.includes(key)) {
        formModel[key] = value
        validKeys.push(key)
      }
    })
    // 同时验证字段值
    validateField(validKeys).catch(() => {})
  }

  /**
   * 获取表单内容
   */
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef)
    if (!formEl) {
      return {}
    }

    return handleFormValues(toRaw(unref(formModel)))
  }

  /**
   * 根据字段删除表单架构内容
   */
  function removeSchemaByField(fields: string | string[]): void {
    const schemaList: BasicFormSchema[] = [...unref(getSchema)]
    if (!fields || fields.length === 0) {
      return []
    }

    const fieldList: string[] = typeof fields === 'string' ? [fields] : fields
    for (let i = 0; i < fieldList.length; i++) {
      const fieldItem = fieldList[i]
      if (typeof fieldItem === 'string') {
        const index = schemaList.findIndex(schema => schema.field === fieldItem)
        if (index !== -1) {
          delete formModel[fieldItem]
          schemaList.splice(index, 1)
        }
      }
    }
    schemaRef.value = schemaList
    return schemaList
  }

  /**
   * 插入一个结构到表单架构中
   */
  function appendSchemaByField(schema: BasicFormSchema, beforeField?: string, first = false): void {
    const schemaList: BasicFormSchema[] = [...unref(getSchema)]
    const hasInList = schemaList.some(item => item.field === schema.field)

    if (hasInList) {
      return error('Operation failed, field already exists')
    }
    const index = schemaList.findIndex(item => item.field === beforeField)

    if (!beforeField || index === -1 || first) {
      if (first) {
        schemaList.unshift(schema)
      }
      else {
        schemaList.push(schema)
      }
      schemaRef.value = schemaList
      formModel[schema.field] = schema?.defaultValue
      return
    }

    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema)
    }

    schemaRef.value = schemaList
  }

  /**
   * 重置表单数据架构，需要传入重置的架构数据
   */
  function resetSchema(schemaData: BasicFormSchema[]): void {
    let schemaList: BasicFormSchema[] = []
    if (Array.isArray(schemaData) && schemaData.length) {
      schemaList = [...schemaData]
    }

    const hasField = schemaList.every(item => item.component === 'ElDivider' || (Reflect.has(item, 'field') && item.field))

    if (!hasField) {
      error('All form items must have a `field` field present')
      return
    }
    schemaRef.value = schemaList
  }

  /**
   * 更新表单架构数据
   */
  function updateSchema(schema: Partial<BasicFormSchema>): boolean {
    if (!schema.field) {
      error('The `field` of schema data must exist')
      return false
    }

    const schemaList: BasicFormSchema[] = [...unref(getSchema)]
    for (let i = 0; i < schemaList.length; i++) {
      if (schemaList[i].field === schema?.field) {
        schemaList[i] = { ...schemaList[i], ...schema }
        schemaRef.value = schemaList
        return true
      }
    }

    return false
  }

  /**
   * 提交表单
   */
  async function handleSubmit(e?: Event): Promise<Recordable> {
    if (e) {
      e.preventDefault()
    }
    const { submitFn } = unref(getProps)
    const formEl = unref(formElRef)
    if (!formEl) {
      return error('Operation failed, form instance does not exist!')
    }

    await validate()

    const values = getFieldsValue()
    if (typeof submitFn === 'function') {
      return submitFn(values)
    }

    emit('submit', values)
  }

  /**
   * 重置表单
   */
  function handleReset(): void {
    const { resetFn, submitAfterReset } = unref(getProps)
    const formEl = unref(formElRef)
    if (!formEl) {
      return error('Operation failed, form instance does not exist!')
    }

    Object.keys(formModel).forEach((key) => {
      formModel[key] = defaultValueRef.value[key]
    })

    resetFields()

    if (submitAfterReset) {
      handleSubmit()
    }

    if (typeof resetFn === 'function') {
      return resetFn()
    }

    emit('reset')
  }

  return {
    handleSubmit,
    handleReset,
    setFieldsValue,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
  }
}
