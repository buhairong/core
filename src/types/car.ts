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

interface IOtherConfig {
  detailName: string
  hasCheck: number | null
  money: number | null
}

export interface ICarInfoRespVo {
  carBrand: string
  carBrandId: number | null
  carColor: string
  carEnergyType: number | null
  carEngineNum: string
  carPlateNum: string
  carType: string
  carTypeId: number | null
  carTypeYear: string
  carTypeYearId: number | null
  carTypeYearProduct: string
  carTypeYearProductId: number | null
  carVin: string
  guidancePrice: number | null
  id: number | null
  imageUrl: string
  mileage: number | null
  newOrOld: number | null
  otherConfigList: IOtherConfig[]
  plateDate: string
  registerDate: string
  status: number | null
  tankSize: number | null
  totalConfigMoney: null
  travelLicenseUrl: string
  orderNum: string
}

export interface IPics {
  carHandoverRecordId: number | null
  carId: number
  carPicsCategory: number
  carPicsType: number
  carType: number
  createdBy: number
  createdTime: string
  fileId: number
  id: number
  remark: string
  url: string
  userCarSubscribeId: number
}

export interface IDeliveryCarPics {
  carPicsType: number
  picsList: IPics[]
}

export interface IInsurancePics {
  createdBy: number
  createdTime: string
  fileId: number
  id: number
  insuranceId: number
  url: string
}

export interface IInsurance {
  amountOfThree: number | null
  carId: number
  carType: number
  createdBy: number
  createdTime: string
  expireDate: string
  id: number
  insuranceCompany: string | number
  insuranceCompanyName: string
  insuranceNo: string
  insurancePicsList: IInsurancePics[]
  insuranceType: number
  updatedBy: number | string | null
  updatedTime: number | string | null
}
