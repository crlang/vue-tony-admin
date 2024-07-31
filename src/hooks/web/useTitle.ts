import { unref, watch } from 'vue'
import { useTitle as usePageTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'

import { useGlobSetting } from '@/hooks/setting'
import { REDIRECT_NAME } from '@/router/constant'

/**
 * 页面标题处理
 */
export function useTitle() {
  const { title } = useGlobSetting()
  const { currentRoute } = useRouter()

  const pageTitle = usePageTitle()

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute)

      if (route.name === REDIRECT_NAME) {
        return
      }

      const tTitle = route?.meta?.title || ''
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
    },
    { immediate: true },
  )
}
