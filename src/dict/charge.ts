// 应收 出账状态
export const chargeReceivableBillStatusDicts = new Map([
  [0, '未出账'],
  [10, '已出账']
])

// 欠费状态
export const chargeArrearsDicts = new Map([
  [0, '未欠费 '],
  [1, '已欠费 ']
])

// 逾期状态
export const chargeOverduesDicts = new Map([
  [0, '未逾期'],
  [1, '已逾期']
])

// 应收状态
export const chargeReceiveStatusDicts = new Map([
  [0, '未收款'],
  [10, '部分收款'],
  [20, '已收款']
])

// 应收单据状态
export const chargeSearchReceivableStatusDicts = new Map([
  [-10, '关闭'],
  [0, '正常']
])

// 账单状态
export const chargeStatusDicts = new Map([
  [0, '正常'],
  [-10, '关闭']
])

// 收款状态
export const chargeCollectReceiveStatusDicts = new Map([
  [0, '未入账'],
  [1, '已入账']
])

// 收款查询 核销状态

export const chargeCollectWriteOffStatusDicts = new Map([
  [0, '未核销'],
  [20, '部分核销'],
  [10, '已核销']
])

//  应退状态
export const chargeRefundableStatusDicts = new Map([
  [0, '未退'],
  [10, '部分退'],
  [20, '已退']
])
// 剩余可退金额选择
export const chargeReceivableDepositBalanceType = new Map([
  [0, '剩余可退金额选择 > 0'],
  [1, '剩余可退金额选择 = 0']
])

// 退款状态
export const chargeRefundedStatusDicts = new Map([
  [0, '未核销'],
  [100, '已核销']
])
// 客户类型
export const chargeCustomerDicts = [
  {
    value: 1,
    label: '个人客户'
  },
  {
    value: 2,
    label: '企业客户'
  }
]
// 客户类型
export const chargeCustomerCharacterDicts = new Map([
  [1, '租客'],
  [2, '业主'],
  [3, '虚拟']
])

// 调整类型
export const chargeTypeDicts = new Map([
  [1, '新增应收'],
  [2, '调整应收']
])
// 应退类型
export const chargeAdfundTypeDicts = new Map([
  [1, '新增应退'],
  [2, '调整应退']
])
// 调整状态
export const chargeReceivableStatusDicts = new Map([
  // [-10, '已关闭'],
  // [0, '未调整'],
  // [10, '已审核'],
  // [100, '已完成']
  [0, '未审核'],
  [50, '待审核'],
  [51, '审核驳回'],
  [100, '已审核']
])
// 应退调整状态
export const chargeRefundableAdjustStatusDicts = new Map([
  // [-10, '已作废'],
  [0, '未审核'],
  // [10, '已审核'],
  [100, '已审核']
])

// 审核状态
export const chargePayTypeDicts = new Map([
  [10, '现金'],
  [20, '银行转账'],
  [30, '支付宝'],
  [40, '微信'],
  [50, 'POS机']
])
// 审核状态
export const chargeBankDicts = new Map([
  ['中国银行', '中国银行'],
  ['招商银行', '招商银行'],
  ['工商银行', '招商银行'],
  ['农业银行', '农业银行'],
  ['建设银行', '建设银行']
])
