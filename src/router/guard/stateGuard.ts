import type { Router } from 'vue-router'

import { useAppStore } from '@/store/modules/app'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { PageEnum } from '@/enums/pageEnum'
import { removeTabChangeListener } from '@/logics/mitt/routeChange'

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // 进入登录页面并清除身份验证信息
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore()
      const userStore = useUserStore()
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      appStore.resetAllState()
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
      removeTabChangeListener()
    }
  })
}
