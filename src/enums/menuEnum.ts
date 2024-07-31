/**
 * 菜单显示模式
 */
export enum MenuTypeEnum {
  /**
   * 左侧菜单模式
   */
  SIDEBAR = 'sidebar',
  /**
   * 左侧菜单混合模式
   */
  MIX_SIDEBAR = 'mix-sidebar',
  /**
   * 顶部菜单混合模式
   */
  MIX = 'mix',
  /**
   * 顶部菜单模式
   */
  TOP_MENU = 'top-menu',
}

/**
 * 菜单折叠触发器位置
 */
export enum TriggerEnum {
  /**
   * 不显示
   */
  NONE = 'NONE',
  /**
   * 菜单底部
   */
  FOOTER = 'FOOTER',
  /**
   * 头部
   */
  HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

/**
 * 菜单模式
 */
export enum MenuModeEnum {
  /**
   * 垂直
   */
  VERTICAL = 'vertical',
  /**
   * 水平
   */
  HORIZONTAL = 'horizontal',
  /**
   * 垂直靠右
   */
  VERTICAL_RIGHT = 'vertical-right',
  /**
   * 默认
   */
  INLINE = 'inline',
}

/**
 * 菜单分割方式
 */
export enum MenuSplitTyeEnum {
  /**
   * 不分割
   */
  NONE,
  /**
   * 分割到顶部
   */
  TOP,
  /**
   * 分割到左侧
   */
  LEFT,
}

/**
 * 顶部菜单对齐方式
 */
export enum TopMenuAlignEnum {
  /**
   * 居中
   */
  CENTER = 'center',
  /**
   * 靠左
   */
  START = 'start',
  /**
   * 靠右
   */
  END = 'end',
}

/**
 * 混合菜单触发方式
 */
export enum MixSidebarTriggerEnum {
  /**
   * 悬浮
   */
  HOVER = 'hover',
  /**
   * 点击
   */
  CLICK = 'click',
}
