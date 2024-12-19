// 查询应收列表
export interface TSearchReceiveForm {
  startTime?: string
  endTime?: string
  includeDeposit?: boolean // 是否显示押金
  resourceTypeName?: string
  customerUserId?: number
  customerComId?: number
  customerType?: number
  receiveStatus?: number[] // 应收明细查询 收款状态
  code?: string | number
  parkId: number[]
  groupId?: number[]
  buildingId?: number[]
  floorId?: number[]
  roomId?: number[]

  feeStartTime?: string
  feeEndTime?: string
  comId?: number[]
  feeItemId?: number | number[]
  billStatus?: number
  customerName?: string
  overdue?: number
  contractCode?: string
  billCode?: string
  resourceCode?: string
  minAmount?: number
  maxAmount?: number
  status?: number // 应收明细查询 应收状态
  contractIntentionCode?: string
}
export interface IReceiveDetail {
  contractType?: number // 1招商 2物业
  resourceTypeName?: string
  createUserName?: string
  updateTime?: string
  originalAmountReceivable?: number // 原始应收金额
  amountAdjusted?: number //调整金额
  amountReceivable: number //应收金额
  amountReceived: number //已收金额
  billCode: string //账单编号
  billStatus?: number //出账状态
  billStatusName?: string //出账状态
  billTime?: string //出账时间
  code?: string //应收编号
  comId?: number //乙方公司
  companyName?: string //乙方公司
  contractCode: string //合同编号
  contractId: string //合同Id
  createTime?: string //创建时间
  customerComId: number //客户公司ID
  customerType: number //客户类型
  customerTypeName?: string
  customerUserId: number //个人客户ID
  feeBizCate?: string //业务类型
  feeEndTime?: string //应收结束时间
  feeItemId?: number //费用项ID
  feeItemName?: string //费用项名称
  feeStartTime?: string //应收开始时间
  id: number | string //主键
  parkId?: number //园区ID
  parkName?: string //园区名称
  receivableTime?: string //应收时间
  receiveStatus?: number //收款状态
  receiveStatusName?: string
  roomCode?: string //房间编码
  roomName?: string
  resourceCode?: string
  resourceName?: string
  roomId?: number //房间ID
  status?: number
  statusName?: string //状态
  customerName?: string //客户名称
  version?: number
  lockAmount?: number //锁定金额
  realityReceivable?: number //实际应收金额
  amountUnreceived?: number
  remark?: string
  propertyClause?: boolean //是否物业协议
}

// 查询账单列表
export interface TSearchBill {
  feeItemIds?: number[]
  customerComId?: number
  customerUserId?: number
  customerType?: number
  status?: number
  contractCode?: string
  pageSize?: number
  pageNum?: number
  comId?: number[]
  code?: string
  receiveStatus?: number[]
  parkId: number[]
  customerName?: string
  startTime?: string
  endTime?: string
  arrears?: number
  labelType?: number
  contractIntentionCode?: string
  category?: number
  minAmount?: number
  maxAmount?: number
  invoice?: number // 是否开票
  writeOffStartTime?: string
  writeOffEndTime?: string
}
export interface IBill {
  amountReceivable: number //应收金额
  amountReceived: number //已收金额
  amountUnReceived: number //未收金额
  arrearsDays: number
  category: number
  categoryName: string
  code: string //账单编号
  comId: number //乙方公司ID
  contractCode: string //合同编号
  contractId: string //合同ID
  createTime: string //创建时间
  customerComId: number //企业用户ID
  customerName: string // 客户名称
  customerType: number //客户类型
  customerTypeName: string
  customerUserId: number //个人客户ID
  id: number //主键
  parkId: number //园区ID
  parkName: string
  receivableTime: string
  receiveStatus: number //收款状态
  receiveStatusName: string
  status: number
  statusName: string
  version: number
  companyName?: string
  invoice?: number // 是否开票
}

