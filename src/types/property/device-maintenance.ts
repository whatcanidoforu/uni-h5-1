export type ISearchDeviceMaintenanceRegular = {
  searchText: string // 关键字
  deviceMaintenanceGroupId: string // 组id
  deviceId: string // 设备id
  maintainer: string // 维保人
  maintenanceState?: number | string // 组状态
  priority?: number // 优先级
  cancel?: number // 是否删除
  parkId: string // 园区id
  start: string // 开始时间
  end: string // 结束时间
  regular?: number // 是否定期
  deviceType?: number // 设备类型
  groupId?: string
}

export type IDeviceMaintenanceFormRegular = {
  deviceMaintenanceGroupId?: string // 组id
  deviceMaintenanceGroupName: string // 组名称
  deviceId: string // 设备id
  maintainer: string // 维保人
  maintenanceCycle?: string // 维保周期
  maintenanceCycleType?: number // 维保周期类型
  priority?: number // 优先级
  maintenanceStart: string // 维保开始时间
  estimatedTime: string // 预计维保时间
  description: string // 描述
}

export type IDeviceMaintenanceDetailRegular = {
  createdBy?: string
  createTime: string
  updatedBy?: string
  updatedTime: string
  deviceMaintenanceGroupId: string
  deviceMaintenanceGroupName: string
  deviceId: string
  maintenanceState: number
  lastTime: string
  nextTime: string
  beforeConfirm?: string
  maintainer: string
  maintenanceCycle: number
  maintenanceCycleType: number
  priority: number
  standardSpecification?: string
  maintenanceStart: string
  maintenanceEnd?: string
  estimatedTime: string
  cancel: number
  description: string
  deviceName: string
  maintenanceStateName: string
  parkId: string
  deviceTypeId: number
  deviceTypeName: string
  parkName: string
  maintainerName: string
}

export type ISearchDeviceMaintenance = {
  searchText: string // 关键字
  deviceId: string // 设备id
  maintenanceState?: number // 组状态
  start: string // 开始时间
  end: string // 结束时间
  maintainer: string // 维保人
  deviceType?: number // 设备类型
  priority?: number // 优先级
  parkId: string // 园区id
  groupId: string // 组id
}

export type IDeviceMaintenanceForm = {
  deviceMaintenanceName: string // 组名称
  deviceId: string // 设备id
  maintainer: string // 维保人
  priority?: number // 优先级
  maintenanceStart: string // 维保开始时间
  estimatedTime: string // 预计维保时间
  description: string // 描述
}

export type IDeviceMaintenanceRecordDetail = {
  createdBy?: string
  createTime: string
  updatedBy?: string
  updatedTime: string
  deviceMaintenanceId: string
  deviceMaintenanceName: string
  deviceMaintenanceGroupId?: string
  deviceId: string
  maintenanceStart: string
  maintenanceEnd: string
  maintenanceState?: number
  lastTime?: string
  nextTime?: string
  beforeConfirm?: string
  maintainer: string
  maintenanceCycle?: number
  maintenanceCycleType?: string
  priority?: number
  standardSpecification?: string
  estimatedTime: string
  workStart?: string
  workEnd: string
  description?: string
  cancel?: number
  confirm: string
  feedbackTypeId?: string
  feedbackDesc?: string
  pay?: number
  confirmType?: string
  confirmDesc: string
  cancelDesc?: string
  enclosure: string
  cancelType?: string
  deviceName: string
  maintenanceStateName: string
  deviceType?: number
  deviceTypeName: string
  parkId: string
  feedbackName?: string
  fileUrls: any[]
  overTime: string
  parkName: string
  maintainerName: string
}
