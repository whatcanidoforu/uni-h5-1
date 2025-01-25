export interface IParkSearch {
  city?: string
  parkName?: string
  province?: string
}

export interface IPark {
  id: number // 园区id
  name: string // 园区名
  buildingNum: number // 楼栋数
  roomNum: number // 房间数
  freeRoomNum: number // 空闲房间数
  companyNum: string // 企业数
  code: string // 园区编号
  statusName: string // 园区状态
  version: number // 版本号
  status: number // 状态
}

export interface IParkDetail {
  id?: number // id
  name: string // 园区名
  code: string // 园区编号
  province: string // 省
  city: string // 市
  district: string // 区/县
  address: string // 详细地址
  longitude: string // 经度
  latitude: string // 纬度
  constructionDate: string // 建设日期
  completionDate: string // 竣工日期
  occupyArea?: number // 占地面积（m2)
  businessArea?: number // 经营面积（m2)
  buildingArea?: number // 建筑面积（m2)
  abovegroundArea?: number // 地上面积（m2)
  undergroundArea?: number // 地下面积（m2)
  afforestedArea?: number // 绿化面积
  greeningRate?: number // 绿化率 （%)
  plannedPlotRatio?: number // 规划容积率（%）
  actualPlotRatio?: number // 实际容积率（%）
  introduction: string // 园区简介
  createTime: string // 创建时间
  createUserName: string // 创建人
  updateTime: string // 更新时间
  statusName: string // 园区状态
  status?: number // 状态
  version?: number
}

export interface IBuildingSearch {
  buildingName: string
  parkId: string
}

export interface IBuilding {
  id: number // 楼栋id
  parkName: string // 园区名称
  code: string // 楼栋编号
  name: number // 楼栋名称
  idleRoomNum: number // 空闲房间数
  roomAndWorkStationNum: number // 房间工位数
  companyNum: number // 企业数
  floorNum: number // 层数
}

export interface IFloor {
  id?: number
  name: string // 楼层名称
  code: string // 楼层code
  underground: boolean // 是否地下

  remark: string // 备注
}
export interface IBuildingDetail {
  groupName?: string
  groupId?: number
  value: any
  contractCode: any
  id?: number // id
  code: string // 楼栋code
  name: string // 楼栋名
  floorCount?: number // 楼层数
  parkId?: number // 园区id
  parkName: string // 园区名称
  roomNum?: number // 房间数
  freeRoomNum?: number // 空闲房间数
  remark: string // 楼栋备注
  imageInfos: IUploadFile[] // 附件
  buildingFloors: IFloor[] // 楼层信息
  latitude: string // 纬度
  longitude: string // 经度
  createTime: string // 创建时间
  createUserName: string // 创建人
  updateTime: string // 更新时间
  version?: number
  resourceCode: string // 资源编号
  statusName: string // 状态
  buildingArea?: number // 建筑面积
  chargeableArea?: number // 计费面积
  rentPrice: string // 租金
  salesPrice: string // 售价
  purposeRent: boolean // 经验用途：租赁
  purposeSale: boolean // 经验用途：销售
  purposeSelf: boolean // 经验用途：自用
  purposeVirtual: boolean // 经验用途：虚拟
  lockApplyCode: string // 锁定编号
  lockUserName: string // 锁定人
  lockForCustomerName: string // 锁定客户
  lockedForCustomerType?: number // 锁定客户类型
  lockedForCustomerUserId?: number // 锁定客户个人id
  lockedForCustomerComId?: number // 锁定客户企业id
  exposure: '' // 朝向
  lockedReason: string // 锁定原因
  lockedTime: string // 锁定时间
  freeDeskNum?: string | number
  deskNum?: string | number
  status?: string | number
  resourceVersion?: string | number
  rentPriceUnit?: string // 租金单位
  paperArea?: number // 纸质档案面积
  salesPriceUnit?: string // 售价单位
  roomRentedRate?: number
  propertyCode?: string
}

export interface IHouseSearch {
  parkId?: number | string // 园区id
  buildingId: string | number // 楼栋ID
  floorId: string // 楼层ID
  roomName: string // 房间名
  status: number[] // 编号
  type?: number // 类型 10：普通房间 20：工位
  purpose?: number[]
  exposure?: '' // 朝向
}

