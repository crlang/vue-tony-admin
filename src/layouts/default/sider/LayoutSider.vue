<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    v-show="showClassSideBarRef"></div>
  <ElAside
    v-show="showClassSideBarRef"
    ref="sideRef"
    :class="getSiderClass"
    :width="getMenuWidthX">
    <LayoutMenu
      :theme="getMenuTheme"
      :menuMode="getMode"
      :splitType="getSplitType" />
    <DragBar ref="dragBarRef" />
    <template v-if="getShowTrigger">
      <LayoutTrigger
        :class="`${prefixCls}-trigger ${getMenuTheme}`"
        sider />
    </template>
  </ElAside>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, CSSProperties } from 'vue'
import { ElAside } from 'element-plus'
import LayoutMenu from '../menu/index.vue'
import LayoutTrigger from '@/layouts/default/trigger/index.vue'

import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useTrigger, useDragLine } from './useLayoutSider'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'

import DragBar from './DragBar.vue'
export default defineComponent({
  name: 'LayoutSideBar',
  components: { ElAside, LayoutMenu, DragBar, LayoutTrigger },
  setup() {
    const dragBarRef = ref<ElRef>(null)
    const sideRef = ref<ElRef>(null)

    const { getSplit, getMenuTheme, getRealWidth, getMenuHidden, getMenuFixed, getIsMixMode } = useMenuSetting()

    const { prefixCls } = useDesign('layout-sideBar')

    const { getIsMobile } = useAppInject()

    const { getShowTrigger } = useTrigger(getIsMobile)

    useDragLine(sideRef, dragBarRef)

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
        transition: 'all 0.2s ease 0s',
      }
    })

    const getMenuWidthX = computed(() => {
      return `${unref(getRealWidth)}px`
    })

    return {
      prefixCls,
      sideRef,
      dragBarRef,
      getIsMobile,
      getHiddenDomStyle,
      getSiderClass,
      getMenuFixed,
      showClassSideBarRef,
      getMenuWidthX,
      getMenuTheme,
      getMode,
      getSplitType,
      getShowTrigger,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-sideBar';

.#{$prefix-cls} {
  z-index: 101;
  transition: all 0.2s ease 0s;

  &--fixed {
    position: fixed;
    top: 0;
    bottom: 0;
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

  &-trigger {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    color: var(--sider-text-color);
    cursor: pointer;
    background-color: var(--sider-background-color);

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      border-top: 1px solid var(--sider-text-color);
      content: '';
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