// 查询账单明细
export interface TBillDetail {
  createUserName?: string
  updateTime?: string
  restBillAmount: string
  receivedAmount?: number
  amountUnreceived?: number // 未收金额
  statusName: string
  receivableTime: string
  amountReceivable: number
  amountReceived: number
  code: string
  comId: number
  contractCode: string
  contractId: string
  customerComId: number
  customerName: string
  customerType: number
  customerUserId: number
  id: number
  parkId?: number
  receivableList: ReceivableList[]
  billReceivableOffList: BillReceivableOffList[]
  status: number
  receiveStatus: number //收款状态
  receiveStatusName: string
  createTime: string
  parkName: string
  companyName: string
  remark: string
  version: number
  autoCreated?: boolean
}
export interface BillReceivableOffList {
  amount: number
  code: string
  createTime: string
  deleted: boolean
  id: number
  payType: number
  receivableId: number
  receivedId: number
}
export interface ReceivableList {
  resourceCode: string
  resourceName: string
  resourceTypeName: string
  amountAdjusted: number
  amountReceivable: number
  amountReceived: number
  billStatus: number
  code: string
  comId: number
  contractCode: string
  contractId: string
  createTime: string
  customerComId: number
  customerName: string
  customerType: number
  customerUserId: string
  deleted: boolean
  feeBizCate: string
  feeEndTime: string
  feeItemId: number
  feeItemName: string
  feeStartTime: string
  id: number
  receivedAmount?: number
  unReceivedAmount?: number
  parkId: number
  receivableTime: string
  receiveStatus: number
  roomCode: string
  roomId: number
  updateTime: string
  version: number
}

// 申请新增应收
export interface TAdjustForAdd {
  verifiedUserName?: string
  verifyTime?: string
  updateTime?: string
  companyName?: string
  parkName?: string
  statusName?: string
  createTime?: string
  code?: string
  typeName?: string
  createUserName?: string
  amount?: number // 总金额
  receivableAdjustId?: number // update时
  version?: number // update时
  adjustDetailList: IAdjustDetailList[]
  attachment?: string
  comId?: number
  contractCode?: string
  contractId?: string
  customerComId?: number
  customerUserId?: number
  customerName?: string
  customerType?: number
  feeBizCate?: string
  feeEndTime?: string
  feeItemId?: number
  feeItemName?: string
  feeStartTime?: string
  parkId: number | undefined
  receivableTime?: string
  remark?: string
  roomCode?: string
  roomId?: number
  files?: IUploadFile[]
}
export interface IAdjustDetailList {
  amount?: number
  contractCode?: string
  contractId?: string
  feeBizCate?: string
  feeEndTime?: string
  feeItemId?: number
  feeItemName?: string
  feeStartTime?: string
  receivableTime?: string
  roomCode?: string
  roomId?: number
  resourceCode?: string
  resourceName?: string
  resourceType?: number
  resourceTypeName?: string
}

// 查询应收调整单列表
export interface TSearchReceivableAdjust {
  customerComId?: number
  customerName?: string //客户名称
  customerType?: number
  customerUserId?: number
  receivableCode?: string
  parkId?: number[] | number
  comId?: number[]
  startTime?: string
  endTime?: string
  checkStartTime?: string
  checkEndTime?: string
  status?: number | number[]
  type?: number //1  调整  2新增
  code?: string
}
export interface IReceivableAdjust {
  amount: number //调整金额
  code: string //调整单号
  comId: number
  companyName: string //公司名称
  createTime: string //调整日期
  createUserName: string
  createdBy: string
  customerComId: number
  customerName: string //客户名称
  customerType: number
  customerUserId: number
  deleted: false
  id: number
  parkId: number
  parkName: string //园区名称
  remark: string
  status: number
  statusName: string //审核状态
  type: number
  typeName: string //调整类型
  updateTime: string //审核日期
  version: number
}

// 查询应收调整单详情
export interface IDetailReceivableAdjust {
  contractId: string
  contractCode: string
  verifiedUserName: string
  verifyTime: string
  // 调整金额
  amount: number
  // 调整后金额
  amountAfter: number
  // 调整单号
  code: string
  comId: number
  // 公司名称
  companyName: string
  createdBy: string
  // 申请日期
  createTime: string
  createUserName: string
  customerComId: number
  // 客户名称
  customerName: string
  customerType: number
  customerUserId: number
  deleted: boolean
  details: IDetailReceivableAdjustDetails[]
  // 附件
  files: IUploadFile[]
  id: number
  parkId?: number
  // 园区名称
  parkName: string
  // 备注
  remark: string
  status?: number
  // 状态
  statusName: string
  type?: number
  // 调整单类型
  typeName: string
  updateTime: string
  version: number
}
export interface IDetailReceivableAdjustDetails {
  resourceType: number
  resourceTypeName: string
  receivableCode: string
  receivableAmount: number

