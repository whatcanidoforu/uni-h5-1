// 人员列表-查询条件
export type IUserSearch = {
  name: string
  mobile: string
  status: number | undefined
  roleIdList: number[]
}

// 人员表格数据
export type IUserTable = {
  id: number
  name: string
  mobile: string
  forbidLogin: boolean
  roleNameList: string
  version: number
}

// 角色管理-查询条件
export type IRoleSearch = {
  name: string
  isSys: boolean | undefined
  status: number | undefined
}

// 角色管理-表格数据
export type IRoleTable = {
  id: number
  name: string
  isSys: boolean
  status: number
  statusName: string
  userNum: number
  createTime: string
}

// 角色管理-新增/编辑-表单数据
export type IRoleForm = {
  id: number | undefined
  name: string
  remark: string
  authCodeList: string[]
  authList: IAuthList[]
  createUserName: string
  createTime: string
  updateTime: string
}

// 权限功能树
export type IAuthTree = {
  id: number
  code: string
  name: string
  children: IAuthTree[]
}
// 权限功能列表
export type IAuthList = {
  id: number
  code: string
  name: string
  category: string
}

/**
 * 系统配置
 */
export type ISystemConfig = {
  // id: number | undefined
  copyright: string
  loginBackground: string
  loginPic: string
  logo: string
}

// 菜单权限管理
export type ISearchMenuAuth = {
  keyword: string
  deleted?: boolean
}
export type IMenuAuth = {
  id?: number
  code?: string
  name: string
  uri: string
  permission: string
  remark: string
  deleted?: boolean
  createTime?: string
  createdBy?: number
  userId?: number
}

// 模块管理
export type TSearchModule = {
  keyword?: string
  deleted?: boolean
  pageNo?: string
  pageSize?: string
}
export type ISearchModule = {
  code?: string
  createTime?: string
  createdBy?: string
  deleted?: boolean
  id?: number
  name?: string
  permission?: string
  remark?: string
  uri?: string
}

export type ISysCfg = {
  createTime: string
  createdBy: string
  id: number
  key: string
  moduleId: number // 1：合同配置 2：费用配置
  moduleName: string
  oid: number
  parkId: number
  updateTime: string
  updatedBy: string
  value: any
  valueType?: string
}
// 行业数据字典
export type IIndustryCategory = {
  id: number
  name?: string
  oid?: number
  parentId?: number
  parkId?: number
}
