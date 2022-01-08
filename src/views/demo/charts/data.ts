import { randomNumber } from '@/utils/demo'

export const mapData:any = [
  { name: '北京', value2: randomNumber(100000) },
  { name: '天津', value: randomNumber(100000) },
  { name: '上海', value: randomNumber(100000) },
  { name: '重庆', value: randomNumber(100000) },
  { name: '河北', value: randomNumber(100000) },
  { name: '河南', value: randomNumber(100000) },
  { name: '云南', value: randomNumber(100000) },
  { name: '辽宁', value: randomNumber(100000) },
  { name: '黑龙江', value: randomNumber(100000) },
  { name: '湖南', value: randomNumber(100000) },
  { name: '安徽', value: randomNumber(100000) },
  { name: '山东', value: randomNumber(100000) },
  { name: '新疆', value: randomNumber(100000) },
  { name: '江苏', value: randomNumber(100000) },
  { name: '浙江', value: randomNumber(100000) },
  { name: '江西', value: randomNumber(100000) },
  { name: '湖北', value: randomNumber(100000) },
  { name: '广西', value: randomNumber(100000) },
  { name: '甘肃', value: randomNumber(100000) },
  { name: '山西', value: randomNumber(100000) },
  { name: '内蒙古', value: randomNumber(100000) },
  { name: '陕西', value: randomNumber(100000) },
  { name: '吉林', value: randomNumber(100000) },
  { name: '福建', value: randomNumber(100000) },
  { name: '贵州', value: randomNumber(100000) },
  { name: '广东', value: randomNumber(100000) },
  { name: '青海', value: randomNumber(100000) },
  { name: '西藏', value: randomNumber(100000) },
  { name: '四川', value: randomNumber(100000) },
  { name: '宁夏', value: randomNumber(100000) },
  { name: '海南', value: randomNumber(100000) },
  { name: '南海诸岛', value: randomNumber(100000) },
  { name: '台湾', value: randomNumber(100000) },
  { name: '香港', value: randomNumber(100000) },
  { name: '澳门', value: randomNumber(100000) },
]

export const getLineData = () => {
  const category: any[] = []
  let dottedBase = +new Date()
  const lineData: any[] = []
  const barData: any[] = []

  for (let i = 0; i < 20; i++) {
    const date = new Date((dottedBase += 1000 * 3600 * 24))
    category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'))
    const b = randomNumber(3000)
    const d = randomNumber(3000)
    barData.push(b)
    lineData.push(d + b)
  }
  return { barData, category, lineData }
}

export const getNightingaleData = () => {
  const dt: any[] = []
  for (let i = 1; i < 10; i++) {
    dt.push({ value: 10 * i, name: 'Nightingale ' + i })
  }
  return dt
}

export const getPieData = () => {
  const category: any[] = []
  let dottedBase = +new Date()
  const lineData: any[] = []
  const barData: any[] = []

  for (let i = 0; i < 20; i++) {
    const date = new Date((dottedBase += 1000 * 3600 * 24))
    category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'))
    const b = Math.random() * 200
    const d = Math.random() * 200
    barData.push(b)
    lineData.push(d + b)
  }
  return { barData, category, lineData }
}
