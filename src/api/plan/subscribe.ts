import instance from '../base'
import type { ISubscribeSearch, ISubscribeList } from '@/types'

// 列表查询
export function selectList(data: ISubscribeSearch) {
  return instance<ISubscribeList, ISubscribeList>({
    url: '/merchant/carSubscribe/selectCarSubscribeByPage',
    method: 'POST',
    data
  })
}

// 修改订阅方案名称
export function updateCarSubscribeName(data: {
  newType: number
  subscribeName: string
  id: number
}) {
  return instance({
    url: '/merchant/carSubscribe/updateCarSubscribeName',
    method: 'POST',
    data
  })
}

// 新车订阅配置详情
export function selectNewCarSubscribeDetail(params) {
  return instance({
    url: '/merchant/carSubscribe/selectNewCarSubscribeDetail',
    method: 'GET',
    params
  })
}

// 二手车订阅配置详情
export function selectCarSubscribeDetail(params) {
  return instance({
    url: '/merchant/carSubscribe/selectCarSubscribeDetail',
    method: 'GET',
    params
  })
}

// 新车订阅查询相符合的金融方案
export function selectFinancialScheme(data) {
  return instance({
    url: '/merchant/carSubscribe/selectFinancialScheme',
    method: 'POST',
    data
  })
}

// 计算购置税
export function calculatePurchaseTaxRatio(params) {
  return instance({
    url: '/merchant/carSubscribe/calculatePurchaseTaxRatio',
    method: 'GET',
    params
  })
}

// 获取所有开放城市
export function getAllCity() {
  return instance({
    url: '/merchant/carSubscribe/city/getAll',
    method: 'GET'
  })
}

// 计算订阅费用
export function selectDepositAndMonthPayOfApportionRate(data) {
  return instance({
    url: '/merchant/carSubscribe/selectDepositAndMonthPayOfApportionRate',
    method: 'POST',
    data
  })
}

// 订阅方案删除专属城市
export function deleteCityCarSubscribe(params: {
  id: number
  carTypeYearProductId: number
  newType: number
}) {
  return instance({
    url: '/merchant/carSubscribe/deleteCarSubscribeOfCompanyAndCity',
    method: 'GET',
    params
  })
}

// 删除单个订阅方案
export function deleteCarSubscribe(params) {
  return instance({
    url: '/merchant/carSubscribe/deleteCarSubscribe',
    method: 'GET',
    params
  })
}

// 删除订阅方案
export function deleteCarSubscribeByCity(params: {
  id: number
  carTypeYearProductId: number
  newType: number
}) {
  return instance({
    url: '/merchant/carSubscribe/deleteCarSubscribeByCity',
    method: 'GET',
    params
  })
}

// 新增修改订阅方案
export function insertCarSubscribe(data) {
  return instance({
    url: '/merchant/carSubscribe/insertCarSubscribe',
    method: 'POST',
    data
  })
}

// 二手车方案查询二手车集合
export function selectSecondHandCarsByMerchant(data) {
  return instance({
    url: '/merchant/carSubscribe/selectSecondHandCarsByMerchant',
    method: 'POST',
    data
  })
}
