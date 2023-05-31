export interface ISearch {
  companyType: number | null
  shopName: string
  chooseRole: number | null
  cityId: number | null
  contractStatus: number | null
  type: number | null
  page: number
  size: number
}

export interface IRecord {
  chooseRole: string
  chooseRoleInt: number
  cityName: string
  companyName: string
  companyType: string
  companyTypeInt: number
  contractStatus: number
  id: number
  isFinancial: number
  managerMobile: string | number
  managerName: string
  shopName: string
  showAllBrand: number
}

export interface IList {
  records: IRecord[]
  total: number
}

export interface ICity {
  city: string
  id: number
  cityId?: number
}

export interface IOpenOrCloseCarTypeParams {
  companyId: number
  showAllBrand: number
}

export interface ICompnay {
  address: string
  bankAccount: string
  bankName: string
  businessLicense: string
  carBrandIdList: number[]
  carBrandNameList: string[]
  chooseRole: number
  cityId: number
  cityName: string
  companyName: string
  companyType: number
  contactMobile: string
  contactName: string
  contractStatus: number
  corporationTaxNumber: string
  financeLicence: string
  id: number
  introduce: string
  isFinancial: number
  lat: number
  lng: number
  logoImageUrl: string
  mchId: null
  mchKey: null
  rejectDetails: string
  shopEnvironmentPic: string
  shopHallPic: string
  shopHeadPic: string
  shopName: string
  showAllBrand: string
  status: number
  valid: number
  whetherReceipt: number
}

export interface IDecorate {
  companyId: number
  createId: number
  createName: string
  createTime: string
  decorateName: string
  id: number
}

export interface IUser {
  companyUserName: string
  id: number
  mobile: string
  roleName: string
}

export interface IMerchantDetail {
  company: ICompnay
  decorateList: IDecorate[]
  userRespVos: IUser[]
  managerMobile: string
  managerName: string
}

export interface ISetMerchant {
  id: number | null
  address: string
  bankAccount: string
  bankName: string
  businessLicense: string
  carBrandIdList: number[]
  chooseRole: number | null
  cityId: number | null
  cityName: string
  companyName: string
  companyType: number | null
  contactMobile: string
  corporationTaxNumber: string
  isFinancial: number | null
  lat: number | null
  lng: number | null
  managerMobile: string
  managerName: string
  shopHeadPic: string
  shopName: string
}