  adjustId: number
  amount: number
  amountAfter: number
  contractCode: string
  contractId: string
  createdBy: string
  createTime: string
  createUserName: string
  deleted: boolean
  feeBizCate: string
  feeEndTime: string
  feeItemId: number
  feeItemName: string
  feeStartTime: string
  id: number
  receivableId: number
  receivableTime: string
  roomCode: string
  roomId: number
  roomName: string
  resourceCode: string
  resourceName: string
  updateTime: string
  amountReceivable?: number | undefined
}

// 应收核销
export interface TSendWriteOffReceivable {
  writeOffDetailList: IWriteOffDetailList[]
  CreateReceivedRequest: {
    unWriteOffAmount?: number
    writeOffAmount: number
    writeOffStatusName: string
    code: string
    receivedId: number | string
    version?: number

    userId: number | string
    parkId?: number
    payType?: number
    customerComId?: number
    customerUserId?: number
    customerName?: string
    customerType?: number
    payerBank?: string
    payerBankNo?: string
    payerBankAccount: string
    comId?: number
    receiverName?: string
    payerName?: string
    receiverBank?: string
    receiverBankNo?: string
    receiverBankAccount: string
    receivedTime?: string
    serialNo?: string
    remark?: string
    amount?: number
  }
}
export interface IWriteOffDetailList {
  receivableId: number
  receivedAmount?: number
}

// 费用调整申请
export interface TCreateReceivableAdjust {
  verifiedUserName?: string
  verifyTime?: string
  updateTime?: string
  statusName?: string
  parkName?: string
  companyName?: string
  receivableAdjustId?: number
  version?: number
  code?: string
  amount?: number
  typeName?: string
  createUserName?: string
  contractCode?: string
  customerUserId: number
  customerComId: number
  createTime?: string
  files?: IUploadFile[]
  // 调整明细列表
  adjustDetailList: IAdjustDetailRequestList[]
  // 公司id
  comId?: number
  // 客户名
  customerName?: string
  // 客户类型
  customerType?: number
  // 园区Id
  parkId?: number
  // 备注
  remark?: string
  // 客户id，根据客户类型取对应的客户id
  userId?: number
}

export interface IAdjustDetailRequestList {
  // 金额
  amount?: number
  // 调整后金额
  amountAfter?: number
  // 应收id
  receivableId?: number
  id?: number
  resourceTypeName?: string
  resourceCode?: string
  resourceName?: string
  amountReceivable?: number | undefined
}

// 查询收款列表
export interface TSearchReceived {
  feeItemIds?: number[]
  writeOffStatus?: number[] // 核销状态
  code?: string
  comId?: number[]
  customerName?: string
  customerType?: string
  customerId?: number
  customerComId?: number
  customerUserId?: number
  endTime?: string
  pageNo?: number
  pageSize?: number
  parkId?: number[]
  // 收款状态
  receiveStatus?: string
  startTime?: string

  rzStatus?: number
}
export interface IReceived {
  version: number
  amount: number
  code: string
  comId: number
  createTime: string
  customerComId: number
  customerName: string
  customerType: number
  customerUserId: number
  deleted: boolean
  id: number
  payerBank: string
  payerBankAccount: string
  payerBankNo: string
  payerName: string
  payType: number
  receiverBank: string
  receiverBankAccount: string
  receiverBankNo: string
  receiverName: string
  serialNo: string
  status: number
  updateTime: string
  writeOffAmount: number
  unWriteOffAmount: number
}

// 查询收款详情
export interface IGetReceivedDetail {
  writeOffStatusName?: string
  amount?: number
  code?: string
  comId?: number
  createdBy?: string
  createTime?: string
  createUserName?: string
  customerComId?: number
  customerName?: string
  customerType?: number
  customerUserId?: number
  deleted?: boolean
  files?: string
  fileInfos: IUploadFile[]
  id?: number
  parkId?: number
  payerBank?: string
  payerBankAccount?: string
  payerBankNo?: string
  payerName?: string
  payType?: number
  payTypeName?: string
  receivedTime?: string
  receiverBank?: string
  receiverBankAccount?: string
  receiverBankNo?: string
  receiverName?: string
  receiverWxMchid?: string
  receiveStatus?: number
  receiveStatusName?: string
  remark?: string
  receivedRemark?: string
  serialNo?: string
  status?: number
  statusName?: string
  updateTime?: string
  version?: number
  writeOffAmount?: number
  writeOffBy?: string
  writeOffStatus?: number
  writeOffTime?: string
  writeOffUserName?: string
  parkName?: string
  companyName?: string
  unWriteOffAmount?: number

