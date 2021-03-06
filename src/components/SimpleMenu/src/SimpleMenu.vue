<template>
  <Menu
    :activeName="activeName"
    :openNames="getOpenKeys"
    :collapse="collapse"
    :accordion="accordion"
    :theme="theme"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect">
    <template
      v-for="item in items"
      :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapsedShowTitle="collapsedShowTitle"
        :collapse="collapse" />
    </template>
  </Menu>
</template>

<script lang="ts">
import type { MenuState } from './types'
import type { Menu as MenuType } from '@/router/types'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { defineComponent, computed, ref, unref, reactive, toRefs, watch } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import Menu from './components/Menu.vue'
import SimpleSubMenu from './SimpleSubMenu.vue'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { propTypes } from '@/utils/propTypes'
import { REDIRECT_NAME } from '@/router/constant'
import { useRouter } from 'vue-router'
import { openWindow } from '@/utils'

import { useOpenKeys } from './useOpenKeys'
import { isUrl } from '@/utils/is'
export default defineComponent({
  name: 'SimpleMenu',
  components: {
    Menu,
    SimpleSubMenu,
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => [],
    },
    collapse: propTypes.bool,
    mixSider: propTypes.bool,
    theme: {
      type: String as PropType<ThemeType>,
      default: '',
    },
    accordion: propTypes.bool.def(true),
    collapsedShowTitle: propTypes.bool,
    isSplitMenu: propTypes.bool,
  },
  emits: ['menuClick'],
  setup(props, { attrs, emit }) {
    const currentActiveMenu = ref('')
    const isClickGo = ref(false)

    const menuState = reactive<MenuState>({
      activeName: '',
      openNames: [],
      activeSubMenuNames: [],
    })

    const { currentRoute } = useRouter()
    const { prefixCls } = useDesign('simple-menu')
    const { items, accordion, mixSider, collapse } = toRefs(props)

    const { setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, accordion, mixSider, collapse)

    const getBindValues = computed(() => ({ ...attrs, ...props }))

    watch(
      () => props.collapse,
      (collapse) => {
        if (collapse) {
          menuState.openNames = []
        } else {
          setOpenKeys(currentRoute.value.path)
        }
      },
      { immediate: true },
    )

    watch(
      () => props.items,
      () => {
        if (!props.isSplitMenu) {
          return
        }
        setOpenKeys(currentRoute.value.path)
      },
      { flush: 'post' },
    )

    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return

      currentActiveMenu.value = route.meta?.currentActiveMenu as string
      handleMenuChange(route)

      if (unref(currentActiveMenu)) {
        menuState.activeName = unref(currentActiveMenu)
        setOpenKeys(unref(currentActiveMenu))
      }
    })

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      if (unref(isClickGo)) {
        isClickGo.value = false
        return
      }
      const path = (route || unref(currentRoute)).path

      menuState.activeName = path

      setOpenKeys(path)
    }

    async function handleSelect(key: string) {
      if (isUrl(key)) {
        openWindow(key)
        return
      }

      emit('menuClick', key)

      isClickGo.value = true
      setOpenKeys(key)
      menuState.activeName = key
    }

    return {
      prefixCls,
      getBindValues,
      handleSelect,
      getOpenKeys,
      ...toRefs(menuState),
    }
  },
})
</script>
<style lang="scss" src="./index.scss"></style>
