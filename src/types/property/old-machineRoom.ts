import type { IDeviceInfoListItem } from './old-deviceInfo'
// 查询机房列表的条件对象类型
export interface ISearchMachineRoom {
  startTime?: string // 开始时间
  endTime?: string // 结束时间
  keywords?: string // 关键字
  status?: number // 状态
  parkId?: number // 园区id
  category?: number // 分类id
}

// 机房列表的数据类型
export interface IMachineRoomListItem {
  address: string // 位置
  buildingId?: number // 楼宇id
  buildingName: string // 楼宇名称
  category?: number // 机房分类
  categoryName: string // 机房分类名称
  code: string // 机房编号
  createdBy?: number
  createdByName: string // 创建人名称
  createdTime: string // 创建时间
  deleted: boolean // 是否删除
  devices: (IDeviceInfoListItem & { deviceId?: number })[] // 设备列表
  files: string // 附件
  floorId?: number // 楼层id
  floorName: string // 楼层名称
  id: 2 // 机房id
  name: string
  parkId: number // 园区id
  parkName: string
  remark: string
  status: number // 状态
  statusName: string // 状态名称
  updatedBy: number // 更新人id
  updatedByName: string // 更新人名称
  updatedTime: string // 更新时间
  version: number // 版本号
}

// 机房详情的数据类型
export interface IMachineRoomDetail {
  address: string // 位置
  buildingId?: number // 楼宇id
  buildingName: string
  category?: number // 机房分类
  categoryName: string // 机房分类名称
  code: string // 机房编号
  createdBy?: number // 创建人id
  createdByName: string // 创建人名称
  createdTime: string // 创建时间
  deleted?: boolean // 是否删除
  devices: (IDeviceInfoListItem & { deviceId?: number })[]
  fileList: IUploadFile[] // 附件
  files: string // 附件
  floorId?: number // 楼层id
  floorName: string
  id?: number // 机房id
  name: string
  parkId?: number // 园区id
  parkName: string
  remark: string
  status?: number // 状态
  statusName: string // 状态名称
  updatedBy?: number // 更新人id
  updatedByName: string // 更新人名称
  updatedTime: string // 更新时间
  version?: number // 版本号
  operationPlans?: {
    type: number // 1 维保 2 巡检
    id: number
    name: string
    code: string
  }[]
}

// 维护记录查询条件
export type ISearchMachineRoomMaintenanceRecord = {
  startTime?: string // 开始时间
  endTime?: string // 结束时间
  keywords?: string // 关键字
  taskType?: number // 任务类型
  deviceId?: number // 机房id
}

export type IMachineRoomMaintenanceRecordItem = {
  code: string // 机房编号
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
