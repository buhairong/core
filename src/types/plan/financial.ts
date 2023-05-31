import type { ICity } from '../merchant'

export interface IFinancialSearch {
  merchantType: number | null
  brand: number | null
  powerType: number | null
  maxTime: string
  minTime: string
  priceSection: number | null
  page: number | null
  limit: number | null
}

export interface IFinancialRecord {
  brandList?: string
  cityList?: string
  createTime?: string
  id?: number
  interestRare?: string
  merchantTypeList?: string
  merchantUseNum?: number | null
  powerTypeList?: string
  priceSection?: string[]
  schemeName?: string
  supportPeriodList?: string
}

export interface IFinancialList {
  records: IFinancialRecord[]
  total: number
}

export interface IFinancialSetParams {
  id?: number | null
  brandList: string[]
  cityIdList?: number[]
  cityReqVoList: ICity[]
  companyId: number | null
  companyName: string
  depositRate: number | null
  residualValueRate: number | null
  merchantTypeList: number[]
  powerTypeList: number[]
  priceSection: number[]
  schemeName: string
  schemeDesc?: string
  supportPeriodList: number[]
}
