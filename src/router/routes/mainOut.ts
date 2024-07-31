/**
 * 独立于项目访问权限及路由的页面
 */
import type { AppRouteModule } from '@/router/types'

// 访问 /main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('@/views/core/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
]

export const mainOutRouteNames = mainOutRoutes.map(item => item.name)
