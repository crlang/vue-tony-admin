import { BaseParamsList, BaseResponseList } from './common';

/**
 * 分页列表-用户
 */
export interface ParamsUserPage extends BaseParamsList {}

/**
 * 列表-用户
 */
export interface ParamsUserList {
  keyname?: string;
  status?: number;
}

/**
 * 新增-用户
 */
export interface ParamsUserAdd {
  id: number;
  username: string;
  nickname?: string;
  password: string;
  email?: string;
  emailBind?: number;
  mobile?: string;
  mobileBind?: number;
  avatar?: string;
  money?: string;
  score?: number;
  roles: string;
  group: number;
  registerTime?: number;
  registerIp?: string;
  loginTime?: number;
  loginIp?: string;
  homePath?: string;
  sort?: number;
  status: number;
  expireTime?: number;
}

/**
 * 编辑-用户
 */
export interface ParamsUserEdit extends ParamsUserAdd {
  id: string;
}

/**
 * 详情-用户
 */
export interface ResponseUserInfo {
  id: number;
  username: string;
  nickname: string;
  password: string;
  email: string;
  emailBind: number;
  mobile: string;
  mobileBind: number;
  avatar: string;
  money: string;
  score: number;
  roles: string;
  group: number;
  registerTime: number;
  registerIp: string;
  loginTime: number;
  loginIp: string;
  homePath: string;
  sort: number;
  status: number;
  expireTime: number;
  createTime: number;
  updateTime: number;
}

/**
 * 分页列表-用户
 */
export type ResponseUserPage = BaseResponseList<ResponseUserInfo>;

/**
 * 列表-用户
 */
export type ResponseUserList = ResponseUserInfo[];

/**
 * 日志-用户
 */
export type ResponseUserLogs = BaseResponseList<{
  id: number;
  userid: number;
  username?: string;
  url?: string;
  vars?: string;
  ip?: string;
  userAgent?: string;
  appName?: string;
  controllerName?: string;
  methodName?: string;
  createTime?: number;
  updateTime?: number;
}>;
