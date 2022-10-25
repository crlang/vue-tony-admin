<template>
  <ElMain :class="[prefixCls, `${prefixCls}--${getLayoutContentMode}`]">
    <PageLayout />
  </ElMain>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMain } from 'element-plus'
import PageLayout from '@/layouts/page/index.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useContentViewHeight } from './useContentViewHeight'

export default defineComponent({
  name: 'LayoutContent',
  components: { ElMain, PageLayout },
  setup() {
    const { prefixCls } = useDesign('layout-content')
    const { getOpenPageLoading } = useTransitionSetting()
    const { getLayoutContentMode, getPageLoading } = useRootSetting()

    useContentViewHeight()
    return {
      prefixCls,
      getOpenPageLoading,
      getLayoutContentMode,
      getPageLoading,
    }
  },
})
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

  &--full {
    height: 100%;
  }

  &--fixed {
    width: 1200px;
    margin: 0 auto;
  }

  &-loading {
    position: absolute;
    top: 200px;
    z-index: 10000;
  }
}
</style>
