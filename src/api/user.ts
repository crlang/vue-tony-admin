import type {
  ParamsUserAdd,
  ParamsUserEdit,
  // ParamsUserList,
  ParamsUserPage,
  ResponseUserInfo,
  // ResponseUserList,
  ResponseUserLogs,
  ResponseUserPage,
} from './types';

import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/user/';
enum Api {
  GetUserPage = `${basicUri}page`,
  // GetUserList = `${basicUri}list`,
  GetUserInfo = `${basicUri}info`,
  GetUserAdd = `${basicUri}add`,
  GetUserEdit = `${basicUri}edit`,
  GetUserDel = `${basicUri}del`,
  GetUserLogs = `${basicUri}logs`,
}

/**
 * 分页列表-用户
 */
export function ApiUserPage(data: ParamsUserPage) {
  return defHttp.post<ResponseUserPage>({ url: Api.GetUserPage, data });
}

/**
 * 列表-用户
 */
// export function ApiUserList(data: ParamsUserList = null) {
//   return defHttp.post<ResponseUserList>({ url: Api.GetUserList, data });
// }

/**
 * 详情-用户
 */
export function ApiUserInfo(id: string = '') {
  return defHttp.post<ResponseUserInfo>({ url: Api.GetUserInfo, data: { id } });
}

/**
 * 新增-用户
 */
export function ApiUserAdd(data: ParamsUserAdd) {
  return defHttp.post<string>({ url: Api.GetUserAdd, data }, { successMessageMode: 'message' });
}

/**
 * 编辑-用户
 */
export function ApiUserEdit(data: ParamsUserEdit) {
  return defHttp.post<string>({ url: Api.GetUserEdit, data }, { successMessageMode: 'message' });
}

/**
 * 删除-用户
 */
export function ApiUserDel(id: string = '') {
  return defHttp.post<string>({ url: Api.GetUserDel, data: { id } }, { successMessageMode: 'message' });
}

/**
 * 日志-用户
 */
export function ApiUserLogs(data: { userId: string } = null) {
  return defHttp.post<ResponseUserLogs>({ url: Api.GetUserLogs, data });
}
