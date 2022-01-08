<template>
  <el-container
    :class="[layoutClass]"
    v-bind="lockEvents">
    <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
    <el-container :class="`${prefixCls}-main`">
      <LayoutFeatures />
      <LayoutMultipleHeader />
      <LayoutContent />
      <LayoutFooter />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

import LayoutContent from './content/index.vue'
import LayoutSideBar from './sider/index.vue'
import LayoutMultipleHeader from './header/MultipleHeader.vue'

import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useLockPage } from '@/hooks/web/useLockPage'

import { useAppInject } from '@/hooks/web/useAppInject'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutFeatures: createAsyncComponent(() => import('@/layouts/default/feature/index.vue')),
    LayoutFooter: createAsyncComponent(() => import('@/layouts/default/footer/index.vue')),
    // LayoutHeader,
    LayoutContent,
    LayoutSideBar,
    LayoutMultipleHeader,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout')
    const { getIsMobile } = useAppInject()
    const { getShowFullHeaderRef } = useHeaderSetting()
    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()

    // Create a lock screen monitor
    const lockEvents = useLockPage()

    const layoutClass = computed(() => {
      const cls: string[] = [prefixCls]
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        cls.push(prefixCls + '-has-sider')
      }
      return cls
    })

    return {
      getShowFullHeaderRef,
      getShowSidebar,
      prefixCls,
      getIsMobile,
      getIsMixSidebar,
      layoutClass,
      lockEvents,
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-default-layout';

.#{$prefix-cls} {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $content-bg;

  &-main {
    width: 100%;
    flex-direction: column;
  }
}
</style>
