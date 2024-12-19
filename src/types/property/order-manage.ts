// 订单列表
export type TSalesSearchOrder = {
  parkIds?: number[] // 园区Id
  code?: string
  productCode?: string
  cutomerName?: string
  orderStatus?: string
  startTime?: string
  mobile?: string
  endTime?: string // 结束时间
  pageNo?: number
  pageSize?: number
}
