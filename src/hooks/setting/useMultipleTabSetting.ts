import type { MultiTabsSetting } from '#/config';

import { computed } from 'vue';

import { useAppStore } from '@/store/modules/app';

/**
 * 选项卡配置项
 *
 * Multiple tab setting
 */
export function useMultipleTabSetting() {
  const appStore = useAppStore();

  /**
   * 获取是否显示选项卡
   */
  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  /**
   * 获取是否显示快捷列表
   */
  const getShowQuick = computed(() => appStore.getMultiTabsSetting.showQuick);

  /**
   * 获取是否显示刷新图标
   */
  const getShowRedo = computed(() => appStore.getMultiTabsSetting.showRedo);

  /**
   * 获取是否显示全屏图标
   */
  const getShowFullscreen = computed(() => appStore.getMultiTabsSetting.showFullscreen);

  /**
   * 修改选项卡配置项
   *
   * Set multiple tab configuration
   * @param multiTabsSetting
   */
  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting });
  }
  return {
    setMultipleTabSetting,

    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFullscreen,
  };
}
