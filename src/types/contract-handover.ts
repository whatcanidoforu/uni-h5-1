import type { IContractDetails as rentDetail } from './contract'
import type { IContractDetailList as saleDetail } from './sale'

export type TSearchHandoverList = {
  keywords: string
  parkId?: string | number
  createdById: string
  startDate: string
  endDate: string
  status: string //0 - 待通知 10 - 待交房 100 - 已交房
}

export type THandoverList = {
  contractCode: string
  contractReturnTime: string
  createdByName: string
  customerName: string
  distance: number
  parkName: string
  realReturnTime: null
  resourceName: string
  status: number
  statusName: string
  id: number
  resourceItems?: { endTime?: string; fullName?: string; id?: number; startTime?: string; unitNum?: number }[]
}

export type TFollowForm = {
  orderId?: number
  type?: number
  contactType?: number
  followTime?: string
  followedBy?: number
  contractId?: string
  communicateMethod?: number
  deliveryTime?: string
  signedBy?: number
  remark: string
  fileInfos: IUploadFile[]
}

export type THandoverDetail = {
  contractCode: string
  contractId?: string
  contractCreatedTime: string
  contractReturnTime: string
  contractType?: number
  contractTypeName: string
  createByName: string
  customerName: string
  customerId?: number
  itemList: {
    contactType?: number
    contactTypeName: string
    createTime: string
    createTimeList: string[]
    createdBy?: number
    deleted: boolean
    fileInfos: IUploadFile[]
    followTime: string
    followedBy?: number
    followedByName: string
    id?: number
    orderId?: number
    remark: string
    type?: number
    typeName: string
    updateTime: string
    version?: number
    returnStatus?: number
    returnStatusName: string
  }[]
  parkName: string
  realReturnTime: string
  status?: number
  statusName: string
  rentContractDetail: rentDetail[]
  saleContractDetail: saleDetail[]
}
