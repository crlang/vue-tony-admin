import { FormSchema } from '@/components/Form'

export const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
]
export const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
}

export const basicSchemas: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'ElDivider',
    label: '基础字段',
  },
  {
    field: 'field1',
    component: 'ElInput',
    label: '字段1',
    colProps: {
      span: 8,
    },
    subLabel: '( 选填 )',
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e)
        },
      }
    },
    renderComponentContent: () => {
      return {
        prefix: () => 'Be',
        suffix: () => 'Af',
      }
    },
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: '字段2',
    required: true,
    defaultValue: '111',
    colProps: {
      span: 8,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e)
      },
    },
    prepend: '第',
    append: '天',
  },
  {
    field: 'field3',
    component: 'ElDatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
    componentProps: {
      type: 'date',
    },
  },
  {
    field: 'field4',
    component: 'ElSelect',
    label: '字段4',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'ElCheckboxGroup',
    label: '字段5',
    // The default value must be an array
    defaultValue: [],
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field6',
    component: 'ElRadio',
    label: '字段6',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field7',
    component: 'ElRadioGroup',
    label: '字段7',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field8',
    component: 'ElCheckbox',
    label: '字段8',
    colProps: {
      span: 8,
    },
    // If you don't specify a value, it will return true/false
    // componentProps: {
    //   'true-label': 1,
    //   'false-label': 0
    // },
    renderComponentContent: 'Check',
  },
  {
    field: 'field9',
    component: 'ElSwitch',
    label: '字段9',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field10',
    component: 'ElRadioButton',
    label: '字段10',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field11',
    component: 'ElCascader',
    label: '字段11',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    field: 'divider-api-select',
    component: 'ElDivider',
    label: '远程下拉演示',
  },
  {
    field: 'field31',
    component: 'ElSelect',
    label: '懒加载远程下拉',
    helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
    slot: 'localSearch',
    colProps: {
      span: 8,
    },
    defaultValue: '0',
  },
  {
    field: 'field32',
    component: 'ElSelect',
    label: '下拉远程搜索',
    helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
    slot: 'remoteSearch',
    colProps: {
      span: 8,
    },
    defaultValue: '0',
  },
  {
    field: 'divider-linked',
    component: 'ElDivider',
    label: '字段联动',
  },
  {
    field: 'province',
    component: 'ElSelect',
    label: '省份',
    colProps: {
      span: 8,
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: provincesOptions,
        placeholder: '省份与城市联动',
        onChange: (e: any) => {
          let citiesOptions =
              e === 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id]
          if (e === undefined) {
            citiesOptions = []
          }
          formModel.city = undefined //  reset city value
          const { updateSchema } = formActionType
          updateSchema({
            field: 'city',
            componentProps: {
              options: citiesOptions,
            },
          })
        },
      }
    },
  },
  {
    field: 'city',
    component: 'ElSelect',
    label: '城市',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [], // defalut []
      placeholder: '省份与城市联动',
    },
  },
  {
    field: 'divider-selects',
    component: 'ElDivider',
    label: '互斥多选',
    helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
  },
  {
    field: 'selectA',
    component: 'ElSelect',
    label: '互斥SelectA',
    slot: 'selectA',
    defaultValue: [],
    colProps: {
      span: 8,
    },
  },
  {
    field: 'selectB',
    component: 'ElSelect',
    label: '互斥SelectB',
    slot: 'selectB',
    defaultValue: [],
    colProps: {
      span: 8,
    },
  },
  {
    field: 'divider-others',
    component: 'ElDivider',
    label: '其它',
  },
  {
    field: 'field21',
    component: 'ElInputNumber',
    label: '字段21',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field22',
    component: 'ElSlider',
    label: '字段22',
    componentProps: {
      min: 0,
      max: 100,
      range: true,
      marks: {
        20: '20°C',
        60: '60°C',
      },
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field23',
    component: 'ElRate',
    label: '字段23',
    defaultValue: 3,
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: false,
      allowHalf: true,
    },
  },
]

export const UseSchemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'ElInput',
    label: '字段1',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '自定义placeholder',
      onChange: (e: any) => {
        console.log(e)
      },
    },
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: '字段2',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field3',
    component: 'ElDatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
    componentProps: {
      type: 'date',
      // ,onChange: (e: any) => {
      // }
    },
  },
  {
    field: 'field4',
    component: 'ElSelect',
    label: '字段4',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'ElCheckboxGroup',
    defaultValue: [],
    label: '字段5',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field7',
    component: 'ElRadioGroup',
    label: '字段7',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
]

export const dyncSchemas: FormSchema[] = [
  {
    field: 'field5',
    component: 'ElSwitch',
    label: '是否显示字段1(css控制)',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
  {
    field: 'field1',
    component: 'ElInput',
    label: '字段1',
    colProps: {
      span: 8,
    },
    show: ({ values }) => {
      return !!values.field5
    },
  },
  {
    field: 'field6',
    component: 'ElSwitch',
    label: '是否显示字段2(dom控制)',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: '字段2',
    colProps: {
      span: 8,
    },
    ifShow: ({ values }) => {
      return !!values.field6
    },
  },
  {
    field: 'field3',
    component: 'ElDatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
    dynamicDisabled: ({ values }) => {
      return !!values.field7
    },
  },
  {
    field: 'field4',
    component: 'ElSelect',
    label: '字段4',
    colProps: {
      span: 8,
    },
    dynamicRules: ({ values }) => {
      return values.field8 ? [{ required: true, message: '字段4必填' }] : []
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field11',
    component: 'ElDatePicker',
    label: '字段11',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field7',
    component: 'ElSwitch',
    label: '是否禁用字段3',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
  {
    field: 'field8',
    component: 'ElSwitch',
    label: '字段4是否必填',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
]

export const dyncSchemas1: FormSchema[] = [
  {
    field: 'f1',
    component: 'ElInput',
    label: 'F1',
    colProps: {
      span: 12,
    },
    labelWidth: 200,
    componentProps: ({ formModel }) => {
      return {
        placeholder: '同步f2的值为f1',
        onChange: (e: any) => {
          formModel.f2 = e
        },
      }
    },
  },
  {
    field: 'f2',
    component: 'ElInput',
    label: 'F2',
    colProps: {
      span: 12,
    },
    labelWidth: 200,
    componentProps: { disabled: true },
  },
  {
    field: 'f3',
    component: 'ElInput',
    label: 'F3',
    colProps: {
      span: 12,
    },
    labelWidth: 200,
    componentProps: ({ formActionType }) => {
      return {
        placeholder: '值改变时执行查询,查看控制台',
        onChange: async () => {
          const { validate } = formActionType
          await validate()
        },
      }
    },
  },
]
