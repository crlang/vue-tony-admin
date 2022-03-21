import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
const IFrame = () => import('@/views/sys/iframe/FrameBlank.vue')
import { t } from '@/hooks/web/useI18n'

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 8,
    icon: 'ion:tv-outline',
    title: t('routes.iframe.frame'),
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'http://tony.crlang.com/doc/',
        title: t('routes.iframe.doc'),
      },
    },
    {
      path: 'eleDoc',
      name: 'EleDoc',
      component: IFrame,
      meta: {
        frameSrc: 'https://element-plus.gitee.io/zh-CN/guide/design.html',
        title: t('routes.iframe.ele'),
      },
    },
    {
      path: 'http://tony.crlang.com/doc/',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: t('routes.iframe.docExternal'),
      },
    },
  ],
}

export default iframe
