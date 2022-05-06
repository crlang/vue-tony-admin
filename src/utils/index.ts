import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Plugin } from 'vue'
import { NOOP } from '@vue/shared'

import { unref } from 'vue'
import { isObject } from '@/utils/is'

export const noop = () => {}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({ meta: item.meta, name: item.name, path: item.path }))
      : undefined) as RouteRecordNormalized[],
  }
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as T & Plugin).install = (app) => {
    app.config.globalProperties[name] = fn
  }

  return fn as T & Plugin
}

export const withNoopInstall = <T>(component: T) => {
  (component as T & Plugin).install = NOOP

  return component as T & Plugin
}

export function buildUUID(): string {
  const hexList: string[] = []
  for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16)
  }

  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid.replace(/-/g, '')
}
