import type { IUploadFile } from './upload'
/**
 * 合同字段
 */
type Contract = {
  startDate: string // 开始日期
  endDate: string // 结束日期
  type?: number | undefined // 合同类型 100 - 房屋租赁 101 - 房屋销售
  types?: number[] // 合同类型 100 - 房屋租赁 101 - 房屋销售 多条传数组结构
  statuses: number[] // 合同状态 未审核(0),已作废(-10),已关闭(-20),执行中(10),已到期(20),已履约(30)
  customerUserIds: number[] // 个人客户
  customerComIds: number[] // 企业客户
  comIds: number[] // 公司
  parkIds: number[] // 园区
  id?: string
  contractId?: string
  code: string // 合同编号
  createTime: string // 创建日期
  typeName: string // 合同类型
  signedBy: number | undefined // 签订人
  signerName: string
  signTime: string // 签订日期
  signedByName: string // 经办人
  comId: number | undefined // 公司id
  comName: string
  customerType: number | undefined // 客户类型
  customerComId: number | undefined // 客户id
  customerUserId: number | undefined // 个人id
  customerName: string
  parkId: number | undefined // 园区id
  parkName: string
  billCycleNum: number | undefined // 出账周期 付几个月的 明细里会有feeCycleUnit 天还是月，年，季
  depositCycleNum: number | undefined // 押金周期
  rentStartTime: string // 租赁开始时间
  rentEndTime: string // 租赁结束时间
  remark: string // 备注
  fileInfos: IUploadFile[] // 附件
  contractDetails: IContractDetails[] // 租赁明细
  version: number | undefined
  status: number | undefined // 合同状态
  statusName: string // 合同状态名称
  indexes: number | undefined
  feeItemId: number | undefined // 收费项
  feeItemName: string // 收费项
  roomId: number | undefined // 房间id
  roomCode: string // 房间名称
  startTime: string // 租赁周期
  endTime: string // 租赁周期
  feeType: number // 费用类型，0：免费，1，一次性，2，周期性
  feeCycleUnitTxt: string // 元/天；元/周；元/月；元/季；元/年；
  fee: string // 费用
  receivableList: IReceivableList[]
  changeDetailRemark: string
  receivableTime: string // 应收日期
  amountReceivable: string // 应收金额/押金金额
  receiveStatusName: string // 应收状态
  billStatusName: string // 出账状态
  feeStartTime: string // 计费周期
  feeEndTime: string // 计费周期
  amountAdjusted: string // 减免金额
  amountReceived: string // 已收金额
  amountUnReceived: string // 未收金额
  billCode: string // 账单编号
  refundAmount: number // 退款金额
  changeContractDetails: IChangeContractDetails[] // 续租退租明细
  createrName: string // 申请人姓名
  contractCode: string // 合同编号
  oldCustomerName: string // 原客户名称
  oldCustomerType: number | undefined
  oldCustomerUserId: number | undefined
  oldCustomerComId: number | undefined
  newCustomerName: string // 新客户名称
  newCustomerType: number | undefined
  newCustomerUserId: number | undefined
  newCustomerComId: number | undefined
  verifierName: string // 审批人
  verifyTime: string // 审批时间
  newEndTime: string // 新结束时间
  oldEndTime: string // 原结束时间
  changeDetailId: number | undefined // changeDetailId
  expiredDays: number | undefined // 合同到期天数
  resourceCode: string // 资源编号
  resourceName?: string // 资源名称
  buildingIds: number[] // 楼栋
  floorIds: number[] // 楼层
  roomIds: number[] // 房间
  chanceId: number | undefined // 商机id
  createUserName: string // 创建人
  startNature: boolean | undefined // 是否启用自然月
  freeTime: Array<Record<'startTime' | 'endTime' | 'remark', string>>
  resourceType: string // 资源类型
  resourceTypeName: string // 资源类型
  chanceCustomerName: string // 商机客户名称
  customerCorporate: string // 客户法人
  customerContact: string // 客户联系人
  customerMobile: string // 客户联系电话
  customerAddress: string // 客户地址
  customerIdNumber: string // 客户身份证号
  invoiceBank: string // 开户行
  invoiceAccount: string // 开户账号
  prevContractCode?: string // 原合同编号
  renew?: boolean // 是否续租
  renewKyd?: boolean
  relatedParty?: number //关联方情况  0:无 1:原始权益人 2:运营管理机构 3:基金管理人 4:专项计划管理人
  relatedPartyName?: string //关联方名称
  labelStatues?: number[] // 标签状态
  detailIds: number[] // 退租明细id
  reason: string // 退租原因
  rentIncreases: IContractIncrease[] // 递增列表
  agencyId?: number // 中介id
  agencyName?: string // 中介名称
  intentionId?: number | undefined // 意向单id
  labelType?: number // 标签类型
  agencyMobile?: string // 中介电话
  agencyContact?: string // 中介联系人
}
/**
 * 合同搜索参数
 */