  writeOffList?: {
    amountAdjusted: number
    amountFree: number
    amountReceivable: number
    amountReceived: number
    amountUnReceived: number
    billCode: string
    billStatus: number
    billStatusName: string
    billTime: string
    code: string
    comId: number
    contractCode: string
    contractDetailId: number
    contractId: string
    contractIntentionCode: string
    contractReceivePlanId: number
    contractType: number
    createTime: string
    createUserName: string
    createdBy: number
    customerComId: number
    customerName: string
    customerType: number
    customerTypeName: string
    customerUserId: number
    deleted: boolean
    feeBizCate: string
    feeEndTime: string
    feeItemId: number
    feeItemName: string
    feeStartTime: string
    fwCode: string
    id: number
    oriDepositId: number
    parkId: number
    receivableTime: string
    receiveStatus: number
    receiveStatusName: string
    receivedTime: string
    refundable: boolean
    refunded: number
    resourceCode: string
    resourceName: string
    resourceType: string
    resourceTypeName: string
    status: number
    statusName: string
    updateTime: string
    version: number
    writeOffAmount: number
    writeOffId: number
    writeOffTime: string
  }[]
}

// 收款单入账
export interface TCashierEntry {
  receivedId?: number // 收款i的
  payType?: number // 支付方式
  serialNo?: string // 流水号
  receivedTime?: string // 入账时间
  payerBank?: string // 付款银行
  payerBankAccount?: string // 付款银行账号
  receiverBank?: string // 收款银行
  receiverBankAccount?: string // 收款银行账号
  remark?: string // 备注
  receivedRemark?: string // 备注
  fileInfos?: IUploadFile[] // 文件
}

// 收款单新增
export interface TCreateReceived {
  receivedTime?: string // 收款时间
  amount?: number // 收款金额
  customerType?: number // 客户类型
  customerComId?: number // 客户id
  customerName?: string
  parkId?: number // 园区id
  comId?: number // 收款公司
  companyName?: string
  payType?: number // 付款方式
  payerBank?: string // 付款银行
  payerBankAccount?: string // 付款银行账号
  receiverBank?: string // 收款银行
  receiverBankAccount?: string // 收款银行账户
  serialNo?: string // 交易流水号
  remark?: string // 备注
  fileInfos: IUploadFile[] // 文件
}

// 收款单编辑
export interface TUpdateReceived {
  id?: number
  customerName?: string
  payType?: number
  payerBank?: string
  payerBankNo?: string
  comId?: number
  receiverName?: string
  receiverBank?: string
  receiverBankNo?: string
  receivedTime?: string
  serialNo?: string
  remark?: string
  version?: number
  fileInfos: IUploadFile[]

  payerBankAccount?: string
  receiverBankAccount?: string
  amount?: number // 收款金额
  customerType?: number // 客户类型
  customerComId?: number // 客户id
  parkId?: number // 园区id
}

// 查询应退列表
export interface TSearchRefundable {
  // 应退编号
  code: string
  // 公司ID
  comId: number[]
  // 客户名称
  customerName: string
  pageNo: number
  pageSize: number
  // 园区ID
  parkId: number[]
  // 退款状态，退款状态 0: 未退 10: 部分退 20: 已退
  refundableStatus: string[]
}

export interface ISearchRefundable {
  refundableId: number
  amountAdjusted?: number
  amountRefundable?: number
  amountRefunded?: number
  code?: string
  comId?: number
  companyName?: string
  contractCode: string
  contractId: string
  createdBy?: string
  createTime?: string
  createUserName?: string
  customerComId: number
  customerName?: string
  customerType: number
  customerUserId: number
  deleted?: boolean
  feeBizCate?: string
  feeItemId?: number
  feeItemName?: string
  id?: number
  parkId?: number
  parkName?: string
  refundStatus?: number
  refundStatusName?: string
  roomCode?: string
  roomId?: number
  resourceCode: string
  resourceName: string
  resourceTypeName: string
  status?: number
  statusName?: string
  updateTime?: string
  version?: number
}

