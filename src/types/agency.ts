import type { IUploadFile } from './upload'

export type IAgencyListItem = {
  code: string // 中介编号
  createTime: string // 创建时间
  createUserName: string // 创建人
  createdBy?: number // 创建人id
  id: number // 中介id
  idNumber: string // 证件号
  name: string // 中介名称
  mobile: string // 联系方式
  remark: string // 备注
  type: 0 | 1 // 1: 个人 0: 企业
  typeName: string // 中介类型名称
  agencyContactList: IAgencyContactListItem[] // 联系人
  status: number // 状态 0: 启用 -1：停用
  statusName: string // 状态名称
  version: number
}

export type ISearchAgencyList = {
  code?: string // 中介编号
  name?: string // 中介名称
  type?: 0 | 1 // 1: 个人 0: 企业
  idNumber?: string // 证件号
  status?: number
}

export type IAgencyBankListItem = {
  bankName: string // 开户行
  bankAccount: string // 开户账号
  bankNo: string // 开户行号
  remark: string // 备注
}

export type IAgencyContactListItem = {
  name: string // 联系人姓名
  mobile: string // 联系方式
  remark: string // 备注
  position: string // 职位
  mobile2: string // 联系方式2
  agencyId?: number // 中介id
}

export type IAgencyDetail = {
  id?: number // 中介id
  name: string // 中介名称
  code: string // 中介编号
  type?: 0 | 1 // 1: 个人 0: 企业
  typeName: string // 中介类型名称
  idNumber: string // 证件号
  remark: string // 备注
  idType: 0 | 1 | 2 // 证件类型 0 营业执照  1 身份证 2 其他
  idTypeName?: string // 证件类型名称
  createTime?: string // 创建时间
  creatorName?: string // 创建人
  contact: string // 联系人
  mobile: string // 联系方式
  province: string // 省
  city: string // 市
  district: string // 区
  address: string // 详细地址
  invoiceTitle: string // 发票抬头
  invoiceId: string // 税号
  invoiceBank: string // 开票行
  invoiceAccount: string // 开票账号
  invoiceAddress: string // 开票地址
  invoicePhone: string // 开票电话
  files: IUploadFile[] // 附件
  agencyBankList: IAgencyBankListItem[] // 银行账户
  agencyContactList: IAgencyContactListItem[] // 联系人
  expireTime: string // 有效期
}

type IBusiness = {
  id: number | string
  startDate: string
  endDate: string
  customerName: string // 客户姓名
  customerPhone: string // 联系方式
  customerCates: string[] // 客户等级列表
  statuses: string[] // 商机状态列表
  directorIds: string | number | number[] // 负责人id列表
  intentions: string[] // 意向
  sources: string[] // 来源
  customerCate: string // 客户等级
  source: string // 客户来源
  stage: number // 阶段
  stageName: string // 阶段名称
  status: number // 状态
  statusName: string // 状态名称
  createTime: string // 创建时间
  directorId: number | string // 负责人id
  directorName: string // 负责人名称
  intention: string // 意向
  customerAddress: string // 地址
  customerIndustry: string // 所属行业
  intentedArea: string // 意向面积
  intentedResource: string // 意向资源
  intentedPrice: string // 意向价格
  detail: string // 线索明细
  fileInfos: IUploadFile[]
  chanceContactList: IChanceContact[]
  version: number | string
  type: number
  parkIds: number[] // 园区
  parkId: number | string // 园区
  parkName: string // 园区
  keyWords: string // 关键字
  contactDays: number | string // 最近N天跟进过
  notExistsDirector?: boolean // 是否存在负责人
  createrName: string // 创建人姓名
  updateTime: string // 更新时间
  contactTimes: number | string // 沟通次数
  stages: number[] // 阶段
  userId?: number | string // 分配人id
  customerPhoneFixed: string | number // 座机
  province: string
  city: string
  district: string
  firstContactTime: string
  lastContactTime: string
  lastContactPersonName: string
  customerCompany: string
  searchType: number
  email: string
  fromChanceId: number | undefined
  autoReleaseTime?: string
  nextContactTime?: string // 下次联系时间
}
/**
 * 联系人
 */
export type IChanceContact = {
  name: string // 联系人姓名
  phone: string // 联系方式
  phone2: string // 联系方式2
  email: string // 邮箱
  keyMan: boolean // 是否决策人
  remark: string // 备注
  position: string // 职位
}
/**
 * 商机查询参数
 */
export type IOpportunitySearch = Pick<
  IBusiness,
  | 'id'
  | 'startDate'
  | 'endDate'
  | 'customerName'
  | 'customerPhone'
  | 'customerCates'
  | 'statuses'
  | 'directorIds'
  | 'intentions'
  | 'sources'
  | 'parkIds'
  | 'keyWords'
  | 'contactDays'
  | 'notExistsDirector'
  | 'stages'
  | 'userId'
  | 'searchType'
>

/**
 * 商机列表
 */
export type IOpportunityTable = Pick<
  IBusiness,
  | 'id'
  | 'customerName'
  | 'customerPhone'
  | 'customerCate'
  | 'source'
  | 'stage'
  | 'stageName'
  | 'status'
  | 'statusName'
  | 'createTime'
  | 'directorId'
  | 'directorName'
  | 'version'
  | 'parkId'
  | 'customerCompany'
>

/**
 * 商机详情
 */
export type IOpportunityDetail = Pick<
  IBusiness,
  | 'id'
  | 'customerName'
  | 'customerCate'
  | 'source'
  | 'customerPhone'
  | 'intention'
  | 'customerAddress'
  | 'customerIndustry'
  | 'intentedArea'
  | 'intentedResource'
  | 'intentedPrice'
  | 'detail'
  | 'fileInfos'
  | 'chanceContactList'
  | 'parkId'
  | 'parkName'
  | 'status'
  | 'statusName'
  | 'version'
  | 'directorName'
  | 'directorId'
  | 'createTime'
  | 'createrName'
  | 'updateTime'
  | 'stageName'
  | 'contactTimes'
  | 'stage'
  | 'customerPhoneFixed'
  | 'province'
  | 'city'
  | 'district'
  | 'firstContactTime'
  | 'lastContactTime'
  | 'lastContactPersonName'
  | 'customerCompany'
  | 'email'
  | 'fromChanceId'
  | 'autoReleaseTime'
  | 'nextContactTime'
>
