<template>
  <ElAside
    v-show="showClassSideBarRef"
    ref="sideRef"
    :class="prefixCls"
    :width="getMenuWidthX">
    <LayoutMenu :menuMode="getMode" :splitType="getSplitType" />
    <DragBar ref="dragBarRef" />
    <template v-if="getShowTrigger">
      <LayoutTrigger :class="`${prefixCls}-trigger`" sider />
    </template>
  </ElAside>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue';
import { ElAside } from 'element-plus';

import LayoutTrigger from '@/layouts/default/trigger/index.vue';
import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { useAppInject } from '@/hooks/web/useAppInject';
import { useDesign } from '@/hooks/web/useDesign';

import LayoutMenu from '../menu/index.vue';
import { useTrigger, useDragLine } from './useLayoutSider';
import DragBar from './DragBar.vue';

export default defineComponent({
  name: 'LayoutSideBar',
  components: { ElAside, LayoutMenu, DragBar, LayoutTrigger },
  setup() {
    const dragBarRef = ref<ElRef>(null);
    const sideRef = ref<ElRef>(null);

    const { getSplit, getRealWidth, getMenuHidden } = useMenuSetting();

    const { prefixCls } = useDesign('layout-sideBar');

    const { getIsMobile } = useAppInject();

    const { getShowTrigger } = useTrigger(getIsMobile);

    useDragLine(sideRef, dragBarRef);

    const getMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.INLINE : null;
    });

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
    });

    const showClassSideBarRef = computed(() => {
      return unref(getSplit) ? !unref(getMenuHidden) : true;
    });

    const getMenuWidthX = computed(() => {
      return `${unref(getRealWidth)}px`;
    });

    return {
      prefixCls,
      sideRef,
      dragBarRef,
      getIsMobile,
      showClassSideBarRef,
      getMenuWidthX,
      getMode,
      getSplitType,
      getShowTrigger,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-sideBar';

.#{$prefix-cls} {
  position: relative;
  top: 0;
  z-index: 101;
  display: flex;
  flex-wrap: wrap;
  width: var(--ty-aside-width, 220px);
  height: 100%;
  background-color: var(--sider-background-color);
  transition: all 0.2s ease 0s;

  // &--mix {
  // }

  // &.el-aside {
  // }

  &-trigger {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    color: var(--sider-text-color);
    cursor: pointer;
    background-color: var(--sider-background-color);

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      content: '';
      border-top: 1px solid var(--sider-text-color);
      opacity: 0.25;
    }

    &:hover::before {
      opacity: 0.55;
    }

    > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
</style>
