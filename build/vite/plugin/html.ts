/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../../../package.json'
import { GLOB_CONFIG_FILE_NAME } from '../../constant'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
  }

  const htmlPlugin: Plugin[] = createHtmlPlugin({
    minify: isBuild,
    /**
     * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
     * @default src/main.ts
     */
    entry: 'src/main.ts',
    /**
     * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
     * @default index.html
     */
    template: 'index.html',

    /**
     * Data that needs to be injected into the index.html ejs template
     */
    inject: {
      data: {
      // Inject data into ejs template
        title: VITE_GLOB_APP_TITLE?.replace(/{space}/g, ' '),
        injectScript: ``,
      },
      tags: isBuild ? [
        {
          tag: 'script',
          attrs: {
            src: getAppConfigSrc(),
          },
        },
        {
          injectTo: 'body-prepend',
          tag: 'div',
          attrs: {
            id: 'tag',
          },
        }] : [],
    },
  })
  return htmlPlugin
}