export interface IHouse {
  id: number // 房间id
  code: string // 房间编号
  name: string // 房间名称
  parkName: string // 园区名称
  buildingName: string // 楼栋名称
  resourceCode: string // 资源编号
  resourceName: string //
  chargeableArea: number // 面积
  typeName: string // 类型
  statusName: string // 状态
  customerName: string // 客户名称
  customerId: number // 客户id
  customerType: number
  version: number
  exposure: '' // 朝向
}

export interface IHouseDetail {
  contractCode?: string
  id?: number
  name: string // 房产名称
  code: string // 房产编号
  floorId?: number // 楼层ID
  floorName: string // 楼层名称
  groupName?: string // 项目期数 一期二期
  buildingId?: number // 楼栋ID
  buildingName: string // 楼栋名称
  status?: number // 状态
  statusName?: string // 状态名
  parkId?: number // 园区ID
  parkName: string // 园区名称
  fitUp?: string
  chargeableArea?: number // 计费面积
  buildingArea?: number // 建筑面积
  paperArea?: number // 纸质档案面积
  type?: number // 房屋类型： 10 - 普通房间 20 - 工位
  salesPrice: string // 售价
  rentPrice: string // 租金
  remark: string // 备注
  imageInfos: IUploadFile[] // 附件
  purposeRent: boolean // 经验用途：租赁
  purposeSale: boolean // 经验用途：销售
  purposeSelf: boolean // 经验用途：自用
  purposeVirtual: boolean // 经验用途：虚拟
  resourceCode: string
  lockApplyCode: string // 锁定编号
  lockUserName: string // 锁定人
  lockForCustomerName: string // 锁定客户
  lockedForCustomerType?: number // 锁定客户类型
  lockedForCustomerUserId?: number // 锁定客户个人id
  lockedForCustomerComId?: number // 锁定客户企业id
  exposure: '' // 朝向
  lockedReason: string // 锁定原因
  lockedTime: string // 锁定时间
  createTime: string // 创建时间
  createUserName: string // 创建人
  updateTime: string // 更新时间
  version?: number
  rentPriceUnit: string // 租金单位
  salesPriceUnit?: string // 售价单位
  spaceType?: string // 房屋类型
  propertyCode?: string
}

export interface SearchGetAllRooms {
  pageNo: number | null
  pageSize: number | null
  parkId?: number // 园区id
  buildingIds: number[]
  groupIds: number[]
  floorIds: number[]
  roomStatus: number[]
  exposure?: string
  purposeSale?: boolean
  purposeRent?: boolean
  purposeSelf?: boolean
  purposeVirtual?: boolean
  areaMin?: number
  areaMax?: number
  type?: number
}

export interface ISearchGetAllRoomsBuilding {
  code: string
  createTime: string
  createUserName: string
  createdBy: number
  deleted: boolean
  floorNum: number
  id: number
  imageInfos: IUploadFile[]
  images: string
  latitude: string
  longitude: string
  name: string
  parkId: number
  remark: string
  rooms: ISearchGetAllRoomsBuildingRoom[]
  updateTime: null
  version: number
  totalRoomNums?: number

  totalArea?: number
  totalRoomNum?: number
  totalDeskNum?: number
  totalRentableArea?: number
  totalRentedArea?: number
  totalSaleableArea?: number
  totalSaledArea?: number
  saledRate?: number

  rentedRoomNum?: number
  rentedRate?: number
}

export interface ISearchGetAllRoomsBuildingRoom {
  buildingArea: number
  buildingId: number
  chargeableArea: number
  code: string
  contractCode: string
  createTime: string
  createUserName: string
  createdBy: number
  customerName: string
  deleted: boolean
  exposure: string
  fitUp: string
  floorId: number
  id: number
  imageInfos: IUploadFile[]
  images: string
  lockForCustomerName: string
  lockUserName: string
  lockedBy: string
  lockedForCustomerComId: null
  lockedForCustomerType: null
  lockedForCustomerUserId: null
  lockedReason: string
  name: string
  parkId: number
  purposeRent: true
  purposeSale: true
  purposeSelf: true
  purposeVirtual: true
  remark: string
  rentPrice: string
  resourceCode: string
  salesPrice: string
  status: number
  statusName: string
  spaceType: string
  type: number
  updateTime: string
  version: number
}

