// 月卡管理列表
export type TMonthlyCardPage = {
  keywords?: string | undefined
  startTime?: string | undefined
  endTime?: string | undefined
  unitPrice?: number | undefined
  state?: number | undefined
  villageName?: string | undefined
}
export type IMonthlyCardPage = {
  endTime?: string
  enterpriseName?: string
  isMonthCard?: number
  mobile?: string
  name?: string
  startTime?: string
  state?: number
  statusName?: string
  unitPrice?: number
  vehicleId?: string
}

// 月卡详情
export type IMonthlyCardDetail = {
  endTime?: string
  enterpriseName?: string
  isMonthCard?: number
  mobile?: string
  name?: string
  startTime?: string
  state?: number
  statusName?: string
  unitPrice?: number
  vehicleId?: string
  buyMonthlyCards?: {
    createdBy: string
    createdByName: string
    createdTime: string
    money: number
    num: number
    payType: string
    vehicleId: string
  }[]
}

// 月卡编辑
export type TMonthlyCardEdit = {
  vehicleId: string | undefined
  unitPrice: number | undefined
  name: string | undefined
  mobile: string | undefined
}

// 黑名单企业列表详情

export type IBlackList = {
  companyId?: number
  companyName?: string
  createdBy?: number
  createdTime?: string
  deleted?: boolean
  id?: number
  oid?: number
  parkId?: number
  resourceCode?: string
  resourceName?: string
  updatedBy?: number
  updatedTime?: string
  version?: number
}
