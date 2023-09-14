import { defHttp } from '@/utils/http/axios';
import { ParamsChangePassword, ResponseGetMenuList, ResponseGetUserInfo } from './types';

const basicUri = '/v1/account/';
enum Api {
  ChangePassword = `${basicUri}changePassword`,
  Logout = `${basicUri}logout`,
  GetUserInfo = `${basicUri}getUserInfo`,
  GetMenuList = `${basicUri}getMenuList`,
}

/**
 * 用户信息
 */
export function ApiUserInfo() {
  return defHttp.post<ResponseGetUserInfo>({ url: Api.GetUserInfo });
}

/**
 * 修改密码
 */
export function ApiChangePassword(data: ParamsChangePassword) {
  return defHttp.post<boolean>({ url: Api.ChangePassword, data });
}

/**
 * 用户菜单
 */
export function ApiUserMenuList(keyname: string = '') {
  return defHttp.post<ResponseGetMenuList>({ url: Api.GetMenuList, data: { keyname } });
}

/**
 * 退出登录
 */
export function ApiLogout() {
  return defHttp.post<boolean>({ url: Api.Logout });
}
