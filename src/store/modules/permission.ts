import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { useUserStore } from './user'
import { useAppStoreWithOut } from './app'
import type { AppRouteRecordRaw, Menu } from '@/router/types'

import { store } from '@/store'

import { flatMultiLevelRoutes, transformObjToRoute } from '@/router/helper/routeHelper'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import projectSetting from '@/settings/projectSetting'
import { PermissionModeEnum } from '@/enums/appEnum'
import { asyncRoutes } from '@/router/routes'
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { filter } from '@/utils/helper/treeHelper'
import { ApiUserMenuList } from '@/api/account'
import { ApiPermissionCode } from '@/api/permission'
import { useMessage } from '@/hooks/web/useMessage'
import { PageEnum } from '@/enums/pageEnum'

interface PermissionState {
  // 权限代码列表
  permCodeList: string[] | number[]
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
  // 触发菜单更新
  lastBuildMenuTime: number
  // 后台菜单列表
  backMenuList: Menu[]
  // 菜单列表
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 权限代码列表
    permCodeList: [],
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 后台菜单列表
    backMenuList: [],
    // 菜单列表
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(state): string[] | number[] {
      return state.permCodeList
    },

    getBackMenuList(state): Menu[] {
      return state.backMenuList
    },

    getFrontMenuList(state): Menu[] {
      return state.frontMenuList
    },

    getLastBuildMenuTime(state): number {
      return state.lastBuildMenuTime
    },

    getIsDynamicAddedRoute(state): boolean {
      return state.isDynamicAddedRoute
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      if (list?.length > 0) {
        this.setLastBuildMenuTime()
      }
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async changePermissionCode() {
      const codeList = await ApiPermissionCode()
      this.setPermCodeList(codeList)
    },

    // 构建路由
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore()
      const appStore = useAppStoreWithOut()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig

      // 路由过滤器 在 函数filter 作为回调传入遍历使用
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        // 抽出角色
        const { roles } = meta || {}
        if (!roles) {
          return true
        }
        // 进行角色权限判断
        return roleList.some(role => roles.includes(role))
      }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
        const { ignoreRoute } = meta || {}
        // arr.filter 返回 true 表示该元素通过测试
        return !ignoreRoute
      }

      /**
       * 根据设置的首页path，修正routes中的affix标记（固定首页）
       */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0)
          return
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME

        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath)
            parentPath = `${parentPath}/`
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              }
              else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            if (children && children.length > 0) {
              patcher(children, currentPath)
            }
          })
        }

        try {
          patcher(routes)
        }
        catch {
          // 已处理完毕跳出循环
        }
      }

      // 角色控制
      if (PermissionModeEnum.ROLE === permissionMode) {
        // 对非一级路由进行过滤
        routes = filter(asyncRoutes, routeFilter)
        // 对一级路由根据角色权限过滤
        routes = routes.filter(routeFilter)
        // 将多级路由转换为 2 级路由
        routes = flatMultiLevelRoutes(routes)
      }

      // 后端动态路由
      else if (PermissionModeEnum.BACK === permissionMode) {
        const { createMessage } = useMessage()

        createMessage.loading('菜单加载中...', 1000)

        // 模拟从后台获取权限码，
        // 这个功能可能只需要执行一次，实际项目可以自己放在合适的时间
        let routeList: AppRouteRecordRaw[] = []
        try {
          await this.changePermissionCode()
          routeList = (await ApiUserMenuList()) as AppRouteRecordRaw[]
        }
        catch (error) {
          console.error(error)
        }
        // 动态引入组件
        routeList = transformObjToRoute(routeList)
        //  后台路由到菜单结构
        const backMenuList = transformRouteToMenu(routeList)
        this.setBackMenuList(backMenuList)

        // 删除 meta.ignoreRoute 项
        routeList = filter(routeList, routeRemoveIgnoreFilter)
        routeList = routeList.filter(routeRemoveIgnoreFilter)

        routeList = flatMultiLevelRoutes(routeList)
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
      }
      // 前端路由映射，默认进入 ROUTE_MAPPING
      else {
        // 对非一级路由进行过滤
        routes = filter(asyncRoutes, routeFilter)
        // 对一级路由再次根据角色权限过滤
        routes = routes.filter(routeFilter)
        // 将路由转换成菜单
        const menuList = transformRouteToMenu(routes, true)
        // 移除掉 ignoreRoute: true 的路由 非一级路由
        routes = filter(routes, routeRemoveIgnoreFilter)
        // 移除掉 ignoreRoute: true 的路由 一级路由；
        routes = routes.filter(routeRemoveIgnoreFilter)
        // 对菜单进行排序
        menuList.sort((a, b) => {
          return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
        })

        // 设置菜单列表
        this.setFrontMenuList(menuList)

        // 将多级路由转换为 2 级路由
        routes = flatMultiLevelRoutes(routes)
      }

      routes.push(ERROR_LOG_ROUTE)
      patchHomeAffix(routes)
      return routes
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
