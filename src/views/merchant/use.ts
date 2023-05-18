import type { IRecord, IList, ISearch, ISetMerchant, IMerchantDetail, IUploadFile } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { jsonp } from 'vue-jsonp'
import {
  getMerchantList,
  getCompanyDetail,
  setCarDealer,
  setFinancialService,
  ocrBusinessLicense
} from '@/api/merchant/merchant'
import { defaultSearchValue, defaultDetailValue } from './constant'
import { IMG_LIMIT_SIZE } from '@/utils/constant'

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

export const useSet = (type: number, companyId: number | undefined) => {
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
    addCarDealer,
    addFinancialService
  }
}

export const useSetStep1 = (type: number, paramsProp: ISetMerchant) => {
  const inputStyle = { width: '300px' }
  const params = ref<ISetMerchant>(paramsProp)

  const checkBrand = (rule: any, value: number[], callback: Function) => {
    if (type === 1 && params.value.chooseRole == 1 && !value.length) {
      return callback(new Error('请选择销售品牌'))
    }
    callback()
  }

  const rules1 = {
    chooseRole: [{ required: true, message: '请选择角色', trigger: 'change' }],
    isFinancial: [{ required: true, message: '请选择是否资产持有公司', trigger: 'change' }],
    cityId: [{ required: true, message: '请选择所在城市', trigger: 'change' }],
    carBrandIdList: [{ validator: checkBrand, trigger: 'change' }],
    companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
    businessLicense: [{ required: true, message: '请上传营业执照', trigger: 'blur' }],
    corporationTaxNumber: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
    shopName: [{ required: true, message: '请输入商户名称', trigger: 'blur' }],
    contactMobile: [{ required: true, message: '请输入商户联系电话', trigger: 'blur' }],
    shopHeadPic: [{ required: true, message: '请上传商户照片', trigger: 'blur' }]
  }

  const rules2 = {
    companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
    businessLicense: [{ required: true, message: '请上传营业执照', trigger: 'blur' }],
    corporationTaxNumber: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
    shopName: [{ required: true, message: '请输入商户名称', trigger: 'blur' }],
    contactMobile: [{ required: true, message: '请输入商户联系电话', trigger: 'blur' }],
    shopHeadPic: [{ required: true, message: '请上传商户照片', trigger: 'blur' }]
  }

  const rule = type === 1 ? rules1 : rules2

  const beforeImgUpload = (file: File) => {
    const size = file.size / 1024 / 1024

    if (size > IMG_LIMIT_SIZE) {
      ElMessage.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`)
      return false
    }

    return true
  }

  const getBusinessLicense = (businessLicense: string) => {
    const data = {
      businessLicense
    }

    ocrBusinessLicense(data).then((res: string) => {
      params.value.corporationTaxNumber = res
    })
  }

  // type: 1.营业执照 2.商户照片
  const handleSuccess = (type: number, res: IUploadFile) => {
    if (res.code == 0) {
      if (type === 1) {
        params.value.businessLicense = res.data.src
        getBusinessLicense(res.data.src)
      } else if (type === 2) {
        params.value.shopHeadPic = res.data.src
      }
    }
  }

  const querySearchAsync = (query: string, cb: Function) => {
    const keyword = query.trim()
    if (keyword) {
      jsonp('https://apis.map.qq.com/ws/place/v1/suggestion', {
        key: '4ZOBZ-FFK3V-HUJPK-UXDPA-FR7JS-YVFJG',
        keyword,
        output: 'jsonp'
      }).then((res: any) => {
        if (res.status === 0) {
          const list = res.data.map((item: any) => {
            item.value = item.title
            return item
          })
          cb(list)
        }
      })
    }
  }

  const handleSelect = (item: any) => {
    params.value.address = item.address
    if (item.location) {
      params.value.lat = item.location.lat
      params.value.lng = item.location.lng
    }
  }

  return {
    inputStyle,
    params,
    rule,
    beforeImgUpload,
    handleSuccess,
    querySearchAsync,
    handleSelect
  }
}
