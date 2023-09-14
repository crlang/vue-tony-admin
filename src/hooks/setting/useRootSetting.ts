import type { ProjectConfig } from '#/config';

import { computed } from 'vue';

import { useAppStore } from '@/store/modules/app';

type RootSetting = Omit<ProjectConfig, 'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'>;

/**
 * 通用配置项
 *
 * Root setting
 */
export function useRootSetting() {
  const appStore = useAppStore();

  /**
   * 获取页面是否加载状态
   */
  const getPageLoading = computed(() => appStore.getPageLoading);

  /**
   * 获取是否开启了路由缓存
   */
  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  /**
   * 获取是否显示返回顶部
   */
  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop);

  /**
   * 获取是否显示设置按钮
   */
  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton);

  /**
   * 获取设置按钮入口位置
   */
  const getSettingButtonPosition = computed(() => appStore.getProjectConfig.settingButtonPosition);

  /**
   * 获取是否允许嵌入iframe
   */
  const getCanEmbedIFramePage = computed(() => appStore.getProjectConfig.canEmbedIFramePage);

  /**
   * 获取权限控制模式
   */
  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode);

  /**
   * 获取是否显示Logo
   */
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo);

  /**
   * 获取是否开启错误日志
   */
  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle);

  /**
   * 获取是否显示面包屑
   */
  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb);

  /**
   * 获取项目主题颜色
   */
  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor);

  /**
   * 获取是否显示面包屑路由图标
   */
  const getShowBreadCrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon);

  /**
   * 获取是否色弱模式
   */
  const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak);

  /**
   * 获取是否灰色模式
   */
  const getGrayMode = computed(() => appStore.getProjectConfig.grayMode);

  /**
   * 获取自动锁屏时间
   */
  const getLockTime = computed(() => appStore.getProjectConfig.lockTime);

  /**
   * 获取是否显示暗黑模式切换按钮
   */
  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle);

  /**
   * 修改通用配置项
   *
   * Set root configuration
   * @param setting
   */
  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  return {
    setRootSetting,

    getPageLoading,
    getOpenKeepAlive,
    getUseOpenBackTop,
    getShowSettingButton,
    getSettingButtonPosition,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getUseErrorHandle,
    getShowBreadCrumb,
    getThemeColor,
    getShowBreadCrumbIcon,
    getColorWeak,
    getGrayMode,
    getLockTime,
    getShowDarkModeToggle,
  };
}
