interface Number_Key {
  [key: number]: string
}

// 图片上传地址
export const UPLOAD_URL = 'https://api.51cheyaoshi.com/security/sysFiles/upload'

// 上传图片限制格式
export const IMG_ACCEPT = '.jpg,.jpeg,.png,.gif,.bmp,.webp,.JPG,.JPEG,.GIF,.BMP,.WEBP'

// 上传图片限制大小
export const IMG_LIMIT_SIZE = 10

// 车系类型
export const CAR_TYPES = [
  { value: '0', label: '新能源车' },
  { value: '1', label: '平行进口车' },
  { value: '2', label: '国产车' }
]

// 车型同步轮询时间
export const SYNC_CAR_TYPE_TIME = 5000

//// 风控
// 适用客户
export const CUSTOM_TYPE = [
  { value: '1', label: '个人用户' },
  { value: '2', label: '企业用户' }
]

// 适用业务
export const BUSINESS_TYPE = [
  { value: '1', label: '汽车订阅' },
  { value: '2', label: '会员租车' },
  { value: '3', label: '汽车金融' }
]

// 模型状态
export const MODEL_TYPE = [
  { value: '1', label: '启用' },
  { value: '0', label: '停用' }
]

// 最小金额
export const MIN_AMOUNT = [
  { value: '0', label: '0' },
  { value: '50000', label: '5万' },
  { value: '100000', label: '10万' },
  { value: '150000', label: '15万' },
  { value: '200000', label: '20万' },
  { value: '250000', label: '25万' },
  { value: '300000', label: '30万' },
  { value: '350000', label: '35万' },
  { value: '400000', label: '40万' },
  { value: '500000', label: '50万' },
  { value: '600000', label: '60万' },
  { value: '800000', label: '80万' },
  { value: '1000000', label: '100万' },
  { value: '2000000', label: '200万' },
  { value: '3000000', label: '300万' }
]

// 最大金额
export const MAX_AMOUNT = [
  { value: '50000', label: '5万' },
  { value: '100000', label: '10万' },
  { value: '150000', label: '15万' },
  { value: '200000', label: '20万' },
  { value: '250000', label: '25万' },
  { value: '300000', label: '30万' },
  { value: '350000', label: '35万' },
  { value: '400000', label: '40万' },
  { value: '500000', label: '50万' },
  { value: '600000', label: '60万' },
  { value: '800000', label: '80万' },
  { value: '1000000', label: '100万' },
  { value: '2000000', label: '200万' },
  { value: '3000000', label: '300万' },
  { value: '-1', label: '不限' }
]

// 判断逻辑
export const LOGIC_TYPE = [
  { value: '1', label: '准入' },
  { value: '2', label: '禁入' },
  { value: '3', label: '人工' }
]

// 审核逻辑
export const STATUS_TYPE = [
  { value: '1', label: '成功' },
  { value: '2', label: '失败' }
]

// 车辆信息
export const CAR_TYPE = [
  { value: '1', label: '品牌' },
  { value: '2', label: '车系' },
  { value: '3', label: '年款' },
  { value: '4', label: '车型' }
]

// 审核进度
export const REVIEW_PROGRESS = [
  { value: '1', label: '贷前审核' },
  { value: '2', label: '贷中审核' }
]

// 查询状态
export const SEARCH_STATUS = [
  { value: '0', label: '查询中' },
  { value: '1', label: '成功' },
  { value: '2', label: '失败' }
]

// 审批结果
export const APPROVE_RESULT = [
  { value: '1', label: '通过' },
  { value: '2', label: '拒绝' },
  { value: '3', label: '人工' },
  { value: '4', label: '人工（补充材料）' }
]

// 复审
export const RETRIAL_STATUS = [
  { value: '1', label: '复审通过' },
  { value: '2', label: '复审拒绝' },
  { value: '3', label: '补充材料' }
]

// 审核状态
export const CHECKED_STATUS = {
  1: { label: '初审-通过', fontColor: '#1D2129' },
  2: { label: '初审-未通过', fontColor: '#EA0000' },
  3: { label: '初审-人工', fontColor: '#FF8C00' },
  4: { label: '初审-补充材料', fontColor: '#FF8C00' },
  5: { label: '复审-通过', fontColor: '#1D2129' },
  6: { label: '复审-未通过', fontColor: '#EA0000' },
  7: { label: '复审-补充材料', fontColor: '#FF8C00' }
}

// 审核状态 数组
export const CHECKED_STATUS_ARRAY = [
  { value: '1', label: '初审-通过' },
  { value: '2', label: '初审-未通过' },
  { value: '3', label: '初审-人工' },
  { value: '4', label: '初审-补充材料' },
  { value: '5', label: '复审-通过' },
  { value: '6', label: '复审-未通过' },
  { value: '7', label: '复审-补充材料' }
]

// 个人/企业 风险查询模型状态
export const RISK_QUERY_STATUS = {
  1: { label: '通过', fontColor: '#1D2129' },
  2: { label: '未通过', fontColor: '#EA0000' },
  3: { label: '人工审核', fontColor: '#FF8C00' },
  4: { label: '查询中', fontColor: '#1D2129' },
  5: { label: '查询失败', fontColor: '#EA0000' }
}

