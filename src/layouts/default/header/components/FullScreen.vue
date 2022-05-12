<template>
  <div>
    <ElTooltip
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
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'

import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'FullScreen',
  components: { ElTooltip, SvgIcon },
  setup() {
    const { toggle, isFullscreen } = useFullscreen()

    const getTitle = computed(() => {
      return unref(isFullscreen) ? '退出全屏' : '全屏'
    })

    return {
      getTitle,
      isFullscreen,
      toggle,
    }
  },
})
</script>
