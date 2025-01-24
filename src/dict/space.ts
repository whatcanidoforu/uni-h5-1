// 房产类型 10：普通房间 20：工位
export const roomType = new Map([
  [10, '房间'],
  [20, '工位']
])

// 房间状态（-10：不可用 0：空闲 10：已租 20：已售 30：已锁定
export const roomStatus = new Map([
  [-10, '不可用'],
  [0, '空闲'],
  [10, '已租'],
  [20, '已售'],
  [30, '已锁定'],
  [31, '申请锁定'],
  [40, '已自用']
])
export const roomStatusColor = new Map([
  [-10, '#7f7f7f'],
  [0, '#808080'],
  [10, '#448ef7'],
  [20, '#ffcaa0'],
  [30, '#fb9393'],
  [31, '#fb9393'],
  [40, '#00bfbf']
])

// 房间用途 0：销售 1：租赁 2：自用 3：虚拟
export const roomUseType = new Map([
  [0, '销售'],
  [1, '租赁'],
  [2, '自用'],
  [3, '虚拟']
])

// 房间用途 0：销售 1：租赁 2：自用 3：虚拟
export const roomUseType2 = new Map([
  ['purposeSale', '销售'],
  ['purposeRent', '租赁'],
  ['purposeSelf', '自用'],
  ['purposeVirtual', '虚拟']
])

// 园区状态 0：关闭 10：正常
export const parkStatus = new Map([
  [0, '关闭'],
  [10, '正常']
])

// 资源类型 房间("room"), 楼层("floor"), 楼栋("building")
export const resourceType = new Map([
  ['room', '房间'],
  ['floor', '楼层'],
  ['build', '楼栋'],
  ['desk', '工位']
])

// 锁定类型
export const resourceLockType = new Map([
  [1, '租赁'],
  [2, '销售']
])

// 锁定类型
export const resourceLockStatus = new Map([
  [0, '申请中'],
  [10, '已锁定'],
  [20, '已释放']
])

// 装修类型
export const decorateType = new Map([
  ['毛坯', '毛坯'],
  ['精装修', '精装修']
])

// 房产类型
export const roomPropertyType = new Map([
  ['办公室', '办公室'],
  ['商铺', '商铺'],
  ['会议室', '会议室'],
  ['厂房', '厂房']
])

// 使用权取得方式
export const usufructTypeDict = new Map([[1, '出让']])
