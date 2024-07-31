import type { ParamsLogin, ResponseLogin } from './types'
import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = `/auth/login`,
  GetCodeImg = `/auth/captcha`,
}

/**
 * 登录
 *
 * @param params
 */
export function ApiLogin(params: ParamsLogin) {
  return defHttp.post<ResponseLogin>({ url: Api.Login, params })
}

/**
 * 获取图像验证码
 */
export function ApiVerifyCodeImg() {
  return defHttp.get({ url: Api.GetCodeImg })
}
