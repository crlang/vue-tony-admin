// Interface data format used to return a unified format
// import { Random } from 'mockjs'
import { ResultEnum } from '@/enums/httpEnum'

export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    result,
    message,
    type: 'success',
  }
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}

export function resultError(
  message = 'Request failed',
  { code = ResultEnum.ERROR, result = null } = {},
) {
  return {
    code,
    result,
    message,
    type: 'error',
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}

export const getDemoRandomCount = (num = 20) => Math.ceil(Math.random() * num) + 1

// export function getRandomPics(count = 10): string[] {
//   const arr: string[] = []
//   for (let i = 0; i < count; i++) {
//     arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()))
//   }
//   return arr
// }

export function getRandomItem(id = '', code = '') {
  const item = {
    // beginTime: '@datetime',
    // endTime: '@datetime',
    // address: '@county(true)',
    // sex: '@integer(1,2)',
    // name: '@first()',
    // id: undefined,
    // nickname: '@cname()',
    // description: '@cparagraph()',
    // age: '@integer(1,100)',
    // avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
    // imgs: getRandomPics(getDemoRandomCount()),
    // photos: getRandomPics(getDemoRandomCount()),
    // date: `@date('yyyy-MM-dd')`,
    // time: `@time('HH:mm')`,
    // 'no|100000-10000000': 100000,
    // type: '@integer(1,3)',
    // 'status|1': ['normal', 'enable', 'disable'],
  }
  if (id) item.id = id
  if (code) item.code = code

  return item
}
