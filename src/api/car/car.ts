import instance from '../base'
import type { IBrand, ICarBrandType, ICarYear, ICarProduct } from '@/types'

// 品牌列表
export function getCarBrand() {
  return instance<IBrand[], IBrand[]>({
    url: '/manager/carManager/getCarBrand',
    method: 'GET'
  })
}

// 车型系列列表
export function getCarType(data: { carBrandId: number }) {
  return instance<ICarBrandType[], ICarBrandType[]>({
    url: '/manager/carManager/getCarType',
    method: 'POST',
    data
  })
}

// 车型系列年份列表
export function getCarYear(data: { carTypeId: number }) {
  return instance<ICarYear[], ICarYear[]>({
    url: '/manager/carManager/getCarTypeYear',
    method: 'POST',
    data
  })
}

// 车型配置型号列表
export function getCarProduct(data: { carTypeYearId: number }) {
  return instance<ICarProduct[], ICarProduct[]>({
    url: '/manager/carManager/listByCarTypeYearId',
    method: 'POST',
    data
  })
}
