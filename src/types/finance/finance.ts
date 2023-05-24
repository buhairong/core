export interface IFinanceSearch {
  orderNum: string
  userInfo: string
  updateBy: string
  confirmed: number | null // 1确认，0未确认
  carBrandId: number | null
  minUpdateTime: string
  maxUpdateTime: string
  page: number | null
  limit: number | null
}

export interface IFinanceRecord {
  carBrand: string
  carType: string
  carTypeYear: string
  carTypeYearProduct: string
  confirmed: number
  deposit: number
  emergencyContactName: string
  emergencyContactPhone: string
  id: number
  mobile: string
  name: string
  orderNum: string
  payType: number
  totalPayment: number | null
  updateBy: string
  updateName: string
  updateTime: string
}

export interface IFinanceList {
  records: IFinanceRecord[]
  total: number
}

interface IAuditRecord {
  auditManId: string
  auditManName: string
}

interface IBrandRecord {
  brandId: number
  carBrand: string
}

export interface IFinancialSelectorRecord {
  auditList: IAuditRecord[]
  brandList: IBrandRecord[]
}

export interface IBillRecord {
  bankBills: string[]
  confirmed: number
  createdTime: string
  id: number
  orderNum: string
  payWay: number
  total: number
  wxOrderNum: string
}

interface ICostInfo {
  addedDeposit: number | null
  deposit: number | null
  firstPayment: number | null
  otherConfigPayment: number | null
  premium: number | null
  totalPayment: number | null
  totalPlateNumFee: number | null
}

export interface IFinancialDetail {
  billList: IBillRecord[]
  costInfo: ICostInfo
}

export interface IConfirmAccountOfBankParams {
  accountDetailId: number
  businessId: number
  type: number
  confirmed: number
  remark: string
}
