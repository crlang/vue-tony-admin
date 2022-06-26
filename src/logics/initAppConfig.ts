/**
 * Application configuration
 */
import type { ProjectConfig } from '#/config'

import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'

import { updateHeaderBgColor, updateSidebarBgColor } from '@/logics/theme/updateBackground'
import { updateColorWeak } from '@/logics/theme/updateColorWeak'
import { updateGrayMode } from '@/logics/theme/updateGrayMode'
import { updateDarkTheme } from '@/logics/theme/dark'
import { changeTheme } from '@/logics/theme'
import { initBasicHeight } from '@/logics/theme/initBasicVariable'

import { useAppStore } from '@/store/modules/app'

import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env'

import { Persistent } from '@/utils/cache/persistent'
import { deepMerge } from '@/utils'
import { ThemeEnum } from '@/enums/appEnum'
import { primaryColor } from '@/settings/designSetting'

/**
 * 初始项目配置
 *
 * Initial project configuration
 */
export function initAppConfigStore() {
  const appStore = useAppStore()
  const darkMode = appStore.getDarkMode

  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})

  const { colorWeak, grayMode, themeColor, headerSetting, menuSetting } = projCfg

  updateDarkTheme(darkMode)

  if (themeColor && themeColor !== primaryColor) {
    changeTheme(themeColor)
  }

  initBasicHeight()

  grayMode && updateGrayMode(grayMode)
  colorWeak && updateColorWeak(colorWeak)

  appStore.setProjectConfig(projCfg)

  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor()
    updateSidebarBgColor()
  } else {
    headerSetting.bgColor && updateHeaderBgColor(headerSetting.bgColor)
    menuSetting.bgColor && updateSidebarBgColor(menuSetting.bgColor)
  }

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
