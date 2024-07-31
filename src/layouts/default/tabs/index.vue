<template>
  <div :class="getWrapClass">
    <ElTabs v-model="activeKeyRef" @tab-click="handleChange" @edit="handleEdit">
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <ElTabPane :name="item.query ? item.fullPath : item.path" :closable="!(item && item.meta && item.meta.affix)">
          <template #label>
            <TabContent :tab-item="item" :prefix-cls="prefixCls" />
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
    <div v-if="getShowRedo || getShowQuick || getShowFullscreen" :class="`${prefixCls}__extra`">
      <TabRedo v-if="getShowRedo" :class="`${prefixCls}__extra-btn`" />
      <FullscreenButton v-if="getShowFullscreen" :class="`${prefixCls}__extra-btn`" />
      <span v-if="getShowQuick" :class="`${prefixCls}__extra-btn`">
        <TabContent :type="1" :prefix-cls="`${prefixCls}__extra`" :tab-item="$route" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'

import { computed, defineComponent, ref, toRaw, unref } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import { useRouter } from 'vue-router'

import TabContent from './components/TabContent.vue'
import FullscreenButton from './components/FullscreenButton.vue'
import TabRedo from './components/TabRedo.vue'
import { useGo } from '@/hooks/web/usePage'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'
import { useDesign } from '@/hooks/web/useDesign'
import { REDIRECT_NAME } from '@/router/constant'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'

export default defineComponent({
  name: 'MultipleTabs',
  components: { ElTabs, ElTabPane, TabContent, TabRedo, FullscreenButton },
  setup() {
    const activeKeyRef = ref('')

    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const router = useRouter()

    const { prefixCls } = useDesign('multiple-tabs')
    const go = useGo()
    const { getShowQuick, getShowRedo, getShowFullscreen } = useMultipleTabSetting()

    const getTabsState = computed(() => {
      return tabStore.getTabList.filter(item => !item.meta?.hideTab)
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
        const findParentRoute = router.getRoutes().find(item => item.path === currentActiveMenu)
        if (findParentRoute) {
          tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
        }
      }
      else {
        tabStore.addTab(unref(route))
      }
    })

    function handleChange(tab: any) {
      const activeKey = unref(toRaw(tab).paneName)
      activeKeyRef.value = activeKey
      go(activeKey, false)
    }

    function handleEdit(targetKey: string) {
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
      getShowFullscreen,
      handleEdit,
      handleChange,
      activeKeyRef,
      getTabsState,
    }
  },
})
</script>

<style lang="scss" src="./index.scss"></style>
