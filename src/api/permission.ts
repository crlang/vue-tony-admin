import { defHttp } from '@/utils/http/axios';

const basicUri = '/v1/permission/';
enum Api {
  GetPermCode = `${basicUri}getPermCode`,
}

/**
 * 获取后端权限代码
 */
export function ApiPermissionCode() {
  return defHttp.get<number[]>({ url: Api.GetPermCode });
}
