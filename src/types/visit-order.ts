export type IVisitOrderDetail = {
  parkId?: number
  parkName?: string
  id?: number // 带看单id
  chanceId?: string | number // 商机id
  recommendTime: string // 推荐时间
  visitTime: string // 到访时间
  customerName: string // 客户姓名
  customerSex?: boolean // 客户性别
  customerSexName: string // 客户性别名称
  customerPhone: string // 客户电话
  visitArea: string // 到访区域
  sourceType: 'agency' | 'inner' // 0 中介  1 内推
  sourceTypeName: string // 来源类型名称
  agencyShop: string // 中介门店
  agencyPhone: string // 中介电话
  agencyPersonName: string // 中介联系人
  agencyPersonPhone: string // 中介联系人电话
  innerPersonName: string // 员工姓名
  innerPersonPhone: string // 员工电话
  remark: string // 备注
  files: IUploadFile[] // 附件
  status?: -10 | 0 | 10 | 20 | 30 // 状态 -10已失效 0未提交 10待审核 20已生效 30已驳回
  statusName?: string // 状态名称
  version?: number // 版本号
  agencyId?: number
  intentedResource?: string // 意向资源
  intentedPrice?: string // 意向价格

  resourceCodes?: string[] // 资源列表 新增编辑入参的数组
  // 资源列表 详情里的数组参数
  visitRecordDetails?: {
    resourceCode?: string
    resourceName?: string
  }[]
}

export type ISearchVisitOrderList = {
  keyword?: string // 关键字
  status?: -10 | 0 | 10 | 20 | 30 // 状态 -10已失效 0未提交 10待审核 20已生效 30已驳回
  chanceId?: string | number // 商机id
  recommendStartTime?: string // 推荐开始时间
  recommendEndTime?: string // 推荐结束时间
  visitStartTime?: string // 到访开始时间
  visitEndTime?: string // 到访结束时间
  customerName?: string // 客户姓名
  customerPhone?: string // 客户电话
  agencyShop?: string // 中介门店
  agencyId?: number
  departmentId?: string
  departmentName?: string
  directorId?: string
}

export type IVisitOrderListItem = {
  agencyPersonName: string // 中介联系人
  agencyPersonPhone: string // 中介联系人电话
  agencyPhone: string // 中介电话
  agencyShop: string // 中介门店
  chanceId: number // 商机id
  createTime: string // 创建时间
  createdBy?: number // 创建人
  customerName: string // 客户姓名
  customerPhone: string // 客户电话
  customerSex?: number // 客户性别 0 女 1 男
  id: 1 // 带看单id
  innerPersonName: string // 员工姓名
  innerPersonPhone: string // 员工电话
  recommendTime: string // 推荐时间
  sourceType: string // 来源类型 0 中介  1 内推
  sourceTypeName: string // 来源类型名称
  status: number // 状态 -10已失效 0未提交 10待审核 20已生效 30已驳回
  statusName: string // 状态名称
  version: 0 // 版本号
  visitArea: string // 到访区域
  visitTime: string // 到访时间
}