export type IContractSearch = {
  signedBy?: number[]
  keyWords?: string
  expireType?: number
  rentStartTime?: string
  rentStartTimeEnd?: string
  rentEndTime?: string
  rentEndTimeEnd?: string
} & Pick<
  Contract,
  | 'startDate'
  | 'endDate'
  | 'code'
  | 'statuses'
  | 'customerUserIds'
  | 'customerComIds'
  | 'parkIds'
  | 'buildingIds'
  | 'floorIds'
  | 'roomIds'
  | 'expiredDays'
  | 'comId'
  | 'resourceCode'
  | 'labelStatues'
  | 'type'
  | 'types'
  | 'labelType'
>
/**
 * 合同列表
 */
export type IContractTable = Pick<
  Contract,
  | 'id'
  | 'code'
  | 'createTime'
  | 'comName'
  | 'customerName'
  | 'typeName'
  | 'statusName'
  | 'signedByName'
  | 'parkName'
  | 'version'
  | 'customerType'
  | 'customerComId'
  | 'customerUserId'
  | 'renew'
  | 'resourceName'
  | 'type'
>
/**
 * 应收列表
 */
export type IReceivableList = Pick<
  Contract,
  | 'indexes'
  | 'feeItemId'
  | 'roomCode'
  | 'receivableTime'
  | 'amountReceivable'
  | 'statusName'
  | 'receiveStatusName'
  | 'billStatusName'
  | 'feeStartTime'
  | 'feeEndTime'
  | 'amountAdjusted'
  | 'amountReceived'
  | 'amountUnReceived'
  | 'billCode'
  | 'roomId'
  | 'resourceType'
  | 'resourceTypeName'
  | 'resourceCode'
  | 'resourceName'
>
/**
 * 合同明细列表
 */
export type IContractDetails = {
  unitNum?: number
  unitPrice: number
  startNature: boolean
  status?: number
  contractId?: string
  contractCode?: string
  cancelRent: boolean
  oriUnitPrice?: number
  oriFeeCycleUnitTxt?: string
  parkId?: number
  buildingId?: number
  floorId?: number
  chargeableArea?: number
} & Pick<
  Contract,
  | 'id'
  | 'indexes'
  | 'feeItemId'
  | 'roomId'
  | 'resourceCode'
  | 'resourceName'
  | 'startTime'
  | 'endTime'
  | 'feeType'
  | 'feeCycleUnitTxt'
  | 'fee'
  | 'receivableList'
  | 'version'
  | 'changeDetailRemark'
  | 'remark'
  | 'freeTime'
  | 'resourceType'
  | 'resourceTypeName'
  | 'resourceName'
>
/**
 * 合同详情
 */
