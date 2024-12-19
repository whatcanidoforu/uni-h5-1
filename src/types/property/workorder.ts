import type { IUploadFile } from '../upload'

// 创建工单
export interface TCreateWorkOrder {
  id?: number | undefined
  sourceType: number | undefined // 1:业主小程序 2：员工app 3：后台系统
  firstCategoryId: number | undefined // 一级服务类型
  secondCategoryId: number | undefined // 二级服务类型
  thirdCategoryId: number | undefined // 三级服务类型
  parkId: number | undefined // 园区id
  position: number | undefined // 1：户内 2：公区
  address: string | undefined // 服务地址
  buildingId: number | undefined // 楼栋id
  floorId: number | undefined // 楼层id
  roomId: number | undefined // 房间id
  customerType: number | undefined // 服务对象（1:客户 2：内部）
  customerId: number | undefined // 客户id
  appointmentTime: string | undefined // 预约时间
  fileInfos: IUploadFile[] | undefined // 附件
  remark: string | undefined // 备注
  assigneeId: number | undefined // 指派人员Id
  deviceIds?: number[] | undefined // 设备id列表
}

export enum EWorkOrderStatus {
  WAIT_ACCEPT = 0, // 待受理
  WAIT_PROCESS = 1, // 待处理
  PROCESSING = 2, // 处理中
  WAIT_EVALUATE = 3, // 待评价
  WAIT_VISIT = 4, // 待回访
  WAIT_CHECK = 5, // 待验收
  FINISHED = 6, // 已完成
  CLOSED = 7 // 已关闭
}

export interface TSearchWorkOrder {
  statisticType?: number // 状态（ 0：待开始（默认） 1：进行中 2：暂停3：待验收 4：完成 5：超时 6：超时高 7：即将超时 8总数 9：我处理的 10：我创建的
  range?: number // 时间范围（ 0:全部（默认）  1：今日）
  keyword?: string // 关键字
  orderType?: string // 类型
  priority?: string // 优先级
  revisit?: 0 | 1 // 是否回访 0：未回访 1：已回访
  employeeId?: string // 受理人
  villageId?: string // 园区id
  buildingId?: string // 楼栋
  floorId?: string // 楼层
  roomId?: string // 户室
  orderCost?: string // 费用
  startDate?: string // 开始日期
  endDate?: string // 结束日期
  rows?: number // 每页条数
  page?: number // 页码
  orderState?: number // 工单状态
  isTimeOut?: boolean // 是否超时
  isHiTimeOut?: boolean // 是否超时高
  willTimeOut?: boolean // 是否即将超时
}

export type IWorkerOrderList = {
  id: string
  number: string
  orderTitle: string
  customerPhone: string
  state: number
  createdBy: string
  createdByName: string
  createdDate: string
  orderType: string
  priority: string
  villageId: string
  buildingId: string
  floorId: string
  roomId: string
  position: string
  taskName: string
  assignee: string
  planStartTime: string
  planEndTime: string
  duration: string
  useTime: string
  endTime: string
  assigneeName: string
  examinerId: number
  examinerName: string
  stopTypeName: string
  devices: string
  deviceStr: string
  costs: string
  costStr: string
  cost: string
  applys: string
  applyStr: string
  processInstanceId: string
  coName: string
}

export interface IWorkOrderDetail {
  assigneeId?: number
  customerId?: number
  customerMobile?: string
  customerName?: string
  deviceNameString?: string // 设备名称字符串
  workOrderDeviceList: { code: string; version: number; name: string }[]
  address: string // 地址
  appointmentTime: string // 预约时间
  buildingId: number // 楼宇id
  categoryName: string // 服务类型名称
  code: string // 工单编号
  consumerMobile: string // 客户手机号
  consumerName: string // 客户姓名
  createdBy: number // 创建人id
  createdTime: string // 创建时间
  customerType: number // 服务对象（1:客户 2：内部）
  customerTypeName: string // 服务对象名称
  deleted: boolean // 是否删除
  fileInfos: IUploadFile[] // 附件
  files: string // 附件
  firstCategoryId: number // 一级服务类型id
  firstCategoryName: string // 一级服务类型名称
  secondCategoryName: string // 二级服务类型名称
  thirdCategoryName: string // 三级服务类型名称
  floorId: number // 楼层id
  id: number // 工单id
  parkId: number // 园区id
  parkName: string // 园区名称
  position: number // 位置（1：户内 2：公区）
  remark: string // 备注
  roomId: number // 房间id
  secondCategoryId: number // 二级服务类型id
  sourceType: number // 来源（1:业主小程序 2：员工app 3：后台系统）
  sourceTypeName: string // 来源名称
  status: number // 状态（0：待受理 1：待处理 2：处理中 3：待评价 4：待回访 5：待验收 6：已完成 7：已关闭
  statusName: string // 状态名称
  thirdCategoryId: number // 三级服务类型id
  updatedBy: string // 更新人id
  updatedTime: string // 更新时间
  version: number // 版本号
  workOrderEvaluate?: IWorkOrderEvaluate // 工单评价详情
  checkWorkOrderInfo?: IWorkOrderCheck // 工单验收详情
}
// 强制指派工单
export interface TForcedTransfer {
  id: number | undefined // 工单id
  assagineId: number | undefined // 指派对象id
  comment: string // 指导意见
  attachments: IUploadFile[] // 强制指派附件信息
  version: number | undefined // 版本号
}

