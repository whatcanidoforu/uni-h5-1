// 押金汇总查询
export type ISearchDepositSummary = {
  startTime?: string
  endTime?: string
  customerType?: number | string
  customerUserId?: number | string
  customerComId?: number | string
  parkIds?: number[]
  comIds?: number[]
}

// 押金汇总列表
export type IDepositSummaryList = {
  beforeBalance: number //期初 押金账户余额
  beforeNotReceived: number //期初  押金未收
  companyName: string
  currentBalance: number //当前  账户余额
  currentNotReceived: number //当前 押金未收
  customerId: number
  customerName: string
  customerType: number
  parkName: string
  receivableAmount: number //本期 出账押金金额
  receivedAmount: number // 本期 押金收取金额
  refundedAmount: number // 本期 押金退款金额
  adjustAmount: number
}
