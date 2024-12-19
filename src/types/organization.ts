// 通用查询条件 公司id + id
export type IOrganizationRequest = {
  id: number | string
  companyId: number | string
  version?: number | string
}

// 员工详情
export type IOrganizationUser = {
  avatar: string
  departmentList: IOrganizationDepartmentList[]
  email?: string
  employeeNo?: string
  id?: number | string
  mobile: string
  name: string
  position?: string
  positionLevel?: string
  version: number | string
  userId: number | string
  userName?: string
  comName?: string
  depatmentNames?: string
  companyId: string | number
}

// 员工所在部门
export type IOrganizationDepartmentList = {
  id: number | string
  name: string
}

// 查询条件-员工列表
export interface ISearchOrganizationUser {
  companyId: number | string
  departmentId?: number | string
  keywords?: string
  position?: string
  positionLevel?: string
}

// 职级详情
export type IOrganizationRank = {
  companyId: number | undefined
  companyName: string
  id: number | undefined
  name: string
  sort: number | undefined
  remark: string
  version: number | undefined
}

// 查询条件-职级列表
export type ISearchOrganizationRank = {
  companyId: number | undefined
  name: string
}

// 职级表格
export type ITableOrganizationRank = {
  id: number
  companyName: string
  companyId: number
  name: string
  employeeNum: number
  sort: number
  version: number
}

// 职位详情
export type IOrganizationJob = {
  id: number | undefined
  companyId: number | undefined
  companyName: string
  name: string
  sort: number | undefined
  remark: string
  version: number | undefined
}

// 查询条件-职位列表
export type ISearchOrganizationJob = {
  companyId: number | undefined
  positionName: string
}

// 职位表格
export type ITableOrganizationJob = {
  comName: string
  id: number
  name: string
  sort: number
  userNum: number
  version: number
  companyId: number
}

// 公司列表
export type ITableOrganizationCompany = {
  name: string
  id: number
  sort: number
  employeeNum: number
  version: number
}

// 公司详情
export type IOrganizationCompany = {
  id: number | undefined
  name: string
  sort: number | undefined
  version: number | undefined
}

// 部门详情
export type IOrganizationDepartment = {
  companyId: number | string
  createTime: string
  createdBy: number | string
  deleted: boolean
  id: number | string
  name: string
  parentId: number | string
  subDepartments: IOrganizationDepartment[]
  subMemberCount: number | string
  totalMemberCount: number | string
  treeCode: string
  updateTime: string
  version: number | string
  tag?: string
}

// 查询部门树
export type ISearchOrganizationDepartment = {
  companyId?: number | string
  departmentId: number | string | undefined
}

// 新增/编辑部门
export type IEditOrganizationDepartment = {
  parentId?: number | string
  companyId: number | string
  id?: number | string
  version?: number | string
  name: string
}

// 查询条件-角色列表
export type ISearchRole = {
  companyId: number | undefined
  name: string
  status: number | undefined
}

// 角色表格
export type ITableRole = {
  id: number
  name: string
  isSys: boolean
  status: number
  statusName: string
  userNum: number
  createTime: string
  companyId: number
}

// 角色详情
export type IDetailRole = {
  id: number | undefined
  companyId: number | undefined
  name: string
  remark: string
  authCodeList: string[]
  authList: IAuthListCompany[]
  isSys: boolean
  createdByName: string
  createTime: string
  updateTime: string
}

// 企业权限功能树
export type IAuthTreeCompany = {
  id: number
  code: string
  name: string
  children: IAuthTreeCompany[]
}

// 企业权限功能列表
export type IAuthListCompany = {
  id: number
  code: string
  name: string
  category: string
}

// 查询条件-员工列表
export type ISearchUser = {
  companyId: number | undefined
  userName: string
  mobile: string
  roleIdList: number[]
}

// 员工表格
export type ITableUser = {
  id: number
  companyId: number
  name: string
  mobile: string
  roleNames: string
}
