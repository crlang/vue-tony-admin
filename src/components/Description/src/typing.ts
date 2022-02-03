import type { CollapseContainerOptions } from '@/components/Container/index'
import type { EleDescriptions, EleDescriptionsItem } from '@/components/ElementPlus'
import { VNode } from 'vue'

export interface DescItem extends EleDescriptionsItem {
  field: string
  show?: (...arg: any) => boolean
  render?: (
    val: any,
    data: Recordable,
  ) => VNode | undefined | Element | string | number
}

export interface DescProps extends EleDescriptions {
  /**
   * Whether to include the collapse component
   */
  useCollapse?: boolean
  /**
   * item configuration
   */
  schema: DescItem[]
  /**
   * desc data
   */
  data: Recordable
  /**
   * collapse component configuration
   */
  collapseOptions?: CollapseContainerOptions
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescProps>): void
}

export type Register = (descInstance: DescInstance) => void

export type UseDescReturnType = [Register, DescInstance]
