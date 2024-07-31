import type { App } from 'vue'

import authDirective from './permission'
/**
 * 注册全局指令
 *
 * @param app VueApp
 */
export function setupGlobDirectives(app: App) {
  // v-auth 指令
  app.directive('auth', authDirective)
}
