/**
 * 创建 Svg 雪碧图
 */
import type { PluginOption } from 'vite';

import { resolve } from 'node:path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { cwd } from 'node:process';

export function createSvgIconsConfig({ isBuild }: { isBuild: boolean }) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
  });
  return svgIconsPlugin as PluginOption;
}
