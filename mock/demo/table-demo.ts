import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { resultPageSuccess } from '../_util'

function getRandomPics(count = 10): string[] {
  const arr: string[] = []
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()))
  }
  return arr
}

const demoList = (() => {
  const result: any[] = []
  for (let index = 0; index < 111; index++) {
    result.push({
      id: `${index + 1}`,
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      sex: '@integer(1,2)',
      name: '@first()',
      nickname: '@cname()',
      description: '@cparagraph()',
      age: '@integer(1,100)',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      imgs: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
      type: '@integer(1,3)',
      'status|1': ['normal', 'enable', 'disable'],
    })
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
