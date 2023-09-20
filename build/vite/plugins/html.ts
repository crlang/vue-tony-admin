/**
 * 让 index.html 支持 ejs 模板语法
 */
import type { PluginOption } from 'vite';

import { createHtmlPlugin } from 'vite-plugin-html';

export function createHtmlConfig({ isBuild }: { isBuild: boolean }) {
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
  });
  return htmlPlugin;
}
