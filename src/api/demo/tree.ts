import { defHttp } from '@/utils/http/axios'

enum Api {
  TREE_OPTIONS_LIST = '/tree/getDemoTreeList',
}

/**
 * @description: Get sample options value
 */
export const treeDemoListApi = (params?: Recordable) => defHttp.get<Recordable[]>({ url: Api.TREE_OPTIONS_LIST, params })
