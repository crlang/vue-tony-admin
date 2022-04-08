<template>
  <span
    :class="[prefixCls, theme]"
    @click="toggleCollapsed">
    <SvgIcon :name="getCollapsed ? 'expand' : 'fold'" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'HeaderTrigger',
  components: { SvgIcon },
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
