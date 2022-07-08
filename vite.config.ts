import type { UserConfig, ConfigEnv } from 'vite'

import pkg from './package.json'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      open: false,
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      minify: 'esbuild',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_debugger: true,
      //     // Used to delete console in production environment
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      // 合并所有CSS文件
      cssCodeSplit: false,
      chunkSizeWarningLimit: 500,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          compact: true,
          sourcemap: false,
          sourcemapExcludeSources: true,
          // JS 分类处理
          // chunkFileNames: 'assets/js/[name]-[hash].js',
          // entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
    define: {
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `
            @use "@/design/ele/setting.scss" as *;
            @use "@/design/var/config.scss" as *;
          `,
        },
      },
    },

    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: ['@iconify/iconify'],
      exclude: ['vue-demi'],
    },
  }
}
