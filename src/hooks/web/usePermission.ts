import type { RouteRecordRaw } from 'vue-router'

import { intersection } from 'lodash-es'

import { useTabs } from './useTabs'
import projectSetting from '@/settings/projectSetting'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { resetRouter, router } from '@/router'
import { PermissionModeEnum } from '@/enums/appEnum'
import type { RoleEnum } from '@/enums/roleEnum'
import { isArray } from '@/utils/is'

/**
 * 处理用户路由权限
 */
export function usePermission() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const permissionStore = usePermissionStore()
  const { closeAll } = useTabs(router)

  /**
   * 修改权限控制模式
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode: projectSetting.permissionMode === PermissionModeEnum.BACK ? PermissionModeEnum.ROUTE_MAPPING : PermissionModeEnum.BACK,
    })
    location.reload()
  }

  /**
   * 重置并重新获取权限信息
   */
  async function resume() {
    const tabStore = useMultipleTabStore()
    tabStore.clearCacheTabs()
    resetRouter()
    const routes = await permissionStore.buildRoutesAction()
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    permissionStore.setLastBuildMenuTime()
    closeAll()
  }

  /**
   * 检测当前角色是否有权限
   *
   * @param value RoleEnum | RoleEnum[] | string | string[]
   * @param def boolean
   */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    if (!value) {
      return def
    }

    const permMode = projectSetting.permissionMode

    if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value as RoleEnum)
      }
      return (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0
    }

    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList as string[]
      if (!isArray(value)) {
        return allCodeList.includes(value)
      }
      return (intersection(value, allCodeList) as string[]).length > 0
    }
    return true
  }

  /**
   * 修改角色
   *
   * @param roles
   */
  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
      throw new Error('Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!')
    }

    if (!isArray(roles)) {
      roles = [roles]
    }
    userStore.setRoleList(roles)
    await resume()
  }

  /**
   * 刷新权限菜单数据
   */
  async function refreshMenu() {
    resume()
  }

  return { changeRole, hasPermission, togglePermissionMode, refreshMenu }
}
