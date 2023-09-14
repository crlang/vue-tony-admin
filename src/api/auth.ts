import { defHttp } from '@/utils/http/axios';
import { ParamsLogin, ResponseLogin } from './types';

const basicUri = '/v1/auth/';
enum Api {
  Login = `${basicUri}login`,
}

/**
 * 登录
 *
 * @param params
 */
export function ApiLogin(params: ParamsLogin) {
  return defHttp.post<ResponseLogin>({ url: Api.Login, params }, { errorMessageMode: 'modal' });
}
