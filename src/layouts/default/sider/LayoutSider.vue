<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    v-show="showClassSideBarRef"></div>
  <el-aside
    v-show="showClassSideBarRef"
    ref="sideRef"
    breakpoint="lg"
    collapsible
    :class="getSiderClass"
    :width="getMenuWidthX"
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
    :theme="getMenuTheme"
    @breakpoint="onBreakpointChange"
    :trigger="getTrigger"
    v-bind="getTriggerAttr">
    <template
      #trigger
      v-if="getShowTrigger">
      <LayoutTrigger />
    </template>
    <LayoutMenu
      :theme="getMenuTheme"
      :menuMode="getMode"
      :splitType="getSplitType" />
    <DragBar ref="dragBarRef" />
  </el-aside>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref, CSSProperties, h } from 'vue'
import LayoutMenu from '../menu/index.vue'
import LayoutTrigger from '@/layouts/default/trigger/index.vue'

import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useTrigger, useDragLine, useSiderEvent } from './useLayoutSider'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'

import DragBar from './DragBar.vue'
export default defineComponent({
  name: 'LayoutSideBar',
  components: { LayoutMenu, DragBar, LayoutTrigger },
  setup() {
    const dragBarRef = ref<ElRef>(null)
    const sideRef = ref<ElRef>(null)

    const {
      getCollapsed,
      getSplit,
      getMenuTheme,
      getRealWidth,
      getMenuHidden,
      getMenuFixed,
      getIsMixMode,
      toggleCollapsed,
    } = useMenuSetting()

    const { prefixCls } = useDesign('layout-sideBar')

    const { getIsMobile } = useAppInject()

    const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile)

    useDragLine(sideRef, dragBarRef)

    const { getCollapsedWidth, onBreakpointChange } = useSiderEvent()

    const getMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.INLINE : null
    })

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE
    })

    const showClassSideBarRef = computed(() => {
      return unref(getSplit) ? !unref(getMenuHidden) : true
    })

    const getSiderClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: unref(getMenuFixed),
          [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
        },
      ]
    })

    const getHiddenDomStyle = computed((): CSSProperties => {
      const width = `${unref(getRealWidth)}px`
      return {
        width: width,
        overflow: 'hidden',
        flex: `0 0 ${width}`,
        maxWidth: width,
        minWidth: width,
        transition: 'all 0.2s',
      }
    })

    const getMenuWidthX = computed(() => {
      return `${unref(getRealWidth)}px`
    })
    // 在此处使用计算量可能会导致sider异常
    // andv 更新后，如果trigger插槽可用，则此处代码可废弃
    const getTrigger = h(LayoutTrigger)

    return {
      prefixCls,
      sideRef,
      dragBarRef,
      getIsMobile,
      getHiddenDomStyle,
      getSiderClass,
      getTrigger,
      getTriggerAttr,
      getCollapsedWidth,
      getMenuFixed,
      showClassSideBarRef,
      getMenuWidthX,
      getCollapsed,
      getMenuTheme,
      onBreakpointChange,
      getMode,
      getSplitType,
      getShowTrigger,
      toggleCollapsed,
    }
  },
})
</script>
<style lang="scss">
// @use 'sass:color';

$prefix-cls: '#{$namespace}-layout-sideBar';

.#{$prefix-cls} {
  z-index: $layout-sider-fixed-z-index;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }

  &--mix {
    top: var(--header-height);
    height: calc(100% - var(--header-height));
  }

  &.el-aside {
    background-color: var(--sider-background-color);
  }

  &:not(.el-aside) {
    // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  }

}
</style>