export type IFollowupWorkOrder = {
  code?: string // 工单编号
  customerType?: number // 服务对象（1:客户 2：内部）
  endCreatedTime?: string // 新建日期
  firstCategoryId?: number | string // 一级服务类型
  keywords?: string // 关键字
  parkId?: number | string // 园区id
  position?: number | string // 1：户内 2：公区
  sourceType?: number | string // 1:业主小程序 2：员工app 3：后台系统
  startCreatedTime?: string // 新建日期
  status?: number // 状态（0：待受理 1：待处理 2：处理中 3：待评价 4：待回访 5：待验收 6：已完成 7：已关闭
}

// 回访登记
export type IVisitWorkOrder = {
  evaluate: number | string // 满意度评价（5：非常满意 4：满意 3：一般 2：不满意 1：非常不满意）
  fileInfos?: IUploadFile[] // 附件
  orderId: number | string // 工单id
  recreatedOrder?: number // 是否新建工单(0:否 1：是）
  remark: string // 评价
}

// 流转节点沟通信息列表
export type IWorkOrderNodeComment = {
  attachments: IUploadFile[] // 附件
  comment: string
  id: number // 工单id
  mobile: string // 手机号
  operateTime: string // 操作时间
  operatorId: number // 操作人id
  operatorMobile: string // 操作人手机号
  operatorName: string // 操作人姓名
}

// 流转节点类型
export type IWorkOrderNode = {
  assigneeId: number // 指派人员id
  assignees: { assigneeId: number; assigneeMobile: string; assigneeName: string }[] // 指派人员列表
  executionTime: string // 执行时间
  fileInfos: IUploadFile[] // 附件
  nodeName: string // 节点名称
  registerWorkOrders: IWorkOrderNodeComment[]
  remark: string // 备注
  results: string // 结果
  status: number // 状态（0：待受理 1：待处理 2：处理中 3：待评价 4：待回访 5：待验收 6：已完成 7：已关闭
  statusName: string // 状态名称
  taskId: string // 任务id
  expand?: boolean // 是否展开
  assigneesName?: string // 指派人员名称
}

// 工单评价详情
export type IWorkOrderEvaluate = {
  attitudeScore: number // 态度评分
  comprehensiveScore: number // 综合评分
  createdBy: number // 创建人id
  createdByName: string // 创建人姓名
  createdTime: string // 创建时间
  deleted: boolean // 是否删除
  evaluationTime: string // 评价时间
  fileInfos: IUploadFile[] // 附件
  files: string // 附件
  id: number // 工单评价id
  orderId: number // 工单id
  qualityScore: number // 质量评分
  remark: string // 评价内容
  timelinessScore: number // 及时评分
  updatedBy: number | string // 更新人id
  updatedByName: string // 更新人姓名
  updatedTime: string // 更新时间
  version: number // 版本号
}

// 工单验收详情
export type IWorkOrderCheck = {
  checkerName: string // 验收人姓名
  checkTime: string // 验收时间
  remark: string // 备注
  checkerMobile: string // 验收人手机号
  assigneeId: number // 指派人员id
  fileInfos: IUploadFile[] // 附件
  results: string // 结果
}

// 指派工单表单
export type IAssignWorkOrder = {
  id: number | string // 工单id
  firstCategoryId: number | string // 一级服务类型
  secondCategoryId: number | string // 二级服务类型
  thirdCategoryId: number | string // 三级服务类型
  position: number | string // 1：户内 2：公区
  address: string // 服务地址
  buildingId: number | string // 楼栋id
  floorId: number | string // 楼层id
  roomId: number | string // 房间id
  appointmentTime?: string // 预约时间
  attachments: IUploadFile[] // 附件
  comment: string // 备注
  assigneeId?: number | string // 指派人员Id
  version?: number | string
  parkId?: number | string // 园区id
}

