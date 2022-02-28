import { FormSchema } from '@/components/Form'
import { Search } from '@element-plus/icons'

export const searchList = (() => {
  const result: any[] = []
  for (let i = 0; i < 6; i++) {
    result.push({
      id: i,
      title: i + '-Tony Admin',
      description: ['Tony', 'Vue3', 'Typescript'],
      content: '基于 Vue3, Vite2, TypeScript, Element Plus 实现的一套完整的企业级后台管理系统',
      time: '2020-11-14 11:20',
    })
  }
  return result
})()

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
]

export const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'ElInput',
    label: '项目名',
    colProps: {
      span: 8,
    },
    componentProps: {
      'prefix-icon': Search,
      onChange: (e: any) => {
        console.log(e)
      },
    },
  },
]
