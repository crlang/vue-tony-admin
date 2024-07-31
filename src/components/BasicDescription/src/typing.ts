import type { EleDescriptions, EleDescriptionsItem } from '@/components/ElementPlus'
import type { CollapseContainerProps } from '@/components/CollapseContainer'

/**
 * 描述详情基础Props
 */
export interface BasicDescProps extends EleDescriptions {
  /**
   * 描述的数据项集合
   */
  schema: DescItem[]
  /**
   * 描述数据
   */
  data: Recordable
  /**
   * 是否包含折叠组件
   */
  useCollapse?: boolean
  /**
   * 折叠组件配置
   */
  collapseOptions?: CollapseContainerProps
}

/**
 * 描述的数据项
 */
export interface DescItem extends EleDescriptionsItem {
  label: string
  /**
   * 描述项的字段名称
   */
  field: string
  /**
   * 是否自定义插槽
   */
  isSlot?: boolean
  /**
   * 是否显示当前描述项
   */
  show?: (...arg: any) => boolean
  /**
   * 自定义渲染描述项内容(VNode)
   */
  render?: (val: any, data: Recordable) => JSX.Element | undefined | Element | string | number
}

/**
 * 实例支持的方法
 */
export interface DescActionMethods {
  setDescProps: (descProps: Partial<BasicDescProps>) => void
}

/**
 * 注册描述实例
 */
export type Register = (descInstance: DescActionMethods) => void

/**
 * 定义实例内容
 */
export type UseDescReturnType = [Register, DescActionMethods]
