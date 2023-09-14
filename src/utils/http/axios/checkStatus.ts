import type { ErrorMessageMode } from '#/axios';

import { useMessage } from '@/hooks/web/useMessage';
import { useUserStoreWithOut } from '@/store/modules/user';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message'): void {
  const userStore = useUserStoreWithOut();
  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      userStore.setToken(undefined);
      errMessage = msg || '权限不足!';
      userStore.logout(true);
      break;
    case 403:
      errMessage = msg || '禁止访问!';
      break;
    // 404请求不存在
    case 404:
      errMessage = msg || '网络请求错误，内容不存在!';
      break;
    case 405:
      errMessage = msg || '网络请求错误，请求方法未允许!';
      break;
    case 408:
      errMessage = msg || '网络请求超时!';
      break;
    case 500:
      errMessage = msg || '服务器错误，请联系管理员!';
      break;
    case 501:
      errMessage = msg || '网络未实现!';
      break;
    case 502:
      errMessage = msg || '网络错误!';
      break;
    case 503:
      errMessage = msg || '服务不可用，服务器暂时过载或维护!';
      break;
    case 504:
      errMessage = msg || '网络超时!';
      break;
    case 505:
      errMessage = msg || 'http版本不支持该请求!';
      break;
    default:
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: '温馨提示', message: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ message: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
