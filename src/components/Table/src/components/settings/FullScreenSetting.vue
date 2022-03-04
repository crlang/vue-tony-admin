<template>
  <ElTooltip
    placement="top"
    :content="t('component.table.settingFullScreen')">
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
import { useI18n } from '@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'FullScreenSetting',
  components: {
    ElTooltip,
    SvgIcon,
  },

  setup() {
    const table = useTableContext()
    const { t } = useI18n()
    const { toggle, isFullscreen } = useFullscreen(table.wrapRef)

    return {
      toggle,
      isFullscreen,
      t,
    }
  },
})
</script>
