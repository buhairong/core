import type { ICompnay } from './merchant'
import type { ICarInfoRespVo, IDeliveryCarPics, IInsurance } from './car'
import type { IQuery } from './risk'

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

interface ICarCertificateImage {
  createTime: string
  id: number | null
  imageUrl: string
  orderId: number | null
  type: number
  updateTime: string
  valid: number | null
}

interface ICertification {
  certificationName: string
  imageList: string[]
}

export interface IContractFile {
  contractFileUrl: string
  contractId: number
  createTime: string
  id: number
}

export interface IContract {
  contractLabelNum?: string
  contractName?: string
  contractType?: string | number
  createId?: string
  createTime?: string
  endTime?: string
  fileList?: string[] | IContractFile[]
  id?: number
  orderId?: number
  signTime?: string
  startTime?: string
  updateId?: string | number
  updateTime?: string
  valid?: number
}

export interface IFaceAudit {
  address: string
  businessNode: number
  createTime: string
  id: number
  idNum: string
  imageUrl: string
  name: string
  pass: number
  resource: number
  result: string
  userCarSubscribeId: number
}

interface IIdCardAndDriverImage {
  driverLicenseSecondSheetUrl: string
  driverLicenseUrl: string
  idcardBackUrl: string
  idcardUrl: string
}

interface ICarSubscribeFreeService {
  serviceName: string
  size: number
}

export interface IOrderInfo {
  buyoutsFee: number
  carDeliveryTime: string
  carId: number
  carSubscribeFreeService: string
  carSubscribeFreeServiceList: ICarSubscribeFreeService[]
  city: string
  deliveryName: string
  deposit: number
  distributionBrokerage: number | null
  emergencyContactName: string
  emergencyContactPhone: string
  endDate: number | string | null
  finalSelect: string
  financeSchemeName: string
  id: number
  limitMileage: string
  merchantId: number
  mobile: string
  monthPayment: number
  monthTotal: number
  name: string
  newType: number
  orderNum: string
  orderSize: number
  orderSource: number
  overMileageFee: number | null
  partnerRecommend: number
  paymentType: number
  predictPlateTime: string
  premium: number
  safeguardService: string
  safeguardServiceList: number[]
  score: number | null
  startDate: number | string | null
  subscribeMouth: number
  totalPayment: number
  usePlate: number
}

export interface IBill {
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
  addedDeposit: number
  deposit: number
  firstPayment: null
  otherConfigPayment: null
  premium: number
  totalPayment: number
  totalPlateNumFee: number
}

export interface IPaiedInfo {
  billList: IBill[]
  billListOfDeposit: IBill[]
  costInfo: ICostInfo
  whetherOnLinePay: number
}

interface IPrincipal {
  companyName: string
  corporationTaxNumber: string
  mobile: string
  orderType: number
  userIdNum: string
  userName: string
}

interface IRiskQueryList {
  companyQuery: IQuery[]
  personalQuery: IQuery[]
}

export interface IUserCarSubscribeLog {
  content: string
  time: string
}

export interface IOrderDetail {
  carCertificateImage: ICarCertificateImage[]
  carInfoRespVo: ICarInfoRespVo
  certificationList: ICertification[]
  checkInfo: string
  companyRespVo: ICompnay
  contractList: IContract[]
  deliveryCarPicsMap: IDeliveryCarPics[]
  deliveryCheckInfo: string
  deliveryName: string
  faceAuditRecord: IFaceAudit[]
  idCardAndDriverImageRespVo: IIdCardAndDriverImage
  insuranceList: IInsurance[]
  name: string
  orderInfo: IOrderInfo
  paiedInfo: IPaiedInfo
  principal: IPrincipal
  riskQueryList: IRiskQueryList
  userCarSubscribeLog: IUserCarSubscribeLog[]
}
