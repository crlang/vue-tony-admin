import type { EleDescriptions, EleDescriptionsItem } from '@/components/ElementPlus'
import type { CollapseContainerOptions } from '@/components/CollapseContainer'

/**
 * 描述的数据项
 *
 * Description data item
 */
export interface DescItem extends EleDescriptionsItem {
  /**
   * 描述项的字段名称
   *
   * The description item field name
   */
  field: string
  /**
   * 是否自定义插槽
   *
   * Whether to customize the slot
   */
  isSlot?: boolean
  /**
   * 是否显示当前描述项
   *
   * Whether to display the current description item
   */
  show?: (...arg: any) => boolean
  /**
   * 自定义渲染描述项内容(VNode)
   *
   * Custom rendering description item content (VNode)
   */
  render?: (
    val: any,
    data: Recordable,
  ) => JSX.Element | undefined | Element | string | number
}

/**
 * 描述的 Props
 *
 * Description Props
 */
export interface DescProps extends EleDescriptions {
  /**
   * 描述的数据项集合
   *
   * Description configuration
   */
  schema: DescItem[]
  /**
   * 描述数据
   *
   * Description data
   */
  data: Recordable
  /**
   * 是否包含折叠组件
   *
   * Whether to include the collapse component
   */
  useCollapse?: boolean
  /**
   * 折叠组件配置
   *
   * Collapse component configuration
   */
  collapseOptions?: CollapseContainerOptions
}

/**
 * 描述实例
 *
 * Description instance
 */
export interface DescInstance {
  setDescProps(descProps: Partial<DescProps>): void
}

/**
 * 注册描述实例
 *
 * Register description instance
 */
export type Register = (descInstance: DescInstance) => void

/**
 * 使用描述实例回调
 *
 * Use the description instance callback
 */
export type UseDescReturnType = [Register, DescInstance]
