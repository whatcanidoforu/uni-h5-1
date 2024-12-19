import type { IUploadFile } from '../upload'
// 查询应收列表
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
  status?: number // 状态（0：待受理 1：待处理 2：处理中 3：待评价 4：待回访 5：待验收 6：已完成 7：已关闭
  startCreatedTime?: string // 新建日期
  endCreatedTime?: string // 新建日期
  code?: string // 工单编号
  parkId?: number // 园区id
  firstCategoryId?: number // 一级服务类型
  customerType?: number // 服务对象（1:客户 2：内部）
  sourceType?: number // 1:业主小程序 2：员工app 3：后台系统
  position?: number // 1：户内 2：公区
}

export interface ISearchWorkOrder {
  address: string
  appointmentTime: string
  buildingId: number
  code: string
  createdBy: number
  createdTime: string
  customerId: number
  customerMobile: string
  customerName: string
  customerType: number
  customerTypeName: string
  deleted: boolean
  fileInfos: IUploadFile[]
  files: string
  firstCategoryId: number
  firstCategoryName: string
  floorId: number
  id: number
  parkId: number
  parkName: string
  position: number
  positionName: string
  remark: string
  roomId: number
  secondCategoryId: number
  sourceType: number
  sourceTypeName: string
  status: number
  statusName: string
  thirdCategoryId: number
  updatedBy: string
  updatedTime: string
  version: number
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
  comment: '沟通'
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
