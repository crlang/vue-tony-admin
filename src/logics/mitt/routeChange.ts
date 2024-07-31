/**
 * 用于监视路由更改以更改菜单和选项卡的状态。 不需要监听路由，因为路由状态变化受页面渲染时间影响，会比较慢
 */

import type { RouteLocationNormalized } from 'vue-router'

import mitt from '@/utils/mitt'
import { getRawRoute } from '@/utils'

const emitter = mitt()

const key = Symbol('routeChange')

let lastChangeTab: RouteLocationNormalized

/**
 * 记录tab变更
 *
 * @param lastChangeRoute RouteLocationNormalized
 */
export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

/**
 * 监听tab变更内容
 *
 * @param callback (route: RouteLocationNormalized) => void
 * @param immediate boolean
 */
export function listenerRouteChange(callback: (route: RouteLocationNormalized) => void, immediate = true) {
  emitter.on(key, callback)
  if (immediate && lastChangeTab) {
    callback(lastChangeTab)
  }
}

/**
 * 移除tab变更内容
 */
export function removeTabChangeListener() {
  emitter.all.clear()
}