// 查询押金明细列表
export interface TSearchReceivableDeposit {
  statuses?: number[]
  startTime?: string // 开始时间
  endTime?: string // 结束时间
  customerName?: string
  customerType?: number // 客户类型
  customerUserId?: number // 个人客户
  customerComId?: number // 公司客户
  feeItemId?: string // 费用Id
  code?: string // 编号
  parkIds?: number[]
  comIds?: any // 公司列表
  balanceType?: number // 0 余额=0； 1，余额>0
}
export interface ISearchReceivableDeposit {
  amountUnReceived?: number // 押金未收金额
  amountRefundable?: number // 押金可退金额
  amountBalance: number
  amountReceivable: number
  amountReceived: number
  amountAdjusted: number
  billTime: string
  canRefundable: number
  code: string
  comId: number
  companyName: string
  createTime: string
  customerComId: number
  customerName: string
  customerType: number
  customerTypeName: string
  customerUserId: number
  feeItemId: number
  feeItemName: string
  id: number
  parkId: number
  parkName: string
  refundable: boolean
  refunded: number
  resourceCode: string
  resourceName: string
  resourceType: string
  version: number
}

// 查询应退详情
export interface TGetRefundable {
  amountNotRefunded?: number
  amountBefore?: number
  resourceTypeName: string
  resourceCode: string
  resourceName: string
  // 调整金额
  amountAdjusted: number | string
  // 应退金额
  amountRefundable: number | string
  // 已退金额
  amountRefunded: number | string
  // 应退编号
  code: string
  comId?: number
  // 公司名称
  companyName: string
  // 合同编号
  contractCode: string
  contractId: string
  createdBy: string
  // 创建时间
  createTime: string
  createUserName: string
  customerComId: number
  // 客户名称
  customerName?: string
  customerType?: number
  customerUserId: number
  deleted?: boolean
  feeBizCate: string
  feeItemId?: number
  // 应退类型
  feeItemName: string
  id?: number
  parkId?: number
  parkName: string
  refundStatus?: number
  // 应退状态
  refundStatusName: string
  roomCode: string
  roomId?: number
  status?: number
  statusName: string
  updateTime: string
  version?: number
}
// 查询应收详情下收款列表
export interface IReceivableOffInfo {
  contractId: string
  contractCode: string
  receivableId: number
  amount: number
  code: string
  receivedTime: string
  receivedId: number
}

// 查询应退详情下退款列表 bill.refund.getRefundableOffInfo
export interface IRefundableOffInfo {
  amount: number
  code: string
  comId: number
  createTime: string
  createUserName: string
  createdBy: string
  customerComId: number
  customerName: string
  customerType: number
  customerUserId: number
  deleted: boolean
  id: number
  parkId: number
  payType: number
  payerBank: string
  payerBankAccount: string
  payerBankNo: string
  payerName: string
  receiverBank: string
  receiverBankAccount: string
  receiverBankNo: string
  receiverName: string
  remark: string
  serialNo: string
  status: number
  statusName: string
  updateTime: string
  version: number
}

// 退款申请 bill.refund.createRefundedApply
export interface TCreateRefundedApply {
  // 退款明细
  createRefundedRequest: TCreateRefundedRequest
  detailRequestList: IDetailRequestList[]
}
export interface TCreateRefundedRequest {
  // 企业id
  comId: number | string
  // 企业客户id
  customerComId: number | string
  // 客户名称
  customerName: string
  // 客户类型
  customerType: number | string
  // 个人客户id
  customerUserId: number | string
  // 园区id
  parkId: number | string
  // 付款银行
  payerBank: string
  // 付款银行账户
  payerBankAccount: string
  // 付款银行行号
  payerBankNo: string
  // 付款 名称
  payerName: string
  // 支付类型
  payType: number | string
  // 收款银行
  receiverBank: string
  // 收款银行账户
  receiverBankAccount: string
  // 收款银行行号
  receiverBankNo: string
  // 收款名称
  receiverName: string
  // 流水号
  serialNo: string
  files: IUploadFile[]
}

// 创建押金退款
export interface TCreateReceivableRefund {
  detailRequestList: TCreateReceivableRefundIDetailRequestList[]
  createRefundedRequest: TCreateRefundedRequestCreateRefundedRequest
}
export interface TCreateRefundedRequestCreateRefundedRequest {
  parkId: number | string // 园区id
  comId: number | string // 企业id
  customerType: number | string // 客户类型
  customerName: string // 客户名称
  customerUserId: number | string // 个人客户id
  customerComId: number | string // 企业客户id
  receiverName: string // 收款名称
  receiverBank: string // 收款银行
  receiverBankNo: string // 收款银行行号
  receiverBankAccount: string // 收款银行账户
  payType: number | string // 支付类型
  payerName: string // 付款 名称
  payerBank: string // 付款银行
  payerBankNo: string // 付款银行行号
  payerBankAccount: string // 付款银行账户
  serialNo: string // 流水号
  files: IUploadFile[]
}
export interface TCreateReceivableRefundIDetailRequestList {
  receivableId: number | string | undefined
  // 填写金额
  refundableAmount?: number | string | undefined
}

