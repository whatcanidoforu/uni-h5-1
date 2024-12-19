// 查询设备列表的条件对象类型
export interface ISearchDeviceInfo {
  startTime?: string // 开始时间
  endTime?: string // 结束时间
  keywords?: string // 关键字
  status?: number // 状态
  parkId?: number // 园区id
  firstCategory?: number // 一级分类id
  secondCategory?: number // 二级分类id
  thirdCategory?: number // 三级分类id
  machineryRoomId?: number // 机房id
}

// 设备列表的数据类型
export interface IDeviceInfoListItem {
  address: string // 设备地址
  brandId?: number // 品牌id
  buildingId?: number // 楼栋id
  buildingName: string // 楼栋名称
  code: string // 设备编号
  createdBy?: number // 创建人id
  createdByName: string // 创建人名称
  createdTime: string // 创建时间
  deleted: boolean // 是否删除
  deviceParam?: number // 设备参数
  files: IUploadFile[] // 附件
  firstCategory?: number // 一级分类id
  firstCategoryName: string // 一级分类名称
  floorId?: number // 楼层id
  floorName: string // 楼层名称
  id: number // 设备id
  machineryRoomId?: number // 机房id
  machineryRoomName: string // 机房名称
  modelId?: number // 型号id
  name: string // 设备名称
  parkId?: number // 园区id
  parkName: string // 园区名称
  remark: string // 备注
  roomId?: number // 房间id
  roomName: string // 房间名称
  secondCategory?: number // 二级分类id
  secondCategoryName: string // 二级分类名称
  status: number // 状态
  statusName: string // 状态名称
  thirdCategory?: number // 三级分类id
  thirdCategoryName: string // 三级分类名称
  updatedBy?: number // 更新人id
  updatedByName: string // 更新人名称
  updatedTime: string // 更新时间
  version: number // 版本号
}

// 设备详情的数据类型
export interface IDeviceInfoDetail {
  address: string
  brandId?: number
  brandName: string
  buildingId?: number
  buildingName?: string
  code: string
  createdBy?: number
  createdByName: string
  createdTime: string
  deleted?: boolean
  deviceParam: {
    activatedTime: string
    appearanceTime: string
    capacity?: number
    capacityUnit: string
    deviceId?: number
    frequency?: number
    frequencyUnit: string
    id?: number
    installedTime: string
    maintenanceProvider: string
    maintenanceProviderPhone: string
    manufacturer: string
    scrapTime: string
    theoreticalTime?: number
    theoreticalTimeUnit: string
    warrantyPeriod?: number
    warrantyPeriodUnit: string
    warrantyTime: string
  }
  fileList: IUploadFile[]
  files: string
  firstCategory?: number
  firstCategoryName: string
  floorId?: number
  floorName: string
  id?: number
  machineryRoomId?: number
  machineryRoomName: string
  modelId?: number
  modelName?: string
  name: string
  parkId?: number
  parkName: string
  remark: string
  roomId?: number
  roomName: string
  secondCategory?: number
  secondCategoryName: string
  status?: number
  statusName: string
  thirdCategory?: number
  thirdCategoryName: string
  updatedBy?: number
  updatedByName: string
  updatedTime: string
  version?: number
  operationPlans?: {
    type: number // 1 维保 2 巡检
    id: number
    name: string
    code: string
  }[]
}

// 设备状态枚举 0 损坏 1 正常 2 异常 3 告警 4 冻结 5 启用 6 报废
export enum EDeviceStatus {
  '损坏' = 0,
  '正常' = 1,
  '异常' = 2,
  '告警' = 3,
  '冻结' = 4,
  '启用' = 5,
  '报废' = 6
}

// 维护记录查询条件
export type ISearchDeviceMaintenanceRegularRecord = {
  startTime?: string // 开始时间
  endTime?: string // 结束时间
  keywords?: string // 关键字
  taskType?: number // 任务类型
  deviceId?: number // 设备id
}

export type IDeviceMaintenanceRecordItem = {
  code: string // 设备编号
  createdTime: string // 创建时间
  cycleType: number // 周期类型 1 日 2 周 3 月
  cycleTypeName: string // 周期类型名称
  endTime: string // 结束时间
  excutorName: string // 执行人名称
  finishedTime?: string // 完成时间
  id: number // 维护记录id
  name: string // 任务名称
  parkId: number // 园区id
  parkName: string // 园区名称
  planCode: string // 维护计划编号
  planId: number // 维护计划id
  recipientId: number // 接收人id
  startTime: string // 开始时间
  status: number // 状态 1 待执行 2 执行中 3 已完成 4 已取消
  statusName: string
  taskType: number // 任务类型 1 保养 2 巡检
  taskTypeName: string // 任务类型名称
}
