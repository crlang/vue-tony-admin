/**
 * 登录
 */
export interface ParamsLogin {
  username: string;
  password: string;
  icv: string;
  imgCode: string;
}

/**
 * 登录
 */
export interface ResponseLogin {
  id: number;
  userName: string;
  nickName: string;
  avatar: string;
  role: number;
  roleName: string;
  group: number;
  status: number;
  emailBind: number;
  mobileBind: number;
  token: string;
}
