// 单据状态
export const workorderStatus = new Map([
  [0, '待受理'],
  [1, '待处理'],
  [2, '处理中'],
  [3, '待评价'],
  [4, '待回访'],
  [5, '待验收'],
  [6, '已完成'],
  [7, '已关闭']
])
// 服务类型
export const workorderServiceType = new Map([
  [10, '报修类'],
  [20, '报事类'],
  [30, '投诉类']
])
// 服务类型
export const workorderServiceType2 = new Map([
  [10, '电气维修/安装'],
  [20, '空调维修'],
  [30, '给排水维修'],
  [40, '土木装饰'],
  [50, '五金配件安装']
])
// 服务类型
export const workorderServiceType3 = new Map([
  [10, '照明电器安装'],
  [20, '线缆敷设安装'],
  [30, '办公/家用电器维修']
])

// 服务对象
export const workorderCustomerType = new Map([
  [1, '客户'],
  [2, '内部']
])

// 单据来源
export const workorderSourceType = new Map([
  [1, '业主小程序'],
  [2, '员工APP'],
  [3, '后台系统']
])

// 服务位置 position
export const workorderPosition = new Map([
  [1, '户内'],
  [2, '公区']
])

// 工单满意度评价
export const workorderScoreState = new Map([
  [5, '非常满意'],
  [4, '满意'],
  [3, '一般'],
  [2, '不满意'],
  [1, '非常不满意']
])
