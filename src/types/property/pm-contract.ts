// 物业合同列表 查询-分页
export interface TPmContractPage {
  scdPartyId?: number // 物业公司ID
  startTime?: string // 合同开始时间
  endTime?: string // 合同结束时间
  parkId?: number // 园区ID
  keywords?: string // 关键字
  statusList?: number[] // 状态
}
// 物业合同列表 查询-分页的每条
export interface IDetailPmContractPage {
  buldingName: string
  chargingType: number
  chargingTypeName: string
  code: string
  createdBy: number
  createdByName: string
  createdTime: string
  deleted: false
  detailNames: string
  details: []
  endTime: string
  fileList: IUploadFile[]
  files: string
  fineRadio: number
  floorName: string
  fstParty: string
  fstPartyAddress: string
  fstPartyContacts: string
  fstPartyPhone: string
  id: number
  parkId: number
  parkName: string
  relatedId: number
  remark: string
  roomName: string
  scdPartyId: number
  scdPartyMgrId: number
  scdPartyMgrName: string
  scdPartyMgrPhone: string
  scdPartyName: string
  settlementCycle: number
  settlementType: number
  settlementTypeName: string
  signTime: string
  startTime: string
  status: number
  updatedBy: string
  updatedByName: string
  updatedTime: string
  version: number
  verifiedChannelType: number // 1本地 2范微的OA系统
}

// 物业合同新增
export interface TPmContractAdd {
  code?: string
  signTime?: string // 签订时间
  startTime?: string // 合同开始时间
  endTime?: string // 合同结束时间
  fstPartyId?: number // 客户ID
  fstPartyName?: string // 客户名称
  fstPartyContacts?: string // 客户联系人
  fstPartyPhone?: string // 客户联系电话
  fstPartyAddress?: string // 客户联系地址
  scdPartyId?: number // 物业公司ID
  scdPartyMgrId?: number // 物业公司负责人ID
  scdPartyMgrName?: string
  parkId?: number // 园区ID
  settlementType?: number // 结算方式 1：先结算（默认） 2：后结算
  settlementCycle?: number // 结算周期
  chargingType?: number // 计费方式 1：按合同月 2：按自然月
  fineRadio?: number // 违约金比率  0.5
  outgoingMethod?: number // 出账方式 1："自动出账" 2： "手动出账"
  outgoingType?: number // 出账类型 1, "合同独立出账"2, "同类型合同合并出账"3, "客户合并出账"
  remark?: string // 备注
  relatedId?: number // 关联合同号
  relatedCode?: string
  details?: TPmContractAddDetail[] // 资产明细
  renewId?: number // 续约来源
  fileList: IUploadFile[]
  delayFeeUnit: number // 违约金计算单位 1：百分比 2：千分比 3: 万分比
}
// 物业合同新增资产明细
export interface TPmContractAddDetail {
  parkId?: number // 园区
  buildingId?: number // 楼栋
  floorId?: number // 楼层
  roomId?: number //
  wkStationId?: number //
  billableArea?: number // 计费面积
  feeType?: number // 费用名称
  resourceCode?: string
  resourceName?: string

  // 递增价格
  prices?: {
    price?: number // 单价
    priceUnit?: number // 单价单位
    startTime?: string // 单价生效时间
  }[]
  // 免费期
  gratis?: {
    startTime?: string // 免费期开始时间
    endTime?: string // 免费期结束时间
  }[]
}

// 物业合同详情
export interface PmContractDetail {
  buldingName?: string
  chargingType?: number
  chargingTypeName?: string
  code?: string
  createdBy?: number
  createdByName?: string
  createdTime?: string
  deleted?: boolean
  details?: []
  endTime?: string
  fileList: IUploadFile[]
  files?: string
  fineRadio?: number
  floorName?: string
  fstPartyAddress?: string
  fstPartyContacts?: string
  fstPartyId?: number
  fstPartyName?: string
  fstPartyPhone?: string
  id?: number
  outgoingMethod?: number
  outgoingMethodName?: string
  outgoingType?: number
  outgoingTypeName?: string
  parkId?: number
  parkName?: string
  relatedCode?: string
  relatedId?: number
  remark?: string
  renewId?: number
  roomName?: string
  scdPartyId?: number
  scdPartyMgrId?: number
  scdPartyMgrName?: string
  scdPartyMgrPhone?: string
  scdPartyName?: string
  settlementCycle?: number
  settlementType?: number
  settlementTypeName?: string
  signTime?: string
  startTime?: string
  status?: number
  statusName?: string
  updatedBy?: string
  updatedByName?: string
  updatedTime?: string
  verifiedTime?: string
  verifierName?: string
  verifieVersion?: number // 审核版本号
  version?: number
  delayFeeUnit: number
  delayFeeUnitName: string
}

// 物业合同详情明细列表
export interface PmContractListDetail {
  billableArea: number
  buildingId: number
  buildingName: string
  contractId: string
  deleted: boolean
  floorId: number
  floorName: string
  gratis: PmContractListDetailGratis[]
  gratisDays: number
  id: number
  parkId: number
  prices: PmContractListDetailPrices[]
  resourceCode: string
  resourceName: string
  roomId: number
  roomName: string
  wkStationId: number
  wkStationName: string
}

export interface PmContractListDetailGratis {
  amount: number
  contractId: string
  days: number
  deleted: boolean
  detailId: number
  endTime: string
  startTime: string
}
export interface PmContractListDetailPrices {
  contractId: string
  deleted: boolean
  detailId: number
  price: number
  priceUnit: number
  startTime: string
}
