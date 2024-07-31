import pkg from '../../package.json'
import type { GlobEnvConfig } from '#/config'

import { warn } from '@/utils/log'

/**
 * 获取配置文件变量名
 *
 * @param title
 */
export function getVariableName(title: string) {
  function strToHex(str: string) {
    const result: string[] = []
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16)
      result.push(`000${hex}`.slice(-4))
    }
    return result.join('').toUpperCase()
  }

  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

export function getAppEnvConfig() {
  const appName = import.meta.env.VITE_GLOB_APP_SHORT_NAME
  if (!/^[a-z_]*$/i.test(appName)) {
    warn('VITE_GLOB_APP_SHORT_NAME 变量只能是字母、下划线，请在环境变量中修改并重新运行')
  }

  const ENV_NAME = getVariableName(appName)

  const ENV = (import.meta.env.DEV ? (import.meta.env as unknown as GlobEnvConfig) : window[ENV_NAME as any]) as unknown as GlobEnvConfig

  return ENV
}

/**
 * 开发模式
 */
export const devMode = 'development'

/**
 * 生产模式
 */
export const prodMode = 'production'

/**
 * 获取环境变量
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * 是否开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * 是否生产
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
