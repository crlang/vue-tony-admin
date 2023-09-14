import type { ParamsRoleAdd, ParamsRoleEdit, ParamsRoleList, ParamsRolePage, ResponseRoleInfo, ResponseRoleList, ResponseRolePage } from './types';

import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/role/';
enum Api {
  GetRolePage = `${basicUri}page`,
  GetRoleList = `${basicUri}list`,
  GetRoleInfo = `${basicUri}info`,
  GetRoleAdd = `${basicUri}add`,
  GetRoleEdit = `${basicUri}edit`,
  GetRoleDel = `${basicUri}del`,
}

/**
 * 分页列表-角色
 */
export function ApiRolePage(data: ParamsRolePage) {
  return defHttp.post<ResponseRolePage>({ url: Api.GetRolePage, data });
}

/**
 * 列表-角色
 */
export function ApiRoleList(data: ParamsRoleList = null) {
  return defHttp.post<ResponseRoleList>({ url: Api.GetRoleList, data });
}

/**
 * 详情-角色
 */
export function ApiRoleInfo(id: string = '') {
  return defHttp.post<ResponseRoleInfo>({ url: Api.GetRoleInfo, data: { id } });
}

/**
 * 新增-角色
 */
export function ApiRoleAdd(data: ParamsRoleAdd) {
  return defHttp.post<string>({ url: Api.GetRoleAdd, data }, { successMessageMode: 'message' });
}

/**
 * 编辑-角色
 */
export function ApiRoleEdit(data: ParamsRoleEdit) {
  return defHttp.post<string>({ url: Api.GetRoleEdit, data }, { successMessageMode: 'message' });
}

/**
 * 删除-角色
 */
export function ApiRoleDel(id: string = '') {
  return defHttp.post<string>({ url: Api.GetRoleDel, data: { id } }, { successMessageMode: 'message' });
}
