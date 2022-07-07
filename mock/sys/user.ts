import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Administrator',
      avatar: 'https://himg.bdimg.com/sys/portrait/hotitem/wildkid/31',
      desc: '致敬钢铁侠！如同Tony的机甲一般，模块组合的前端框架。',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'manager',
          value: 'admin',
        },
      ],
    },
    {
      userId: '2',
      username: 'tony',
      password: '123456',
      realName: 'Tony Stark',
      avatar: 'https://himg.bdimg.com/sys/portrait/hotitem/wildkid/49',
      desc: "Salute to Iron Man! Like Tony's mecha, the front-end framework for modular combinations.",
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'tester',
          value: 'test',
        },
      ],
    },
  ]
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
}
export default [
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find((item) => item.username === username && password === item.password)
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      })
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      const codeList = fakeCodeList[checkUser.userId]

      return resultSuccess(codeList)
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },
] as MockMethod[]
