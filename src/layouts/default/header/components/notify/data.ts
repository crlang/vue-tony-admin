import { EleTag } from '@/components/ElementPlus'

export interface ListItem {
  id: string
  avatar: string
  title: string
  titleDelete?: boolean
  datetime: string
  type: string
  read?: boolean
  description: string
  clickClose?: boolean
  extra?: string
  color?: EleTag['type']
}

export interface TabItem {
  key: string
  name: string
  list: ListItem[]
  unreadlist?: ListItem[]
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: 'Notify',
    list: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '',
        description: '',
        datetime: '2021-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '',
        description: '',
        datetime: '2021-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        // read: true,
        type: '1',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title:
          '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
      {
        id: '000000009',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
      {
        id: '000000010',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '1',
      },
    ],
  },
  {
    key: '2',
    name: 'Message',
    list: [
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '',
        description: '',
        datetime: '2021-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '',
        description:
          '',
        datetime: '2021-08-07',
        type: '2',
        clickClose: true,
      },
    ],
  },
  {
    key: '3',
    name: 'Plan',
    list: [
      {
        id: '000000009',
        avatar: '',
        title: '',
        description: ' 2021-01-12 20:00 ',
        datetime: '',
        extra: '',
        color: 'info',
        type: '3',
      },
      {
        id: '000000010',
        avatar: '',
        title: '',
        description: '  2021-01-07 ',
        datetime: '',
        extra: '',
        color: 'warning',
        type: '3',
      },
      {
        id: '000000011',
        avatar: '',
        title: '',
        description: ' 2021-01-09 ',
        datetime: '',
        extra: ' 8 ',
        color: 'success',
        type: '3',
      },
      {
        id: '000000012',
        avatar: '',
        title: 'ABCD ',
        description: ' 2021-01-09 ',
        datetime: '',
        extra: '',
        color: '',
        type: '3',
      },
    ],
  },
]
