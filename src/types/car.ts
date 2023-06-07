export interface IBrand {
  brandName: string
  id: number
  letter: string
  logoUrl: string
  open: number
}

export interface ICarBrandType {
  carBrandId: number
  carType: string
  id: number
  open: number
}

export interface ICarYear {
  carTypeId: number
  id: number
  open: number
  year: string
}

export interface ICarProduct {
  carBrand: string
  carBrandId: number | null
  carType: string
  carTypeId: number | null
  carTypeYear: string
  carTypeYearId: number | null
  carTypeYearProduct: string
  dealerReferencePrice: null
  discharge: number | null
  drive: null
  environmentalStandards: string
  guidancePrice: number | null
  horsepower: number | null
  id: number | null
  imageUrl: string
  mold: string | number
  open: number | null
  outColorList: string[]
  powerMode: number | null
  priceStr: string
  purchaseTax: null
  salesType: number | null
  status: number | null
  structure: null
  tags: string
  turbo: number | null
  updatedBy: string
  updatedTime: string
}

export interface ICarType {
  carBrand: string
  carBrandId: number | null
  carType: string
  carTypeId: number | null
  carTypeYear: string
  carTypeYearId: number | null
  carTypeYearProduct: string
  guidancePrice: number | null
  id: number | null
  imageUrl: string
  powerMode: number | null
}

export interface IDeliveryRecord {
  address: string
  appId: number | null
  bankAccount: string
  bankName: string
  businessLicense: string
  carBrandIdList: number[]
  carBrandNameList: string[]
  chooseRole: number | null
  cityId: number | null
  cityName: string
  companyName: string
  companyType: number | null
  contactMobile: string
  contactName: string
  contractStatus: number | null
  corporationTaxNumber: string
  createdBy: number | null
  createdTime: string
  financeLicence: string
  id: number | null
  introduce: string
  isFinancial: number | null
  lat: number | null
  lng: number | null
  logoImageUrl: string
  mchId: number | null
  mchKey: number | null
  rejectDetails: string
  shopEnvironmentPic: string
  shopHallPic: string
  shopHeadPic: string
  shopName: string
  showAllBrand: number | string
  status: number | null
  updatedBy: number | null
  updatedTime: string
  valid: number | null
  whetherReceipt: number | null
}
