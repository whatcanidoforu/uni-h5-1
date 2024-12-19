// 新增和编辑
export type IServiceTypeEdit = {
  id?: string | number
  code?: string // 服务类型编码
  name: string // 类型名称
  parentId: string | number // 一级类型名称
  sort?: string | number // 排序号
  version?: string | number // 版本
  remark?: string // 备注
  firstId?: string | number // 表单一级类型id
  secondId?: string | number // 表单二级类型id
}

// 搜索条件
export type IServiceTypeSearch = {
  minCreatedTime: string
  maxCreatedTime: string
  grantId: string | number
  status: string | number
  name: string
}

// 表单项
export type IServiceTypeTable = {
  code: string
  createdBy: string | number
  createdTime: string
  firstLevelName: string
  id: number
  name: string
  parentId: string | number
  secondLevelName: string
  sort: string | number
  status: string | number
  statusName: string
  updatedBy: string | number
  updatedTime: string
  version: string | number
  firstLevelId?: string | number
  secondLevelId?: string | number
}

export type IServiceTypeStatus = {
  id: string | number
  version: string | number
  status?: string | number
}
