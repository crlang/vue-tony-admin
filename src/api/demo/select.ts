import type { DemoOptionsItem, selectParams } from './model/optionsModel'

import { defHttp } from '@/utils/http/axios'

enum Api {
  OPTIONS_LIST = '/select/getDemoOptions',
}

export function optionsListApi(params?: selectParams) {
  return defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params })
}
