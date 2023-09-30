import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import { PermissionModeEnum, RouterTransitionEnum, SettingButtonPositionEnum } from '@/enums/appEnum';

import { CacheTypeEnum } from '@/enums/cacheEnum';

export interface MenuSetting {
  bgColor: string;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
}

export interface MultiTabsSetting {
  height: number;
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFullscreen: boolean;
}

export interface HeaderSetting {
  height: number;
  bgColor: string;
  fixed: boolean;
  show: boolean;
  // Turn on full screen
  showFullScreen: boolean;
  // Whether to show the lock screen
  useLockPage: boolean;
  // Show document button
  showDoc: boolean;
  // Show message center button
  showNotice: boolean;
}

export interface TransitionSetting {
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  // Whether to show the configuration button
  showSettingButton: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum;
  // Permission mode
  permissionMode: PermissionModeEnum;
  // Website gray mode, open for possible mourning dates
  grayMode: boolean;
  // Whether to turn on the color weak mode
  colorWeak: boolean;
  // Theme color
  themeColor: string;
  // Whether to display the logo
  showLogo: boolean;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Lock screen time
  lockTime: number;
  // Show breadcrumbs
  showBreadCrumb: boolean;
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;
  // System default cache time, in seconds
  cacheTime: number;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}
export interface GlobEnvConfig {
  /** App title */
  VITE_GLOB_APP_TITLE: string;
  /** App name */
  VITE_GLOB_APP_SHORT_NAME: string;
  /** Local development proxy port */
  VITE_PROXY_PORT: string;
  /** Automatically open proxy address */
  VITE_PROXY_AUTO_OPEN: string;
  /** Enable code size statistics */
  VITE_ENABLE_ANALYZE: string;
  /** Enable DOM node quick lookup */
  VITE_ENABLE_DEVTOOLS: string;
  /** Local development proxy api prefix */
  VITE_PROXY_API_URL: string;
  /** Api address */
  VITE_GLOB_API_URL: string;
  /** Api prefix */
  VITE_GLOB_API_URL_PREFIX: string;
  /** [optional] Local development proxy upload api prefix */
  VITE_PROXY_UPLOAD_URL: string;
  /** [optional] Upload api address */
  VITE_GLOB_UPLOAD_URL: string;
  /** Public path */
  VITE_PUBLIC_PAT: string;
  /** Delete console */
  VITE_DROP_CONSOLE: string;
  /**
   * Whether to enable gzip or brotli compression
   * Optional: gzip | brotli | none
   * If you need multiple forms, you can use `,` to separate
   */
  VITE_BUILD_COMPRESS: string;
  /** Enable code size statistics */
  VITE_ENABLE_ANALYZE: string;
  /** Enable DOM node quick lookup */
  VITE_ENABLE_DEVTOOLS: string;
  /** Is it compatible with older browsers */
  VITE_LEGACY: string;
}
