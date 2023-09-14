import type {
  ParamsDepartmentAdd,
  ParamsDepartmentEdit,
  // ParamsDepartmentList,
  ParamsDepartmentPage,
  ResponseDepartmentInfo,
  // ResponseDepartmentList,
  ResponseDepartmentPage,
} from './types';

import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/department/';
enum Api {
  GetDepartmentPage = `${basicUri}page`,
  // GetDepartmentList = `${basicUri}list`,
  GetDepartmentInfo = `${basicUri}info`,
  GetDepartmentAdd = `${basicUri}add`,
  GetDepartmentEdit = `${basicUri}edit`,
  GetDepartmentDel = `${basicUri}del`,
  GetDepartmentTree = `${basicUri}tree`,
}

/**
 * 分页列表-部门
 */
export function ApiDepartmentPage(data: ParamsDepartmentPage) {
  return defHttp.post<ResponseDepartmentPage>({ url: Api.GetDepartmentPage, data });
}

/**
 * 列表-部门
 */
// export function ApiDepartmentList(data: ParamsDepartmentList = null) {
//   return defHttp.post<ResponseDepartmentList>({ url: Api.GetDepartmentList, data });
// }

/**
 * 详情-部门
 */
export function ApiDepartmentInfo(id: string = '') {
  return defHttp.post<ResponseDepartmentInfo>({ url: Api.GetDepartmentInfo, data: { id } });
}

/**
 * 新增-部门
 */
export function ApiDepartmentAdd(data: ParamsDepartmentAdd) {
  return defHttp.post<string>({ url: Api.GetDepartmentAdd, data }, { successMessageMode: 'message' });
}

/**
 * 编辑-部门
 */
export function ApiDepartmentEdit(data: ParamsDepartmentEdit) {
  return defHttp.post<string>({ url: Api.GetDepartmentEdit, data }, { successMessageMode: 'message' });
}

/**
 * 删除-部门
 */
export function ApiDepartmentDel(id: string = '') {
  return defHttp.post<string>({ url: Api.GetDepartmentDel, data: { id } }, { successMessageMode: 'message' });
}

/**
 * 树结构-部门
 */
export function ApiDepartmentTreeList() {
  return defHttp.post<string>({ url: Api.GetDepartmentTree });
}
