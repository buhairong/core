import type { IFinanceSearch, IFinanceRecord, IFinanceList, IFinancialDetail } from '@/types'
import { ref } from 'vue'
import {
  selectOrderListOfDeposit,
  selectOrderListOfSubscribeFee,
  selectDepositDetail,
  selectSubscribeFeeDetail
} from '@/api/finance/finance'
import { defaultFinanceSearchValue } from '../constant'

// 1押金，2订阅费用
export const useSearch = (type: number) => {
  const total = ref<number>(0)
  const list = ref<IFinanceRecord[]>([])
  const search = ref<IFinanceSearch>(defaultFinanceSearchValue)

  const handlerSearch = (data: IFinanceSearch | undefined) => {
    if (data) {
      search.value = {
        ...search.value,
        ...data
      }
    }

    selectList()
  }

  const selectList = () => {
    if (type === 1) {
      selectOrderListOfDeposit(search.value).then((data: IFinanceList) => {
        list.value = data.records
        total.value = data.total
      })
    } else {
      selectOrderListOfSubscribeFee(search.value).then((data: IFinanceList) => {
        list.value = data.records
        total.value = data.total
      })
    }
  }

  const handleCurrentChange = (e: number) => {
    search.value.page = e
    selectList()
  }

  return {
    search,
    total,
    list,
    handlerSearch,
    selectList,
    handleCurrentChange
  }
}

export const useDetail = (type: number, orderId: number) => {
  const detail = ref<IFinancialDetail>()

  const search = () => {
    const data = {
      orderId
    }

    if (type === 1) {
      selectDepositDetail(data).then((res) => {
        detail.value = res
      })
    } else {
      selectSubscribeFeeDetail(data).then((res) => {
        detail.value = res
      })
    }
  }

  search()

  return {
    detail,
    search
  }
}
