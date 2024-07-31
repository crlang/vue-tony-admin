import { getCurrentInstance, onUnmounted } from 'vue'

import { createContextMenu, destroyContextMenu } from '@/components/ContextMenu'

export type { ContextMenuItem } from '@/components/ContextMenu'

/**
 * 处理右键菜单
 *
 * @param autoRemove
 */
export function useContextMenu(autoRemove = true) {
  if (getCurrentInstance() && autoRemove) {
    onUnmounted(() => {
      destroyContextMenu()
    })
  }
  return [createContextMenu, destroyContextMenu]
}
