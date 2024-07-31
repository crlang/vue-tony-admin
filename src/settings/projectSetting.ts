import { headerColor, primaryColor, sidebarColor } from './designSetting'
import type { ProjectConfig } from '#/config'

import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '@/enums/menuEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { PermissionModeEnum, RouterTransitionEnum, SettingButtonPositionEnum } from '@/enums/appEnum'

/**
 * 这是项目配置项，修改完后请清理缓存即可立即生效，如不会修改具体配置，请在项目可视化配置中心，拷贝自定义配置后的内容到下方 `do something` 位置粘贴
 */
const setting: ProjectConfig = {
  /**
   * 是否显示配置按钮
   */
  showSettingButton: true,

  /**
   * 系统默认缓存时间，以秒为单位，默认为7天
   */
  cacheTime: 60 * 60 * 24 * 7,

  /**
   * 是否显示暗黑主题切换按钮
   */
  showDarkModeToggle: true,

  /**
   * 配置按钮位置
   */
  settingButtonPosition: SettingButtonPositionEnum.HEADER,

  /**
   * 权限模式
   */
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  /**
   * 权限相关的缓存存储在 sessionStorage 或 localStorage
   */
  permissionCacheType: CacheTypeEnum.LOCAL,

  /**
   * 主题颜色
   */
  themeColor: primaryColor,

  /**
   * 切换为灰色模式
   */
  grayMode: false,

  /**
   * 切换为色弱模式
   */
  colorWeak: false,

  /**
   * 是否显示Logo
   */
  showLogo: true,

  /**
   * 是否开启KeepAlive缓存，建议在开发时关闭缓存
   */
  openKeepAlive: true,

  /**
   * 自动锁屏时间，0不锁屏。单位/分钟 默认 0
   */
  lockTime: 0,

  /**
   * 是否显示面包屑
   */
  showBreadCrumb: true,

  /**
   * 是否显示面包屑图标
   */
  showBreadCrumbIcon: false,

  /**
   * 是否使用错误处理程序插件
   */
  useErrorHandle: true,

  /**
   * 是否在打开页面时回到顶部
   */
  useOpenBackTop: true,

  /**
   * 是否可以嵌入 iframe 页面
   */
  canEmbedIFramePage: true,

  /**
   * 切换界面时是否删除未关闭的提示弹窗
   */
  closeMessageOnSwitch: true,

  /**
   * 切换接口时，是否取消已经发送但没有响应的http请求
   */
  removeAllHttpPending: false,

  /**
   * 头部内容区配置
   */
  headerSetting: {
    /**
     * 是否显示头部
     */
    show: true,
    /**
     * 头部高度
     */
    height: 60,
    /**
     * 头部背景颜色
     */
    bgColor: headerColor,
    /**
     * 是否固定在顶部
     */
    fixed: true,
    /**
     * 是否开启锁屏功能
     */
    useLockPage: true,
    /**
     * 是否显示全屏按钮
     */
    showFullScreen: true,
    /**
     * 是否显示文档按钮
     */
    showDoc: true,
    /**
     * 是否显示通知按钮
     */
    showNotice: true,
  },

  /**
   * 菜单内容区配置
   */
  menuSetting: {
    /**
     * 是否显示菜单栏
     */
    show: true,
    /**
     * 菜单宽度
     */
    menuWidth: 220,
    /**
     * 菜单背景颜色
     */
    bgColor: sidebarColor,
    /**
     * 是否默认收起菜单
     */
    collapsed: false,
    /**
     * 折叠菜单时是否显示菜单名称
     */
    collapsedShowTitle: false,
    /**
     * 是否允许拖动菜单的宽度
     */
    canDrag: true,
    /**
     * 是否只隐藏菜单，但 DOM 节点还在
     */
    hidden: false,
    /**
     * 菜单模式
     */
    mode: MenuModeEnum.INLINE,
    /**
     * 菜单显示模式
     */
    type: MenuTypeEnum.SIDEBAR,
    /**
     * 菜单折叠触发位置
     */
    trigger: TriggerEnum.HEADER,
    /**
     * 打开手风琴模式，即只显示一个菜单
     */
    accordion: true,
    /**
     * 是否在切换页面时关闭菜单
     */
    closeMixSidebarOnChange: false,
    /**
     * 顶部菜单 - 分割菜单，主菜单位于头部，二级菜单位于左侧
     */
    split: false,
    /**
     * 顶部菜单 - 菜单的位置
     */
    topMenuAlign: 'center',
    /**
     * 混合菜单 - 菜单展开方式，支持 click/hover
     */
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
  },

  /**
   * 标签栏内容区配置
   */
  multiTabsSetting: {
    /**
     * 是否显示标签
     */
    show: true,
    /**
     * 标签高度
     */
    height: 40,
    /**
     * 是否缓存当前使用的标签，刷新不消失
     */
    cache: false,
    /**
     * 是否显示快捷按钮
     */
    showQuick: true,
    /**
     * 是否显示刷新按钮
     */
    showRedo: true,
    /**
     * 是否显示全屏按钮
     */
    showFullscreen: true,
  },

  /**
   * 页面过渡配置
   */
  transitionSetting: {
    /**
     * 路由基础切换动画(为None时无动画效果)
     */
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    /**
     * 是否开启页面切换加载动画
     */
    openPageLoading: true,

    /**
     * 是否打开顶部进度条
     */
    openNProgress: true,
  },
}

export default {
  ...setting,
  // 请把复制的项目配置内容，粘贴到此处
  // ↓↓↓↓↓↓↓↓
  /* do something */
  // ↑↑↑↑↑↑↑↑
}