// 编辑押金退款 bill.refund.updateReceivableRefunded
export interface TUpdateReceivableRefunded {
  detailRequestList: TUpdateRefundedIDetailRequestList[]
  updateRefundedDetailRequest: TUpdateRefundedUpdateRefundedDetailRequest
}
export interface TUpdateRefundedIDetailRequestList {
  receivableId: number | string | undefined
  // 填写金额
  refundableAmount?: number | string | undefined
}
export interface TUpdateRefundedUpdateRefundedDetailRequest {
  parkId?: number // 园区id
  id?: number | string // 退款单id
  comId?: number | string // 企业id
  customerType?: number | string // 客户类型
  customerName?: string // 客户名称
  customerUserId?: number | string // 个人客户id
  customerComId?: number | string // 企业客户id
  receiverName?: string // 收款名称
  receiverBank?: string // 收款银行
  receiverBankNo?: string // 收款银行行号
  receiverBankAccount?: string // 收款银行账户
  payType?: number | string // 支付类型
  payerName?: string // 付款 名称
  payerBank?: string // 付款银行
  payerBankNo?: string // 付款银行行号
  payerBankAccount?: string // 付款银行账户
  serialNo?: string // 流水号
  files?: IUploadFile[]
}

// 编辑 退款申请 bill.refund.updateRefunded
export interface TUpdateRefunded {
  detailRequestList: IDetailRequestList[]
  updateRefundedDetailRequest: TUpdateRefundedDetailRequest
}
// 退款 申请 / 编辑
export interface TUpdateRefundedDetailRequest {
  comId?: number | string
  customerComId?: number | string
  customerUserId?: number | string
  customerName?: string
  customerType?: number | string
  parkId?: number | string
  payType?: number | string
  id?: number | string
  serialNo?: string
  payerName?: string
  payerBank?: string
  payerBankAccount?: string
  receiverName?: string
  receiverBank?: string
  receiverBankAccount?: string
  files?: IUploadFile[]
  version?: number
}

export interface IDetailRequestList {
  // 填写金额
  refundableAmount?: number | string | undefined
  // 应退id
  refundableId?: number | string | undefined
  id?: number | string
  customerType?: number | string
  customerUserId?: number | string
  customerComId?: number | string
  resourceTypeName?: string
  resourceCode?: string
}

// 应退调整-申请调整 bill.refund.createRefundableAdjust
export interface TCreateRefundableAdjust {
  amount?: number
  // 调整明细
  adjustDetailRequestList: IRefundableAdjust[]
  // 企业id
  comId: number | string
  // 客户名称
  customerName: string
  // 客户类型
  customerType: number | string
  customerUserId: number | string
  customerComId: number | string
  // 园区id
  parkId: number | string
  // 备注
  remark: string
  // 用户id
  userId: number | string
  files: IUploadFile[]
}
export interface IRefundableAdjust {
  // 金额
  amount?: number | string | undefined
  // 调整后金额
  amountAfter?: number | string | undefined
  // 应退id
  refundableId?: number | string
  resourceTypeName?: string
  resourceCode?: string
  customerType?: number | string
  id?: number | string
  customerUserId?: number | string
  customerComId?: number | string
  amountRefundable?: number | undefined
}

// 查询应退调整列表
export interface TSearchRefundableAdjust {
  // 审核结束时间
  checkEndTime?: string
  // 审核开始时间
  checkStartTime?: string
  // 调整单编号
  code?: string
  // 公司
  comId?: number[] | number
  // 客户公司id
  customerComId?: number
  // 客户用户id
  customerUserId?: number
  // 客户类型
  customerType?: number
  // 客户名称
  customerName?: string
  // 结束时间
  endTime?: string
  // 园区
  parkId?: number[]
  // 开始时间
  startTime?: string
  // 审核状态
  status?: number
  // 类型，1 新增 2 调整
  type?: number
}
export interface ISearchRefundableAdjust {
  amount: number
  code: string
  comId: number
  companyName: string
  createTime: string
  createUserName: string
  createdBy: string
  customerComId: number
  customerName: string
  customerType: number
  customerUserId: number
  deleted: boolean
  id: number
  parkId: number
  parkName: string
  remark: string
  status: number
  statusName: string
  type: number
  typeName: string
  updateTime: string
  version: number
}

