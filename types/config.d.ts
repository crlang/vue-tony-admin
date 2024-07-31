import type { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '@/enums/menuEnum'
import type { PermissionModeEnum, RouterTransitionEnum, SettingButtonPositionEnum } from '@/enums/appEnum'

import type { CacheTypeEnum } from '@/enums/cacheEnum'

export interface MenuSetting {
  bgColor: string
  collapsed: boolean
  canDrag: boolean
  show: boolean
  hidden: boolean
  split: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  topMenuAlign: 'start' | 'center' | 'end'
  trigger: TriggerEnum
  accordion: boolean
  closeMixSidebarOnChange: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
}

export interface MultiTabsSetting {
  height: number
  cache: boolean
  show: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFullscreen: boolean
}

export interface HeaderSetting {
  height: number
  bgColor: string
  fixed: boolean
  show: boolean
  /** 是否显示全屏入口 */
  showFullScreen: boolean
  /** 是否显示锁屏入口 */
  useLockPage: boolean
  /** 是否显示文档入口 */
  showDoc: boolean
  /** 是否显示通知入口 */
  showNotice: boolean
}

export interface TransitionSetting {
  /** 路由基础切换动画 */
  basicTransition: RouterTransitionEnum
  /** 是否开启页面加载动画 */
  openPageLoading: boolean
  /** 是否开启页面加载进度条 */
  openNProgress: boolean
}

export interface ProjectConfig {
  /** 权限相关信息的存储位置 */
  permissionCacheType: CacheTypeEnum
  /** 是否显示配置按钮 */
  showSettingButton: boolean
  /** 是否显示主题切换按钮 */
  showDarkModeToggle: boolean
  /** 配置按钮的显示位置 */
  settingButtonPosition: SettingButtonPositionEnum
  /** 权限模式 */
  permissionMode: PermissionModeEnum
  /** 网站灰色模式，为可能的哀悼日期开放 */
  grayMode: boolean
  /** 是否打开弱色模式 */
  colorWeak: boolean
  /** 主题颜色 */
  themeColor: string
  /** 是否显示徽标 */
  showLogo: boolean
  /** 头部配置 */
  headerSetting: HeaderSetting
  /** 菜单配置 */
  menuSetting: MenuSetting
  /** 选项卡配置 */
  multiTabsSetting: MultiTabsSetting
  /** 动画配置 */
  transitionSetting: TransitionSetting
  /** 是否启用 keep-alive */
  openKeepAlive: boolean
  /** 锁屏时间 */
  lockTime: number
  /** 显示面包屑 */
  showBreadCrumb: boolean
  /** 显示面包屑图标 */
  showBreadCrumbIcon: boolean
  /** 使用错误处理程序插件 */
  useErrorHandle: boolean
  /** 是否打开返回顶部 */
  useOpenBackTop: boolean
  /** 是否可以嵌入 iframe 页面 */
  canEmbedIFramePage: boolean
  /** 是否删除未关闭的消息，并在切换界面时通知 */
  closeMessageOnSwitch: boolean
  /** 切换接口时是否取消已发送但未响应的http请求。 */
  removeAllHttpPending: boolean
  /** 系统默认缓存时间（秒） */
  cacheTime: number
}

export interface GlobConfig {
  /** 应用标题 */
  title: string
  /** 接口地址 */
  apiUrl: string
  /** 接口前缀 */
  urlPrefix?: string
  /** 项目短称 */
  shortName: string
}
export interface GlobEnvConfig {
  /** 应用标题 */
  VITE_GLOB_APP_TITLE: string
  /** 应用名称 */
  VITE_GLOB_APP_SHORT_NAME: string
  /** 本地开发代理端口 */
  VITE_PROXY_PORT: string
  /** 自动打开代理地址 */
  VITE_PROXY_AUTO_OPEN: string
  /** 启用代码大小统计 */
  VITE_ENABLE_ANALYZE: string
  /** 启用 DevTools */
  VITE_ENABLE_DEVTOOLS: string
  /** 本地开发代理地址 */
  VITE_PROXY_API_URL: string
  /** 接口地址 */
  VITE_GLOB_API_URL: string
  /** 接口前缀 */
  VITE_GLOB_API_URL_PREFIX: string
  /** 公共路径 */
  VITE_PUBLIC_PAT: string
  /** 打包删除console */
  VITE_DROP_CONSOLE: string
  /**
   * 构建压缩代码
   * 可选: gzip | brotli | none
   */
  VITE_BUILD_COMPRESS: string
  /** 启用代码旧浏览器兼容性 */
  VITE_LEGACY: string
}
