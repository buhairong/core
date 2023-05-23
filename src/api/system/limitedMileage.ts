import instance from '../base'
import type { ILimitMileageDetail } from '@/types'

// 查询限制里程
export function selectLimitMileageRecord() {
  return instance<ILimitMileageDetail[], ILimitMileageDetail[]>({
    url: '/manager/carSubscribeLimitMileageRecord/selectLimitMileageRecord',
    method: 'POST'
  })
}

// 更新限制里程
export function updateLimitMileageRecord(data: ILimitMileageDetail) {
  return instance({
    url: '/manager/carSubscribeLimitMileageRecord/updateLimitMileageRecord',
    method: 'POST',
    data
  })
}
