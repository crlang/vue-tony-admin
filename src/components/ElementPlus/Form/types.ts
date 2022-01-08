/*
 * @Author: crlang
 * @Date: 2021-12-24 17:13:46
 * @Description: Ele types - Form
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-30 17:13:04
 */
import type { ComponentSize } from '@/utils/types'
import { FormRulesMap } from './types.rule'

export interface EleForm {
  model?: object
  rules?: Partial<FormRulesMap>
  labelPosition?: string
  labelWidth?: string| number
  labelSuffix?: string
  inline?: boolean,
  inlineMessage?: boolean,
  statusIcon?: boolean
  showMessage?: boolean
  size?: Partial<ComponentSize>
  disabled?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
}
