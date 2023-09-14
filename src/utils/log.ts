const projectName = import.meta.env.VITE_GLOB_APP_TITLE;
/**
 * 打印输出
 * @param message
 */
export function log(...args: any) {
  console.log(`[${projectName} log]:`, ...args);
}

/**
 * 信息输出
 * @param message
 */
export function info(...args: any) {
  console.info(`[${projectName} info]:`, ...args);
}

/**
 * 警告输出
 * @param message
 */
export function warn(...args: any) {
  console.warn(`[${projectName} warn]:`, ...args);
}

/**
 * 错误输出
 * @param message
 */
export function error(...args: any) {
  console.error(`[${projectName} error]:`, ...args);
  // throw new Error(args);
}

export const logError = error;
export const logWarn = warn;
export const logInfo = info;
export const logLog = log;
