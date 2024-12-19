/**
 * 意向单查询条件
 */
export type IntentionQueryParams = {
  startTime: string
  endTime: string
  code: string
  statuses: number[]
  parkId: number | undefined
  customerType: number | undefined
  customerComId: number | undefined
  customerUserId: number | undefined
  types: number[]
  departmentId: number | undefined
  userIds: number[]
}

/**
 * 意向单列表
 */
export type IntentionList = {
  id: number
  code: string
  customerName: string
  signTime: string
  deposit: number
  remainingDays: number
  type: number
  typeName: string
  status: number
  statusName: string
  signedBy: number
  signerName: string
  version: number
}

/**
 * 意向单详情
 */
export type IntentionDetail = {
  id?: number
  code: string
  customerType: number | undefined
  customerComId: number | undefined
  customerUserId: number | undefined
  customerName: string
  type: number | undefined
  typeName: string
  parkId: number | undefined
  parkName: string
  customerContact: string
  customerMobile: string
  customerProvince: string
  customerCity: string
  customerDistrict: string
  customerAddress: string
  deposit: number | undefined
  signTime: string
  rentEndTime: string
  rentStartTime: string
  rentDuration: number | undefined
  rentDurationUnit: string
  amount: number | undefined
  amountUnit: string
  amountWuye: number | undefined
  amountUnitWuye: string
  remark: string
  fileInfos: IUploadFile[]
  contractIntentionDetails: ContractIntentionDetail[]
  version: number | undefined
  status: number | undefined
  statusName: string
  chanceId: number | undefined
  contractCode: string
}

/**
 * 意向单详情
 */
export type ContractIntentionDetail = {
  resourceCode: string
  resourceType: string
  resourceName: string
  unitNum: number | undefined
  unitPrice: number
  unit: string
}

/**
 * 意向单日志列表
 */
export type IntentionLogList = {
  id: number
  createTime: string
  operatorName: string
  type: number
  typeName: string
  remark: string
}
