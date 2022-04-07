import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const setup: AppRouteModule = {
  path: '/setup',
  name: 'SetupDemo',
  component: LAYOUT,
  redirect: '/setup/index',
  meta: {
    orderNo: 10,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: t('routes.setup.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('@/views/demo/setup/index.vue'),
      meta: {
        title: t('routes.setup.page'),
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default setup
