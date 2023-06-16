import instance from './base'
import type { ILogin } from '@/types/login'

// 登录
export function accountLoginNotify(data: ILogin) {
  return instance({
    url: '/security/authorise/manager/login/accountLoginNotify',
    method: 'POST',
    data
  })
}
