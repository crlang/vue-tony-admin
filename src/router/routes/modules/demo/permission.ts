import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'
import { RoleEnum } from '@/enums/roleEnum'
import { t } from '@/hooks/web/useI18n'

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    orderNo: 6,
    icon: 'ion:key-outline',
    title: t('routes.permission.permission'),
  },

  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      component: getParentLayout('PermissionFrontDemo'),
      meta: {
        title: t('routes.permission.front'),
      },
      children: [
        {
          path: 'page',
          name: 'FrontPageAuth',
          component: () => import('@/views/demo/permission/front/index.vue'),
          meta: {
            title: t('routes.permission.frontPage'),
          },
        },
        {
          path: 'btn',
          name: 'FrontBtnAuth',
          component: () => import('@/views/demo/permission/front/Btn.vue'),
          meta: {
            title: t('routes.permission.frontBtn'),
          },
        },
        {
          path: 'auth-pageA',
          name: 'FrontAuthPageA',
          component: () => import('@/views/demo/permission/front/AuthPageA.vue'),
          meta: {
            title: t('routes.permission.frontTestA'),
            roles: [RoleEnum.ADMIN],
          },
        },
        {
          path: 'auth-pageB',
          name: 'FrontAuthPageB',
          component: () => import('@/views/demo/permission/front/AuthPageB.vue'),
          meta: {
            title: t('routes.permission.frontTestB'),
            roles: [RoleEnum.TEST],
          },
        },
      ],
    },
    {
      path: 'back',
      name: 'PermissionBackDemo',
      component: getParentLayout('PermissionBackDemo'),
      meta: {
        title: t('routes.permission.back'),
      },
      children: [
        {
          path: 'page',
          name: 'BackAuthPage',
          component: () => import('@/views/demo/permission/back/index.vue'),
          meta: {
            title: t('routes.permission.backPage'),
          },
        },
        {
          path: 'btn',
          name: 'BackAuthBtn',
          component: () => import('@/views/demo/permission/back/Btn.vue'),
          meta: {
            title: t('routes.permission.backBtn'),
          },
        },
      ],
    },
  ],
}

export default permission
