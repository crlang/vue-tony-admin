import { BaseParamsList, BaseResponseList } from './common';

/**
 * 分页列表-系统日志
 */
export interface ParamsLogsPage extends BaseParamsList {
  ip?: string;
  userid?: number;
  username?: number;
  groupIp?: boolean;
  startDate?: string;
  endDate?: string;
}

/**
 * 详情-系统日志
 */
export interface ResponseLogsInfo {
  id: number;
  userid: number;
  username: string;
  url: string;
  vars: string;
  ip: string;
  userAgent: string;
  appName: string;
  controllerName: string;
  methodName: string;
  createTime: number;
  updateTime: number;
}

/**
 * 分页列表-系统日志
 */
export type ResponseLogsPage = BaseResponseList<ResponseLogsInfo>;
