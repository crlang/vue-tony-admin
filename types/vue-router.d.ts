import type { RoleEnum } from '@/enums/roleEnum'

export {}

declare module 'vue-router' {
  /**
   * 拓展路由菜单属性
   */
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    /**
     * 标题
     */
    title: string
    /**
     * 是否忽略权限，只在权限模式为Role的时候有效
     */
    ignoreAuth?: boolean
    /**
     * 角色信息，只在权限模式为Role的时候有效
     */
    roles?: RoleEnum[]
    /**
     * 是否不缓存
     */
    ignoreKeepAlive?: boolean
    /**
     * 是否固定在选项卡上
     */
    affix?: boolean
    /**
     * 选项卡上的图标
     */
    icon?: string
    /**
     * 如果为框架容器，请填写框架地址
     */
    frameSrc?: string
    /**
     * 当前页面过渡动画名称
     */
    transitionName?: string
    /**
     * 从不显示在面包屑中
     */
    hideBreadcrumb?: boolean
    /**
     * 隐藏子菜单
     */
    hideChildrenInMenu?: boolean
    /**
     * 携带参数
     */
    carryParam?: boolean
    /**
     * 内部用于标记单级菜单
     */
    single?: boolean
    /**
     * 当前活动菜单
     */
    currentActiveMenu?: string
    /**
     * 从不显示在选项卡中
     */
    hideTab?: boolean
    /**
     * 是否在菜单中隐藏
     */
    hideMenu?: boolean
    /**
     * 是否为链接
     */
    isLink?: boolean
    /**
     * 忽略路由。用于在ROUTE_MAPPING以及BACK权限模式下，生成对应的菜单而忽略路由。
     */
    ignoreRoute?: boolean
    /**
     * 是否在子级菜单的完整path中忽略本级path
     */
    hidePathForChildren?: boolean
  }
}
