/**
 * 应用配置
 */
import type { ProjectConfig } from '#/config'

import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'
import { changeTheme, initBasicHeight, updateColorWeak, updateGrayMode, updateHeaderColor, updateSidebarColor } from '@/logics/theme'
import { useAppStore } from '@/store/modules/app'
import { Persistent } from '@/utils/cache/persistent'
import { deepMerge } from '@/utils'
import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env'

/**
 * 初始项目配置
 */
export function initAppConfigStore() {
  const appStore = useAppStore()

  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})

  const { colorWeak, grayMode, themeColor, headerSetting, menuSetting, multiTabsSetting } = projCfg

  changeTheme(themeColor)

  initBasicHeight(headerSetting.height, multiTabsSetting.height)

  if (grayMode) {
    updateGrayMode(grayMode)
  }
  if (colorWeak) {
    updateColorWeak(colorWeak)
  }

  appStore.setProjectConfig(projCfg)

  updateHeaderColor(headerSetting.bgColor)
  updateSidebarColor(menuSetting.bgColor)

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

/**
 * 随着版本的不断迭代，localStorage 中存储的缓存键将会越来越多。 此方法用于删除无用的缓存
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
