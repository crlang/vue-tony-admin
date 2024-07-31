import { defineStore } from 'pinia'
import type { HeaderSetting, MenuSetting, MultiTabsSetting, ProjectConfig, TransitionSetting } from '#/config'
import type { BeforeMiniState } from '#/store'

import { store } from '@/store'

import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'
import { resetRouter } from '@/router'
import { deepMerge } from '@/utils'

interface AppState {
  /**
   * 页面加载状态
   */
  pageLoading: boolean
  /**
   * 项目配置
   */
  projectConfig: ProjectConfig | null
  /**
   * 窗口缩小时，记录一些状态，在窗口还原时恢复这些状态
   */
  beforeMiniInfo: BeforeMiniState
}
let timeId: TimeoutHandle
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    },

    getBeforeMiniInfo(state): BeforeMiniState {
      return state.beforeMiniInfo
    },

    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig)
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },

    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },

    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    setMenuSetting(setting: Partial<MenuSetting>): void {
      this.projectConfig.menuSetting = deepMerge(this.projectConfig.menuSetting, setting)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    async resetAllState() {
      resetRouter()
      Persistent.clearAll()
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      }
      else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
