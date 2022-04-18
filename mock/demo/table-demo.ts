import type { MockMethod } from 'vite-plugin-mock'

import { getRandomItem, resultPageSuccess } from '../_util'

const demoList = (() => {
  const result: any[] = []
  for (let index = 0; index < 111; index++) {
    result.push(getRandomItem(index + 1, `k-${index + 1}`))
  }
  return result
})()

export default [
  {
    url: '/basic-api/table/getDemoList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
