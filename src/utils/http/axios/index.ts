// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

import { cloneDeep } from 'lodash-es';
import axios from 'axios';

import { useGlobSetting } from '@/hooks/setting';
import { useMessage } from '@/hooks/web/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString, isUnDef, isNull, isEmpty } from '@/utils/is';
import { getToken } from '@/utils/auth';
import { setObjToUrlParams, deepMerge } from '@/utils';
import { useErrorLogStoreWithOut } from '@/store/modules/errorLog';
import { useUserStoreWithOut } from '@/store/modules/user';

import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { AxiosRetry } from './axiosRetry';
import { joinTimestamp, formatRequestDate } from './helper';

const { urlPrefix, apiUrl } = useGlobSetting();
const { createMessage, createErrorModal, createSuccessModal } = useMessage();

/**
 * 数据处理
 */
const transform: AxiosTransform = {
  /**
   * 处理响应数据
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    if (!res.data) {
      throw new Error('请求出错，请稍候重试');
    }
    // 这里 code, data, message 为后台返回的字段，修改此处的同时，也要修改 types/axios.d.ts 的返回格式
    const { code, data, message } = res.data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = res.data && Reflect.has(res.data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      let successMsg = message;

      if (isNull(successMsg) || isUnDef(successMsg) || isEmpty(successMsg)) {
        successMsg = '操作成功';
      }

      if (options.successMessageMode === 'modal') {
        createSuccessModal({ title: '温馨提示', message: successMsg });
      } else if (options.successMessageMode === 'message') {
        createMessage.success(successMsg);
      }
      return data;
    }

    // 此处根据自己项目的实际情况对不同的 code 执行不同的操作
    let timeoutMsg = '';
    if (code === ResultEnum.TIMEOUT) {
      timeoutMsg = '登录超时，请重新登录!';
      const userStore = useUserStoreWithOut();
      userStore.setToken(undefined);
      userStore.logout(true);
    } else {
      if (message) {
        timeoutMsg = message;
      }
    }

    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: '温馨提示', message: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || '请求出错，请稍候重试');
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理 config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.token = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
    }
    return config;
  },

  /**
   * 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message || response?.data?.message || '';
    const err: string = error?.toString?.() ?? '';
    const ers = error?.response?.status || 0;
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时，请刷新页面重试!';
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!';
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: '温馨提示', message: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(ers, msg, errorMessageMode);

    // 添加自动重试机制，对于无权限及不存在接口则不进行重试
    const retryWhiteCode = [401, 404];
    if (!retryWhiteCode.includes(ers)) {
      const retryRequest = new AxiosRetry();
      const { isOpenRetry } = config.requestOptions.retryRequest;
      config.method?.toUpperCase() === RequestEnum.GET && isOpenRetry && retryRequest.retry(axiosInstance, error);
    }

    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        // 默认json格式
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform: cloneDeep(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将 prefix 添加到 url
          joinPrefix: true,
          // 不返回原生响应头
          isReturnNativeResponse: false,
          // 对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候不添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 错误消息提示
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();
