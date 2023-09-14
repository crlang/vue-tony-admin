import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 7,
    icon: 'm_setting',
    title: '系统管理',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: '账号管理',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/system/account/index.vue'),
      children: [
        {
          path: ':id',
          name: 'AccountDetail',
          meta: {
            hideMenu: true,
            title: '账号详情',
            ignoreKeepAlive: true,
            currentActiveMenu: '/system/account',
          },
          component: () => import('@/views/system/account/detail.vue'),
        },
      ],
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: '角色管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: '菜单管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: '部门管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/department/index.vue'),
    },
    {
      path: 'logs',
      name: 'LogsManagement',
      meta: {
        title: '系统日志',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/logs/index.vue'),
    },
    {
      path: 'change_password',
      name: 'ChangePassword',
      meta: {
        title: '修改密码',
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('@/views/system/changePassword/index.vue'),
    },
  ],
};

export default system;
