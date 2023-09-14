import { BaseParamsList, BaseResponseList } from './common';

/**
 * 分页列表-部门
 */
export interface ParamsDepartmentPage extends BaseParamsList {}

/**
 * 列表-部门
 */
export interface ParamsDepartmentList {
  keyname?: string;
  status?: number;
}

/**
 * 新增-部门
 */
export interface ParamsDepartmentAdd {
  id: number;
  name: string;
  title: string;
  icon?: string;
  description?: string;
  sort?: number;
  status?: number;
}

/**
 * 编辑-部门
 */
export interface ParamsDepartmentEdit extends ParamsDepartmentAdd {
  id: string;
}

/**
 * 详情-部门
 */
export interface ResponseDepartmentInfo {
  id: number;
  name: string;
  title: string;
  icon: string;
  description: string;
  sort: number;
  status: number;
  createTime: number;
  updateTime: number;
}

/**
 * 分页列表-部门
 */
export type ResponseDepartmentPage = BaseResponseList<ResponseDepartmentInfo>;

/**
 * 列表-部门
 */
export type ResponseDepartmentList = ResponseDepartmentInfo[];
