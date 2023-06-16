import instance from '../base'
import type { IOrderSearch, IOrderList, IDeliveryRecord, IOrderDetail, IContract } from '@/types'

// 订单列表
export function selectOrderList(data: IOrderSearch) {
  return instance<IOrderList, IOrderList>({
    url: '/manager/userCarSubscribe/selectListByPage',
    method: 'POST',
    data
  })
}

// 查询订单可选的交车点集合
export function selectCarDeliveryListOfOrder(params: { orderId: number }) {
  return instance<IDeliveryRecord[], IDeliveryRecord[]>({
    url: '/manager/userCarSubscribe/selectCarDeliveryListOfOrder',
    method: 'GET',
    params
  })
}

// 订单绑定交车点
export function bindCarDeliveryToOrder(params: { orderId: number; carDeliveryId: number }) {
  return instance({
    url: '/manager/userCarSubscribe/bindCarDeliveryToOrder',
    method: 'GET',
    params
  })
}

// 订单详情
export function selectCarDetailInfo(params: { orderId: number }) {
  return instance<IOrderDetail, IOrderDetail>({
    url: '/manager/userCarSubscribe/selectCarDetailInfo',
    method: 'GET',
    params
  })
}

// 创建或更新合同信息
export function createOrUpdateContract(data: IContract) {
  return instance({
    url: '/manager/userCarSubscribe/createOrUpdateContract',
    method: 'POST',
    data
  })
}

// 删除合同信息
export function deleteContract(params) {
  return instance({
    url: '/manager/userCarSubscribe/deleteContract',
    method: 'GET',
    params
  })
}
