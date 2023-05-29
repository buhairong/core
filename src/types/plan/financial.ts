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

// brandList
// : 
// ["奥迪", "宝马", "奔驰"]
// cityIdList
// : 
// [310100, 441900, 110100]
// cityReqVoList
// : 
// [,…]
// 0
// : 
// {city: "北京", createdBy: "", createdTime: null, id: 110100, open: 1, provinceId: 110000, updatedBy: "",…}
// city
// : 
// "北京"
// cityId
// : 
// 110100
// createdBy
// : 
// ""
// createdTime
// : 
// null
// id
// : 
// 110100
// open
// : 
// 1
// provinceId
// : 
// 110000
// updatedBy
// : 
// ""
// updatedTime
// : 
// null
// 1
// : 
// {city: "东莞", createdBy: "", createdTime: null, id: 441900, open: 1, provinceId: 440000, updatedBy: "",…}
// 2
// : 
// {city: "上海", createdBy: "", createdTime: null, id: 310100, open: 1, provinceId: 310000, updatedBy: "",…}
// companyId
// : 
// 209
// companyName
// : 
// "永达金融"
// depositRate
// : 
// 10
// merchantTypeList
// : 
// [1, 3]
// powerTypeList
// : 
// [7, 3]
// priceSection
// : 
// [1, 2]
// schemeDesc
// : 
// "bbb"
// schemeName
// : 
// "aaa"
// supportPeriodList
// : 
// [36]