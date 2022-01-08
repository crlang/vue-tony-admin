<template>
  <ElConfigProvider :locale="getEleLocale">
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
import { useLocale } from '@/locales/useLocale'

// support Multi-language
const { getEleLocale } = useLocale()

// Listening to page changes and dynamically changing site titles
useTitle()
</script>
