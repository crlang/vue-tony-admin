<template>
  <div :class="prefixCls">
    <LayoutHeader v-if="getShowInsetHeaderRef" />
    <MultipleTabs v-if="getShowTabs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, computed } from 'vue';

import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting';
import { useDesign } from '@/hooks/web/useDesign';

import MultipleTabs from '../tabs/index.vue';
import LayoutHeader from './index.vue';

export default defineComponent({
  name: 'LayoutMultipleHeader',
  components: { LayoutHeader, MultipleTabs },
  setup() {
    const { prefixCls } = useDesign('layout-multiple-header');

    const { getFixed, getShowInsetHeaderRef, getShowFullHeaderRef } = useHeaderSetting();

    const { getShowMultipleTab } = useMultipleTabSetting();

    const getShowTabs = computed(() => {
      return unref(getShowMultipleTab);
    });

    const getIsFixed = computed(() => {
      return unref(getFixed) || unref(getShowFullHeaderRef);
    });

    return {
      prefixCls,
      getIsFixed,
      getShowTabs,
      getShowInsetHeaderRef,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-multiple-header';

.#{$prefix-cls} {
  flex: 0 0 auto;
  width: 100%;
  transition: width var(--t-fast);

  // &--fixed {
  //   position: fixed;
  //   top: 0;
  //   z-index: 100;
  //   width: 100%;
  // }
}
</style>
