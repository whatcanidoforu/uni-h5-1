// 押金汇总查询
export type TSearchDepositSummary = {
  buildingIds?: number[]
  type?: number // 1-按日，2-按月，3-按季，4-按半年，5-按年
  startTime: string
  endTime: string
  indexList?: string[]
  parkId?: number
}
