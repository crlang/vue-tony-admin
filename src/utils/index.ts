import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Ref } from 'vue'
import type { SFCInstallWithContext, SFCWithInstall } from '#/utils'

import { unref } from 'vue'
// eslint-disable-next-line vue/prefer-import-from-vue
import { NOOP } from '@vue/shared'

import { isObject } from '@/utils/is'

import { error } from './log'

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
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
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

/**
 * 注册组件
 *
 * Install component
 * @param main component
 * @param extra alias
 */
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  // eslint-disable-next-line prettier/prettier
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      // eslint-disable-next-line prettier/prettier
      (main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

/**
 * 注册函数式组件
 *
 * Register functional components
 * @param fn function
 * @param name alias
 * @returns
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
  // eslint-disable-next-line prettier/prettier
  (fn as SFCWithInstall<T>).install = (app: App) => {
    // eslint-disable-next-line prettier/prettier
    (fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

/**
 * 注册循环组件
 *
 * Register the loop component
 * @param component component
 */
export const withNoopInstall = <T>(component: T) => {
  // eslint-disable-next-line prettier/prettier
  (component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
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

/**
 * 获取使用示例
 *
 * Get use instance
 * @param instanceRef Ref<T>
 * @param name instance name
 */
export function getUseInstance<T>(instanceRef: Ref<T> | null, name: string): T | null {
  const instance = unref(instanceRef)
  if (!instance) {
    error(
      `The ${name} instance has not been obtained, please make sure the instance is rendered when performing the instance operation!`,
    )
  }
  return instance
}

/**
 * 检查是否为http链接，仅做简单判断
 *
 * Check if it is an http link - simple judgment
 * @param val
 */
export const isHttpUrl = (val: string) => {
  const reg = /^http(s)?:\/\/\w+\..*$/
  return reg.test(val)
}
