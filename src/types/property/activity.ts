export type ISearchActivity = {
  parkId?: number
  status: number[]
  publishStatus: number[]
  userId?: number
  code?: number
  title: ''
  startTime: string
  endTime: string
  isCollect: false
  isEnroll: false
}

export type IActivityList = {
  activityStatusName: string
  coverImages: string
  createTime: string
  endTime: string
  enrollAbleName: string
  enrollAllowed: true
  enrollEndTime: string
  enrollNum: number
  enrollNumLimit: number
  enrollStartTime: string
  enrollable: false
  id: number
  parkName: string
  publishStatus: number
  publishStatusName: string
  startTime: string
  status: number
  title: string
  version: number
}

export type IActivityDetail = {
  activityStatusName: string
  address: string
  addressType: number
  comId: number
  commentAllowed: boolean
  companyName: string
  contactName: string
  contactPhone: string
  content: string
  coverImages: string
  coverImagesList: IUploadFile[]
  createTime: string
  createdBy?: number
  endTime: string
  enrollAbleName: string
  enrollAllowed: boolean
  enrollEndTime: string
  enrollForm: string
  enrollFormList: {
    name: string
    required: boolean
    value: string
  }[]
  enrollNum: number
  enrollNumLimit: number
  enrollStartTime: string
  enrollable: boolean
  files: string
  fileList: IUploadFile[]
  id?: number
  isCollect?: boolean
  isLike?: boolean
  isSign?: boolean
  likeNum: number
  parkId?: number
  parkName: string
  publishStatus: number
  publishStatusName: string
  remark: string
  startTime: string
  status: number
  title: string
  updateTime: string
  version: number
}

export type ISearchActivityEnroll = {
  activityId?: number
  customerName: string
  phone: string
}

export type IActivityEnrollList = {
  customerName: string
  enrollFormList: {
    name: string
    required: boolean
    value: string
  }[]
  enrollTime: string
  id: number
  phone: string
  signed: boolean
  signedTime: string
}
