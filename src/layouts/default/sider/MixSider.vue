<template>
  <div
    :class="`${prefixCls}-dom`"
    :style="getDomStyle"></div>
  <div
    v-click-outside="handleClickOutside"
    :style="getWrapStyle"
    :class="[
      prefixCls,
      getMenuTheme,
      {
        open: openMenu,
        mini: getCollapsed
      }
    ]"
    v-bind="getMenuEvents">
    <AppLogo
      :showTitle="false"
      :class="`${prefixCls}-logo`" />

    <ScrollContainer>
      <ul :class="`${prefixCls}-module`">
        <li
          :class="[
            `${prefixCls}-module__item `,
            {
              [`${prefixCls}-module__item--active`]: item.path === activePath
            }
          ]"
          v-bind="getItemEvents(item)"
          v-for="item in menuModules"
          :key="item.path">
          <SimpleMenuTag
            :item="item"
            collapseParent
            dot />
          <Icon
            :class="`${prefixCls}-module__icon`"
            :size="getCollapsed ? 16 : 20"
            :icon="item.icon || (item.meta && item.meta.icon)"
          />
          <p :class="`${prefixCls}-module__name`">
            {{ t(item.name) }}
          </p>
        </li>
      </ul>
    </ScrollContainer>
    <LayoutTrigger
      :class="`${prefixCls}-trigger`"
      sider />

    <div
      :class="`${prefixCls}-menu-list`"
      ref="sideRef"
      :style="getMenuStyle">
      <div
        :class="[
          `${prefixCls}-menu-list__title`,
          {
            show: openMenu
          }
        ]">
        <span class="text">{{ title }}</span>
        <Icon
          :size="16"
          :icon="getMixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
          class="pushpin"
          @click="handleFixedMenu"
        />
      </div>
      <ScrollContainer :class="`${prefixCls}-menu-list__content`">
        <SimpleMenu
          :items="childrenMenus"
          :theme="getMenuTheme"
          mixSider
          @menu-click="handleMenuClick" />
      </ScrollContainer>
      <div
        v-show="getShowDragBar && openMenu"
        :class="`${prefixCls}-drag-bar`"
        ref="dragBarRef"></div>
    </div>
  </div>
</template>
<script lang="ts">
import type { Menu } from '@/router/types'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, onMounted, ref, unref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { ScrollContainer } from '@/components/Container'
import { SimpleMenu, SimpleMenuTag } from '@/components/SimpleMenu'
import { Icon } from '@/components/Icon'
import { AppLogo } from '@/components/Application'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDragLine } from './useLayoutSider'
import { useGlobSetting } from '@/hooks/setting'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { useGo } from '@/hooks/web/usePage'
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum'
import clickOutside from '@/directives/clickOutside'
import { getChildrenMenus, getCurrentParentPath, getShallowMenus } from '@/router/menus'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import LayoutTrigger from '../trigger/index.vue'

