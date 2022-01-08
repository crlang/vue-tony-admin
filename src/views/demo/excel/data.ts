import { BasicColumn } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    label: 'ID',
    prop: 'id',
    width: 80,
  },
  {
    label: '姓名',
    prop: 'name',
    width: 120,
  },
  {
    label: '年龄',
    prop: 'age',
    width: 80,
  },
  {
    label: '编号',
    prop: 'no',
    width: 80,
  },
  {
    label: '地址',
    prop: 'address',
  },
  {
    label: '开始时间',
    prop: 'beginTime',
  },
  {
    label: '结束时间',
    prop: 'endTime',
  },
]

export const data: any[] = (() => {
  const arr: any[] = []
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: index + 1,
      name: `${index} John Brown`,
      age: `${index + 10}`,
      no: `${index}98678`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    })
  }
  return arr
})()

// ["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"]
export const arrHeader = columns.map((column) => column.title)
// [["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"],["0", "0 John Brown", "10", "098678"]]
export const arrData = data.map((item) => {
  return Object.keys(item).map((key) => item[key])
})
