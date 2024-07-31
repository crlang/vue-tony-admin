/**
 * 用于配置全局错误处理功能，可以监控vue错误、脚本错误、静态资源错误和Promise错误
 *
 * settings/projectSetting.js -> useErrorHandle
 */

import type { App } from 'vue'
import type { ErrorLogInfo } from '#/store'

import { useErrorLogStoreWithOut } from '@/store/modules/errorLog'
import { ErrorTypeEnum } from '@/enums/exceptionEnum'
import projectSetting from '@/settings/projectSetting'

/**
 * 处理错误堆栈信息
 *
 * @param error Error
 */
function processStackMsg(error: Error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack
    .replace(/\n/g, '')
    .replace(/\bat\b/gi, '@')
    .split('@')
    .slice(0, 9)
    .map(v => v.replace(/^\s*|\s*$/g, ''))
    .join('~')
    .replace(/\?[^:]+/g, '')
  const msg = error.toString()
  if (!stack.includes(msg)) {
    stack = `${msg}@${stack}`
  }
  return stack
}

/**
 * 获取组件名称
 *
 * @param vm
 */
function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root',
    }
  }

  const options = vm.$options as any
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous',
    }
  }
  const name = options.name || options._componentTag
  return {
    name,
    path: options.__file,
  }
}

/**
 * 配置Vue错误处理功能
 *
 * @param err Error
 * @param vm
 * @param info string
 */
function vueErrorHandler(err: Error, vm: any, info: string) {
  const errorLogStore = useErrorLogStoreWithOut()
  const { name, path } = formatComponentName(vm)
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href,
  })
}

/**
 * 配置脚本错误处理功能
 *
 * @param event Event | string
 * @param source string
 * @param lineno number
 * @param colno number
 * @param error Error
 */
export function scriptErrorHandler(event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) {
  if (event === 'Script error.' && !source) {
    return false
  }
  const errorInfo: Partial<ErrorLogInfo> = {}
  colno = colno || (window.event && (window.event as any).errorCharacter) || 0
  errorInfo.message = event as string
  if (error?.stack) {
    errorInfo.stack = error.stack
  }
  else {
    errorInfo.stack = ''
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script'
  const errorLogStore = useErrorLogStoreWithOut()
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.SCRIPT,
    name,
    file: source as string,
    detail: `lineno${lineno}`,
    url: window.location.href,
    colno: colno || null,
    ...(errorInfo as Pick<ErrorLogInfo, 'message' | 'stack'>),
  })
  return true
}

/**
 * 配置Promise错误处理功能
 */
function registerPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.PROMISE,
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: window.location.href,
        stack: 'promise error!',
        message: event.reason,
      })
    },
    true,
  )
}

/**
 * 配置监控资源加载错误处理功能
 */
function registerResourceErrorHandler() {
  window.addEventListener(
    'error',
    (e: Event) => {
      const target = e.target ? e.target : (e.srcElement as any)
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.RESOURCE,
        name: 'Resource Error!',
        file: (e.target || ({} as any)).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type,
        }),
        url: window.location.href,
        stack: 'resource is not found',
        message: `${(e.target || ({} as any)).localName} is load error`,
      })
    },
    true,
  )
}

/**
 * 配置全局错误处理
 *
 * @param app App
 */
export function setupErrorHandle(app: App) {
  const { useErrorHandle } = projectSetting
  if (!useErrorHandle) {
    return
  }
  // Vue异常监控；
  app.config.errorHandler = vueErrorHandler

  // script错误
  window.onerror = scriptErrorHandler

  // promise异常
  registerPromiseErrorHandler()

  // 静态资源异常
  registerResourceErrorHandler()
}
