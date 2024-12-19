export type IDeviceCategoryChildren = {
  children?: IDeviceCategoryChildren[]
  code?: string | undefined // 编码
  createdBy?: string | undefined // 创建人ID
  createdByName?: string | undefined // 创建人名称
  createdTime?: string | undefined // 创建时间
  deleted?: boolean | undefined
  deviceCount?: number | undefined // 关联设备数
  fileList: IUploadFile[] // 附件
  id?: number | undefined // ID
  level?: number | undefined
  name?: string | undefined // 类名
  parentId?: number | undefined // 父级ID
  sort?: number | undefined // 序号
  status?: number | undefined // 状态
  statusName?: string | undefined // 状态名
  updatedBy?: number | undefined // | undefined 更新人ID
  updatedByName?: string | undefined // 跟新人名称
  updatedTime?: string | undefined // 更新时间
  version?: number | undefined // 版本号
  remark?: string | undefined
  procdefId?: number | undefined
  procdefKey?: string | undefined
  firstLevelId?: number | undefined
  firstLevelName?: string | undefined
  secondLevelId?: number | undefined
  secondLevelName?: string | undefined
}

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
  brandName: string
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
  deviceParam: {
    activatedTime: string
    appearanceTime: string
    capacity: number
    capacityUnit: string
    deviceId: number
    frequency: number
    frequencyUnit: string
    id: number
    installedTime: string
    maintenanceDeplete: string
    maintenanceProvider: string
    maintenanceProviderPhone: string
    maintenanceStart: string
    maintenanceTimeUnit: string
    manufacturer: string
    scrapTime: string
    theoreticalTime: number
    theoreticalTimeUnit: string
    warrantyPeriod: number
    warrantyPeriodUnit: string
    warrantyTime: string
  }
  address: string
  brandId?: number
  brandName: string
  buildingId?: number
  buildingName: string
  code: string
  createdBy: number
  createdByName: string
  createdTime: string
  deleted: boolean
  fileList: IUploadFile[]
  files: string
  firstCategory?: number
  firstCategoryName: string
  floorId?: number
  floorName: string
  id: number
  machineryRoomId: number
  machineryRoomName: string
  modelId?: number
  modelName: string
  name: string
  parkId?: number
  parkName: string
  remark: string
  resourceCode: string
  roomId?: number
  roomName: string
  secondCategory: number
  secondCategoryName: string
  specification: string
  status?: number
  statusName: string
  thirdCategory: number
  thirdCategoryName: string
  updatedBy: number
  updatedByName: string
  updatedTime: string
  version: number
  fullName: string
  resourceList: {
    id: number
    code: string
    parkId: number
    name: string
    fullName: string
    category: string
    contractCode?: string
    statusName?: string
    chargeableArea?: number
    purposeSale?: boolean
    purposeRent?: boolean
    purposeSelf?: boolean
    purposeVirtual?: boolean
  }[]
}

export type ISearchMeterManageList = {
  readTime: string
  parkId?: number
  autoType?: number
  floorId?: number
  type?: number
  buildingId?: number
}

export type IMeterManageList = {
  autoType: number
  autoTypeName: string
  code: string
  createdBy: number
  createTime: string
  deleted: boolean
  deviceId: number
  id: number
  initialReading: number
  latestReadTime: null | string
  latestReadValue: number
  maxReading: number
  meterType: number
  meterTypeName: string
  multiply: number
  name: string
  oid: number
  parkId: number
  parkName: string
  readMonth: number
  readYear: number
  resourceCode: string
  resourceName: string
  thisMonthReading: number
  type: number
  typeName: string
  unitPrice: number
  updatedBy: null
  updateTime: null
  totalPrice?: number
  isAllowedModify?: boolean
}

export type IMeterManageDetail = {
  autoType: number
  deviceId: number
  feePercent: number
  id: number
  initialReading: number
  latestReadValue: number
  maxReading: number
  meterType: number
  multiply: number
  oid: number
  parkId: number
  type: number
  unitPrice: number
  latestReadTime: string
  meterTypeName: string
  name: string
  resourceCode: string
  parkName: string
  resourceName: string
  code: string
  autoTypeName: string
  createTime: string
  createdBy?: number
  deleted?: boolean
  typeName: string
  updateTime?: string
  updatedBy?: string
  meterRelResourceList: {
    feePercent: number
    id: number
    resourceName: string
  }[]
}

export type ISearchMeterRead = {
  keyword: string
  createBy?: number
  startTime: string
  endTime: string
}

export type ISearchWaterFeeList = {
  parkId?: number
  buildingId?: number
  floorId?: number
  roomId?: number
  customerId?: number
  readTime: string
}

export type IWaterFeeList = {
  spanObj?: any
  totalAmount?: number
  code: string
  contractCode: string
  customerName: string
  name: string
  resourceCode: string
  resourceName: string
  typeName: string
  amount: number
  comId: number
  customerId: number
  deviceId: number
  differenceValue: number
  feePercent: number
  lastReadValue: number
  latestReadValue: number
  multiply: number
  parkId: number
  readId: number
  type: number
  unitPrice: number
}
