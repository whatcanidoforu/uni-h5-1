/**
 * 合同搜索参数
 */
export type ISearchContract = {
  code: string // 合同编号
  signStartTime: string // 签订开始时间
  signEndTime: string // 签订结束时间
  statuses: number[] // 类型数组
  resourceCode: string // 资源编码
  parkId: number | undefined // 园区id
  customerUserIds: number[] // 客户id
  customerComIds: number[] // 客户公司id
}

/**
 * 合同表格数据
 */
export type IContractList = {
  amount: number // 销售金额
  code: string // 合同编码
  comId: number // 公司ID
  comName: string // 公司名称
  createTime: string // 创建时间
  customerComId: number | null // 公司客户id
  customerName: string // 客户名称
  customerType: number // 客户类型 1 个人客户 2 企业客户
  customerUserId: number | null // 个人客户ID
  id: number // 合同ID
  parkId: number // 园区ID
  parkName: string // 园区名称
  signTime: string // 签订时间
  status: number // 状态
  statusName: string // 状态名称
  type: number // 合同类型
  typeName: string // 合同类型名称
  version: number
}

/**
 * 合同详情
 */
export type IContractDetail = {
  id: number | undefined // 合同ID
  code: string // 合同编号
  comId?: number
  comName?: string
  status: number | undefined // 合同状态
  statusName: string // 合同状态名称
  parkId: number | undefined // 园区ID
  parkName: string // 园区名称
  type: number | undefined // 合同类型
  outerCode: string // 外部合同编号
  signTime: string // 签订时间
  signedBy?: number
  signedByName?: string
  customerType: number | undefined // 客户类型
  customerUserId: number | undefined // 客户ID
  customerComId: number | undefined // 客户公司ID
  customerName: string // 客户名称
  amount: number | undefined // 销售金额
  remark: string // 备注
  fileInfos: IUploadFile[] // 附件
  contractDetails: IContractDetailList[] // 合同明细
  contractReceivePlans: IContractReceivePlan[] // 合同回款计划
  createTime: string // 创建时间
  createUserName: string // 创建人
  verifierName: string // 审核人
  verifyTime: string // 审核时间
  version: number | undefined // 版本号
  returnTime?: string // 交房日期
  feeDailyToMonth?: number // 30.单价×30天 360.单价×365÷12
}

/**
 * 合同明细
 */
export type IContractDetailList = {
  resourceType: string // 资源类型
  resourceCode: string // 资源编码
  resourceName: string // 资源名称
  resourceTypeName: string // 资源类型
  unitNum: number | undefined // 计费面积
  fee: number | undefined // 总价
  feeItemId: number // 费用项
  feeType: number // 费用类型
  unitPrice: number | undefined // 单价
  salesPriceUnit: string // 单位
}

/**
 * 合同回款计划
 */
export type IContractReceivePlan = {
  sort: number // 批次
  receiveTime: string // 回款时间
  amount: number // 回款金额
  percent: number // 回款比例
}
