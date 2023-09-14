import type { ParamsNoticeList, ResponseNoticeList } from './types';

import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/Notice/';
enum Api {
  GetNoticeList = `${basicUri}list`,
}
/**
 * 列表-角色
 */
export function ApiNoticeList(data: ParamsNoticeList = null) {
  return defHttp.post<ResponseNoticeList>({ url: Api.GetNoticeList, data });
}
