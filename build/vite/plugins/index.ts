import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';

import { createAppConfig } from './appConfig';
import { createCompressConfig } from './compress';
import { createHtmlConfig } from './html';
import { createSvgIconsConfig } from './svgSprite';
import { createVisualizerConfig } from './visualizer';
import { createVueDevToolsConfig } from './vuedevtools';

async function createPlugins({
  isBuild,
  root,
  compress,
  enableAnalyze,
  enableVueDevTools,
}: {
  isBuild: boolean;
  root: string;
  compress: string;
  enableAnalyze?: boolean;
  enableVueDevTools?: boolean;
}) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx(), DefineOptions()];

  const appConfigPlugin = await createAppConfig({ root, isBuild });
  vitePlugins.push(appConfigPlugin);

  vitePlugins.push(createHtmlConfig({ isBuild }));

  vitePlugins.push(createSvgIconsConfig({ isBuild }));

  if (isBuild) {
    vitePlugins.push(
      createCompressConfig({
        compress,
      }),
    );
  }

  if (enableVueDevTools) {
    vitePlugins.push(createVueDevToolsConfig());
  }

  if (enableAnalyze) {
    vitePlugins.push(createVisualizerConfig());
  }

  return vitePlugins;
}

export { createPlugins };
