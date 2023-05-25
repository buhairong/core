import instance from '../base'
import type {
  IFinanceSearch,
  IFinanceList,
  IFinancialSelectorRecord,
  IFinancialDetail,
  IConfirmAccountOfBankParams,
  IBrokerageSearch,
  IBrokerageList
} from '@/types'

// 查询筛选条件
export function financialSelector(params: { type: number }) {
  return instance<IFinancialSelectorRecord, IFinancialSelectorRecord>({
    url: '/manager/financialManager/financialSelector',
    method: 'GET',
    params
  })
}

// 押金列表查询
export function selectOrderListOfDeposit(data: IFinanceSearch) {
  return instance<IFinanceList, IFinanceList>({
    url: '/manager/financialManager/selectOrderListOfDeposit',
    method: 'POST',
    data
  })
}

// 押金详情
export function selectDepositDetail(params: { orderId: number }) {
  return instance<IFinancialDetail, IFinancialDetail>({
    url: '/manager/financialManager/selectDepositDetail',
    method: 'GET',
    params
  })
}

// 订阅费用列表查询
export function selectOrderListOfSubscribeFee(data: IFinanceSearch) {
  return instance<IFinanceList, IFinanceList>({
    url: '/manager/financialManager/selectOrderListOfSubscribeFee',
    method: 'POST',
    data
  })
}

// 订阅费用详情
export function selectSubscribeFeeDetail(params: { orderId: number }) {
  return instance<IFinancialDetail, IFinancialDetail>({
    url: '/manager/financialManager/selectSubscribeFeeDetail',
    method: 'GET',
    params
  })
}

// 订阅费用及押金流水确认
export function confirmSubscribeAccountDetailOfBank(data: IConfirmAccountOfBankParams) {
  return instance({
    url: '/manager/financialManager/confirmSubscribeAccountDetailOfBank',
    method: 'POST',
    data
  })
}

// 返佣列表查询
export function selectBrokerageList(data: IBrokerageSearch) {
  return instance<IBrokerageList, IBrokerageList>({
    url: '/manager/userBrokerageRecord/selectBrokerageListByPage',
    method: 'POST',
    data
  })
}

// 更新佣金记录状态
export function updateStatusOfBrokerage(data: { status: number; id: number; remark: string }) {
  return instance({
    url: '/manager/userBrokerageRecord/updateStatusOfBrokerage',
    method: 'POST',
    data
  })
}
