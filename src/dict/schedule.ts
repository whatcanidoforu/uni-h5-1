export const remindTimeList = [
  {
    label: '自定义',
    value: -1
  },
  {
    label: '准时',
    value: 0
  },
  {
    label: '提前10分钟',
    value: 1000 * 60 * 10
  },
  {
    label: '提前15分钟',
    value: 1000 * 60 * 15
  },
  {
    label: '提前30分钟',
    value: 1000 * 60 * 30
  },
  {
    label: '提前1小时',
    value: 1000 * 60 * 60
  },
  {
    label: '提前2小时',
    value: 1000 * 60 * 60 * 2
  },
  {
    label: '提前6小时',
    value: 1000 * 60 * 60 * 6
  },
  {
    label: '提前1天',
    value: 1000 * 60 * 60 * 24
  }
]

// 状态 -10 - 已取消 0 - 未进行 10 - 进行中 100 - 已完成
export const scheduleStatusList = [
  {
    label: '已取消',
    value: -10
  },
  {
    label: '未进行',
    value: 0
  },
  {
    label: '进行中',
    value: 10
  },
  {
    label: '已完成',
    value: 100
  }
]
