import type { Router } from 'vue-router'
import type { Menu } from '../types'

import { configureDynamicParamsMenu } from '../helper/menuHelper'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStoreWithOut } from '@/store/modules/app'

import { usePermissionStoreWithOut } from '@/store/modules/permission'

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    // 筛选无名称路由
    if (!to.name) {
      next()
      return
    }

    // 菜单已经构建
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    let menus: Menu[] = []
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList
    }
    else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList
    }
    menus.forEach(item => configureDynamicParamsMenu(item, to.params))

    next()
  })
}

function getPermissionMode() {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}

function isBackMode() {
  return getPermissionMode() === PermissionModeEnum.BACK
}

function isRouteMappingMode() {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
