import type { Menu as MenuType } from '@/router/types'
import type { MenuState } from './types'

import { computed, Ref, toRaw, unref } from 'vue'
import { uniq } from 'lodash-es'
import { useDebounceFn } from '@vueuse/core'

import { getAllParentPath } from '@/router/helper/menuHelper'

import { useTimeoutFn } from '@/hooks/core/useTimeout'

export function useOpenKeys(menuState: MenuState, menus: Ref<MenuType[]>, accordion: Ref<boolean>, mixSider: Ref<boolean>, collapse: Ref<boolean>) {
  const debounceSetOpenKeys = useDebounceFn(setOpenKeys, 50)
  async function setOpenKeys(path: string) {
    const native = !mixSider.value
    const menuList = toRaw(menus.value)
    useTimeoutFn(
      () => {
        if (menuList?.length === 0) {
          menuState.activeSubMenuNames = []
          menuState.openNames = []
          return
        }
        const keys = getAllParentPath(menuList, path)

        if (!unref(accordion)) {
          menuState.openNames = uniq([...menuState.openNames, ...keys])
        } else {
          menuState.openNames = keys
        }
        menuState.activeSubMenuNames = menuState.openNames
      },
      30,
      native,
    )
  }

  const getOpenKeys = computed(() => {
    return unref(collapse) ? [] : menuState.openNames
  })

  return { setOpenKeys: debounceSetOpenKeys, getOpenKeys }
}
