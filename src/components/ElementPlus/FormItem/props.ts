/*
 * @Author: crlang
 * @Date: 2021-12-24 17:16:06
 * @Description: Ele props - FormItem
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-25 20:12:12
 */
import type { ComponentSize } from '@/utils/types'
import type { FormItemRule } from '../Form/types.rule'
import { isValidComponentSize } from '@/utils/validators'

export const EleFormItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  prop: String,
  required: {
    type: Boolean,
    default: undefined,
  },
  rules: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
  error: String,
  validateStatus: String,
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: '',
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
}
