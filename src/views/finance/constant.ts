export const defaultFinanceSearchValue = {
  orderNum: '',
  userInfo: '',
  updateBy: '',
  confirmed: null, // 1确认，0未确认
  carBrandId: null,
  minUpdateTime: '',
  maxUpdateTime: '',
  page: 1,
  limit: 10
}

export const defaultBrokerageSearchValue = {
  type: null,
  minCreateTime: '', //	最小申请时间
  maxCreateTime: '', //	最大申请时间
  minUpdateTime: '', //	最小完成时间
  maxUpdateTime: '', //	最大完成时间
  status: null, // 1批准，0不批准，2待放款
  page: 1,
  size: 10
}
