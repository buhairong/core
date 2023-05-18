import instance from '../base'
import type { IBrand } from '@/types'

// 品牌列表
export function getCarBrand() {
  return instance<IBrand[], IBrand[]>({
    url: '/manager/carManager/getCarBrand',
    method: 'GET'
  })
}
