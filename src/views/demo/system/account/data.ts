import { isAccountExist } from '@/api/demo/system'
import { BasicFormSchema } from '@/components/BasicForm'

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'ElInput',
    colProps: { span: 8 },
  },
]

export const accountFormSchema: BasicFormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'ElInput',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败')
              })
          })
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'ElInput',
    required: true,
    ifShow: false,
    componentProps: {
      showPassword: true,
    },

  },
  {
    label: '角色',
    field: 'role',
    component: 'ElSelect',
    slot: 'role',
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'ElInput',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'ElInput',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'ElInput',
    componentProps: {
      type: 'textarea',
    },
  },
]
