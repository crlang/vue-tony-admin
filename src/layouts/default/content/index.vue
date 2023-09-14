<template>
  <ElMain :class="prefixCls" v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </ElMain>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMain, ElLoading } from 'element-plus';

import { useDesign } from '@/hooks/web/useDesign';
import { useRootSetting } from '@/hooks/setting/useRootSetting';
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
import PageLayout from '@/layouts/page/index.vue';

export default defineComponent({
  name: 'LayoutContent',
  components: {
    ElMain,
    PageLayout,
  },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const { prefixCls } = useDesign('layout-content');
    const { getOpenPageLoading } = useTransitionSetting();
    const { getPageLoading } = useRootSetting();

    return {
      prefixCls,
      getOpenPageLoading,
      getPageLoading,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-content';

.#{$prefix-cls} {
  position: relative;
  flex: 1;
  min-height: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
