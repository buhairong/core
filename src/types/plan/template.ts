export interface ITemplateSearch {
  templateName: string
  page: number | null
  limit: number | null
}

export interface ITemplateRecord {
  templateId?: number
  alias?: string
  applyService?: string | number
  applyServiceCode?: number
  createTime?: string
  finalSelectArray?: number[]
  financialSchemeId?: number
  id?: number
  newType?: number
  otherJson?: string
  payModeArray?: number[]
  platformCommissionRate?: number
  status?: number
  subscriptionPeriodArray?: number[]
  subscriptionPeriodArrayOldCar?: number[]
  templateName?: string
}

export interface ITemplateList {
  records: ITemplateRecord[]
  total: number
}

export interface financialSchemeRecordForSetTemplate {
  id: number
  schemeName: string
}
