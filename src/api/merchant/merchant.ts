import instance from '../base'
import type { ISearch, IList } from '@/types'

// 列表查询
export function getMerchantList(data: ISearch) {
  return instance<IList, IList>({
    url: '/manager/company/company/selectByPage',
    method: 'POST',
    data
  })
}
