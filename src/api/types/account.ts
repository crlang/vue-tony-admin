import { ResponseMenuInfo } from './menu';

/**
 * 修改密码
 */
export interface ParamsChangePassword {
  oldpassword: string;
  password: string;
  repassword: string;
}

/**
 * 用户信息
 */
export interface ResponseGetUserInfo {
  avatar: string;
  createTime: string;
  email: string;
  emailBind: number;
  expireTime: number;
  group: number;
  id: number;
  mobile: string;
  mobileBind: number;
  money: string;
  nickname: string;
  role: string[];
  roleInfo: {
    id: number;
    name: string;
  }[];
  score: number;
  sort: number;
  status: number;
  updateTime: string;
  username: string;
  description?: string;
  projectCount?: number;
  teamTotal?: number;
  teamIndex?: number;
  projectViews?: number;
}

/**
 * 用户菜单
 */
export type ResponseGetMenuList = ResponseMenuInfo[];
