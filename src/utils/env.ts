import type { GlobEnvConfig } from '#/config';

import { warn } from '@/utils/log';

import pkg from '../../package.json';

/**
 * Get the configuration file variable name
 * @param env
 */
export function getVariableName(title: string) {
  function strToHex(str: string) {
    const result: string[] = [];
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16);
      result.push(`000${hex}`.slice(-4));
    }
    return result.join('').toUpperCase();
  }

  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '');
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

export function getAppEnvConfig() {
  const appName = import.meta.env.VITE_GLOB_APP_SHORT_NAME;
  if (!/^[a-zA-Z\_]*$/.test(appName)) {
    warn('VITE_GLOB_APP_SHORT_NAME 变量只能是字母、下划线，请在环境变量中修改并重新运行');
  }

  const ENV_NAME = getVariableName(appName);

  // Get the global configuration (the configuration will be extracted independently when packaging)
  const ENV = (import.meta.env.DEV ? (import.meta.env as unknown as GlobEnvConfig) : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  return ENV;
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
