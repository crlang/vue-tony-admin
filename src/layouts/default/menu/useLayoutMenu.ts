import type { Ref } from 'vue'

import { computed, ref, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useThrottleFn } from '@vueuse/core'
import type { Menu } from '@/router/types'

import { MenuSplitTyeEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { getChildrenMenus, getCurrentParentPath, getMenus, getShallowMenus } from '@/router/menus'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppInject } from '@/hooks/web/useAppInject'

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>) {
  const menusRef = ref<Menu[]>([])
  const { currentRoute } = useRouter()
  const { getIsMobile } = useAppInject()
  const permissionStore = usePermissionStore()
  const { setMenuSetting, getIsHorizontal, getSplit } = useMenuSetting()

  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50)

  const splitNotLeft = computed(() => unref(splitType) !== MenuSplitTyeEnum.LEFT && !unref(getIsHorizontal))

  const getSplitLeft = computed(() => !unref(getSplit) || unref(splitType) !== MenuSplitTyeEnum.LEFT)

  const getSpiltTop = computed(() => unref(splitType) === MenuSplitTyeEnum.TOP)

  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTyeEnum.NONE || !unref(getSplit)
  })

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTyeEnum]) => {
      if (unref(splitNotLeft) || unref(getIsMobile))
        return

      const { meta } = unref(currentRoute)
      const currentActiveMenu = meta.currentActiveMenu as string
      let parentPath = await getCurrentParentPath(path)
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu)
      }
      if (parentPath) {
        throttleHandleSplitLeftMenu(parentPath)
      }
    },
    {
      immediate: true,
    },
  )

  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus()
    },
    {
      immediate: true,
    },
  )

  watch(
    () => getSplit.value,
    () => {
      if (unref(splitNotLeft))
        return
      genMenus()
    },
  )

  async function handleSplitLeftMenu(parentPath: string) {
    if (unref(getSplitLeft) || unref(getIsMobile))
      return

    const children = await getChildrenMenus(parentPath)

    if (!children || !children.length) {
      setMenuSetting({ hidden: true })
      menusRef.value = []
      return
    }

    setMenuSetting({ hidden: false })
    menusRef.value = children
  }

  async function genMenus() {
    if (unref(normalType) || unref(getIsMobile)) {
      menusRef.value = await getMenus()
      return
    }

    if (unref(getSpiltTop)) {
      const shallowMenus = await getShallowMenus()

      menusRef.value = shallowMenus
    }
  }

  return { menusRef }
}
