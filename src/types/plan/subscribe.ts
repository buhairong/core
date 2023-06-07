import type { ICarType } from '../car'

export interface ISubscribeSearch {
  carType: number | null
  schemeName: string
  carTypeYearProduct: string
  pageNo: number | null
  pageSize: number | null
}

export interface ISubscribeRecord {
  carType: ICarType
  checkStatus: number | null
  cityName: string
  createdTime: string
  deposit: number | null
  distributionBrokerage: number | null
  finalCheckStatus: number | null
  financeSchemeName: string
  id: number | null
  manageStatus: null
  merchantName: string
  monthPay: number | null
  monthTotal: number | null
  paymentType: number | null
  productSchemeName: string
  totalPayment: number | null
}

export interface ISubscribeList {
  records: ISubscribeRecord[]
  total: number
}
