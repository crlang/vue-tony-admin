import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'
import { ExceptionEnum } from '@/enums/exceptionEnum'

const ExceptionPage = () => import('@/views/sys/exception/Exception.vue')

const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/form/basic',
  meta: {
    orderNo: 4,
    icon: 'ep:reading',
    title: '页面',
  },
  children: [
    // =============================form start=============================
    {
      path: 'form',
      name: 'FormPage',
      redirect: '/page-demo/form/basic',
      component: getParentLayout('FormPage'),
      meta: {
        title: '表单页',
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicPage',
          component: () => import('@/views/demo/page/form/basic/index.vue'),
          meta: {
            title: '基础表单',
          },
        },
        {
          path: 'step',
          name: 'FormStepPage',
          component: () => import('@/views/demo/page/form/step/index.vue'),
          meta: {
            title: '分步表单',
          },
        },
        {
          path: 'high',
          name: 'FormHightPage',
          component: () => import('@/views/demo/page/form/high/index.vue'),
          meta: {
            title: '高级表单',
          },
        },
      ],
    },
    // =============================form end=============================
    // =============================desc start=============================
    {
      path: 'desc',
      name: 'DescPage',
      component: getParentLayout('DescPage'),
      redirect: '/page-demo/desc/basic',
      meta: {
        title: '详情页',
      },
      children: [
        {
          path: 'basic',
          name: 'DescBasicPage',
          component: () => import('@/views/demo/page/desc/basic/index.vue'),
          meta: {
            title: '基础详情页',
          },
        },
        {
          path: 'high',
          name: 'DescHighPage',
          component: () => import('@/views/demo/page/desc/high/index.vue'),
          meta: {
            title: '高级详情页',
          },
        },
      ],
    },
    // =============================desc end=============================

    // =============================result start=============================
    {
      path: 'result',
      name: 'ResultPage',
      redirect: '/page-demo/result/success',
      component: getParentLayout('ResultPage'),

      meta: {
        title: '结果页',
      },
      children: [
        {
          path: 'success',
          name: 'ResultSuccessPage',
          component: () => import('@/views/demo/page/result/success/index.vue'),
          meta: {
            title: '成功页',
          },
        },
        {
          path: 'fail',
          name: 'ResultFailPage',
          component: () => import('@/views/demo/page/result/fail/index.vue'),
          meta: {
            title: '失败页',
          },
        },
      ],
    },
    // =============================result end=============================

    // =============================account start=============================
    {
      path: 'account',
      name: 'AccountPage',
      component: getParentLayout('AccountPage'),
      redirect: '/page-demo/account/setting',
      meta: {
        title: '个人页',
      },
      children: [
        {
          path: 'center',
          name: 'AccountCenterPage',
          component: () => import('@/views/demo/page/account/center/index.vue'),
          meta: {
            title: '个人中心',
          },
        },
        {
          path: 'setting',
          name: 'AccountSettingPage',
          component: () => import('@/views/demo/page/account/setting/index.vue'),
          meta: {
            title: '个人设置',
          },
        },
      ],
    },
    // =============================account end=============================
    // =============================exception start=============================
    {
      path: 'exception',
      name: 'ExceptionPage',
      component: getParentLayout('ExceptionPage'),
      redirect: '/page-demo/exception/404',
      meta: {
        title: '异常页',
      },
      children: [
        {
          path: '403',
          name: 'PageNotAccess',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.PAGE_NOT_ACCESS,
          },
          meta: {
            title: '403',
          },
        },
        {
          path: '404',
          name: 'PageNotFound',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.PAGE_NOT_FOUND,
          },
          meta: {
            title: '404',
          },
        },
        {
          path: '500',
          name: 'ServiceError',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.ERROR,
          },
          meta: {
            title: '500',
          },
        },
        {
          path: 'net-work-error',
          name: 'NetWorkError',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.NET_WORK_ERROR,
          },
          meta: {
            title: '网络错误',
          },
        },
        {
          path: 'not-data',
          name: 'NotData',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.PAGE_NOT_DATA,
          },
          meta: {
            title: '无数据',
          },
        },
      ],
    },
    // =============================exception end=============================
    // =============================list start=============================
    {
      path: 'list',
      name: 'ListPage',
      component: getParentLayout('ListPage'),
      redirect: '/page-demo/list/card',
      meta: {
        title: '列表页',
      },
      children: [
        {
          path: 'basic',
          name: 'ListBasicPage',
          component: () => import('@/views/demo/page/list/basic/index.vue'),
          meta: {
            title: '标准列表',
          },
        },
        {
          path: 'card',
          name: 'ListCardPage',
          component: () => import('@/views/demo/page/list/card/index.vue'),
          meta: {
            title: '卡片列表',
          },
        },
        {
          path: 'search',
          name: 'ListSearchPage',
          component: () => import('@/views/demo/page/list/search/index.vue'),
          meta: {
            title: '搜索列表',
          },
        },
      ],
    },
    // =============================list end=============================
  ],
}

export default page
