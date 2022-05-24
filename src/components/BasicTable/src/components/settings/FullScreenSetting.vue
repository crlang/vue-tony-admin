<template>
  <ElTooltip
    placement="top"
    content="全屏">
    <span @click="toggle">
      <SvgIcon
        name="fullscreen"
        v-if="!isFullscreen" />
      <SvgIcon
        name="fullscreen-exit"
        v-else />
    </span>
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'

import { SvgIcon } from '@/components/SvgIcon'

import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'FullScreenSetting',
  components: {
    ElTooltip,
    SvgIcon,
  },

  setup() {
    const table = useTableContext()
    const { toggle, isFullscreen } = useFullscreen(table.wrapRef)

    return {
      toggle,
      isFullscreen,
    }
  },
})
</script>
