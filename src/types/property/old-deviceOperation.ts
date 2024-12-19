// 作业计划分页列表
export type TOperationPlanPage = {
  type?: number | undefined // 计划类型 1：巡检 2：维保
  cycleType?: number | undefined // 周期类型 0：临时 1:日 2：周 3：月 4：年
  keywords?: string | undefined // 关键字
  status?: number | undefined // 状态 0：禁用 1启用
  parkId?: number | undefined // 园区ID
}
export type IOperationPlanPage = {
  assignType: number
  assignTypeName: string
  code: string
  createdBy: number
  createdByName: string
  createdTime: string
  cron: string
  cycleCron: string // "{\"cronSecond\":\"5\"}" // 无用
  cycleFrequency: number // 无用
  cycleType: number
  cycleTypeName: string
  deleted: boolean
  devices: number[]
  editedCount: number
  endTime: string
  fileList: IUploadFile[]
  files: string
  generationRule: number
  generationRuleName: string
  id: number
  name: string
  parkId: number
  parkName: string
  recipientId: number
  recipientName: string
  remark: string
  startTime: string
  status: number
  type: number
  typeName: string
  updatedBy: number
  updatedByName: string
  updatedTime: string
  version: number
}
// 作业计划详情
export type IOperationPlanDetail = {
  assignType?: number | undefined //派单方式 1-调度派单 2-园区抢单 3-指定人员 4-指定部门 5-指定岗位
  assignTypeName?: string | undefined
  code?: string | undefined
  createdBy?: number | undefined
  createdByName?: string | undefined
  createdTime?: string | undefined
  cron: {
    cronYear?: string | undefined // 年   多个用英文逗号隔开
    cronMonth?: string | undefined // 月  多个用英文逗号隔开
    cronWeek?: string | undefined // 周  多个用英文逗号隔开
    cronDay?: string | undefined // 日  多个用英文逗号隔开
    cronHour?: string | undefined // 时  多个用英文逗号隔开
    cronMinute?: string | undefined // 分  多个用英文逗号隔开
    cronSecond?: string | undefined // 秒  多个用英文逗号隔开
  } // 任务生成时间 // JSON格式字符串 cron_year 年 cron_month 月 cron_week 周 cron_day 天 cron_hour 时 * cron_minute 分 cron_second 秒
  cycleCron?: string | undefined
  cycleFrequency?: string | undefined
  cycleType: number // 计划周期 1:日 2：周 3：月 4：年
  cycleTypeName?: string | undefined
  deleted?: boolean | undefined
  devices: { deviceId?: number | undefined; deviceType: number | undefined }[] //设备列表
  editedCount?: number | undefined
  endTime?: string | undefined // 结束时间 yyyy-MM-dd
  fileList?: IUploadFile[] //附件
  files?: string | undefined
  generationRule?: number | undefined // 任务生成方式 1工单簇 2：一对一
  generationRuleName?: string | undefined
  id?: number | undefined
  name?: string | undefined // 计划名称
  parkId?: number | undefined // 园区ID
  parkName?: string | undefined
  recipientId?: number | undefined // 作业接收方ID
  recipientName?: string | undefined
  remark?: string | undefined // 备注
  startTime?: string | undefined //作业计划开始日期 yyyy-MM-dd
  status?: number | undefined
  statusName?: string | undefined
  type?: number | undefined //作业计划类型  1：维保 2：巡检
  typeName?: string | undefined
  updatedBy?: number | undefined
  updatedByName?: string | undefined
  updatedTime?: string | undefined
  version?: number | undefined
}
// 作业计划新增
// export type TAddOperationPlan = {
//   name: string // 计划名称
//   parkId: number | undefined // 园区ID
//   type: number | undefined //作业计划类型  1：维保 2：巡检
//   startTime: string //作业计划开始日期 yyyy-MM-dd
//   endTime?: string // 结束时间 yyyy-MM-dd
//   assignType: number | undefined //派单方式 1-调度派单 2-园区抢单 3-指定人员 4-指定部门 5-指定岗位
//   recipientId: number | undefined // 作业接收方ID
//   generationRule: number | undefined // 任务生成方式 1工单簇 2：一对一
//   cycleType: number // 计划周期 1:日 2：周 3：月 4：年
//   cron: {
//     cronYear?: string // 年   多个用英文逗号隔开
//     cronMonth?: string // 月  多个用英文逗号隔开
//     cronWeek?: string // 周  多个用英文逗号隔开
//     cronDay?: string // 日  多个用英文逗号隔开
//     cronHour?: string // 时  多个用英文逗号隔开
//     cronMinute?: string // 分  多个用英文逗号隔开
//     cronSecond?: string // 秒  多个用英文逗号隔开
//   } // 任务生成时间 // JSON格式字符串 cron_year 年 cron_month 月 cron_week 周 cron_day 天 cron_hour 时 * cron_minute 分 cron_second 秒
//   fileList: IUploadFile[] //附件
//   remark: string // 备注
//   devices: { deviceId?: number | undefined; deviceType: number | undefined }[] //设备列表

