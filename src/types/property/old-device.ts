// 查询-设备类型分页列表入参
export type TDeviceCategoryPage = {
  startTime?: string //
  endTime?: string //
  keywords?: string //
  status?: number //
  pageNo: number | undefined //
  pageSize: number | undefined //
}
// 查询-设备类型分页列表
export type IDeviceCategoryPage = {
  children?: IDeviceCategoryChildren[] // 子分类
}
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

// 新增设备品牌
export type TAddDeviceBrand = {
  id?: number | undefined
  brandName: string | undefined // 品牌名称
  code: string | undefined // 编码
  remark?: string | undefined // 说明备注
  sort?: number | undefined // 序号
  status?: number | undefined // 状态 0：禁用 1：启用
  fileList: IUploadFile[] // 附件
  version?: number
}
// 品牌列表
export type IDeviceBrandPage = {
  brandName: string
  code: string
  createdBy: string
  createdByName: string
  createdTime: string
  deleted: boolean
  fileList: IUploadFile[]
  id: number
  modelCount: number // 品牌关联型号的数量
  remark: string
  sort: number
  status: number
  statusName: string
  updatedBy: number
  updatedByName: string
  updatedTime: string
  version: number
}
// 品牌详情
export type IDeviceBrandDetail = {
  brandName?: string
  code?: string
  createdBy?: number
  createdByName?: string
  createdTime?: string
  deleted?: boolean
  fileList?: IUploadFile[]
  id?: number
  remark?: string
  sort?: number
  status?: number
  statusName?: string
  updatedBy?: string
  updatedByName?: string
  updatedTime?: string
  version?: number
}

// 新增设备型号
export type TAddDeviceModel = {
  id?: number | undefined
  deviceBrandId?: number | undefined // 所属品牌ID
  modelName: string //型号名称
  remark?: string | undefined // 说明备注
  status?: number | undefined // 状态 0：禁用 1：启用
  version?: number | undefined
}

// 型号列表
export type IDeviceModelPage = {
  brandName: string
  code: string
  createdBy: number
  createdByName: string
  createdTime: string
  deleted: boolean
  deviceBrandId: number
  files: string
  id: number
  modelName: string
  remark: string
  sort: number
  status: number
  statusName: string
  updatedBy: string
  updatedByName: string
  updatedTime: string
  version: number
}
