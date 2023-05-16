import type { IRecord, IList, ISearch, ISetMerchant, IMerchantDetail } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  getMerchantList,
  getCompanyDetail,
  setCarDealer,
  setFinancialService
} from '@/api/merchant/merchant'
import { defaultSearchValue, defaultDetailValue } from './constant'

export const useSearch = (companyType: number) => {
  const total = ref<number>(0)
  const list = ref<IRecord[]>([])
  const search = ref<ISearch>(defaultSearchValue)
  search.value.companyType = companyType

  const handlerSearch = (data: ISearch | undefined) => {
    if (data) {
      search.value = {
        ...search.value,
        ...data
      }
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

export const useSet = (
  type: number,
  companyId: number | undefined,
  step1Ref: any,
  step2Ref: any,
  step3Ref: any
) => {
  const router = useRouter()
  const setParams = ref<ISetMerchant>()
  const activeStep = ref(0)

  if (companyId) {
    const params = {
      companyId
    }
    getCompanyDetail(params).then((data: IMerchantDetail) => {
      setParams.value = {
        ...data.company,
        ...data
      }
    })
  } else {
    setParams.value = {
      ...defaultDetailValue,
      companyType: type
    }
  }

  const back = () => {
    router.back()
  }

  const change = (data: ISetMerchant) => {
    setParams.value = data
  }

  const prev = () => {
    --activeStep.value
  }

  const next = () => {
    if (activeStep.value === 0) {
      step1Ref.$refs.step1form.validate((valid: any) => {
        if (valid) {
          ++activeStep.value
        } else {
          ElMessage.error('请检查输入项')
        }
      })
    } else if (activeStep.value === 1) {
      step2Ref.$refs.step2form.validate((valid: any) => {
        if (valid) {
          ++activeStep.value
        } else {
          ElMessage.error('请检查输入项')
        }
      })
    }
  }

  const save = () => {
    step3Ref.$refs.step3form.validate((valid: any) => {
      if (valid) {
        if (type === 1) {
          addCarDealer()
        } else {
          addFinancialService()
        }
      } else {
        ElMessage.error('请检查输入项')
      }
    })
  }

  // 汽车经销商新增或者修改
  const addCarDealer = () => {
    if (setParams.value) {
      setCarDealer(setParams.value).then(() => {
        ElMessage.success('保存成功')
        back()
      })
    }
  }

  // 金融服务商新增或修改
  const addFinancialService = () => {
    if (setParams.value) {
      setFinancialService(setParams.value).then(() => {
        ElMessage.success('保存成功')
        back()
      })
    }
  }

  return {
    setParams,
    activeStep,
    back,
    change,
    prev,
    next,
    save
  }
}