// 订单状态 1待签约、2待支付押金、3备车中、4待支付订阅费用、5待交车、6订阅中、7合约结束、8已取消、10待审核、11已审核、12 审核拒绝 13上牌中
export const ORDER_STATUS = {
  1: '待签约',
  2: '待支付押金',
  3: '备车中',
  4: '待支付订阅费用',
  5: '待交车',
  6: '订阅中',
  7: '合约结束',
  8: '已取消',
  10: '待审核',
  11: '已审核',
  12: '审核拒绝',
  13: '上牌中'
}

export const ORDER_STATUS_LIST = [
  { value: '10', label: '待审核' },
  { value: '1', label: '待签约' },
  { value: '2', label: '待支付押金' },
  { value: '3', label: '备车中' },
  { value: '13', label: '上牌中' },
  { value: '5', label: '待交车' },
  { value: '4', label: '待支付订阅费用' },
  { value: '6', label: '订阅中' },
  { value: '7', label: '合约结束' },
  { value: '12', label: '审核拒绝' },
  { value: '8', label: '已取消' }
]

// 支付方式
export const PAYMENT_TYPE = {
  0: '月付',
  1: '季付',
  2: '年付',
  3: '全款',
  4: '一次性付清'
}

// 适用业务
export const applyServiceList = [
  // {value: '1', label: '省心订阅'},
  // {value: '2', label: '轻松订阅'},
  { value: '3', label: '省心订阅' }
]

// 跟进状态列表
export const FOLLOW_STATUS_TYPE = [
  { value: '0', label: '已取消' },
  { value: '1', label: '待跟进' },
  { value: '2', label: '跟进中' },
  { value: '3', label: '已完成' }
]

// 车辆状态列表
export const CAR_STATUS = [
  { value: '0', label: '在库车' },
  { value: '1', label: '待交车' },
  { value: '2', label: '订阅中' }
]

// 车辆新旧列表
export const CAR_NEW_STATUS = [
  { value: 1, label: '全新车' },
  { value: 2, label: '二手车' }
]

// 维修记录跟进状态列表
export const MAINTENANCE_STATUS = [
  { value: '1', label: '跟进中' },
  { value: '2', label: '已完成' }
]

// 认证业务节点，10线上签约、20确认验车
export const IDENTITY_BUSINESS_NODE = {
  10: '线上签约',
  20: '确认验车'
}

// 认证信息来源，10wecars小程序
export const IDENTITY_RESOURCE = {
  10: 'wecars小程序'
}

// 商户角色：1 4s，2 二级销售网络，3 二手车商
export const COMPANY_ROLE: Number_Key = {
  1: '4S店',
  2: '二级销售网络',
  3: '二手车商'
}

// 商户角色：1 4s，2 二级销售网络，3 二手车商
export const COMPANY_ROLE_LIST = [
  { value: 1, label: '4S店' },
  { value: 2, label: '二级销售网络' },
  { value: 3, label: '二手车商' }
]

// 商户所属行业：1 汽车经销商，2金融服务商，3 汽车制造商，4 保险公司，5 修理厂，6 二手车商，7 加油站，8 充电站，9洗车房
export const COMPANY_TYPE: Number_Key = {
  1: '汽车经销商',
  2: '金融服务商',
  3: '汽车制造商',
  4: '保险公司',
  5: '修理厂',
  6: '二手车商',
  7: '加油站',
  8: '充电站',
  9: '洗车房'
}

// 商户状态
export const MERCHANT_STATUS: Number_Key = {
  0: '待入驻',
  1: '已入驻'
}

// 商户状态
export const MERCHANT_STATUS_LIST = [
  { value: 0, label: '待入驻' },
  { value: 1, label: '已入驻' }
]

// 资产持有公司
export const ASSET_COMPANY: Number_Key = {
  1: '是',
  0: '否'
}

// 资产持有公司
export const ASSET_COMPANY_LIST = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]

// 差异化服务
export const SERVICE_LIST = [
  { id: 1, serviceName: '免费大保养', size: undefined, isChecked: false, requireInputCount: true },
  { id: 2, serviceName: '免费小保养', size: undefined, isChecked: false, requireInputCount: true },
  { id: 3, serviceName: '免费洗车', size: undefined, isChecked: false, requireInputCount: true },
  { id: 4, serviceName: '美容装饰', isChecked: false, requireInputCount: false }
]

// 保障服务
export const SAFE_LIST = [
  { id: 0, label: '24小时道路救援' },
  { id: 1, label: '免费送车上门' }
]

// 二手车方案状态
export const OLD_CAR_CHECK_STATUS: Number_Key = {
  0: '待入驻',
  1: '已入驻',
  2: '已入驻'
}

// 动力类型
export const POWER_TYPE_LIST = [
  { value: 7, label: '燃油车型' },
  { value: 4, label: '混动车型' },
  { value: 3, label: '纯电车型' },
  { value: 8, label: '其他能源车型' }
]

export const POWER_TYPE = {
  1: '燃油车型',
  4: '混动车型',
  3: '纯电车型',
  7: '其他能源车型'
}

// 价格区间
export const PRICE_SECTION_LIST = [
  { value: 0, label: '30万以内' },
  { value: 1, label: '30万-50万' },
  { value: 2, label: '50万-100万' },
  { value: 3, label: '100万-200万' },
  { value: 4, label: '200万-300万' },
  { value: 5, label: '300万以上' }
]

export const PRICE_SECTION = {
  0: '30万以内',
  1: '30万-50万',
  2: '50万-100万',
  3: '100万-200万',
  4: '200万-300万',
  5: '300万以上'
}