export type IContractDetail = {
  templateId?: number
  templateName?: string
  electronicUrl?: string
  reuseDeposit?: boolean
  rentFlag?: boolean
  virtualAddress?: string
  returnTime?: string
  taxRate?: number
  taxUnit: number
  delayFee?: number
  delayFeeUnit: number
  autoBill?: boolean
  billMergeType?: number
  fwSupport?: boolean // 是否走OA审批流程
  feeDailyToMonth?: number // 30.单价×30天 360.单价×365÷12
  // 租金递增数组
  incrementList?: {}[]
  downPaymentBillMonths: number
  inAdvanceBillType: number
  inAdvanceBillDays?: number
  contractHouseDelivery?: {
    communicateMethodName: string
    createTime: string
    deliveryTime: string
    files: string
    remark: string
    signedByName: string
    fileInfos: IUploadFile[]
    deleted: boolean
    communicateMethod: number
    contractId: string
    createdBy: number
    id: number
    oid: number
    signedBy: number
  }
  depositType?: number
  propertyClause?: boolean
  propertyInAdvanceBillType?: number
  propertyInAdvanceBillDays?: number
  companyBankId?: number // 物业收款公司账号ID
  companyId?: number // 物业公司ID
  companyName?: string // 物业公司名称
  companyBankAccount?: string // 物业公司银行账号
  bankNo?: string // 物业公司银行支行信息
} & Pick<
  Contract,
  | 'id'
  | 'type'
  | 'typeName'
  | 'code'
  | 'status'
  | 'statusName'
  | 'comName'
  | 'comId'
  | 'customerName'
  | 'customerType'
  | 'customerComId'
  | 'customerUserId'
  | 'signerName'
  | 'signedBy'
  | 'signTime'
  | 'rentStartTime'
  | 'rentEndTime'
  | 'billCycleNum'
  | 'depositCycleNum'
  | 'parkName'
  | 'parkId'
  | 'remark'
  | 'fileInfos'
  | 'version'
  | 'contractDetails'
  | 'chanceId'
  | 'createTime'
  | 'createUserName'
  | 'verifierName'
  | 'verifyTime'
  | 'startNature'
  | 'chanceCustomerName'
  | 'customerCorporate'
  | 'customerContact'
  | 'customerMobile'
  | 'customerAddress'
  | 'customerIdNumber'
  | 'invoiceBank'
  | 'invoiceAccount'
  | 'prevContractCode'
  | 'renew'
  | 'renewKyd'
  | 'relatedParty'
  | 'rentIncreases'
  | 'agencyId'
  | 'agencyName'
  | 'intentionId'
  | 'agencyMobile'
  | 'agencyContact'
  | 'relatedParty'
  | 'relatedPartyName'
>
/**
 * 押金应收弹窗
 */
export type IDepositAndReceive = Record<'depositDetailList' | 'generateReceiveContractDetails', IContractDetails[]>
/**
 * 合同客户变更
 */
export type IModifyCustomer = Pick<
  Contract,
  'id' | 'customerType' | 'customerComId' | 'customerUserId' | 'remark' | 'fileInfos' | 'version' | 'contractId'
>
/**
 * 合同续租退租明细
 */
export type IChangeContractDetails = Pick<
  Contract,
  'id' | 'startTime' | 'newEndTime' | 'changeDetailRemark' | 'changeDetailId'
>
/**
 * 合同续租退租
 */
export type IModifyDate = Pick<
  Contract,
  'id' | 'refundAmount' | 'remark' | 'fileInfos' | 'version' | 'changeContractDetails' | 'contractId'
>
/**
 * 合同变更表格
 */
export type IModifyTable = Pick<
  Contract,
  'id' | 'createrName' | 'createTime' | 'typeName' | 'statusName' | 'status' | 'type' | 'version'
>
/**
 * 合同递增列表
 */
export type IContractIncrease = {
  startTime: string
  endTime: string
  amount: number
  type: number
  remark: string
}
/**
 * 合同变更基础详情
 */
export type IContractChange = { oldBillCycle?: number; newBillCycle?: number; newBillCylceStart?: string } & Pick<
  Contract,
  | 'id'
  | 'contractCode'
  | 'typeName'
  | 'type'
  | 'statusName'
  | 'status'
  | 'oldCustomerName'
  | 'oldCustomerType'
  | 'oldCustomerComId'
  | 'oldCustomerUserId'
  | 'newCustomerName'
  | 'newCustomerType'
  | 'newCustomerComId'
  | 'newCustomerUserId'
  | 'createrName'
  | 'createTime'
  | 'verifierName'
  | 'refundAmount'
  | 'version'
  | 'remark'
  | 'fileInfos'
  | 'verifyTime'
>
export type IModifyDetailList = IContractDetails & Pick<Contract, 'changeDetailId' | 'newEndTime'>
/**
 * 合同变更详情
 */
export interface IModifyDetail {
  contractChange: IContractChange
  contractChangeDetailList: IModifyDetailList[]
}

/**
 * 合同退租列表搜索参数
 */
export type ISurrenderSearch = {
  statues?: number[]
  labelType: number // 标签类型
  createdBy?: number // 经办人
  parkId?: number // 园区
  comId?: number // 公司
  startRentTime: string // 租赁开始时间
  endRentTime: string // 租赁结束时间
  keyWords: string // 关键字
  settled?: boolean // 是否已结算
  startCancelTime: string
  endCancelTime: string
}
/**
 * 合同退租列表
 */
export type ISurrenderTable = {
  id: number
  version: number
  contractCode: string // 合同编号
  customerType: number // 客户类型
  customerId: number // 客户id
  customerName: string // 客户名称
  resourceName: string // 资源名称
  type: number // 退租类型
  typeName: string // 退租类型
  cancelEarlier: boolean // 是否提前退租
  cancelRentTime: string // 退租日期
  status: number // 退租状态
  statusName: string // 退租状态
}

