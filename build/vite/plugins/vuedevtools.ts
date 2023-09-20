/**
 * 用于 Vue 开发快速查找DOM节点
 */
import type { PluginOption } from 'vite';

import VueDevTools from 'vite-plugin-vue-devtools';

export function createVueDevToolsConfig() {
  return VueDevTools({}) as PluginOption;
}
