import type { MockMethod } from 'vite-plugin-mock'

import { getDemoRandomCount, getRandomItem, resultPageSuccess } from '../_util'

const demoList = (() => {
  const result: any[] = []
  for (let i = 0; i < 31; i++) {
    const item = getRandomItem(i + 1, `0-${i + 1}`)
    const len = getDemoRandomCount(10)
    item.children = []
    for (let j = 0; j < len; j++) {
      const chilItem = getRandomItem(j + 1, `${i + 1}-${j}`)
      item.children.push(chilItem)
    }
    result.push(item)
  }
  return result
})()

export default [
  {
    url: '/basic-api/tree/getDemoTreeList',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
