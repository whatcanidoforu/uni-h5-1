// 查询作业标准列表的条件对象类型
export interface ISearchOpStandard {
  startTime?: string // 开始时间
  endTime?: string // 结束时间
  keywords?: string // 关键字
  status?: number // 状态
  parkId?: number // 园区id
  standardType?: number // 标准类型 1 维保 2 巡检
}

// 作业标准列表的数据类型
export interface IOpStandardListItem {
  appliesTo?: number // 标准性质
  code: string // 作业标准编号
  createdBy?: number // 创建人id
  createdByName: string // 创建人名称
  createdTime: string // 创建时间
  deleted: boolean // 是否删除
  deviceCount?: number // 设备数量
  files: string // 附件
  id: number // 作业标准id
  parkCount?: number // 园区数量
  parkId?: number // 园区id
  remark: string // 备注
  standardDevice: [] // 标准设备
  standardName: string // 作业标准名称
  standardRule: [] // 标准规则
  standardType: 2 // 标准类型 1 维保 2 巡检
  status: 0 // 状态 0 停用 1 启用
  statusName: string // 状态名称
  updatedBy?: number // 更新人id
  updatedByName: string // 更新人名称
  updatedTime: string // 更新时间
  version: number // 版本号
}

// 作业标准详情的数据类型
export interface IOpStandardDetail {
  code: string // 作业标准编号
  standardName: string // 作业标准名称
  standardType?: number // 标准类型 1 维保 2 巡检
  standardTypeName: string
  parkId?: number // 园区id
  parkName?: string // 园区名称
  appliesToArr?: number[] // 标准性质
  files: string // 附件
  fileList: IUploadFile[] // 附件
  remark: string // 备注
  id?: number // 作业标准id
  version?: number // 版本号
  standardRule: { content: string; sort: number }[] // 标准规则
  standardDevice: {
    code?: string
    deviceCode?: string
    name?: string
    address?: string
    parkName?: string
    buildingName?: string
    deviceName?: string
    floorName?: string
    deviceId?: number
    deviceType: number // 1 机房 2 设备
    id: number
  }[] // 标准设备
  status?: 0 // 状态 0 停用 1 启用
  statusName?: string // 状态名称
  updatedBy?: number // 更新人id
  updatedByName?: string // 更新人名称
  updatedTime?: string // 更新时间
  createdBy?: number // 创建人id
  createdByName?: string // 创建人名称
  createdTime?: string // 创建时间
  deleted?: boolean // 是否删除
  deviceCount?: number // 设备数量
  appliesToInner?: boolean // 是否内部
  appliesToThird?: boolean // 是否第三方
}
