/**
 * 最小化时，侧边栏宽度
 */
export const SIDE_BAR_MINI_WIDTH = 48
/**
 * 缩小时，侧边栏宽度
 */
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 64

/**
 * 配置按钮位置
 */
export enum SettingButtonPositionEnum {
  /**
   * 头部显示
   */
  HEADER = 'header',
  /**
   * 固定在右侧
   */
  FIXED = 'fixed',
}

/**
 * 权限控制模式
 */
export enum PermissionModeEnum {
  /**
   * 角色控制
   */
  ROLE = 'ROLE',
  /**
   * 后端控制
   */
  BACK = 'BACK',
  /**
   * 路由映射
   */
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

/**
 * 路由切换动画
 */
export enum RouterTransitionEnum {
  NONE = 'none',
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