/**
 * 合同退租详情
 */
export type ISurrenderDetail = {
  id: number | undefined
  contractCode: string // 合同编号
  customerName: string // 客户名称
  proposalMethod: number // 提出方式
  proposalMethodName?: string // 提出方式
  rentStartTime: string // 合同开始时间
  rentEndTime: string // 合同结束时间
  contractId?: string
  type: number | undefined // 退租类型
  typeName: string // 退租类型
  cancelRentTime: string // 退租日期
  detailList: IContractDetails[] // 退租明细id
  reason: string // 退租原因
  remark: string // 备注
  fileInfos: IUploadFile[] // 附件
  finalBillCode?: string // 结算账单（账单链接）
  version: number | undefined
  status: number | undefined // 退租状态
  statusName: string // 退租状态
  allDetailList?: IContractDetails[] // 退租明细id
  settleList: ISettleTable[]
  depositSettleList: ISettleTable[]
  totalSettleAmount: number
  invoiceBank: string // 开户行
  invoiceAccount: string // 开户账号
  settled: boolean | undefined // 是否已结算
  createrName?: string // 申请人姓名
  verifierName?: string // 审批人
  signTime?: string // 签订日期
  contractDetails?: IContractDetails[] // 租赁明细
  billCycleNum?: number | undefined // 出账周期 付几个月的 明细里会有feeCycleUnit 天还是月，年，季
  depositCycleNum?: number | undefined // 押金周期
  startNature?: boolean | undefined // 是否启用自然月
  supplementaryRefundAmount?: number
  depositAmount?: number
  createdBy?: number // 经办人
  totalAmount?: number
  isReleaseResource: boolean // 是否释放房源
  rentsItems: {
    amount: number
    amountActReceivable: number
    amountReceivable: number
    amountReceived: number
    feeItemId: number
    id: number
    type: number
    billCode: string
    feeEndTime: string
    feeItemName: string
    feeStartTime: string
    resourceCode: string
    resourceName: string
  }[]
  depositItems: {
    amountReceived: number
    amount?: number
    feeItemId: number
    id: number
    feeItemName: string
    resourceCode: string
    resourceName: string
  }[]
  liquidatedDamagesItems: {
    amount?: number
    contractCode: string
    dailyRent?: number
    feeEndTime?: string
    feeItemId: number
    feeItemName: string
    feeStartTime?: string
    multiple?: number
    resourceCode: string
    resourceName: string
  }[]
  extraItems: {
    amount?: number
    feeItemId?: undefined
    feeItemName: string
    isExtra: true
    resourceCode: string
    resourceName?: string
  }[]
}

/**
 * 结算列表
 */
export type ISettleTable = {
  resourceName: string // 资源名称
  resourceCode: string // 资源编号
  feeItemId: number // 费用类型
  feeItemName: string // 费用类型
  startTime: string // 计费周期
  endTime: string // 计费周期
  amountReceivable: number // 应收金额
  amountReceived: number // 已收金额
  settleAmount: number // 结算金额
}
/**
 * 结算详情
 */
export type ISettleDetail = {
  changeId: number | undefined
  settleList: ISettleTable[]
  depositSettleList: ISettleTable[]
  totalSettleAmount: number
  customerName: string // 客户名称
  invoiceBank: string // 开户行
  invoiceAccount: string // 开户账号
}

/**
 * 合同变更列表搜索参数
 */
export type ISearchContractChange = {
  startDate: string
  endDate: string
  code: string // 合同编号
  contractTypes: number[] // 合同类型
  statuses: number[] // 状态
  customerComIds: number[] // 客户公司id
  customerUserIds: number[] // 客户id
  parkIds: number[] // 园区id
}

/**
 * 合同变更列表数据
 */
export type IContractChangeList = {
  id: number // 合同变更id
  code: string // 合同编号
  contractId: string // 合同id
  createTime: string // 创建时间
  customerType: number // 客户类型
  customerUserId: number | null // 个人客户id
  customerComId: number | null // 公司客户id
  customerName: string // 客户名称
  resourceName: string // 资源名称
  contractType: number // 合同类型
  contractTypeName: string // 合同类型名称
  status: number // 状态
  statusName: string // 状态名称
  createrName: string // 创建人
  parkName: string // 园区名称
  comName: string // 公司名称
  version: number // 版本号
  type: number
  typeName: string
}
