<template>
  <ElConfigProvider :locale="locale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
// 默认载入了Element Plus的中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import { AppProvider } from '@/components/Application'
import { useTitle } from '@/hooks/web/useTitle'

useTitle()

const locale = zhCn
const { pkg, lastBuildTime } = __APP_INFO__
const { name, version } = pkg

// eslint-disable-next-line no-console
console.log(
  ` %c ${name.toUpperCase()} %c Version ${version} %c BuildTime ${lastBuildTime} `,
  'color: #fadfa3; background: #030307; padding:5px 0;',
  'color: #fadfa3; background: #4D4A48; padding:5px 0;',
  'background: #fadfa3; padding:5px 0;',
)
</script>
