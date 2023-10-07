import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
const IFrame = () => import('@/views/core/iframe/FrameBlank.vue');

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 9,
    icon: 'm_top-right',
    title: '外部页面',
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'https://tony.crlang.com/',
        title: '项目文档(内嵌)',
      },
    },
    {
      path: 'eleDoc',
      name: 'EleDoc',
      component: IFrame,
      meta: {
        frameSrc: 'https://element-plus.gitee.io/zh-CN/guide/design.html',
        title: 'Element Plus文档(内嵌)',
      },
    },
    {
      path: 'https://tony.crlang.com/',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: '项目文档(外链)',
      },
    },
    {
      path: '/main-out',
      name: 'MainOutExt',
      component: IFrame,
      meta: {
        title: '页面位于主框架外',
      },
    },
  ],
};

export default iframe;
