export interface IOrderSearch {
  newType: number | null
  orderNum: string
  nameOrMobile: string
  minCreatedTime: string
  maxCreatedTime: string
  status: number | null
  carBrandId: number | null
  carTypeId: number | null
  carTypeYearId: number | null
  carTypeYearProductId: number | null
  limit: number | null
  page: number | null
}

export interface IOrderRecord {
  buyoutsFee: number
  carBrand: string
  carColor: string
  carDeliveryId: number
  carDeliveryTime: string
  carEngineNum: string
  carId: number
  carPlateNum: string
  carType: string
  carTypeYear: string
  carTypeYearProduct: string
  carTypeYearProductId: number
  carVin: string
  createdTime: string
  deposit: number
  distributionBrokerageFree: number
  finalSelect: string
  financialAudit: number
  id: number
  imageUrl: string
  mobile: string
  monthTotal: number
  name: string
  newType: 1
  orderNum: string
  partnerRecommend: number
  status: string | number
  statusStr: string
  totalPayment: number
}

export interface IOrderList {
  records: IOrderRecord[]
  total: number
}
