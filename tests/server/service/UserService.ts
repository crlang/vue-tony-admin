import { Result } from '../utils'

const fakeUserInfo = {
  userId: '1',
  username: 'tony',
  realName: 'Tony Admin',
  desc: 'manager',
  password: '123456',
  token: 'fakeToken1',
  roles: [
    {
      roleName: 'Admin user',
      value: 'admin',
    },
  ],
}
export default class UserService {
  async login() {
    return Result.success(fakeUserInfo)
  }

  async getUserInfoById() {
    return Result.success(fakeUserInfo)
  }
}
