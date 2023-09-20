import { resolve } from 'node:path';
import dayjs from 'dayjs';
import { readPackageJSON } from 'pkg-types';
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite';

import { createPlugins } from './plugins';
import { createProxy } from './utils/proxy';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {};
}

function defineApplicationConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;

  return defineConfig(async({ command, mode }) => {
    const root = process.cwd();
    const isBuild = command === 'build';
    const {
      VITE_PUBLIC_PATH,
      VITE_BUILD_COMPRESS,
      VITE_DROP_CONSOLE,
      VITE_ENABLE_ANALYZE,
      VITE_PROXY_PORT,
      VITE_PROXY_API_URL,
      VITE_PROXY_UPLOAD_URL,
      VITE_PROXY_AUTO_OPEN,
      VITE_ENABLE_DEVTOOLS,
      VITE_GLOB_API_URL,
      VITE_GLOB_UPLOAD_URL,
    } = loadEnv(mode, root);
    const defineData = await createDefineData(root);
    const plugins = await createPlugins({
      isBuild,
      root,
      enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
      enableVueDevTools: VITE_ENABLE_DEVTOOLS === 'true',
      compress: VITE_BUILD_COMPRESS,
    });

    const pathResolve = (pathname: string) => resolve(root, '.', pathname);
    const applicationConfig: UserConfig = {
      base: VITE_PUBLIC_PATH,
      resolve: {
        alias: [
          {
            find: 'vue-i18n',
            replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
          },
          // @/xxx => src/xxx
          {
            find: /@\//,
            replacement: `${pathResolve('src')}/`,
          },
          // #/xxx => types/xxx
          {
            find: /#\//,
            replacement: `${pathResolve('types')}/`,
          },
        ],
      },
      define: defineData,
      esbuild: {
        drop: VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : undefined,
      },
      server: isBuild
        ? null
        : {
          host: true,
          port: VITE_PROXY_PORT,
          proxy: createProxy({ VITE_PROXY_API_URL, VITE_PROXY_UPLOAD_URL, VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL }),
          open: VITE_PROXY_AUTO_OPEN === 'true',
        },
      build: {
        target: 'es2015',
        cssTarget: 'chrome80',
        reportCompressedSize: false,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
          output: {
            manualChunks: {
              vue: ['vue', 'pinia', 'vue-router'],
              elementui: ['element-plus', '@element-plus/icons-vue'],
            },
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            charset: false,
            additionalData: `@use "@/design/ele/setting.scss" as *;@use "@/design/var/config.scss" as *;`,
          },
        },
      },
      plugins,
    };

    return mergeConfig(applicationConfig, overrides);
  });
}

async function createDefineData(root: string) {
  try {
    const pkgJson = await readPackageJSON(root);
    const { dependencies, devDependencies, name, version } = pkgJson;

    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    };
  } catch (error) {
    return {};
  }
}

export { defineApplicationConfig };
