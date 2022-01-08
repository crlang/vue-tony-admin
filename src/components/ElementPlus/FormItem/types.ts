/*
 * @Author: crlang
 * @Date: 2021-12-24 17:16:11
 * @Description: Ele types - FormItem
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-30 17:12:59
 */
import { ComponentSize } from '@/utils/types'
import { FormItemRule } from '../Form/types.rule'

export interface EleFormItem {
  label?: string | VueNode
  labelWidth?: string | number
  prop?: string
  required?: boolean
  rules?: Partial<FormItemRule | FormItemRule[]>
  error?: string | VueNode
  validateStatus?: string
  for?: string
  inlineMessage?: string | boolean
  showMessage?: boolean
  size?: Partial<ComponentSize>
}
