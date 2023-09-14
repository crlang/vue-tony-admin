import { defHttp } from '@/utils/http/axios';

enum Api {
  TREE_OPTIONS_LIST = '/tree/getDemoTreeList',
}

export const treeDemoListApi = (params?: Recordable) => {
  return defHttp.get<Recordable[]>({ url: Api.TREE_OPTIONS_LIST, params });
};
