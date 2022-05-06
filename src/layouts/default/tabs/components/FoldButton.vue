<template>
  <span
    @click="handleFold"
    :title="getIconText"><Icon :icon="getIcon" /></span>
</template>

<script lang="ts">
import { defineComponent, unref, computed } from 'vue'
import { Icon } from '@/components/Icon'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { triggerWindowResize } from '@/utils/event'

export default defineComponent({
  name: 'FoldButton',
  components: { Icon },
  setup() {
    const { getShowMenu, setMenuSetting } = useMenuSetting()
    const { getShowHeader, setHeaderSetting } = useHeaderSetting()

    const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader))

    const getIcon = computed(() => (unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full'))

    const getIconText = computed(() => (unref(getIsUnFold) ? '退出全屏' : '全屏'))

    function handleFold() {
      const isUnFold = unref(getIsUnFold)
      setMenuSetting({
        show: isUnFold,
        hidden: !isUnFold,
      })
      setHeaderSetting({ show: isUnFold })
      triggerWindowResize()
    }

    return { getIcon, getIconText, handleFold }
  },
})
</script>
