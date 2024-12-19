/**
 * 过期合同列表
 */
export type ExpiredContractList = {
  id: string
  customerName: string
  days: number
  signedByName: string
}

/**
 * 最新合同列表
 */
export type NewContractList = {
  id: string
  customerName: string
  amount: number
  signedByName: string
  signTime: string
}

/**
 * 合同排名
 */
export type ContractRanking = {
  id: number
  customerName: string
  amount: number
}

/**
 * 业绩排名
 */
export type PerformanceRanking = {
  userName: string
  avatar: string
  amount: number
  signedBy: number
}

/**
 * echarts柱状数据
 */
export type EchartsBar = {
  effective: boolean
  xData: string
  yData: number
}

/**
 * 合同金额柱状数据
 */
export type ContractAmountBar = {
  contractAmount: number
  billAmount: number
  receivedAmount: number
  xData: string
}

/**
 * 商机线索柱状数据
 */
export type BusinessClueBar = {
  effective: boolean
  xTitle: string
  yValue: number
}
