// 订单列表搜索框状态
export const orderStatusDicts = new Map([
  [0, '未支付'],
  [1, '已支付'],
  [4, '已发货'],
  [2, '已完成'],
  [3, '已关闭']
])

export const productCodeDicts = new Map([
  ['SYS_PARKING_COUPON', '停车券'],
  ['SYS_PARKING_MONTH_CARD', '停车月卡'],
  ['00001', '青橙会议一体机'],
  ['00002', '青橙手机Q520'],
  ['00003', '义国传奇·酱香白酒'],
  ['00004', '嗨皮牛精酿啤酒']
])

// 园区服务列表搜索框状态
export const serviceStatusDicts = new Map([
  [0, '待受理'],
  [10, '处理中'],
  [100, '已处理'],
  [-10, '已关闭']
])
