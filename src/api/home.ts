import instance from './base'
import type { IFirstMenuParams, IChildMenuParams } from '@/types/home'

// 查询一级菜单
export function findFirstMenus(data: IFirstMenuParams) {
  return instance({
    url: '/security/authorise/findFirstMenus',
    method: 'POST',
    data
  })
}

// 查询子菜单
export function findSecondMenus(data: IChildMenuParams) {
  return instance({
    url: '/security/authorise/findSecondMenus',
    method: 'POST',
    data
  })
}
