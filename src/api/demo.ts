import { defHttp } from '@/utils/http/axios';
import { ResponseCodeImg } from './types';

const basicUri = '/v1/demo/';
enum Api {
  GetColorList = `${basicUri}colorList`,
  GetDataList = `${basicUri}dataList`,
  GetTreeDataList = `${basicUri}treeList`,
}

/**
 * 获取颜色列表
 */
export function ApiDemoColorList() {
  return defHttp.get<ResponseCodeImg>({ url: Api.GetColorList });
}

/**
 * 获取数据列表-单参数
 */
export function ApiDemoDataList(keyname) {
  return defHttp.get<ResponseCodeImg>({ url: Api.GetDataList, params: { keyname } });
}

/**
 * 获取树数据列表-单参数
 */
export function ApiDemoTreeDataList(keyname) {
  return defHttp.get<ResponseCodeImg>({ url: Api.GetTreeDataList, params: { keyname } });
}

/**
 * 获取数据列表-多参数
 */
export function ApiDemoDataMpList(data) {
  return ApiDemoDataList(data?.keyname);
}

/**
 * 获取树数据列表-多参数
 */
export function ApiDemoTreeDataMpList(data) {
  return ApiDemoTreeDataList(data?.keyname);
}
