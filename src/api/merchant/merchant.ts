import instance from '../base'
import type {
  ISearch,
  IList,
  ICity,
  IOpenOrCloseCarTypeParams,
  IMerchantDetail,
  ISetMerchant
} from '@/types'

// 列表查询
export function getMerchantList(data: ISearch) {
  return instance<IList, IList>({
    url: '/manager/company/company/selectByPage',
    method: 'POST',
    data
  })
}

// 城市查询
export function getAllCity() {
  return instance<ICity[], ICity[]>({
    url: '/manager/company/allCity',
    method: 'GET'
  })
}

// 删除商户
export function deleteMerchant(data: number[]) {
  return instance({
    url: '/manager/company/company/delete',
    method: 'POST',
    data
  })
}

// 打开或关闭 展示所有车型
export function openOrCloseCarType(params: IOpenOrCloseCarTypeParams) {
  return instance({
    url: '/manager/company/company/updateCompanyFinancial',
    method: 'GET',
    params
  })
}

// 汽车经销商、金融服务商详情
export function getCompanyDetail(params: { companyId: number }) {
  return instance<IMerchantDetail, IMerchantDetail>({
    url: '/manager/company/companyDetail',
    method: 'GET',
    params
  })
}

// 汽车经销商新增或者修改
export function setCarDealer(data: ISetMerchant) {
  return instance({
    url: '/manager/company/addCarDealer',
    method: 'POST',
    data
  })
}

// 金融服务商新增或修改
export function setFinancialService(data: ISetMerchant) {
  return instance({
    url: '/manager/company/company/addFinancialService',
    method: 'POST',
    data
  })
}
