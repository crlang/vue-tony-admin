import type { DemoListGetResultModel, DemoParams } from './model/tableModel'

import { defHttp } from '@/utils/http/axios'

enum Api {
  DEMO_LIST = '/demo/v1/table/page',
}

export function demoListApi(params: DemoParams) {
  return defHttp.post<DemoListGetResultModel>(
    {
      url: Api.DEMO_LIST,
      params,
    },
    { joinPrefix: false },
  )
}