export default defineComponent({
  name: 'LayoutMixSider',
  components: {
    ScrollContainer,
    AppLogo,
    SimpleMenu,
    Icon,
    LayoutTrigger,
    SimpleMenuTag,
  },
  directives: {
    clickOutside,
  },
  setup() {
    const menuModules = ref<Menu[]>([])
    const activePath = ref('')
    const childrenMenus = ref<Menu[]>([])
    const openMenu = ref(false)
    const dragBarRef = ref<ElRef>(null)
    const sideRef = ref<ElRef>(null)
    const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)

    const { prefixCls } = useDesign('layout-mix-sider')
    const go = useGo()
    const { t } = useI18n()
    const {
      getMenuWidth,
      getCanDrag,
      getCloseMixSidebarOnChange,
      getMenuTheme,
      getMixSideTrigger,
      getRealWidth,
      getMixSideFixed,
      mixSideHasChildren,
      setMenuSetting,
      getIsMixSidebar,
      getCollapsed,
    } = useMenuSetting()

    const { title } = useGlobSetting()

    useDragLine(sideRef, dragBarRef, true)

    const getMenuStyle = computed((): CSSProperties => {
      return {
        width: unref(openMenu) ? `${unref(getMenuWidth)}px` : 0,
        left: `${unref(getMixSideWidth)}px`,
      }
    })

    const getIsFixed = computed(() => {
      /* eslint-disable-next-line */
      mixSideHasChildren.value = unref(childrenMenus).length > 0
      const isFixed = unref(getMixSideFixed) && unref(mixSideHasChildren)
      if (isFixed) {
        /* eslint-disable-next-line */
        openMenu.value = true
      }
      return isFixed
    })

    const getMixSideWidth = computed(() => {
      return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH
    })

    const getDomStyle = computed((): CSSProperties => {
      const fixedWidth = unref(getIsFixed) ? unref(getRealWidth) : 0
      const width = `${unref(getMixSideWidth) + fixedWidth}px`
      return getWrapCommonStyle(width)
    })

    const getWrapStyle = computed((): CSSProperties => {
      const width = `${unref(getMixSideWidth)}px`
      return getWrapCommonStyle(width)
    })

    const getMenuEvents = computed(() => {
      return !unref(getMixSideFixed)
        ? {
          onMouseleave: () => {
            setActive(true)
            closeMenu()
          },
        }
        : {}
    })

    const getShowDragBar = computed(() => unref(getCanDrag))

    onMounted(async () => {
      menuModules.value = await getShallowMenus()
    })

    listenerRouteChange((route) => {
      currentRoute.value = route
      setActive(true)
      if (unref(getCloseMixSidebarOnChange)) {
        closeMenu()
      }
    })

    function getWrapCommonStyle(width: string): CSSProperties {
      return {
        width,
        maxWidth: width,
        minWidth: width,
        flex: `0 0 ${width}`,
      }
    }

    // Process module menu click
    async function handleModuleClick(path: string, hover = false) {
      const children = await getChildrenMenus(path)
      if (unref(activePath) === path) {
        if (!hover) {
          if (!unref(openMenu)) {
            openMenu.value = true
          } else {
            closeMenu()
          }
        } else {
          if (!unref(openMenu)) {
            openMenu.value = true
          }
        }
        if (!unref(openMenu)) {
          setActive()
        }
      } else {
        openMenu.value = true
        activePath.value = path
      }

      if (!children || children.length === 0) {
        if (!hover) go(path)
        childrenMenus.value = []
        closeMenu()
        return
      }
      childrenMenus.value = children
    }

    // Set the currently active menu and submenu
    async function setActive(setChildren = false) {
      const path = currentRoute.value?.path
      if (!path) return
      activePath.value = await getCurrentParentPath(path)
      // hanldeModuleClick(parentPath);
      if (unref(getIsMixSidebar)) {
        const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath))
        const p = activeMenu?.path
        if (p) {
          const children = await getChildrenMenus(p)
          if (setChildren) {
            childrenMenus.value = children

            if (unref(getMixSideFixed)) {
              openMenu.value = children.length > 0
            }
          }
          if (children.length === 0) {
            childrenMenus.value = []
          }
        }
      }
    }

    function handleMenuClick(path: string) {
      go(path)
    }

    function handleClickOutside() {
      setActive(true)
      closeMenu()
    }

    function getItemEvents(item: Menu) {
      if (unref(getMixSideTrigger) === 'hover') {
        return {
          onMouseenter: () => handleModuleClick(item.path, true),
          onClick: async () => {
            const children = await getChildrenMenus(item.path)
            if (item.path && (!children || children.length === 0)) go(item.path)
          },
        }
      }
      return {
        onClick: () => handleModuleClick(item.path),
      }
    }

    function handleFixedMenu() {
      setMenuSetting({
        mixSideFixed: !unref(getIsFixed),
      })
    }

    // Close menu
    function closeMenu() {
      if (!unref(getIsFixed)) {
        openMenu.value = false
      }
    }

    return {
      t,
      prefixCls,
      menuModules,
      handleModuleClick: handleModuleClick,
      activePath,
      childrenMenus: childrenMenus,
      getShowDragBar,
      handleMenuClick,
      getMenuStyle,
      handleClickOutside,
      sideRef,
      dragBarRef,
      title,
      openMenu,
      getMenuTheme,
      getItemEvents,
      getMenuEvents,
      getDomStyle,
      handleFixedMenu,
      getMixSideFixed,
      getWrapStyle,
      getCollapsed,
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-layout-mix-sider';

.#{$prefix-cls} {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  height: 100%;
  overflow: hidden;
  background-color: var(--sider-background-color);
  transition: all 0.2s ease 0s;

  &-dom {
    height: 100%;
    overflow: hidden;
    transition: all 0.2s ease 0s;
  }

  &-logo {
    display: flex;
    justify-content: center;
    height: var(--header-height);
  }

  // &.light {
  //   .#{$prefix-cls}-logo {
  //     border-bottom: 1px solid #eee;
  //   }

  //   &.open {
  //     > .scrollbar {
  //       border-right: 1px solid #eee;
  //     }
  //   }

  //   .#{$prefix-cls}-module {
  //     &__item {
  //       font-weight: normal;
  //       color: rgba(0, 0, 0, 0.65);

  //       &--active {
  //         color: var(--primary-color);
  //         background-color: unset;
  //       }
  //     }
  //   }
  //   .#{$prefix-cls}-menu-list {
  //     &__content {
  //       box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  //     }

  //     // &__title {
  //     //   .pushpin {
  //     //     color: rgba(0, 0, 0, 0.35);

  //     //     &:hover {
  //     //       color: rgba(0, 0, 0, 0.85);
  //     //     }
  //     //   }
  //     // }
  //   }
  // }

  // &.dark {
  //   &.open {
  //     .#{$prefix-cls}-logo {
  //       // border-bottom: 1px solid var(--sider-background-color);
  //     }

  //     > .scrollbar {
  //       border-right: 1px solid var(--sider-background-color);
  //     }
  //   }
  //   .#{$prefix-cls}-menu-list {
  //     background-color: var(--sider-background-color);

  //     &__title {
  //       color: var(--white-color);
  //       border-bottom: none;
  //       border-bottom: 1px solid var(--sider-background-color);
  //     }
  //   }
  // }

  > .scrollbar {
    height: calc(100% - var(--header-height));
  }

  // &.mini &-module {
  //   &__name {
  //     display: none;
  //   }

  //   &__icon {
  //     margin-bottom: 0;
  //   }
  // }

  &-module {
    position: relative;
    padding-bottom: 44px;

    &__item {
      position: relative;
      padding: 12px 4px;
      color: var(--sider-text-color);
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: var(--sider-text-active-color);
      }

      // &:hover,
      &--active {
        font-weight: 700;
        color: var(--sider-text-active-color);
        background-color: var(--sider-background-active-color);

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: var(--primary-color);
          content: '';
        }
      }
    }

    &__icon {
      margin-bottom: 8px;
      font-size: 24px;
      transition: all 0.2s;
    }

    &__name {
      margin-bottom: 0;
      font-size: 12px;
      transition: all 0.2s;
    }
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

  // &.light &-trigger {
  //   color: rgba(0, 0, 0,0.65);
  //   background-color: #fff;
  //   border-top: 1px solid #eee;
  // }

  &-menu-list {
    position: fixed;
    top: 0;
    z-index: 101;
    width: 200px;
    height: 100%;
    background-color: var(--sider-background-color);
    transition: all 0.2s;

    &__title {
      position: relative;
      display: flex;
      align-items: center;
      height: var(--header-height);
      padding-left: 20px;
      overflow: hidden;
      font-family: var(--font-family-secondary);
      font-size: 22px;
      color: var(--text-primary-reverse);
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;

      &::after {
        position: absolute;
        right: 5%;
        bottom: 0;
        left: 5%;
        border-bottom: 1px solid var(--border-grey-color);
        content: '';
        opacity: 0.25;
      }

      &.show {
        opacity: 1;
        visibility: visible;
        transition: all 0.2s 0.2s;
      }

      .pushpin {
        position: absolute;
        top: 6px;
        right: 6px;
        color: var(--sider-text-color);
        cursor: pointer;

        &:hover {
          color: var(--sider-text-active-color);
        }
      }
    }

    &__content {
      height: calc(100% - var(--header-height)) !important;

      .scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
      }

      .scrollbar__bar.is-horizontal {
        display: none;
      }
    }
  }

  &-drag-bar {
    position: absolute;
    top: 50px;
    right: -1px;
    width: 1px;
    height: calc(100% - 50px);
    cursor: ew-resize;
    background-color: #f8f8f9;
    border-top: none;
    border-bottom: none;
    box-shadow: 0 0 4px 0 rgba(28, 36, 56, 0.15);
  }
}
</style>
