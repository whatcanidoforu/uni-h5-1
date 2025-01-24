// 新增站点类型
export const inspectionPointTypeDict = new Map([
  [0, '站点'],
  [1, '设备站点']
])

// 巡检任务频率类型
export const inspectionTaskCycleTypeDict = new Map([
  [0, '临时'],
  [1, '每天'],
  [2, '每周'],
  [3, '自定义']
])

export const weekWordDict = new Map([
  [1, '日'],
  [2, '一'],
  [3, '二'],
  [4, '三'],
  [5, '四'],
  [6, '五'],
  [7, '六']
])
// 巡检任务实例列表搜索栏
export const inspectionTaskInstStateDict = new Map([
  [1, '待巡检'],
  [2, '巡检中'],
  [3, '完成'],
  [4, '终止'],
  [5, '异常'],
  [6, '超时'],
  [7, '总计']
])

// 巡检任务实例 state转汉字
export const inspectionTaskInstDetailStateDict = new Map([
  [1, '待巡检'], // 未执行
  [2, '巡检中'], // 执行中
  [3, '完成'],
  [4, '停止'],
  [9, '异常完成'] // 未巡完终止
])

// 巡检任务实例 每个站点进度的状态
export const inspectionTaskInstPointStateDict = new Map([
  [0, '巡检异常'],
  [1, '巡检正常'],
  [2, '未巡检']
])

export const inspectionTaskInstErrStateStateDict = new Map([
  [0, '异常'],
  [1, '正常']
])

export const inspectionTaskInstDeviceTaskListStateDict = new Map([
  [1, '未执行'],
  [2, '执行中'],
  [3, '完成'],
  [4, '停止']
])
