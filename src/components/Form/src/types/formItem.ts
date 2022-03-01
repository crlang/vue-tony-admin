import type{ EleFormItem } from '@/components/ElementPlus'

type NamePath = string | number | (string | number)[];

export interface FormItem extends EleFormItem{
  /**
   * a key of model. In the setting of validate and resetFields method, the attribute is required
   */
  name?: NamePath

  /**
   * When to validate the value of children node
   */
  validateTrigger?: string | string[] | false
}
