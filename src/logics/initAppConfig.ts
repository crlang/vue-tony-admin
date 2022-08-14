/**
 * Application configuration
 */
import type { ProjectConfig } from '#/config'

import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'

import { updateHeaderColor, updateSidebarColor, updateColorWeak, updateGrayMode, changeTheme, initBasicHeight } from '@/logics/theme'

import { useAppStore } from '@/store/modules/app'

import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env'

import { Persistent } from '@/utils/cache/persistent'
import { deepMerge } from '@/utils'
import { primaryColor } from '@/settings/designSetting'

/**
 * 初始项目配置
 *
 * Initial project configuration
 */
export function initAppConfigStore() {
  const appStore = useAppStore()

  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})

  const { colorWeak, grayMode, themeColor, headerSetting, menuSetting, multiTabsSetting } = projCfg
  if (themeColor && themeColor !== primaryColor) {
    changeTheme(themeColor)
  }

  initBasicHeight(headerSetting.height, multiTabsSetting.height)

  grayMode && updateGrayMode(grayMode)
  colorWeak && updateColorWeak(colorWeak)

  appStore.setProjectConfig(projCfg)

  updateHeaderColor(headerSetting.bgColor)
  updateSidebarColor(menuSetting.bgColor)

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()

  ;[localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
