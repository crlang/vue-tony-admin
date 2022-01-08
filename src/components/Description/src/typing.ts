import type { CollapseContainerOptions } from '@/components/Container/index'
import { IDescriptionsInject } from 'element-plus/es/components/descriptions/src/descriptions.type'

export interface DescItem {
  label: string
  field: string
  width?: string | number
  minWidth?: string | number
  span?: number
  align?: string
  show?: boolean
  labelAlign?: string
  className?: string
  labelClassName?: string
}

export interface DescriptionProps extends IDescriptionsInject {
  // Whether to include the collapse component
  useCollapse?: boolean
  /**
   * item configuration
   * @type DescItem
   */
  schema: DescItem[]
  /**
   * 数据
   * @type object
   */
  data: Recordable
  /**
   * Built-in CollapseContainer component configuration
   * @type CollapseContainerOptions
   */
  collapseOptions?: CollapseContainerOptions
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]

export type DescSizes = 'medium' | 'small' | 'mini' | undefined