// 查询应退调整详情
export interface TGetRefundableAdjust {
  verifiedUserName: string
  verifyTime: string
  amount: number | string
  code: string
  comId: number | string
  companyName: string
  createdBy: string
  createTime: string
  createUserName: string
  customerComId: number
  customerName: string
  customerType: number | string
  customerUserId: number
  deleted: boolean
  id: number | string
  list: IGetRefundableAdjustList[]
  parkId: number | string
  parkName: string
  remark: string
  status: number | undefined
  statusName: string
  type: number | string
  typeName: string
  updateTime: string
  version: number | string
  files: IUploadFile[]
}
export interface IGetRefundableAdjustList {
  adjustId?: number
  amount?: number
  amountBefore?: number
  amountAfter?: number
  contractCode: string
  contractId: string
  createdBy?: string
  createTime?: string
  createUserName?: string
  deleted?: boolean
  feeBizCate?: string
  feeItemId?: number
  feeItemName?: string
  id?: number
  refundableId?: number
  remark?: string
  roomCode?: string
  resourceCode: string
  resourceName: string
  resourceTypeName: string
  roomId?: number
  updateTime?: string
  version?: number
}

// 新增应退调整（增加）bill.refund.createRefundableAdjustForAdd
export interface TCreateRefundableAdjustForAdd {
  contractCode: string
  userId: number | string // 当前登陆用户
  // 公司ID
  comId?: number
  // 公司客户ID
  customerName?: string
  customerComId?: number
  // 客户类型
  customerType?: number
  // 个人客户Id
  customerUserId?: number
  details: ICreateRefundableAdjustForAddDetails[]
  // 园区ID
  parkId: number | undefined
  // 备注
  remark?: string
  // 类型，1 新增 2 调整
  type?: number
  files: IUploadFile[]
}
export interface ICreateRefundableAdjustForAddDetails {
  // 金额
  amount?: number
  // 合同ID
  contractCode?: string
  feeBizCate?: number
  // 费用项ID
  feeItemId?: string
  // 费用项名称
  feeItemName?: string
  // 备注
  remark?: string
  // 房产code
  roomCode?: string
  // 房产ID
  roomId?: number
  resourceCode?: string | number
  resourceName?: string
  resourceType?: number
  resourceTypeName?: string
}

// 退款单列表 bill.refund.searchRefunded
export interface TSearchRefunded {
  feeItemIds?: number[]
  code: string // 编号
  comId: string[] | number[] // 公司
  customerId: number | string // 客户id
  customerName: string
  customerType: number | string // 客户类型
  startTime: string // 退款开始时间
  endTime: string // 结束时间
  parkId: number[] // 园区
  status: string[] // 状态
  refundableStatus: number | string
  customerComId: string | number
  customerUserId: string | number
}
export interface ISearchRefunded {
  amount: number
  code: string
  comId: number
  companyName: string
  createTime: string
  createUserName: string
  createdBy: string
  customerComId: number
  customerName: string
  customerType: number
  customerUserId: number
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
  serialNo: string
  status: number
  statusName: string
  updateTime: string
  version: number
}

// 退款单详情
export interface TGetRefundedDetail {
  createTime?: string
  createUserName?: string
  amount?: number | string
  code?: string
  comId?: number
  companyName?: string
  customerComId: number
  customerName?: string
  customerType?: number
  customerUserId: number
  id?: number
  parkId?: number
  parkName?: string
  payType?: number
  payerBank?: string
  payerBankAccount?: string
  payerBankNo?: string
  payerName?: string
  receiverBank?: string
  receiverBankAccount?: string
  receiverBankNo?: string
  receiverName?: string
  refundTime?: string
  refundedBy?: string
  refundUserName?: string
  itemList: TGetRefundedRefundableList[]
  serialNo?: string
  status?: number
  statusName?: string
  version?: number
  files: IUploadFile[]
  payTypeName?: string
  remark?: string
}
export interface TGetRefundedRefundableList {
  amountReceived: number
  canRefundable: number
  contractCode: string
  contractId: string
  currRefunded: number
  feeItemId: number
  feeItemName: string
  receivableCode: string
  receivableId: number
  resourceCode: string
  resourceName: string
  resourceType: string
  resourceTypeName: string
}

