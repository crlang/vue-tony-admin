<template>
  <ElDrawer
    v-if="getIsMobile"
    direction="ltr"
    :customClass="prefixCls"
    :size="getMenuWidth"
    :modelValue="!getCollapsed"
    @close="handleClose">
    <Sider />
  </ElDrawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDrawer } from 'element-plus'

import Sider from './LayoutSider.vue'
import MixSider from './MixSider.vue'

import { useAppInject } from '@/hooks/web/useAppInject'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
export default defineComponent({
  name: 'SiderWrapper',
  components: { ElDrawer, Sider, MixSider },
  setup() {
    const { prefixCls } = useDesign('layout-sider-wrapper')
    const { getIsMobile } = useAppInject()
    const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting()

    function handleClose() {
      setMenuSetting({
        collapsed: true,
      })
    }

    return { prefixCls, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-sider-wrapper';

.#{$prefix-cls} {
  --el-drawer-bg-color: var(--sider-background-color);
}
</style>
