import type { ValidateFieldsError } from 'async-validator'
import type { BasicFormProps, BasicFormSchema } from './form'

/**
 * 表单项Prop
 */
export type FormItemProp = string | string[]

/**
 * 实例支持的方法
 */
export interface FormActionMethods {
  // Custom
  /**
   * 提交表单
   */
  submit: () => Promise<Recordable>
  /**
   * 重置表单
   */
  reset: () => void
  /**
   * 更新表单Props
   */
  setFormProps: (formProps: Partial<BasicFormProps>) => void
  /**
   * 更新表单内容
   */
  setFieldsValue: (values: Recordable) => void
  /**
   * 获取表单内容
   */
  getFieldsValue: () => Recordable
  /**
   * 更新表单架构数据
   */
  updateSchema: (schema: Partial<BasicFormSchema>) => boolean
  /**
   * 重置表单数据架构，需要传入重置的架构数据
   */
  resetSchema: (schemaData: BasicFormSchema[]) => void
  /**
   * 插入一个结构数据到表单架构中
   */
  appendSchemaByField: (schema: BasicFormSchema, beforeField?: string, first?: boolean) => void
  /**
   * 根据字段删除表单架构内容
   */
  removeSchemaByField: (field: string | string[]) => void

  // Element Plus
  /**
   * 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
   */
  validate: (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>
  /**
   * 验证具体的某个字段。
   */
  validateField: (props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>
  /**
   * 重置该表单项，将其值重置为初始值，并移除校验结果
   */
  resetFields: (props?: Arrayable<FormItemProp>) => void
  /**
   * 滚动到指定的字段
   */
  scrollToField: (prop: FormItemProp) => void
  /**
   * 清理某个字段的表单验证信息。
   */
  clearValidate: (props?: Arrayable<FormItemProp>) => void
}
