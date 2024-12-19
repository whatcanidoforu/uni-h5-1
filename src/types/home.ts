// 销售漏斗
export type ISalesFunnel = {
  chanceDealNum: number
  chancePendingNum: number
  chanceRepeatNum: number
  chanceFirstNum: number
  clueNum: number
}

// 获取默认公司信息
export type IDefaultCompany = {
  parkId: string | number
  name: string
  province: string
  id: string | number
  city: string
  district: string
  address: string
  businessArea: string | number
  completionDate: string
  undergroundArea: string | number
  constructionDate: string
  owerId: string | number
  greeningRate: string | number
  occupyArea: string | number
  plannedPlotRatio: string | number
  abovegroundArea: string | number
  latitude: string
  longitude: string
  actualPlotRatio: string | number
  buildingArea: string | number
  afforestedArea: string | number
}

// 合同统计数据
export type ILeaseContractStatistics = {
  contractCount: number
  receivableAmount: number
  receivedAmount: number
  unReceivedcontractCount: number
}

export type IContractAndBillItem = {
  amountReceivable: number
  billCode: string
  contractCode: string
  customerName: string
  resourceName: string
  time: string
  type: number
  contractId: string
  billId: number
}

// 完成情况
export type ITargetCompletion = {
  reached: number[]
  target: number[]
}
