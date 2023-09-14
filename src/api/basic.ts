import { defHttp } from '@/utils/http/axios';
import { ResponseCodeImg } from './types';

const basicUri = '/v1/basic/';
enum Api {
  GetCodeImg = `${basicUri}codeImg`,
  GetColorCode = `${basicUri}colors`,
}

/**
 * 获取验证码
 */
export function ApiVerifyCodeImg() {
  return defHttp.get<ResponseCodeImg>({ url: Api.GetCodeImg });
}

/**
 * 获取示例颜色
 */
export function ApiBasicColor() {
  return defHttp.get<string[]>({ url: Api.GetColorCode });
}
