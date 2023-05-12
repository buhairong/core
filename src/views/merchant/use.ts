import type { IRecord, IList, ISearch } from '@/types'
import { ref } from 'vue'
import { getMerchantList } from '@/api/merchant/merchant'
import { defaultSearchValue } from './constant'

export const useSearch = (companyType: number) => {
  const total = ref<number>(0)
  const list = ref<IRecord[]>([])
  const search = ref<ISearch>(defaultSearchValue)
  search.value.companyType = companyType

  const handlerSearch = (data: ISearch | undefined) => {
    if (data) {
      search.value = data
    }

    selectList()
  }

  const selectList = () => {
    getMerchantList(search.value).then((data: IList) => {
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
