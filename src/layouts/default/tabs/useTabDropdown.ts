import type { ComputedRef } from 'vue'
import { computed, reactive, unref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { useRouter } from 'vue-router'
import type { TabContentProps } from './types'
import { MenuEventEnum } from './types'
import type { EleDropdownItem } from '@/components/ElementPlus'

import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useTabs } from '@/hooks/web/useTabs'

interface DropdownItem extends EleDropdownItem {
  icon: string
  text?: string
}

/**
 * 处理选项卡下拉
 *
 * @param tabContentProps
 * @param getIsTabs
 */
export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  })

  const tabStore = useMultipleTabStore()
  const { currentRoute } = useRouter()
  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs()

  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute)
  })

  /**
   * 下拉列表
   */
  const getDropMenuList = computed(() => {
    if (!unref(getTargetTab)) {
      return
    }
    const { meta } = unref(getTargetTab)
    const { path } = unref(currentRoute)

    const curItem = state.current

    const isCurItem = curItem ? curItem.path === path : false

    const index = state.currentIndex
    const refreshDisabled = !isCurItem
    const closeLeftDisabled = index === 0 || !isCurItem

    const disabled = tabStore.getTabList.length === 1

    const closeRightDisabled = !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0)
    const dropMenuList: DropdownItem[] = [
      {
        icon: 'reload',
        command: MenuEventEnum.REFRESH_PAGE,
        text: '重新加载',
        disabled: refreshDisabled,
      },
      {
        icon: 'close',
        command: MenuEventEnum.CLOSE_CURRENT,
        text: '关闭标签页',
        disabled: !!meta?.affix || disabled,
        divided: true,
      },
      {
        icon: 'verticleright',
        command: MenuEventEnum.CLOSE_LEFT,
        text: '关闭左侧标签页',
        disabled: closeLeftDisabled,
        divided: false,
      },
      {
        icon: 'verticleleft',
        command: MenuEventEnum.CLOSE_RIGHT,
        text: '关闭右侧标签页',
        disabled: closeRightDisabled,
        divided: true,
      },
      {
        icon: 'swap',
        command: MenuEventEnum.CLOSE_OTHER,
        text: '关闭其它标签页',
        disabled: disabled || !isCurItem,
      },
      {
        icon: 'minus',
        command: MenuEventEnum.CLOSE_ALL,
        text: '关闭全部标签页',
        disabled,
      },
    ]

    return dropMenuList
  })

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    if (!tabItem) {
      return
    }
    const index = tabStore.getTabList.findIndex(tab => tab.path === tabItem.path)
    state.current = tabItem
    state.currentIndex = index
  }

  function handleMenuEvent(menu: EleDropdownItem['command']): void {
    switch (menu) {
      case MenuEventEnum.REFRESH_PAGE:
        refreshPage()
        break
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem)
        break
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft()
        break
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight()
        break
      case MenuEventEnum.CLOSE_OTHER:
        closeOther()
        break
      case MenuEventEnum.CLOSE_ALL:
        closeAll()
        break
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu }
}
