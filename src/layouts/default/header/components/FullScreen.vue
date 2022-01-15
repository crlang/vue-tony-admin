<template>
  <div>
    <el-tooltip
      :content="getTitle"
      placement="bottom">
      <span @click="toggle">
        <SvgIcon
          size="18"
          name="fullscreen"
          v-if="!isFullscreen" />
        <SvgIcon
          size="18"
          name="fullscreen-exit"
          v-else />
      </span>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useFullscreen } from '@vueuse/core'

import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'FullScreen',
  components: { SvgIcon },
  setup() {
    const { t } = useI18n()
    const { toggle, isFullscreen } = useFullscreen()

    const getTitle = computed(() => {
      return unref(isFullscreen) ? t('layout.header.tooltipExitFull') : t('layout.header.tooltipEntryFull')
    })

    return {
      getTitle,
      isFullscreen,
      toggle,
    }
  },
})
</script>
