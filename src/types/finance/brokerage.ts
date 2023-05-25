export interface IBrokerageSearch {
  type: number | null
  minCreateTime: string //	最小申请时间
  maxCreateTime: string //	最大申请时间
  minUpdateTime: string //	最小完成时间
  maxUpdateTime: string //	最大完成时间
  status: number | null // 1批准，0不批准，2待放款
  page: number | null
  size: number | null
}

export interface IBrokerageRecord {
  bankAccountId: string
  bankMobile: string
  bankName: string
  createTime: string
  id: number
  idCard: string
  money: number
  name: string
  orderNum: string
  remark: string
  status: number
  statusStr: string
  updateTime: string
  userId: number
}

export interface IBrokerageList {
  records: IBrokerageRecord[]
  total: number
}
