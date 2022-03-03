import type{ EleFormItem } from '@/components/ElementPlus'

export interface FormItem extends EleFormItem{
  /**
   * a key of model. In the setting of validate and resetFields method, the attribute is required
   */
  name?: string | string[]

  /**
   * When to validate the value of children node
   */
  validateTrigger?: string | string[] | false
}
