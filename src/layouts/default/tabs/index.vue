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
            <TabContent
              :tabItem="item"
              :isActived="getActiveState(item.query ? item.fullPath : item.path)" />
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
      <TabContent
        isExtra
        :class="`${prefixCls}__extra-more`"
        :tabItem="$route"
        v-if="getShowFold" />
      <FoldButton
        v-if="getShowQuick"
        :class="`${prefixCls}__extra-fold`" />
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
      // Added operation to hide, currently only use delete operation
      if (unref(unClose)) {
        return
      }
      tabStore.closeTabByKey(targetKey, router)
    }

    function getActiveState(targetKey: string) {
      return targetKey === activeKeyRef.value
    }
    return {
      prefixCls,
      unClose,
      getWrapClass,
      getShowQuick,
      getShowRedo,
      getShowFold,
      handleEdit,
      handleChange,
      activeKeyRef,
      getTabsState,
      getActiveState,
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

  &-content__info {
    display: flex;
    align-items: center;
    height: 100%;

    &-text {
      font-size: 14px;
      color: var(--text-color);
    }
  }

  &__extra {
    position: absolute;
    top: calc(50% - 10px);
    right: 12px;
    height: 20px;
    line-height: 20px;

    &-redo,
    &-more,
    &-fold {
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
        padding-right: 112px;
        padding-left: 16px;
        margin: 0 0 16px;

        &::after {
          height: 1px;
        }
      }

      &-prev {
        left: 2px;
      }

      &-next {
        right: 98px;
      }

      &-prev,
      &-next {
        &:hover {
          background: #f5f5f5;
        }
      }

      .el-tabs__item {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 0 16px;
        margin: 0 16px -1px 0;
        line-height: 1;
        background: var(--background-primary-color);
        border: 1px solid var(--el-border-color-light);

        // &.is-active {
        //   background: var(--header-bg-color);
        // }

        .el-dropdown{
          display: flex;
          align-items: center;
          height: 100%;
          justify-items: center;
        }

        .is-icon-close {
          margin: 0 0 0 6px;
          line-height: 1;
        }

        .is-icon-close > svg {
          display: block;
          margin: 0;
        }
      }

      .el-dropdown{
        height: 100%;
      }
    }
  }

  &__content {
    display: none;
  }
}</style>
