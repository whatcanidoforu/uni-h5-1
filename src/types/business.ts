import type { IUploadFile } from './upload'
/**
 * 线索字段
 */
type Thread = {
  type: string | number // 页面类型
  startDate: string // 开始日期
  endDate: string // 结束日期
  lastedRecordEndTime: string // 跟进结束时间yyyy-MM-dd HH:mm:ss
  lastedRecordStartTime: string // 跟进开始时间yyyy-MM-dd HH:mm:ss
  departmentId?: string // 部门
  departmentIds?: number[] // 部门
  departmentName: string // 部门名称
  directorIds: string | number | number[] // 负责人id列表
  intentions: string[] // 意向【租赁，购买】
  keyWords: string // 关键词
  sources: string[] // 来源【官网注册，朋友推荐，客户推荐，客户咨询】
  id: number | string | undefined // 主键id
  customerAddress: string // 客户地址
  customerCate: string // 客户类别
  customerIndustry: string // 所属行业
  customerName: string // 客户姓名
  customerPhone: string // 联系方式
  detail: string // 线索详情
  intentedArea: string // 意向面积
  intentedPrice: string // 意向价格
  intentedResource: string // 意向资源
  intention: string // 意向
  lastedContactRecord: string // 最后联系时间
  source: string // 线索来源
  directorId: number // 负责人id
  directorName: string // 负责人姓名
  stages: number[] // 线索阶段查询多选
  stage: number // 线索阶段id
  stageName: string // 线索阶段名称
  status: number | undefined // 商机状态id
  statusName: string // 商机状态名称
  createTime: string // 创建时间
  fileInfos: IUploadFile[] // 附件
  version: string | number // 数据版本
  userId?: number | undefined // 分配人id
  parkIds: number[] // 园区
  notExistsDirector?: boolean // 是否存在负责人
  contactDays: number | string // 最近N天跟进过
  customerCompany: string
  changeBusiness: boolean
}
/**
 * 线索搜索参数
 */
export type IThreadSearch = { customerCompany?: string } & Pick<
  Thread,
  | 'id'
  | 'type'
  | 'startDate'
  | 'endDate'
  | 'lastedRecordEndTime'
  | 'lastedRecordStartTime'
  | 'departmentIds'
  | 'directorIds'
  | 'intentions'
  | 'keyWords'
  | 'sources'
  | 'stages'
  | 'parkIds'
  | 'notExistsDirector'
  | 'contactDays'
  | 'userId'
  | 'departmentId'
>
/**
 * 线索列表
 */
export type IThreadTable = Pick<
  Thread,
  | 'id'
  | 'customerAddress'
  | 'customerCate'
  | 'customerIndustry'
  | 'customerName'
  | 'customerPhone'
  | 'detail'
  | 'intentedArea'
  | 'intentedPrice'
  | 'intentedResource'
  | 'intention'
  | 'lastedContactRecord'
  | 'source'
  | 'directorId'
  | 'directorName'
  | 'stage'
  | 'stageName'
  | 'status'
  | 'statusName'
  | 'createTime'
  | 'version'
  | 'changeBusiness'
>

export type IThreadChangeRequest = { autoReleaseDays?: string | number | undefined } & Pick<
  Thread,
  'id' | 'version' | 'userId'
>

