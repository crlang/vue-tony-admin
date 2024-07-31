import type { ParamsLogin, ResponseLogin } from './types'

import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = '/auth/login',
  CaptchaImg = '/auth/captcha',
}

/**
 * 登录
 */
export function ApiLogin(params: ParamsLogin) {
  return defHttp.post<ResponseLogin>({ url: Api.Login, params })
}

/**
 * 图像验证码
 */
export function ApiCaptchaImg() {
  return defHttp.get<{
    icv: string
    base64: string
  }>({ url: Api.CaptchaImg })
}
