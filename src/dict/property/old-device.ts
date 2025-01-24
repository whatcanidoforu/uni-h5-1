// 作业计划 类型
export const OperationPlanType = new Map([
  [1, '维保'],
  [2, '巡检']
])

// 作业计划 周期
export const OperationPlanCycleType = new Map([
  [1, '日'],
  [2, '周'],
  [3, '月'],
  [4, '年']
])

// 作业计划 状态
export const OperationPlanStatus = new Map([
  [0, '停用'],
  [1, '启用']
])

// 作业计划 生成方式
export const OperationPlanGenerationRule = new Map([
  [1, '工单簇'],
  [2, '一对一']
])

// 作业计划 派单方式
export const OperationPlanAssignType = new Map([
  [1, '调度派单'],
  [2, '园区抢单'],
  [3, '指定人员'],
  [4, '指定部门'],
  [5, '指定岗位']
])

// 作业任务 状态
export const OperationTaskStatus = new Map([
  [0, '未开始'],
  [1, '进行中'],
  [2, '已完成'],
  [3, '已逾期']
])
