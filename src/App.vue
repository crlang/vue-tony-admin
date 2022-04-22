<template>
  <ElConfigProvider>
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { AppProvider } from '@/components/Application'
import { useTitle } from '@/hooks/web/useTitle'

// Listening to page changes and dynamically changing site titles
useTitle()

if ((process.env.NODE_ENV || '') === 'production') {
  const { pkg, lastBuildTime } = __APP_INFO__
  const { name, version } = pkg
  console.log(` %c ${name} %c 版本${version} %c 构建时间${lastBuildTime} `, 'color: #fadfa3; background: #030307; padding:5px 0;', 'color: #fadfa3; background: #4D4A48; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
}

</script>