export interface ISearchGetAllResources {
  id: number
  name: string
  rentedRate: number
  resourceCode: string
  saledRate: number
  totalArea: number
  totalRentableArea: number
  totalRentedArea: number
  totalSaleableArea: number
  totalSaledArea: number
  selfArea: number
  selfRate: number
  floors: {
    buildingId: number
    chargeableArea: number
    id: number
    name: string
    resourceCode: string
    rooms: {
      chargeableArea: number
      customerName: string
      floorId: number
      id: number
      name: string
      purposeRent: boolean
      purposeSale: boolean
      purposeSelf: boolean
      purposeVirtual: boolean
      resourceCode: string
      spaceType: string
      status: number
      statusName: string
    }[]
  }[]
}

// 资源查询类型
export type IResourceSearch = {
  keyWords?: string
  resourceCode?: string
  parkId?: number
  buildingId?: number
  floorId?: number
  type?: number | string
  status: number[]
  purposeSale?: boolean
  purposeRent?: boolean
  purposeSelf?: boolean
  purposeVirtual?: boolean
  groupId?: number
}
// 资源详情
export type IResourceDetail = {
  id?: number
  parkId?: number // 园区ID
  parkName: string // 园区名称
  code: string // 资源编号
  name: string // 资源名称
  category: string // 资源分类
  categoryName: string // 资源分类名称
  type: string // 资源类型
  typeName: string // 资源类型名称
  buildingId?: number // 楼栋ID
  buildingName: string // 楼栋名称
  floorId?: number // 楼层ID
  floorName: string // 楼层名称
  roomId?: number // 房间ID
  roomName: string // 房间名称
  status?: number // 状态
  statusName: string // 状态名称
  purposeSale?: boolean // 经营用途：销售
  purposeRent?: boolean // 经营用途：租赁
  purposeSelf?: boolean // 经营用途：自用
  purposeVirtual?: boolean // 经营用途：虚拟
  chargeableArea?: number // 计费面积
  buildingArea?: number // 建筑面积
  paperArea?: number // 纸质档案面积
  salesPrice: string // 售价
  rentPrice: string // 租金
  rentPriceUnit: string // 租金单位
  lockApplyCode: string // 锁定编号
  lockedBy?: number // 锁定人
  lockUserName: string // 锁定人
  lockedForCustomerType?: number // 锁定客户类型
  lockedForCustomerUserId?: number // 锁定客户个人id
  lockedForCustomerComId?: number // 锁定客户企业id
  lockForCustomerName: string // 锁定客户
  lockedTime: string // 锁定时间
  lockedReason: string // 锁定原因
  contractCode: string // 合同编号
  remark: string // 备注
  createUserName: string // 创建人
  createTime: string // 创建时间
  updateTime: string // 更新时间
  version?: number // 版本号
  imageInfos: IUploadFile[] // 附件
  salesPriceUnit?: string // 售价单位
}

// 楼层详情
export type IFloorDetail = IResourceDetail & {
  resourceCode: string // 资源编号
  rentPriceUnit: string // 租金单位
}

// 项目
export interface IBuildingGroup {
  buildings: any
  createTime: string
  createdBy: string
  deleted: boolean
  id: number
  name: string
  parkId: number
  version: number
}
// 资源管理申请锁定列表 搜索条件
export interface TSearchLockApply {
  code: string // 编号
  lockType: number[] // 锁定类型
  createStartTime: string // 申请开始时间
  createEndTime: string // 申请结束时间
  verifyStartTime: string // 审核开始时间
  verifyEndTime: string // 审核结束时间
  customerType: string // 客户类型
  customerUserId: string
  customerComId: string
  status: number[] // 状态
}

