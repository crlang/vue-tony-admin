/**
 * 生成文件统计占比图
 */
import type { PluginOption } from 'vite';

import visualizer from 'rollup-plugin-visualizer';

export function createVisualizerConfig() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as PluginOption;
}