//   id?: number
//   version?: number
//   parkName?: string
//   code?: string
//   typeName?: string
//   statusName?: string
//   assignTypeName?: string
//   recipientName?: string
//   generationRuleName?: string
//   cycleTypeName?: string
//   status?: number
// }

// 作业任务分页列表
export type TOperationTaskPage = {
  startTime?: string | undefined // 最新维护时间 yyyy-MM-dd
  endTime?: string | undefined // 最新维护时间 yyyy-MM-dd
  keywords?: string | undefined // 关键字 模糊过滤设备编号、设备名称
  status?: number | undefined // 状态
  parkId?: number | undefined // 园区ID
  taskType?: number | undefined // 任务类型 1：保养 2：巡检
  cycleType?: number | undefined // 任务频次 0：临时 1：调度派单 2：园区抢单 3：指定人员 4：指定部门
  recipientId?: number | undefined //接收方ID // 根据cycleType传ID
  planId?: number | undefined // 作业计划ID
  deviceId?: number | undefined // 机房或设备ID 查询机房或设备的任务
}
export type IOperationTaskPage = {
  code: string
  completionTime: string
  createdTime: string
  cycleType: number
  cycleTypeName: string
  endTime: string
  excutorName: string
  finishedTime: string
  id: number
  name: string
  parkId: number
  parkName: string
  planCode: string
  planId: number
  recipientId: number
  startTime: string
  status: number
  statusName: string
  taskType: number
  taskTypeName: string
}

// 作业任务 查询-详情
export type IOperationTaskDetail = {
  code: string | undefined
  completionTime?: string | undefined
  createdTime?: string | undefined
  cycleType?: number | undefined
  cycleTypeName?: string | undefined
  endTime?: string | undefined
  excutorName?: string | undefined
  finishedTime?: string | undefined
  id: number | undefined
  name?: string | undefined
  parkId?: number | undefined
  parkName?: string | undefined
  planCode?: string | undefined
  planId?: number | undefined
  recipientId?: number | undefined
  startTime?: string | undefined
  status?: number | undefined
  statusName?: string | undefined
  taskType?: number | undefined
  taskTypeName?: string | undefined
}

// 作业任务 查询-任务设备列表
export type IOperationTaskDevice = {
  address?: string
  buildingId?: number
  buildingName?: string
  code?: string
  createdTime?: string
  deviceId?: number
  deviceStatus?: number
  deviceStatusName?: string
  deviceType?: number
  executionTime?: string
  executor?: number
  files?: string
  fileList: IUploadFile[]
  floorId?: number
  floorName?: string
  id?: number
  name?: string
  parkId?: number
  parkName?: string
  remark?: string
  roomId?: number
  roomName?: string
  standardId?: number
  standardName?: string
  taskId?: number
  taskName?: string
  taskStatus?: number
}

// 作业任务 查询-任务设备-作业标准列表
export type IOperationTaskDeviceStandard = {
  content: string
  deviceId: number
  executionResult: string
  executionTime: string
  executor: number
  id: number
  ruleId: number
  sort: number
  standardId: number
  status: number
  taskId: number
}

// 作业任务 查询-任务执行日志
export type IOperationTaskLog = {
  createdBy: number
  createdByName: string
  createdTime: string
  deviceId: number
  deviceType: number
  eventContent: string
  eventType: number
  eventTypeName: string
  id: number
  taskId: number
  taskDevice: IOperationTaskDevice
}
