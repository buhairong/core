import instance from '../base'
import type { IFinancialSearch, IBrand, IFinancialList, IFinancialSetParams, ICity } from '@/types'

// 查询筛选条件
export function selectSubscribeFinancialScheme(data: IFinancialSearch) {
  return instance<IFinancialList, IFinancialList>({
    url: '/manager/financialManager/listBySubscribeFinancialScheme',
    method: 'POST',
    data
  })
}

// 删除金融方案
export function deleteSubscribeFinancialScheme(data: { ids: number[] }) {
  return instance({
    url: '/manager/financialManager/deleteSubscribeFinancialScheme',
    method: 'POST',
    data
  })
}

// 创建金融方案
export function createSubscribeFinancialScheme(data: IFinancialSetParams) {
  return instance({
    url: '/manager/financialManager/createSubscribeFinancialScheme',
    method: 'POST',
    data
  })
}

// 修改金融方案
export function updateSubscribeFinancialScheme(data: IFinancialSetParams) {
  return instance({
    url: '/manager/financialManager/updateSubscribeFinancialScheme',
    method: 'POST',
    data
  })
}

// 金融方案详情
export function detailSubscribeFinancialScheme(params: { id: number }) {
  return instance<IFinancialSetParams, IFinancialSetParams>({
    url: '/manager/financialManager/detailSubscribeFinancialScheme',
    method: 'GET',
    params
  })
}

// 获取开放品牌
export function getCarBrand() {
  return instance<IBrand[], IBrand[]>({
    url: '/manager/financialManager/getCarBrand',
    method: 'POST'
  })
}

// 获取开放城市
export function getCity() {
  return instance<ICity[], ICity[]>({
    url: '/manager/financialManager/city/getAll',
    method: 'GET'
  })
}
