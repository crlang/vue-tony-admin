/**
 * 创建 Svg 雪碧图
 */
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import type { PluginOption } from 'vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export function createSvgIconsConfig({ isBuild }: { isBuild: boolean }) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
  })
  return svgIconsPlugin as PluginOption
}
