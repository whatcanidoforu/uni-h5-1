export type TRefundMangeForm = {
  id?: number // 主键id
  code?: string // 退款单号
  parkId?: number // 园区id
  comId?: number // 公司id
  companyName?: string
  customerType?: number // 客户类型
  customerName?: string // 客户名称
  customerComId?: number // 客户公司id
  receiverName: string // 收款人名称
  receiverBank: string // 收款人开户行
  receiverBankNo: string // 收款人开户行行号
  receiverBankAccount: string // 收款人账户
  payerName: string // 付款人名称
  payerBank: string // 付款人开户行
  payerBankNo: string // 付款人开户行行号
  payerBankAccount: string // 付款人账户
  serialNo: string // 流水号
  payType?: number // 支付方式
  remark: string // 备注
  statusName?: string // 状态名称
  status?: number // 状态
  createTime?: string // 创建时间
  createdBy?: number // 创建人
  parkName?: string // 园区名称
  refundTime?: string // 退款时间
  fileInfos: IUploadFile[] // 附件
  version?: number // 版本号
  amount?: number // 本次退款金额
  createUserName?: string
  writeOffByName?: string
  writeOffTime?: string
  payTypeName?: string

  unWriteOffAmount?: number
  writeOffAmount?: number
  writeOffList?: IWriteOffList[]
}

// 核销明细(writeOffList字段)
export type IWriteOffList = {
  resourceName?: string // 关联资源
  feeItemName?: string // 费用类型
  feeStartTime?: string // 计费周期
  feeEndTime?: string
  amountReceivable?: number // 应收金额
  writeOffAmount?: number // 核销金额
  writeOffTime?: string // 核销时间（到天）
}

export type TRefundManageRefundableListSearch = {
  type?: number
  parkId?: number
  comId?: number
  keyWords?: string
  startTime?: string
  endTime?: string
  customerId?: number
  parkName?: string
  comName?: string
  customerName?: string
}

export type TRefundManageRefundableList = {
  amountBalance: number
  billAmount: number
  code: string
  billCode: string
  companyName: string
  customerId: number
  customerName: string
  date: string
  id: number
  lockAmount: number
  offAmount: number
  receivedAmount: number
  refundableAmount: number
  refunded: number
}

export enum ERefundPayType {
  '网银转账' = 60,
  '支票' = 70,
  '刷卡' = 80,
  '现金' = 10,
  '微信' = 40,
  '支付宝' = 30
}

export type TSearchRefunded = {
  feeItemIds?: number[]
  createStartTime?: string
  createEndTime?: string
  code?: string
  parkId?: number
  comId?: number
  customerComId?: number
  customerType?: number
  refundStartTime?: string
  refundEndTime?: string
  status?: number
}

export type TSearchRefundedList = {
  amount: number
  code: string
  comId: number
  companyName: string
  createTime: string
  createUserName: string
  createdBy: number
  customerComId: number
  customerName: string
  deleted: boolean
  id: number
  parkId: number
  parkName: string
  payType: number
  payerBank: string
  payerBankAccount: string
  payerBankNo: string
  payerName: string
  receiverBank: string
  receiverBankAccount: string
  receiverBankNo: string
  receiverName: string
  refundTime: string
  serialNo: string
  status: number
  statusName: string
  unWriteOffAmount: number
  updateTime: string
  version: number
  writeOffAmount: number
  writeOffTime: string
}
