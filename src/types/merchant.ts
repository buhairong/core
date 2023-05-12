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
