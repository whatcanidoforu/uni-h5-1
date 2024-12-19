// 园区
export type IVillageType = {
  id: string
  villageName: string
}
// 楼栋
export type IBuilding = {
  total_floors: any
  end_use_date: any
  latitude: any
  remark: any
  areas: any
  zs_id: any
  underground_floors: any
  create_by: string
  ground_floors: any
  attachment: any
  project_id: any
  id: string
  state: string
  unreal: any
  decoration_status: any
  longitude: string
  building_name: string
  village_id: string
  ground_floor_height: any
  business_area: any
  standard_floor_height: any
  modified_date: string
  delivery_date: string
  modified_by: string
  created_date: string
  building_height: any
  use_date: string
}
// 楼层
export type IFloor = {
  id: string
  villageName: string
}
// 房室
export type IRoom = {
  id: string
  villageName: string
}

// 站点管理列表
export type TSearchInspectionPoint = {
  villageId?: string
  _search?: boolean
  nd?: number
  rows?: number
  page?: number
  sidx?: string
  sord?: string
  inspector?: string
  keyword?: string
  type?: number | string
  cycleType?: number | string
}
export type ISearchInspectionPoint = {
  createTime: string
  updatedTime: string
  id: number
  name: string
  number: string
  type: number
  lon: string
  lat: string
  villageId: string
  buildingId: string
  floorId: string
  roomId: string
  picUrls: string
  state: number
  descInfo: string
  cardId: string
  pointId: string
  villageName: string
  buildingName: string
  floorName: string
  roomName: string
  isErr: number
  position: string
}
// 新建站点
export type TAddInspectionPoint = {
  sequential?: number // 是否顺序巡检 0:非 1：是
  name?: string
  type?: number // 0普通巡检点  1设备点
  villageId?: string
  buildingId?: string
  floorId?: string
  roomId?: string
  picUrls?: string
  descInfo?: string // 描述
  deviceIds?: number[]
  cardId?: string // nfc卡的ID
  rules?: {
    sort?: number
    content?: string
  }[]
}

// 巡检任务管理列表
export type TSearchInspectionTaskPage = {
  page?: number
  rows?: number
  sidx?: string
  sord?: string
  keyword?: string
  type?: number // 站点类型 0普通巡检点  1设备点
  inspector?: string // 巡检者
  cycleType?: number // 频率类型， 0临时 1每天 2每周 3自定义
  villageId?: string
  state?: number // 0暂停
}
export type ISearchInspectionTaskPage = {
  createdBy: string
  createTime: string
  updatedBy: null
  updatedTime: null
  id: string
  taskName: string
  number: string
  startTime: string
  endTime: string
  cycleType: 1
  taskCycle: string
  inspectorType: 1
  inspector: string
  state: 1
  type: null
  descInfo: string
  villageId: string
  idStr: string
  inspectorName: string
  taskPoints: null
}
// 新建巡检任务
export type TAddInspectionTask = {
  taskName?: string //
  startTime?: string //
  endTime?: string //
  cycleType?: number // 频率类型， 0临时 1每天 2每周 3自定义
  taskCycle?: string // 任务周期，日和周互斥,utf8编码后传输 {"week":[2,3],"year":2020,"month":11,"day":31,"hour":22,"min":59,"sec":59}
  inspectorType?: number // 巡检者类型  0个人   1组
  inspector?: string // 巡检者, inspectorType==0 ? empId : groupId
  state?: number // 状态，0暂停  1运行
  type?: number // 任务类型
  villageId?: string // 园区ID
  descInfo?: string // 描述
  pointIds?: string[] // 站点ID

  week?: number[]
}

export type TSearchInspectionTaskInstPage = {
  exceptFuture?: number // 可传1 作用未知 在巡检报表点击数字时弹出的列表时使用
  taskDefId?: string // 任务id
  villageId?: string
  _search?: boolean
  nd?: number
  rows?: number
  page?: number
  sidx?: string
  sord?: string
  keyword?: string
  inspector?: string
  state?: number // 任务状态，1：未执行   2：执行中，3：完成   4：停止
  dutiedDate?: string // 日期
  type?: number | string
  cycleType?: number | string
}
export type ISearchInspectionTaskInstPage = {
  createdBy: string
  createTime: string
  updatedBy: string
  updatedTime: string
  id: string
  taskName: string
  number: string
  startTime: string
  endTime: string
  cycleType: number
  taskCycle: string
  inspectorType: number
  inspector: string
  state: number
  type: number
  descInfo: string
  villageId: string
  taskId: number
  executor: string
  fshDate: string
  errState: number
  idStr: string
  inspectorName: string
  executorName: string
  staDate: string
  taskInstPoints: any
  pdoneCount: number
  ptotal: number
}
