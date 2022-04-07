import type { TabContentProps } from './types'
import type { ComputedRef } from 'vue'
import type { EleDropdownItem } from '@/components/ElementPlus'

import { computed, unref, reactive } from 'vue'
import { MenuEventEnum } from './types'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { useTabs } from '@/hooks/web/useTabs'
import { useI18n } from '@/hooks/web/useI18n'

interface DropdownItem extends EleDropdownItem{
  icon: string
  text?: string
}

export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  })

  const { t } = useI18n()
  const tabStore = useMultipleTabStore()
  const { currentRoute } = useRouter()
  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs()

  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute)
  })

  /**
   * @description: drop-down list
   */
  const getDropMenuList = computed(() => {
    if (!unref(getTargetTab)) {
      return
    }
    const { meta } = unref(getTargetTab)
    const { path } = unref(currentRoute)

    const curItem = state.current

    const isCurItem = curItem ? curItem.path === path : false

    // Refresh button
    const index = state.currentIndex
    const refreshDisabled = !isCurItem
    // Close left
    const closeLeftDisabled = index === 0 || !isCurItem

    const disabled = tabStore.getTabList.length === 1

    // Close right
    const closeRightDisabled =
      !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0)
    const dropMenuList: DropdownItem[] = [
      {
        icon: 'ion:reload-sharp',
        command: MenuEventEnum.REFRESH_PAGE,
        text: t('layout.multipleTab.reload'),
        disabled: refreshDisabled,
      },
      {
        icon: 'clarity:close-line',
        command: MenuEventEnum.CLOSE_CURRENT,
        text: t('layout.multipleTab.close'),
        disabled: !!meta?.affix || disabled,
        divider: true,
      },
      {
        icon: 'line-md:arrow-close-left',
        command: MenuEventEnum.CLOSE_LEFT,
        text: t('layout.multipleTab.closeLeft'),
        disabled: closeLeftDisabled,
        divider: false,
      },
      {
        icon: 'line-md:arrow-close-right',
        command: MenuEventEnum.CLOSE_RIGHT,
        text: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: 'dashicons:align-center',
        command: MenuEventEnum.CLOSE_OTHER,
        text: t('layout.multipleTab.closeOther'),
        disabled: disabled || !isCurItem,
      },
      {
        icon: 'clarity:minus-line',
        command: MenuEventEnum.CLOSE_ALL,
        text: t('layout.multipleTab.closeAll'),
        disabled: disabled,
      },
    ]

    return dropMenuList
  })

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    if (!tabItem) {
      return
    }
    const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path)
    state.current = tabItem
    state.currentIndex = index
  }

  // Handle right click event
  function handleMenuEvent(menu: EleDropdownItem['command']): void {
    // const { event } = menu
    switch (menu) {
      case MenuEventEnum.REFRESH_PAGE:
        // refresh page
        refreshPage()
        break
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem)
        break
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft()
        break
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight()
        break
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        closeOther()
        break
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        closeAll()
        break
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu }
}
