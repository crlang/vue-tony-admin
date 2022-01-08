import { BasicColumn } from '@/components/Table'
import { FormSchema } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    label: '角色名称',
    prop: 'roleName',
    width: 200,
  },
  {
    label: '角色值',
    prop: 'roleValue',
    width: 180,
  },
  {
    label: '排序',
    prop: 'orderNo',
    width: 50,
  },
  {
    label: '状态',
    prop: 'status',
    width: 120,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '备注',
    prop: 'remark',
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElSelect',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
]

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'ElInput',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'ElInput',
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElRadioButton',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'ElInput',
    componentProps: {
      type: 'textarea',
    },
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'ElInput',
  },
]
