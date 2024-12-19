export interface IPermission {
  sessionId: string
  userId: string
  oldToken: string
  oldEmpId: string
}

export interface IUserAuth {
  authValues: IAuthValue[]
  bizCates: number[]
  companies: ICompany[]
  parkAuths: string[]
  parks: IPark[]
  salesAuths: ISalesAuth[]
  sysAdmin: boolean
  wuyeAuths: IWuyeAuth[]
}
export interface IAuthValue {
  bizCate: number
  code: string
  createdBy: null
  createTime: string
  createUserName: string
  deleted: boolean
  id: number
  name: string
  remark: string
  updateTime: null
}

export interface ICompany {
  address?: string
  bank?: string
  bankAccount?: string
  bankNo?: string
  city?: string
  createdBy?: null
  createTime?: string
  createUserName?: string
  customer?: boolean
  deleted?: boolean
  district?: string
  email?: string
  id: number
  idFileInfos?: string[]
  idFiles?: string
  idNumber?: string
  idType?: number
  isCustomer?: boolean
  mobile?: string
  name: string
  phone?: string
  province?: string
  taxNo?: string
  updateTime?: string
  version?: number
}

export interface IPark {
  abovegroundArea?: number
  actualPlotRatio?: number
  address?: string
  afforestedArea?: number
  buildingArea?: number
  businessArea?: number
  city?: string
  code?: string
  completionDate?: string
  constructionDate?: string
  createdBy?: null
  createTime?: string
  createUserName?: string
  deleted?: boolean
  district?: string
  greeningRate?: number
  id: number
  latitude?: string
  longitude?: string
  name?: string
  occupyArea?: number
  owerId?: number
  parkName?: string
  plannedPlotRatio?: number
  province?: string
  status?: number
  statusName?: string
  undergroundArea?: number
  updateTime?: string
  version?: number
  wyParkId: string
}

export interface ISalesAuth {
  authCode: string
  companyId: number
  parkId: number
  roleCode: string
}

export interface IWuyeAuth {
  authCode?: string
  companyId?: number
  parkId?: number
  roleCode?: string
}

export interface IMenu {
  id: string
  path: string
  external: boolean
  name: string
  icon: string
  hide: boolean
  children: IMenu[]
}

/**
 * 注册
 */
export type IRegister = {
  loginName: string
  password: string
  confirmPassword: string
  mobile?: string
  name?: string
}