// 工单详情功能，通用参数
export type IWorkOrderHandlerCommon = {
  id: number | string // 工单id
  version?: number | string // 版本号
  comment: string // 备注
  attachments: IUploadFile[] // 附件
  reason?: string | number // 原因
  accepted?: number | string // 是否受理（0：否 1：是）
}

// 维保任务
export type TCsOrdPage = {
  keyword?: string //		模糊过滤：标题、编号、提报人
  villageId?: string //		园区ID
  state?: number //		状态
  startDate?: string //		时间范围
  endDate?: string //
  valuated?: number //		评价状态
  phone?: string //		提报人电话
  revisit?: number // 0未回访 1已回访
}
export type ICsOrdPage = {
  id: string
  csOdNumber: string
  orderTitle: string
  processType: string
  priority: string
  villageId: string
  buildingId: string
  floorId: string
  roomId: string
  address: string
  planStartTime: string
  planEndTime: string
  accState: number
  valuated: string
  reporterId: string
  reporterName: string
  reporterPhone: string
  reportedDate: string
  attachUrls: string
  handler: string
  handledDate: string
  orderId: string
  rejectType: string
  rejectReason: string
  updatedDate: string
  handlerName: string
  handlePhone: string
  processTypeName: string
  priorityName: string
  position: string
  wfAssignee: string
  wfAssigneeName: string
  wfAssigneePhone: string
  validators: string
  cost: string
  useTime: string
  usedTimeStr: string
  clientType: string
  stateName: string
  endTime: string
  score: string
  remarks: string
  visitAttachments: string
  description: string
}

export type IDetailCsOrd = {
  id: string
  csOdNumber: string
  orderTitle: string
  processType: string
  priority: string
  villageId: string
  buildingId: string
  floorId: string
  roomId: string
  address: string
  planStartTime: string
  planEndTime: string
  accState: 12
  valuated: 0
  reporterId: string
  reporterName: string
  reporterPhone: string
  reportedDate: string
  attachUrls: string
  handler: string
  handledDate: string
  orderId: string
  rejectType: string
  rejectReason: string
  updatedDate: string
  handlerName: string
  handlePhone: string
  processTypeName: string
  priorityName: string
  position: string
  wfAssignee: string
  wfAssigneeName: string
  wfAssigneePhone: string
  validators: string
  cost: string
  useTime: string
  usedTimeStr: string
  clientType: string
  stateName: string
  endTime: string
  score: string
  remarks: string
  visitAttachments: string
  description: string
  state?: number
}

// 回访列表详情
export type IApiRevisitPage = {
  id: string
  csOrderId: string // 客服工单ID
  returnVisitor: string // 回访人
  respondent: string // 被回访人
  respondentPhone: string // 被回访人联系方式
  attachment: string // 附件
  description: string // 描述
  revisitTime: string
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
  returnVisitorName: string // 回访人姓名
}
// 物料列表详情
export type IApiApplyOrder = {
  applyInfoId: number
  createTime: string
  applyNumber: string // 领用编号
  inventoryInfoId: number // 库存id
  workId: string // 工单id
  applyCount: number // 领用数量
  applyTake: number // 已领数量
  applyType: number
  applyStatus: number // 1
  description: string
  updatedTime: string
  articleName: string // 物品名称
  articleSerialNumber: string // 物品编号
  articleTypeName: string // 物品类别名称
  warehouseName: string
  applyStatusName: string
  brand: string // 品牌
  model: string // 型号
  price: number
  unitName: string // 物品单位名称
}
// 费用列表详情
export type IApiOrdinaryCostList = {
  id: string
  costType: string // 费用类型ID
  costTypeName: string // 费用类型名
  cost: number // 费用
  costNumber: string // 费用编号
  costExplain: string // 说明
  url: string // 费用附件
}
// 提报工单
export type TOrdinarySaveOrder = {
  orderTitle?: string // (工单标题),
  processType?: string // (工单类型id),
  priority?: string // (工单优先级id)
  villageId?: string
  buildingId?: string
  floorId?: string
  roomId?: string

  employeeId?: string // (受理人id),
  coId?: string // (公司ID)
  coName?: string // (公司名称),
  customerPhone?: string // (联系方式)
  eqIds?: string // (设备id ,拼接),
  code?: number
  planStartTime?: string
  planEndTime?: string
  attachmentUrls?: any // url地址的数组
}
