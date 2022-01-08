
import { RuleItem } from './async-validator'

export interface FormItemRule extends RuleItem {
  trigger?: 'blur' | 'change'
}

export type FormRulesMap<T extends string = string> = Partial<Record<T, FormItemRule | FormItemRule[]>>
