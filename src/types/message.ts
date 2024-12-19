export interface IMessage {
  content: string
  createTime: string
  createdBy: number
  id: number
  isRead: boolean
  readTime: string
  title: string
  url: string
  userId: number
  version: number
}

export interface DetailMessage {
  content: string
  createTime: string
  createdBy: number
  deleted: false
  id: number
  isRead: boolean
  readTime: string
  title: string
  url: string
  userId: number
  version: number
}

export interface TSearchNotice {
  pageNo?: number
  pageSize?: number
  userId: number | string
  isRead?: boolean
}
