import { FormSchema } from '@/components/Form'

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'ElInput',
    label: '标题',
    componentProps: {
      placeholder: '给目标起个名字',
    },
    required: true,
  },
  {
    field: 'time',
    component: 'ElDatePicker',
    label: '起止日期',
    required: true,
    componentProps: {
      type: 'daterange',
    },
  },
  {
    field: 'target',
    component: 'ElInput',
    label: '目标描述',
    componentProps: {
      placeholder: '请输入你的阶段性工作目标',
      type: 'textarea',
      rows: 4,
    },
    required: true,
  },
  {
    field: 'metrics',
    component: 'ElInput',
    label: '衡量标准',
    componentProps: {
      placeholder: '请输入衡量标准',
      type: 'textarea',
      rows: 4,
    },
    required: true,
  },
  {
    field: 'client',
    component: 'ElInput',
    label: '客户',
    helpMessage: '目标的服务对象',
    subLabel: '( 选填 )',
    componentProps: {
      placeholder: '请描述你服务的客户，内部客户直接 @姓名／工号',
    },
  },
  {
    field: 'inviteer',
    component: 'ElInput',
    label: '邀评人',
    subLabel: '( 选填 )',
    componentProps: {
      placeholder: '请直接 @姓名／工号，最多可邀请 5 人',
    },
  },
  {
    field: 'weights',
    component: 'ElInputNumber',
    label: '权重',
    subLabel: '( 选填 )',
    componentProps: {
      formatter: (value: string) => (value ? `${value}%` : ''),
      parser: (value: string) => value.replace('%', ''),
      placeholder: '请输入',
    },
  },
  {
    field: 'disclosure',
    component: 'ElRadioGroup',
    label: '目标公开',
    itemProps: {
      extra: '客户、邀评人默认被分享',
    },
    componentProps: {
      options: [
        {
          label: '公开',
          value: '1',
        },
        {
          label: '部分公开',
          value: '2',
        },
        {
          label: '不公开',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'disclosurer',
    component: 'ElSelect',
    label: ' ',
    show: ({ model }) => {
      return model.disclosure === '2'
    },
    componentProps: {
      placeholder: '公开给',
      mode: 'multiple',
      options: [
        {
          label: '同事1',
          value: '1',
        },
        {
          label: '同事2',
          value: '2',
        },
        {
          label: '同事3',
          value: '3',
        },
      ],
    },
  },
]