// 资源管理申请锁定列表 结果
export interface ISearchLockApply {
  code: string // 编号
  createTime: string // 申请日期
  customerName: string // 客户名
  customerType: number
  customerUserId: number
  customerComId: number
  statusName: string // 状态
  lockTypeName: string // 锁定类型
  releaseTime: string // 释放时间
  createByName: string // 申请人
  verifyTime: string // 审核时间
  verifiedByName: string // 审核人
  version?: number
}

// 新建资源锁定
export interface TCreateLockApply {
  code?: string
  parkId?: number // 园区ID
  parkName?: string
  customerType?: number // 客户类型
  customerUserId?: number
  customerComId?: number
  customerName?: string
  lockType?: number // 锁定类型
  lockTypeName?: string
  lockReason?: string // 锁定原因
  files?: IUploadFile[] // 文件
  releaseTime?: string // 释放时间
  details?: { resourceCode?: string }[]
  version?: number
  status?: number
}

// 通过 resourceCode 查询资源结果
export interface IToApplyLock {
  buildingArea?: number // 面积
  buildingId?: number // 楼栋
  buildingName?: string
  code?: string // 编号
  exposure?: string // 朝向
  fitUp?: string // 装修
  floorId?: number
  floorName?: string // 楼层
  name?: string // 资源名称
  parkId?: number
  parkName?: string // 园区名
  roomId?: number
  status?: number
  type?: string
  typeName?: string // 类型
}

//  查询资源锁定单详情
export interface IApiGetApplyLock {
  code?: string
  createBy?: string
  createByName?: string
  createTime?: string
  customerComId?: number
  customerName?: string
  customerType?: number
  customerUserId?: number
  parkId?: number
  parkName?: string
  lockReason?: string
  details: {
    buildingArea?: number
    buildingId?: number
    buildingName?: string
    code?: string
    exposure?: string
    fitUp?: string
    floorId?: number
    floorName?: string
    name?: string
    parkId?: number
    parkName?: string
    roomId?: number
    status?: number
    type?: string
    typeName?: string
  }[]
  fileInfos?: IUploadFile[]
  id?: number
  lockType?: number
  lockTypeName?: string
  releaseTime?: string
  status?: number
  statusName?: string
  verifiedBy?: number
  verifiedByName?: string
  verifyTime?: string
  version?: number
}

// 资源树的楼宇--四级
export type IResourceTreeBuilding = {
  treeLevel: number | string
  treeKey: string
  name: string
  code: string
  createTime: string
  createUserName: string
  createdBy: string | number
  deleted: boolean
  floorNum: string | number
  groupId: string | number
  groupName: string
  id: string | number
  latitude: string
  longitude: string
  parkId: string | number
  resourceCode: string
  resourceName: string
  updateTime: string
  version: string | number
  parkName: string
  buildingName: string
}

// 资源树的项目--三级
export type IResourceTreeGroup = {
  treeLevel: number | string
  buildings: IResourceTreeBuilding[]
  children: IResourceTreeBuilding[]
  createTime: string
  createdBy: string | number
  deleted: false
  id: string | number
  name: string
  parkId: string | number
  groupId: string | number
  version: string | number
  treeKey: string
  parkName: string
  groupName: string
  buildingName?: string
}

// 资源树的园区--二级
export type IResourceTreePark = {
  treeLevel: number | string
  abovegroundArea: string | number
  actualPlotRatio: string | number
  address: string
  afforestedArea: string | number
  buildingArea: string | number
  children: IResourceTreeGroup[]
  buildingGroups: IResourceTreeGroup[]
  businessArea: string | number
  city: string
  code: string
  completionDate: string
  constructionDate: string
  createTime: string
  createUserName: string
  createdBy: string | number
  deleted: boolean
  district: string
  greeningRate: string | number
  id: string | number
  introduction: string
  latitude: string
  longitude: string
  name: string
  occupyArea: string | number
  owerId: string | number
  parkName: string
  plannedPlotRatio: string | number
  province: string
  status: string | number
  statusName: string
  undergroundArea: string | number
  updateTime: string
  version: string | number
  treeKey: string
  parkId: string | number
  groupId: string | number
  groupName?: string
  buildingName?: string
}

