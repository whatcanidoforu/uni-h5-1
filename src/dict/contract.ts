// 合同类型 100 - 房屋租赁 101 - 房屋销售
export const contractType = new Map([
  [100, '房屋租赁'],
  [101, '房屋销售']
])

// 合同状态
export const contractStatus = new Map([
  // [-10, '已关闭'],
  [0, '未审核'],
  [1, '待审核'],
  [5, '审核驳回'],
  [10, '已生效'],
  [20, '执行中'],
  [30, '已到期'],
  // [100, '已履约']
  [100, '已退租'],
  [101, '已续租']
])

// 销售合同状态
export const saleContractStatus = new Map([
  [0, '未审核'],
  [1, '待审核'],
  [5, '审核驳回'],
  [10, '已生效']
])

// 费用类型，0：免费，1，一次性，2，周期性
export const contractFeeType = new Map([
  [0, '免费'],
  [1, '一次性'],
  [2, '周期性']
])

// 费用单位 元/天；元/周；元/月；元/季；元/年；
export const contractFeeUnitTxt = new Map([
  ['元/天', '元/天'],
  // ['元/周', '元/周'],
  ['元/月', '元/月'],
  // ['元/季', '元/季'],
  ['元/年', '元/年'],
  ['元/天/平', '元/天/平'],
  // ['元/周/平', '元/周/平'],
  ['元/月/平', '元/月/平'],
  ['元/季/平', '元/季/平'],
  ['元/年/平', '元/年/平']
])

// 售价单位 元；元/平
export const contractFeeUnitSaleTxt = new Map([
  ['元', '元'],
  ['元/平', '元/平']
])

// 变更类型 变更客户(10),全部退租(20),部分退租(21),续租(30)
export const modifyType = new Map([
  [10, '变更客户'],
  [20, '全部退租'],
  [21, '部分退租'],
  [30, '续租']
])

// 变更状态 未审核(0),待审核(1),审核驳回(5),已审核(10)
export const modifyStatus = new Map([
  [0, '未审核'],
  [1, '待审核'],
  [5, '审核驳回'],
  [10, '已审核']
])

// 退租类型 部分退租(90) 整体退租(91)
export const surrenderType = new Map([
  [90, '部分退租'],
  [91, '整体退租']
])

// 审批状态
export const approvalStatus = new Map([
  [0, '未审核'],
  [1, '待审核'],
  [5, '审核驳回'],
  [10, '已审核']
])

// 递增方式 0-百分比 1-数值
export const increaseType = new Map([
  [0, '百分比'],
  [1, '数值']
])

export const surrenderDetailStatusDicts = new Map([
  [0, '未提交'],
  [1, '待审核'],
  [5, '审核驳回'],
  [10, '已审核']
])

export const relatedPartyType = new Map([
  [0, '无'],
  [1, '原始权益人'],
  [2, '运营管理机构'],
  [3, '基金管理人'],
  [4, ' 专项计划管理人']
])
