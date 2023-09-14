import type { ValidateFieldsError } from 'async-validator';
import { BasicFormProps, BasicFormSchema } from './form';

/**
 * 表单项Prop
 *
 * Form item prop
 */
export type FormItemProp = string | string[];

/**
 * 实例支持的方法
 *
 * Instance Supported Methods
 */
export interface FormActionMethods {
  // Custom
  /**
   * 提交表单
   *
   * Submit form
   */
  submit: () => Promise<Recordable>;
  /**
   * 重置表单
   *
   * Reset form
   */
  reset: () => void;
  /**
   * 更新表单Props
   *
   * Set form props
   */
  setFormProps: (formProps: Partial<BasicFormProps>) => void;
  /**
   * 更新表单内容
   *
   * Set form field values
   */
  setFieldsValue: (values: Recordable) => void;
  /**
   * 获取表单内容
   *
   * Get form field values
   */
  getFieldsValue: () => Recordable;
  /**
   * 更新表单架构数据
   *
   * Update form schema data
   */
  updateSchema: (schema: Partial<BasicFormSchema>) => boolean;
  /**
   * 重置表单数据架构，需要传入重置的架构数据
   *
   * To reset the form data schema, the reset schema data needs to be passed in
   */
  resetSchema: (schemaData: BasicFormSchema[]) => void;
  /**
   * 插入一个结构数据到表单架构中
   *
   * Insert a structure data into the form schema
   */
  appendSchemaByField: (schema: BasicFormSchema, beforeField?: string, first?: boolean) => void;
  /**
   * 根据字段删除表单架构内容
   *
   * Delete form schema content based on fields
   */
  removeSchemaByField: (field: string | string[]) => void;

  // Element Plus
  /**
   * 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
   */
  validate: (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>;
  /**
   * 验证具体的某个字段。
   */
  validateField: (props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>;
  /**
   * 重置该表单项，将其值重置为初始值，并移除校验结果
   */
  resetFields: (props?: Arrayable<FormItemProp>) => void;
  /**
   * 滚动到指定的字段
   */
  scrollToField: (prop: FormItemProp) => void;
  /**
   * 清理某个字段的表单验证信息。
   */
  clearValidate: (props?: Arrayable<FormItemProp>) => void;
}