// 资源树的虚拟根节点--一级
export type IResourceTreeRoot = {
  treeLevel: number | string
  children: IResourceTreePark[]
  code: string
  id: string | number
  name: string
  treeKey: string
  parkName: string
  groupName: string
  parkId: string | number
  groupId: string | number
}

// 资源树的项目列表
export type IResourceTreeGroupItem = {
  buildingArea: string | number
  chargeableArea: string | number
  buildingNum: string | number
  freeRoomNum: string | number
  freeStationNum: string | number
  id: string | number
  name: string
  parkId: string | number
  parkName: string
  roomNum: string | number
  stationNum: string | number
  version: string | number
  fileInfos: IUploadFile[]
  roomRentedRate?: number
}

// 资源树的楼宇列表
export type IResourceTreeBuildingItem = {
  buildingArea: string | number
  chargeableArea: string | number
  code: string
  deskRentRate: string | number
  deskRentedNum: string | number
  deskTotalNum: string | number
  floorNum: string | number
  freeDeskNum: string | number
  freeRoomNum: string | number
  groupId: string | number
  id: string | number
  name: string
  resourceCode: string
  roomRentRate: string | number
  roomRentedNum: string | number
  roomTotalNum: string | number
  status: string | number
  statusName: string
  resourceVersion: string | number
  version: string | number
  roomRentedRate?: number
}

export type IResourceTreeRoomItem = {
  buildingArea: string | number
  buildingId: string | number
  buildingName: string
  chargeableArea: string | number
  code: string
  contractCode: string
  contractId: string
  createTime: string
  createUserName: string
  createdBy: string | number
  customerId: string | number
  customerName: string
  customerType: string | number
  customerTypeName: string
  deleted: boolean
  exposure: string
  fitUp: string
  floorId: string | number
  floorName: string
  id: string | number
  // imageInfos: []
  images: string
  lockForCustomerName: string
  lockUserName: string
  lockedBy: string | number
  lockedForCustomerComId: string | number
  lockedForCustomerType: string | number
  lockedForCustomerUserId: string | number
  lockedReason: string
  lockedTime: string | number
  name: string
  parkId: string | number
  parkName: string
  purposeRent: boolean
  purposeSale: boolean
  purposeSelf: boolean
  purposeVirtual: boolean
  remark: string
  rentPrice: string
  resourceCode: string
  salesPrice: string
  status: string | number
  statusName: string
  type: string | number
  typeName: string
  updateTime: string
  version: string | number
}

// 关联客户列表
export type ICustomerList = {
  contractCode: string
  customerId: number
  customerName: string
  customerType: number
  mobile: string
  relationType: number
}

// 产证
export type TSearchCertificate = {
  keyword?: string
  parkId?: number
  buildingId?: number
  floorId?: number
  roomId?: number
}
export type ICertificate = {
  address: string
  area: number
  code: string
  createBy: number
  createTime: string
  deleted: number
  files: string
  id: number
  obligee: string
  oid: number
  parcelCode: string
  parkId: number
  resourceName: string
  updateBy: number
  updateTime: string
  usufructType: number
  usufructTypeName: string
  version: number
}
// 产证
export type TCertificateCreate = {
  code?: string // 产证编号
  parkId?: number // 所属园区
  area?: number // 面积
  address?: string // 产证落座
  parcelCode?: string // 宗地号
  usufructType?: number // 使用权获得方式
  obligee?: string // 权利人
  files: string
  fileList: IUploadFile[]
}

//项目
export type IProjectForm = {
  parkId?: number
  contractPhone?: string //联系电话
  houseType?: string //房源类型 :"公寓","商业","办公","厂房","其他"
  rent?: number //租金
  propertyFee?: number //物业费
  houseArea?: number //房屋面积
  buildingNum?: number //楼栋数量
  address?: string //地址
  files?: IUploadFile[] //图片
  tags?: string[] //标签 :"近地铁","近机场","交通便捷","多公交","班车接送","园区多业态"
}

export interface TSearchProjectForm {
  parkName?: string
}

export type ProjectForm = IProjectForm & {
  id?: number | string
  parkName?: string
  deleted?: number
}
