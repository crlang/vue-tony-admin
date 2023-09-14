import { defHttp } from '@/utils/http/axios';
import { ParamsDashboardWrokbench, ResponseDashboardWrokbench, ParamsDashboardHomeStat, ResponseDashboardHomeStat } from './types';

const basicUri = '/v1/dashboard/';
enum Api {
  GetWorkStat = `${basicUri}workbench`,
  GetHomeStat = `${basicUri}home`,
}

/**
 * 首页统计-仪表盘
 */
export function ApiHomeStat(data: ParamsDashboardHomeStat) {
  return defHttp.post<ResponseDashboardHomeStat>({ url: Api.GetHomeStat, data });
}

/**
 * 工作台统计-仪表盘
 */
export function ApiWorkbenchStat(data: ParamsDashboardWrokbench) {
  return defHttp.post<ResponseDashboardWrokbench>({ url: Api.GetWorkStat, data });
}
