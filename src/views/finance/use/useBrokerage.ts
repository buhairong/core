import type { IBrokerageSearch, IBrokerageRecord } from '@/types'
import { ref } from 'vue'
import { selectBrokerageList } from '@/api/finance/finance'
import { defaultBrokerageSearchValue } from '../constant'

// 1个人，2商户
export const useSearch = (type: number) => {
  const total = ref<number>(0)
  const list = ref<IBrokerageRecord[]>([])
  const search = ref<IBrokerageSearch>(defaultBrokerageSearchValue)

  search.value.type = type

  const handlerSearch = (data: IBrokerageSearch | undefined) => {
    if (data) {
      search.value = {
        ...search.value,
        ...data
      }
    }

    selectList()
  }

  const selectList = () => {
    selectBrokerageList(search.value).then((data) => {
      list.value = data.records
      total.value = data.total
    })
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
