import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'm_connection',
    title: '关于',
    orderNo: 999,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/core/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'm_connection',
        hideMenu: true,
      },
    },
  ],
};

export default about;
