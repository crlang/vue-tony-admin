import type { DemoParams, DemoListGetResultModel } from './model/tableModel';

import { defHttp } from '@/utils/http/axios';

enum Api {
  DEMO_LIST = '/demo/v1/table/page',
}

export const demoListApi = (params: DemoParams) => {
  return defHttp.post<DemoListGetResultModel>(
    {
      url: Api.DEMO_LIST,
      params,
    },
    { joinPrefix: false },
  );
};
