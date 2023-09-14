import { BaseParamsList, BaseResponseList } from './common';

/**
 * 分页列表-菜单
 */
export interface ParamsMenuPage extends BaseParamsList {}

/**
 * 列表-菜单
 */
export interface ParamsMenuList {
  keyname?: string;
  status?: number;
}

/**
 * 新增-菜单
 */
export interface ParamsMenuAdd {
  title: string;
  path: string;
  name: string;
  component: string;
  parent_id?: number;
  alias?: string;
  components?: string;
  fullPath?: string;
  redirect?: string;
  icon?: string;
  hideMenu?: number;
  ignoreAuth?: number;
  roles?: string;
  ignoreKeepAlive?: number;
  affix?: number;
  transitionName?: string;
  orderNo?: number;
  single?: number;
  hideChildrenInMenu?: number;
  hideBreadcrumb?: number;
  frameSrc?: string;
  isLink?: number;
  ignoreRoute?: number;
  hidePathForChildren?: number;
  currentActiveMenu?: string;
  hideTab?: number;
  carryParam?: string;
  status?: number;
  isSystem?: number;
}

/**
 * 编辑-菜单
 */
export interface ParamsMenuEdit extends ParamsMenuAdd {
  id: string;
}

/**
 * 详情-菜单
 */
export interface ResponseMenuInfo {
  id: number;
  parent_id: number;
  path: string;
  name: string;
  component: string;
  alias: string;
  components: string;
  fullPath: string;
  redirect: string;
  meta: {
    title: string;
    icon: string;
    hideMenu: number;
    ignoreAuth: number;
    roles: string;
    ignoreKeepAlive: number;
    affix: number;
    transitionName: string;
    orderNo: number;
    single: number;
    hideChildrenInMenu: number;
    hideBreadcrumb: number;
    frameSrc: string;
    isLink: number;
    ignoreRoute: number;
    hidePathForChildren: number;
    currentActiveMenu: string;
    hideTab: number;
    carryParam: string;
  };
  status: number;
  isSystem: number;
  createTime: number;
  updateTime: number;
  deleteTime: number;
}

/**
 * 分页列表-菜单
 */
export type ResponseMenuPage = BaseResponseList<ResponseMenuInfo>;

/**
 * 列表-菜单
 */
export type ResponseMenuList = ResponseMenuInfo[];
