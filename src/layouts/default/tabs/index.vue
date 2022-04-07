<template>
  <div :class="getWrapClass">
    <ElTabs
      v-model="activeKeyRef"
      @tab-click="handleChange"
      @edit="handleEdit">
      <template
        v-for="item in getTabsState"
        :key="item.query ? item.fullPath : item.path">
        <ElTabPane
          :name="item.query ? item.fullPath : item.path"
          :closable="!(item && item.meta && item.meta.affix)">
          <template #label>
            <TabContent
              :tabItem="item"
              :prefixCls="prefixCls" />
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
    <div
      :class="`${prefixCls}__extra`"
      v-if="getShowRedo || getShowQuick">
      <TabRedo
        v-if="getShowRedo"
        :class="`${prefixCls}__extra-redo`" />
      <FoldButton
        v-if="getShowQuick"
        :class="`${prefixCls}__extra-fold`" />
      <TabContent
        :type="1"
        :prefixCls="prefixCls"
        :tabItem="$route"
        v-if="getShowFold" />
    </div>
  </div>
</template>

<script lang="ts">
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'

import { defineComponent, computed, unref, ref, toRaw } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

import TabContent from './components/TabContent.vue'
import FoldButton from './components/FoldButton.vue'
import TabRedo from './components/TabRedo.vue'

import { useGo } from '@/hooks/web/usePage'

import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'

import { useDesign } from '@/hooks/web/useDesign'

import { REDIRECT_NAME } from '@/router/constant'
import { listenerRouteChange } from '@/logics/mitt/routeChange'

import { useRouter } from 'vue-router'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'

export default defineComponent({
  name: 'MultipleTabs',
  components: { ElTabs, ElTabPane, TabContent, TabRedo, FoldButton },
  setup() {
    const activeKeyRef = ref('')

    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const router = useRouter()

    const { prefixCls } = useDesign('multiple-tabs')
    const go = useGo()
    const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()

    const getTabsState = computed(() => {
      return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
    })

    const unClose = computed(() => unref(getTabsState).length === 1)

    const getWrapClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--hide-close`]: unref(unClose),
        },
      ]
    })

    listenerRouteChange((route) => {
      const { name } = route
      if (name === REDIRECT_NAME || !route || !userStore.getToken) {
        return
      }

      const { path, fullPath, meta = {} } = route
      const { currentActiveMenu, hideTab } = meta as RouteMeta
      const isHide = !hideTab ? null : currentActiveMenu
      const p = isHide || fullPath || path
      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p as string
      }

      if (isHide) {
        const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)

        findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
      } else {
        tabStore.addTab(unref(route))
      }
    })

    function handleChange(tab:any) {
      const activeKey = unref(toRaw(tab).paneName)
      activeKeyRef.value = activeKey
      go(activeKey, false)
    }

    // Close the current tab
    function handleEdit(targetKey: string) {
      // Added operation to hide, currently only use delete operation
      if (unref(unClose)) {
        return
      }
      tabStore.closeTabByKey(targetKey, router)
    }

    return {
      prefixCls,
      getWrapClass,
      getShowQuick,
      getShowRedo,
      getShowFold,
      handleEdit,
      handleChange,
      activeKeyRef,
      getTabsState,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-multiple-tabs';

.#{$prefix-cls} {
  position: relative;
  z-index: 10;
  background: var(--background-secondary-color);
  --tabs-bottom: 16px;
  --tabs-top: 8px;
  --tabs-height: 40px;

  &-content {
    height: 100%;

    .el-dropdown--default {
      height: 100%;
    }

    &__contextmenu {
      white-space: nowrap;
    }

    .el-dropdown-menu__item--divided::before {
      display: none;
    }

    &__info {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 6px 0 16px;

      &-text {
        font-size: 14px;
        color: var(--text-primary-color);
      }
    }
  }

  &__extra {
    position: absolute;
    top: var(--tabs-top);
    right: 0;
    bottom: var(--tabs-bottom);
    display: flex;
    align-items: center;

    &-redo,
    &-more,
    &-fold {
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--tabs-height);
      height: var(--tabs-height);
      margin-left: 8px;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
        background: var(--control-background-hover);
      }
    }
  }
}

.#{$prefix-cls} .el-tabs {
  padding-top: var(--tabs-top);

  &__active-bar {
    display: none;
  }

  .el-tabs__header {
    margin: 0;
    overflow: hidden;

    .el-tabs__nav {
      &-wrap {
        padding-right: 142px;
        padding-left: 6px;
        margin: 0 0 var(--tabs-bottom);

        &::after {
          height: 1px;
        }

        &.is-scrollable {
          padding-right: 162px;
          padding-left: 24px;
        }
      }

      &-prev {
        left: 2px;
      }

      &-next {
        right: 136px;
      }

      &-prev,
      &-next {
        top: -2px;
        width: 20px;
        color: var(--text-primary-color);

        &:hover {
          background: var(--background-primary-color);
        }
      }

      .el-tabs__item {
        position: relative;
        display: inline-flex;
        align-items: center;
        height: var(--tabs-height);
        padding: 0 30px;
        margin-top: 5.95px;
        margin-right: -18px;
        line-height: var(--tabs-height);
        text-align: center;
        border: none;
        outline: none;

        &.is-active {
          padding: 0 30px;
          color: var(--el-color-primary);
          background: var(--el-color-primary-light-9);
          mask: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==');
          mask-size: 100% 100%;
        }

        .is-icon-close {
          margin: 0 6px 0 0;
          line-height: 1;
        }

        .is-icon-close > svg {
          display: block;
          margin: 0;
        }
      }
    }
  }

  &__content {
    display: none;
  }
}
</style>
