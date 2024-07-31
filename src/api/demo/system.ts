import type {
  AccountListGetResultModel,
  AccountParams,
  DeptListGetResultModel,
  DeptListItem,
  MenuListGetResultModel,
  MenuParams,
  RoleListGetResultModel,
  RolePageListGetResultModel,
  RolePageParams,
  RoleParams,
} from './model/systemModel'

import { defHttp } from '@/utils/http/axios'

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
}

export function getAccountList(params: AccountParams) {
  return defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params })
}

export function getDeptList(params?: DeptListItem) {
  return defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params })
}

export function getMenuList(params?: MenuParams) {
  return defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params })
}

export function getRoleListByPage(params?: RolePageParams) {
  return defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params })
}

export function getAllRoleList(params?: RoleParams) {
  return defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params })
}

export function setRoleStatus(id: number, status: string) {
  return defHttp.post({ url: Api.setRoleStatus, params: { id, status } })
}

export function isAccountExist(account: string) {
  return defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' })
}
