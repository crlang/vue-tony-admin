import type { RouteLocationNormalized, Router } from 'vue-router'

import { unref } from 'vue'
import nProgress from 'nprogress'
import { ElMessage, ElNotification } from 'element-plus'

import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
import { createParamMenuGuard } from './paramMenuGuard'
import projectSetting from '@/settings/projectSetting'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { AxiosCanceler } from '@/utils/http/axios/axiosCancel'
import { warn } from '@/utils/log'
import { setRouteChange } from '@/logics/mitt/routeChange'

// 不要改变创建顺序
export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router) // 必须在 createPermissionGuard（菜单已构建）之后
  createStateGuard(router)
}

/**
 * 用于处理页面状态的钩子
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // 页面已加载，再次打开会更快，您不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // 通知路由更改
    setRouteChange(to)

    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

// 用于处理页面加载状态
function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // TODO 寻找更好的方式
      // 定时器模拟加载时间以防止闪烁过快，
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }
    return true
  })
}

/**
 * 当路由切换时，用于关闭当前页面以完成请求的界面
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting
  let axiosCanceler: Nullable<AxiosCanceler>
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    // 切换路由将删除之前的请求
    axiosCanceler?.removeAllPending()
    return true
  })
}

// 路由切换时返回顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return href.startsWith('#')
  }

  const body = document.body

  router.afterEach(async (to) => {
    if (isHash((to as RouteLocationNormalized & { href: string })?.href)) {
      body.scrollTo(0, 0)
    }
    return true
  })
}

/**
 * 用于在路由切换时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        ElMessage.closeAll()
        ElNotification.closeAll()
      }
    }
    catch (error) {
      warn(`message guard error:${error}`)
    }
    return true
  })
}

export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    if (unref(getOpenNProgress)) {
      nProgress.start()
    }
    return true
  })

  router.afterEach(async () => {
    if (unref(getOpenNProgress)) {
      nProgress.done()
    }

    return true
  })
}
