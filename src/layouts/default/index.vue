<template>
  <ElContainer :class="[layoutClass]" v-bind="lockEvents" :style="layoutStyle">
    <LayoutHeader v-if="getShowFullHeaderRef" />
    <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
    <ElContainer :class="mainClass">
      <LayoutFeatures />
      <LayoutMultipleHeader />
      <LayoutContent />
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
import { ElContainer } from 'element-plus';

import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { useDesign } from '@/hooks/web/useDesign';
import { useLockPage } from '@/hooks/web/useLockPage';
import { useAppInject } from '@/hooks/web/useAppInject';

import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSideBar from './sider/index.vue';
import LayoutMultipleHeader from './header/MultipleHeader.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    ElContainer,
    LayoutFeatures: createAsyncComponent(() => import('@/layouts/default/feature/index.vue')),
    LayoutHeader,
    LayoutContent,
    LayoutSideBar,
    LayoutMultipleHeader,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout');
    const { getIsMobile } = useAppInject();
    const { getShowFullHeaderRef, getFixed } = useHeaderSetting();
    const { getShowSidebar, getRealWidth, getIsMixSidebar, getShowMenu } = useMenuSetting();

    // Create a lock screen monitor
    const lockEvents = useLockPage();

    const layoutClass = computed(() => {
      const cls: string[] = [prefixCls];
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        cls.push(`${prefixCls}-has-sider`);
      }
      return cls;
    });

    const mainClass = computed(() => {
      const cls: string[] = [`${prefixCls}-main`];
      if (unref(getFixed)) {
        cls.push(`${prefixCls}-main-fixed-header`);
      }
      return cls;
    });

    const layoutStyle = computed(() => {
      return {
        '--ty-aside-width': `${unref(getRealWidth)}px`,
      };
    });

    return {
      getShowFullHeaderRef,
      getShowSidebar,
      prefixCls,
      getIsMobile,
      getIsMixSidebar,
      layoutClass,
      layoutStyle,
      mainClass,
      lockEvents,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-default-layout';

.#{$prefix-cls} {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  background-color: var(--background-main-color);

  &-main {
    display: block;
    width: calc(100% - var(--ty-aside-width, 0px));
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.2s ease 0s;

    &-fixed-header {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }
}
</style>
