/*
 * @Author: crlang
 * @Date: 2021-12-24 17:15:21
 * @Description: Ele props - Form
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-25 20:12:21
 */
import type { FormRulesMap } from './types.rule'
import type { ComponentSize } from '@/utils/types'

export const EleFormProps = {
  model: Object,
  rules: Object as PropType<FormRulesMap>,
  labelPosition: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  scrollToError: Boolean,
}