// 线索详情
export type IThreadDetail = {
  clueToBusinessRate: string //线索转商机率
  contactTimes: number | string // 沟通次数
  createdBy: '' // 创建人id
  createrName: string // 创建人姓名
  createTime: string // 创建时间
  customerAddress: string // 客户地址
  customerCate: string // 客户类别
  customerIndustry: string // 所属行业
  customerName: string // 客户姓名
  customerPhone: string // 联系电话
  detail: string // 线索商机明细
  directorId: number | string // 负责人id
  directorName: string // 负责人姓名
  fileInfos: IUploadFile[] // 附件列表
  id: number | string // 线索主键id
  intentedArea: string // 意向面积
  intentedPrice: string // 意向价格
  intentedResource: string // 意向资源
  intention: string // 意向
  source: string // 线索来源
  stage: number | string // 线索阶段
  stageName: string // 阶段名称
  stageTime: string // 当前阶段开始时间
  status: number | string // 状态值
  statusName: string // 状态名称
  updateTime: string // 更新时间
  version: number | string // 数据版本号
  lastedAssignTime: string // 最新分配时间
  chanceContactList?: IChanceContact[] // 联系人列表
  parkId: number | string // 园区id
  parkName: string // 园区名称
  customerPhoneFixed: string | number // 座机
  province: string
  city: string
  district: string
  firstContactTime: string
  lastContactTime: string
  lastContactPersonName: string
  customerCompany: string
  email: string
  changeBusiness: boolean
  autoReleaseTime?: string
  nextContactTime?: string // 下次联系时间
  customerPosition?: string // 职位
  agencyId?: number | string // 中介id
  agencyName?: string // 中介名称
  agencyMobile?: string
  agencyContact?: string
  departmentName?: string
  remainingDays?: string
  businessChanceId?: string
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
  searchType?: number
  email: string
  fromChanceId: number | undefined
  autoReleaseTime?: string
  nextContactTime?: string // 下次联系时间
  customerPosition?: string // 职位
  agencyId?: number | string // 中介id
  agencyName?: string // 中介名称
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
> & {
  type?: number
  customerCompany?: string
  customerIndustries?: string[]
  intentedAreaStart?: number
  intentedAreaEnd?: number
  departmentIds?: number[]
}

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
export type IOpportunityDetail = {
  remainingDays?: number
  agencyContact?: string
  agencyMobile?: string
  contractCode?: string
  clueId?: number
  departmentName?: string
  tax?: string
  employeeNum?: string
} & Pick<
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
  | 'customerPosition'
  | 'agencyId'
  | 'agencyName'
>

type IContact = {
  id: number | undefined
  chanceId: number | undefined // 商机id
  type: string | string[] // 沟通方式
  title: string // 沟通标题
  detail: string // 沟通细节
  communicatorId: number | undefined // 沟通人
  communicateTime: string // 沟通时间
  files: IUploadFile[]
  keyword: string // 沟通主题/详情
  communicateStartTime: string // 沟通开始时间
  communicateEndTime: string // 沟通结束时间
  createStartTime: string // 创建开始时间
  createEndTime: string // 创建结束时间
  communicatorName: string // 沟通人
  keyWord: string
  nextContactTime?: string // 下次联系时间
  stage?: number
  fileInfos?: IUploadFile[]
}

/**
 * 沟通详情
 */
export type IContactDetail = Pick<
  IContact,
  | 'id'
  | 'chanceId'
  | 'type'
  | 'title'
  | 'detail'
  | 'communicatorId'
  | 'communicateTime'
  | 'files'
  | 'communicatorName'
  | 'nextContactTime'
  | 'stage'
>

/**
 * 沟通查询参数
 */
export type IContactSearch = Pick<
  IContact,
  'chanceId' | 'communicateStartTime' | 'communicateEndTime' | 'createStartTime' | 'createEndTime' | 'keyWord' | 'type'
>

/**
 * 沟通列表
 */
export type IContactTable = Pick<
  IContact,
  | 'id'
  | 'chanceId'
  | 'communicateTime'
  | 'title'
  | 'type'
  | 'communicatorName'
  | 'communicatorId'
  | 'detail'
  | 'fileInfos'
  | 'nextContactTime'
>

export type IOperation = {
  chanceId: number | string // 线索商机id
  startDate: string // 变更开始时间
  endDate: string // 变更结束时间
  types: string[] // 变更类型
  userIds: string[] | number[] // 操作人
  id: number | string // id
  type: string // 变更类型
  detail: string // 变更详细
  createrName: string // 变更人
  createTime: string // 变更时间
}

export type IOperationSearch = Pick<IOperation, 'chanceId' | 'startDate' | 'endDate' | 'types' | 'userIds'>

export type IOperationTable = Pick<IOperation, 'chanceId' | 'id' | 'detail' | 'type' | 'createrName' | 'createTime'>
