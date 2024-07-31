import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/store/modules/app'

/**
 * 处理内容区全屏
 */
export function useFullContent() {
  const appStore = useAppStore()
  const router = useRouter()
  const { currentRoute } = router

  /**
   * 获取内容区是否全屏
   */
  const getFullContent = computed(() => {
    // 查询参数，地址栏有完整参数时显示全屏
    const route = unref(currentRoute)
    const query = route.query
    if (query && Reflect.has(query, '__full__')) {
      return true
    }
    // 返回到配置文件中的配置
    return appStore.getProjectConfig.fullContent
  })

  return { getFullContent }
}
