/**
 * 最小化时，侧边栏宽度
 *
 * When minimized, the sidebar width
 */
export const SIDE_BAR_MINI_WIDTH = 48;
/**
 * 缩小时，侧边栏宽度
 *
 * When zoomed out, the sidebar width
 */
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 64;

/**
 * 配置按钮位置
 *
 * Configure button position
 */
export enum SettingButtonPositionEnum {
  /**
   * 头部显示
   *
   * Show in the head
   */
  HEADER = 'header',
  /**
   * 固定在右侧
   *
   * Fixed on the right
   */
  FIXED = 'fixed',
}

/**
 * 权限控制模式
 *
 * Privilege Control Mode
 */
export enum PermissionModeEnum {
  /**
   * 角色控制
   *
   * Role control
   */
  ROLE = 'ROLE',
  /**
   * 后端控制
   *
   * Backend control
   */
  BACK = 'BACK',
  /**
   * 路由映射
   *
   * Route maping
   */
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

/**
 * 路由切换动画
 *
 * Route switching animation
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