export interface IGetPersonalBillInfo {
  amountReceivable: number
  amountReceived: number
  amountUnReceived: number
  code: string
  comId: number
  companyName: string
  contractCode: string
  contractId: string
  createTime: string
  customerComId: number
  customerName: string
  customerType: number
  customerTypeName: string
  customerUserId: number
  id: number
  parkId: number
  parkName: string
  receiveStatus: number
  receiveStatusName: string
  status: number
  version: number
}

// 应收汇总
export enum EAdvanceReceiptBalanceType {
  // 当前应收余额不等于0 1  大于0 2 小于0 3
  NotEqualZero = 1,
  GreaterThanZero = 2,
  LessThanZero = 3
}

export type IAdvanceReceiptSearch = {
  startTime: string
  endTime: string
  customerId?: string | number
  customerType: number | string
  balanceType: EAdvanceReceiptBalanceType
  parkId: number[] | string[]
  comId: number[] | string[]
  customerComId?: string | number
  customerUserId?: string | number
}

export type IAdvanceReceiptTable = {
  customerId: number // 客户id
  customerName: string // 客户名称
  parkName: string // 园区名称
  companyName: string // 公司名称
  currentBalance: number // 当前应收余额
  receivableAmount: number // 应收金额
  adjustAmount: number // 调整金额
  receivedAmount: number // 已收金额
  refundedAmount: number // 已退金额
  beforeBalance: number // 期初应收余额
  customerType: number // 客户类型
  unreceivedAmount: number
}

// 收银台查询 园区=>公司=>费用条目
export interface IParkCashierList {
  parkId: number
  parkName: string
  companyCashierList: {
    comId: number
    companyName: string
    totalAmountReceivable: number
    detail: ICashierList[]
  }[]
}
export interface ICashierList {
  amountReceivable: number
  amountReceived: number
  code: string
  comId: number
  feeBizCate: string
  feeEndTime: string
  feeItemId: number
  feeItemName: string
  feeStartTime: string
  id: number
  parkId: number
  receivableTime: string
  resourceCode: string
  resourceName: string
  resourceType: string
  unAmountReceived: number
  receivedAmount: number
}

// 创建收银台
export interface TCreateCashierReceived {
  createCashierRequest: TCreateCashierRequest
  cashierDetailList: ICashierDetailList[]
}
export interface TCreateCashierRequest {
  payType?: number // 支付方式
  receivedTime?: string // 收款时间 //
  payerBank?: string // 付款银行
  payerBankAccount?: string // 付款账号
  receiverBank?: string // 收款银行
  receiverBankAccount?: string // 收款账号
  serialNo?: string // 流水号
  remark?: string // 备注
  fileInfos: IUploadFile[] // 文件
  customerName?: string
  payTypeName?: string
  parkId?: number
  comId?: number
  customerType?: number
  customerId?: number
}
export interface ICashierDetailList {
  receivableId?: number
  receivedAmount?: number | string
}

/**
 * 押金退款查询参数
 */
export type IGetDepositRefundListParams = {
  startTime: string
  endTime: string
  customerType: number | undefined
  customerUserId: number | undefined
  customerComId: number | undefined
  code: string
  parkId: number | undefined
  comId: number | undefined
}

// 获取可收款应收列表
export type TBillReceiveSearchCanReceivedReceivable = {
  parkId?: number
  customerType?: number
  customerId?: number
  comId?: number
  billStartTime?: string
  billEndTime?: string
  billCode?: number
  category?: number // 账单类型 0 应收 10 押金
}

// 获取可收款应收列表
export type IBillReceiveSearchCanReceivedReceivable = {
  amountReceivable: number
  amountReceived: number
  amountUnReceived: number
  arrearsDays: number
  category: number
  categoryName: string
  code: string
  comId: number
  companyName: string
  contractCode: string
  contractId: string
  createTime: string
  customerComId: number
  customerName: string
  customerType: number
  customerTypeName: string
  customerUserId: number
  id: number
  parkId: number
  parkName: string
  receivableTime: string
  receiveStatus: number
  receiveStatusName: string
  status: number
  statusName: string
  version: number
}
