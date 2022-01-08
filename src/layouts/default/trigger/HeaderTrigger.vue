<template>
  <span
    :class="[prefixCls, theme]"
    @click="toggleCollapsed">
    <Expand v-if="getCollapsed" />
    <Fold v-else />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { Expand, Fold } from '@element-plus/icons'

export default defineComponent({
  name: 'HeaderTrigger',
  components: { Expand, Fold },
  props: {
    theme: propTypes.oneOf(['light', 'dark']),
  },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()
    const { prefixCls } = useDesign('layout-header-trigger')
    return { getCollapsed, toggleCollapsed, prefixCls }
  },
})
</script>
