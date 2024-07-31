import { defHttp } from '@/utils/http/axios'

const basicUri = '/basic/'
enum Api {
  GetColorCode = `${basicUri}colors`,
  GetSMSCode = `${basicUri}smscode`,
}

/**
 * 获取示例颜色
 */
export function ApiBasicColor() {
  return defHttp.get<string[]>({ url: Api.GetColorCode })
}

/**
 * 发起短信验证码
 */
export function ApiSMSCode() {
  return defHttp.post<boolean>({ url: Api.GetSMSCode })
}
