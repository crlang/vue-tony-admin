import type { GetAccountInfoModel } from './model/accountModel';

import { defHttp } from '@/utils/http/axios';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  TOKEN_EXPIRED = '/user/tokenExpired',
}

export const accountInfoApi = () => {
  return defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
};

export const tokenExpiredApi = () => {
  return defHttp.post<void>({ url: Api.TOKEN_EXPIRED });
};
