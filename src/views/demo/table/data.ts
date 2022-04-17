import { FormProps, FormSchema } from '@/components/Table'
import { BasicColumn } from '@/components/Table/src/types/table'
import { ElTag } from 'element-plus'
import { h } from 'vue'

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 100,
    },
    {
      label: '姓名',
      prop: 'nickname',
      width: 100,
    },
    {
      label: '性别',
      prop: 'sex',
      width: 100,
      filters: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
      customRender: ({ record }) => {
        const color = record.sex === 1 ? 'success' : 'danger'
        const text = record.sex === 1 ? '男' : '女'
        return h(ElTag, { type: color }, () => text)
      },
    },
    {
      label: '编号',
      prop: 'no',
      width: 100,
      sortable: true,
      defaultHidden: true,
    },
    {
      label: '地址',
      prop: 'address',
      isSlot: true,
    },
    {
      label: '描述',
      prop: 'description',
      align: 'left',
    },
    {
      label: '开始时间',
      width: 180,
      sortable: true,
      prop: 'beginTime',
    },
    {
      label: '结束时间',
      width: 180,
      sortable: true,
      prop: 'endTime',
    },
  ]
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      width: 150,
      prop: 'id',
      sortable: true,
      sortOrder: 'ascend',
    },
    {
      label: '姓名',
      prop: 'name',
      width: 120,
    },
    {
      label: '地址',
      prop: 'address',
    },
    {
      label: '编号',
      prop: 'no',
      width: 80,
    },
  ]
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 200,
    },
    {
      label: '姓名',
      prop: 'name',
      width: 120,
      isSlot: true,
    },
    {
      label: '地址',
      prop: 'address',
      // width: 120,
      // isSlot: true,
      sortable: true,
    },
    {
      label: '编号',
      prop: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      label: '开始时间',
      prop: 'beginTime',
      width: 180,
    },
    {
      label: '结束时间',
      prop: 'endTime',
      width: 180,
    },
  ]
}

export function getCustomCellColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      isSlot: true,
    },
    {
      label: '头像',
      prop: 'avatar',
      width: 100,
      isSlot: true,
    },
    {
      label: '分类',
      prop: 'category',
      width: 80,
      defaultHidden: true,
      isSlot: true,
    },
    {
      label: '姓名',
      prop: 'name',
      width: 120,
    },
    {
      label: '图片列表1',
      prop: 'imgArr',
      helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
      width: 140,
      isSlot: true,
    },
    {
      label: '照片列表2',
      prop: 'imgs',
      width: 160,
      isSlot: true,
    },
    {
      label: '地址',
      helpMessage: ['这是地址'],
      prop: 'address',
    },
    {
      label: '编号',
      prop: 'no',
      isSlot: true,
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
}

export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = []
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'ElInput',
      colProps: {
        lg: 12,
        xl: 8,
      },
    })
  }
  return arr
}
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: true,
    alwaysShowLines: 1,
    autoAdvancedLine: 1,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'ElSelect',
        colProps: {
          lg: 12,
          xl: 8,
        },
      },
    ],
  }
}

export function getTreeTableData() {
  const data: any = (() => {
    const arr: any = []
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      })
    }
    return arr
  })()

  return data
}
