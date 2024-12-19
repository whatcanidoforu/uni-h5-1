export type ISearchHousingResources = {
  types?: number[]
  statuses?: number[]
  parkIds?: number[]
  keywords?: string
}

export type IHousingResourcesTable = {
  area: string
  banner: string
  createdBy: number
  creatorName: string
  detail: string
  fileInfos: IUploadFile[]
  fitUp: string
  floor: string
  floorNum: string
  id: number
  liveInTime: string
  name: string
  parkAddress: string
  parkId: number
  parkName: string
  phone: string
  price: string
  status: number
  statusName: string
  type: number
  typeName: string
  wyPrice: string
  version: number
}

export type IHousingResourcesDetail = {
  id?: number
  version?: number
  parkId?: number
  type?: number
  status?: number
  name: string
  phone: string
  fileInfos: IUploadFile[]
  price: string
  wyPrice: string
  area: string
  floor: string
  floorNum: string
  fitUp: string
  liveInTime: string
  parkAddress: string
  detail: string
  banner?: string
  createdBy?: number
  creatorName?: string
  parkName?: string
  typeName?: string
  houseSourceForms?: {
    name: string
    value: string
    required: boolean
  }[]
}
