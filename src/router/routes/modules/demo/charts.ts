import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const charts: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 5,
    icon: 'ion:bar-chart-outline',
    title: t('routes.charts.charts'),
  },
  children: [
    {
      path: 'baiduMap',
      name: 'BaiduMap',
      meta: {
        title: t('routes.charts.baiduMap'),
      },
      component: () => import('@/views/demo/charts/map/Baidu.vue'),
    },
    {
      path: 'aMap',
      name: 'AMap',
      meta: {
        title: t('routes.charts.aMap'),
      },
      component: () => import('@/views/demo/charts/map/Gaode.vue'),
    },
    {
      path: 'googleMap',
      name: 'GoogleMap',
      meta: {
        title: t('routes.charts.googleMap'),
      },
      component: () => import('@/views/demo/charts/map/Google.vue'),
    },
    {
      path: 'tMap',
      name: 'tMap',
      meta: {
        title: t('routes.charts.tMap'),
      },
      component: () => import('@/views/demo/charts/map/Tencent.vue'),
    },
    {
      path: 'echarts',
      name: 'ECharts',
      component: getParentLayout('ECharts'),
      meta: {
        title: 'ECharts',
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('@/views/demo/charts/Map.vue'),
          meta: {
            title: t('routes.charts.map'),
          },
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('@/views/demo/charts/Line.vue'),
          meta: {
            title: t('routes.charts.line'),
          },
        },
        {
          path: 'Dync',
          name: 'Dync',
          component: () => import('@/views/demo/charts/Dync.vue'),
          meta: {
            title: t('routes.charts.linedync'),
          },
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('@/views/demo/charts/Pie.vue'),
          meta: {
            title: t('routes.charts.pie'),
          },
        },
        {
          path: 'nightingale',
          name: 'Nightingale',
          component: () => import('@/views/demo/charts/Nightingale.vue'),
          meta: {
            title: t('routes.charts.nightingale'),
          },
        },
      ],
    },
  ],
}

export default charts
