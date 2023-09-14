import type {
  ParamsMenuAdd,
  ParamsMenuEdit,
  // ParamsMenuList,
  ParamsMenuPage,
  ResponseMenuInfo,
  // ResponseMenuList,
  ResponseMenuPage,
} from './types';

import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/menu/';
enum Api {
  GetMenuPage = `${basicUri}page`,
  GetMenuList = `${basicUri}list`,
  GetMenuInfo = `${basicUri}info`,
  GetMenuAdd = `${basicUri}add`,
  GetMenuEdit = `${basicUri}edit`,
  GetMenuDel = `${basicUri}del`,
  GetMenuTreeList = `${basicUri}tree`,
}

/**
 * 分页列表-菜单
 */
export function ApiMenuPage(data: ParamsMenuPage) {
  return defHttp.post<ResponseMenuPage>({ url: Api.GetMenuPage, data });
}

/**
 * 列表-菜单
 */
// export function ApiMenuList(data: ParamsMenuList = null) {
//   return defHttp.post<ResponseMenuList>({ url: Api.GetMenuList, data });
// }

/**
 * 详情-菜单
 */
export function ApiMenuInfo(id: string = '') {
  return defHttp.post<ResponseMenuInfo>({ url: Api.GetMenuInfo, data: { id } });
}

/**
 * 新增-菜单
 */
export function ApiMenuAdd(data: ParamsMenuAdd) {
  return defHttp.post<string>({ url: Api.GetMenuAdd, data }, { successMessageMode: 'message' });
}

/**
 * 编辑-菜单
 */
export function ApiMenuEdit(data: ParamsMenuEdit) {
  return defHttp.post<string>({ url: Api.GetMenuEdit, data }, { successMessageMode: 'message' });
}

/**
 * 删除-菜单
 */
export function ApiMenuDel(id: string = '') {
  return defHttp.post<string>({ url: Api.GetMenuDel, data: { id } }, { successMessageMode: 'message' });
}

/**
 * 树结构-菜单
 */
export function ApiMenuTreeList() {
  return defHttp.post<string>({ url: Api.GetMenuTreeList });
}
