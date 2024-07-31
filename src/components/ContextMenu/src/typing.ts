import type { CSSProperties } from 'vue'

/**
 * 鼠标右击的轴数据
 */
export interface Axis {
  /**
   * x轴
   */
  x: number
  /**
   * x轴
   */
  y: number
}
/**
 * 右击菜单项的数据
 */
export interface ContextMenuItem {
  /**
   * 菜单项名称
   */
  label: string
  /**
   * 菜单项图标
   */
  icon?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 菜单项点击触发的函数
   */
  handler?: Fn
  /**
   * 菜单项下方是否带分割线
   */
  divider?: boolean
  /**
   * 菜单项的子项
   */
  children?: ContextMenuItem[]
}
/**
 * 右击菜单项的选项
 */
export interface CreateContextMenuOptions {
  /**
   * 右击的DOM的事件
   */
  event: MouseEvent
  /**
   * 右击菜单项的数据
   */
  items: ContextMenuItem[]
  /**
   * 是否显示图标
   */
  showIcon?: boolean
  /**
   * 右击菜单的样式
   */
  styles?: CSSProperties
  /**
   * 右击菜单的宽度
   */
  width?: number
}

/**
 * 右击菜单Props
 */
export interface ContextMenuProps extends CreateContextMenuOptions {
  /**
   * 右击菜单的轴偏移
   */
  axis?: Axis
}

/**
 * 菜单项内容Props
 */
export interface ItemContentProps {
  /**
   * 是否显示图标
   */
  showIcon: boolean | undefined
  /**
   * 右击菜单项的数据
   */
  item: ContextMenuItem
  /**
   * 操作处理
   */
  handler: Fn
}
