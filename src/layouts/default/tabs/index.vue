<template>
  <div :class="getWrapClass">
    <el-tabs
      v-model="activeKeyRef"
      @tab-click="handleChange"
      @edit="handleEdit">
      <template
        v-for="item in getTabsState"
        :key="item.query ? item.fullPath : item.path">
        <el-tab-pane
          :name="item.query ? item.fullPath : item.path"
          :closable="!(item && item.meta && item.meta.affix)">
          <template #label>
            <TabContent :tabItem="item" />
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
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
        isExtra
        :class="`${prefixCls}__extra-more`"
        :tabItem="$route"
        v-if="getShowFold" />
    </div>
  </div>
</template>

<script lang="ts">
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'

import { defineComponent, computed, unref, ref, toRaw } from 'vue'

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
  components: { TabContent, TabRedo, FoldButton },
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
      console.log('++++++++++++++targetKey', targetKey)
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
$prefix-cls: '#{$namespace}-multiple-tabs';

.#{$prefix-cls} {
  position: relative;
  z-index: 10;
  background-color: var(--header-background-color);

  &-content {
    height: 100%;

    .el-dropdown--default {
      height: 100%;
    }

    &__contextmenu {
      white-space: nowrap;
    }

    &__quick {
      display: flex;
      align-items: center;
      height: 100%;
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
    top: calc(50% - 10px);
    right: 12px;
    display: flex;
    align-items: center;
    height: 20px;
    line-height: 20px;

    &-redo,
    &-more,
    &-fold {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      margin-left: 8px;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.#{$prefix-cls} .el-tabs {
  padding-top: 7px;

  &__active-bar {
    display: none;
  }

  .el-tabs__header {
    margin: 0;
    overflow: hidden;

    .el-tabs__nav {
      &-wrap {
        padding-right: 106px;
        padding-left: 6px;
        margin: 0 0 16px;

        &::after {
          height: 1px;
        }

        &.is-scrollable {
          padding-right: 126px;
          padding-left: 24px;
        }
      }

      &-prev {
        left: 2px;
      }

      &-next {
        right: 102px;
      }

      &-prev,
      &-next {
        top: -2px;
        width: 20px;
        color: var(--text-primary-color);

        &:hover {
          background: var(--background-primary-color);;
        }
      }

      .el-tabs__item {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 0;
        margin: 0 4px;
        line-height: 1;
        background: var(--background-primary-color);
        border: 1px solid var(--el-border-color-light);

        &.is-active {
          margin-bottom: -1px;
          color: var(--primary-color);
          background: var(--background-secondary-color);
          border-bottom-color: transparent;
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
