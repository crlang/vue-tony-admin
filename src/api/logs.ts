import type { ParamsLogsPage, ResponseLogsPage } from './types';

import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/logs/';
enum Api {
  GetLogsPage = `${basicUri}page`,
}

/**
 * 分页列表-系统日志
 */
export function ApiLogsPage(data: ParamsLogsPage) {
  return defHttp.post<ResponseLogsPage>({ url: Api.GetLogsPage, data });
}
