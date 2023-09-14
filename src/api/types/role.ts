import { BaseParamsList, BaseResponseList } from './common';

/**
 * 分页列表-角色
 */
export interface ParamsRolePage extends BaseParamsList {}

/**
 * 列表-角色
 */
export interface ParamsRoleList {
  keyname?: string;
  status?: number;
}

/**
 * 新增-角色
 */
export interface ParamsRoleAdd {
  name: string;
  status: number;
  description?: string;
  sort?: number;
  isSystem?: number;
  defaultPath?: string;
}

/**
 * 编辑-角色
 */
export interface ParamsRoleEdit extends ParamsRoleAdd {
  id: string;
}

/**
 * 详情-角色
 */
export interface ResponseRoleInfo {
  id: number;
  name: string;
  description: string;
  sort: number;
  createTime: number;
  updateTime: number;
  isSystem: number;
  status: number;
  defaultPath: string;
}

/**
 * 分页列表-角色
 */
export type ResponseRolePage = BaseResponseList<ResponseRoleInfo>;

/**
 * 列表-角色
 */
export type ResponseRoleList = ResponseRoleInfo[];
