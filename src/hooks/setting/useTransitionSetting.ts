import { computed } from 'vue'
import type { TransitionSetting } from '#/config'

import { useAppStore } from '@/store/modules/app'

/**
 * 页面过渡配置项
 */
export function useTransitionSetting() {
  const appStore = useAppStore()
  /**
   * 获取是否开启页面进度条
   */
  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)

  /**
   * 获取是否开启页面加载动画
   */
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })

  /**
   * 获取路由切换过渡动画
   */
  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition)

  /**
   * 修改页面过渡配置项
   *
   * @param transitionSetting
   */
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting })
  }
  return {
    setTransitionSetting,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  }
}
