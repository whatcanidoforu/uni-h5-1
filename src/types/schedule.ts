import type { IUploadFile } from './upload'

export type ISchedule = {
  title: string
  startTime: string
  endTime: string
  remindTime: string
  customerType: string | number
  fileInfos: IUploadFile[]
  customerUserId: string | number
  customerName: string
  participantIds: (string | number)[]
  participantNames: string[]
  content: string
  customerComId: string | number
  remindBySms: boolean
  remindByNotice: boolean
  chanceId: string | number
  createTime?: string
  createdBy?: string | number
  createdByName?: string
  customerTypeName?: string
  deleted?: boolean
  files?: string
  id: string | number
  noticeReminded?: boolean
  smsReminded?: boolean
  status?: number
  customerOrChance: string
  userCalendarStatusName?: string
  userId?: string | number
  version?: string | number
  participants?: { id: number | string; name: string; participantId: number | string }[]
}

export type IScheduleDetail = Pick<
  ISchedule,
  | 'chanceId'
  | 'content'
  | 'createTime'
  | 'createdBy'
  | 'createdByName'
  | 'customerComId'
  | 'customerName'
  | 'customerType'
  | 'customerTypeName'
  | 'customerUserId'
  | 'deleted'
  | 'endTime'
  | 'fileInfos'
  | 'files'
  | 'id'
  | 'noticeReminded'
  | 'participants'
  | 'participantIds'
  | 'participantNames'
  | 'remindByNotice'
  | 'remindBySms'
  | 'remindTime'
  | 'smsReminded'
  | 'startTime'
  | 'status'
  | 'title'
  | 'userCalendarStatusName'
  | 'userId'
  | 'version'
  | 'customerOrChance'
>

export type IScheduleList = Pick<
  ISchedule,
  | 'chanceId'
  | 'content'
  | 'createTime'
  | 'createdBy'
  | 'customerComId'
  | 'customerName'
  | 'customerType'
  | 'customerTypeName'
  | 'customerUserId'
  | 'deleted'
  | 'endTime'
  | 'files'
  | 'id'
  | 'noticeReminded'
  | 'remindByNotice'
  | 'remindBySms'
  | 'remindTime'
  | 'smsReminded'
  | 'startTime'
  | 'status'
  | 'title'
  | 'userCalendarStatusName'
  | 'userId'
  | 'version'
  | 'customerOrChance'
>

export type ISearchSchedule = {
  userId: string | number
  chanceId?: number | string
  /**
   * 相关客户id
   */
  customerId?: number | string
  customerType?: number | string
  endTime?: string
  /**
   * 日程内容（匹配title和content
   */
  keywords?: string
  startTime?: string
  customerName?: string
}
