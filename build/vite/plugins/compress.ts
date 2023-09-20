/**
 * 支持输出 gzip 等多种压缩方式
 */
import type { PluginOption } from 'vite';

import compressPlugin from 'vite-plugin-compression';

export function createCompressConfig({ compress, deleteOriginFile = false }: { compress: string; deleteOriginFile?: boolean }): PluginOption[] {
  const compressList = compress.split(',');

  const plugins: PluginOption[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      }),
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    );
  }
  return plugins;
}
