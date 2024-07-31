<template>
  <span :title="getIconText" @click="handleFold">
    <SvgIcon :name="getIcon" />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'

import { SvgIcon } from '@/components/SvgIcon'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { triggerWindowResize } from '@/utils/event'

export default defineComponent({
  name: 'FoldButton',
  components: { SvgIcon },
  setup() {
    const { getShowMenu, setMenuSetting } = useMenuSetting()
    const { getShowHeader, setHeaderSetting } = useHeaderSetting()

    const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader))

    const getIcon = computed(() => (unref(getIsUnFold) ? 'shrink' : 'arrowsalt'))

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
