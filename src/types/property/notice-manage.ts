export type ISearchNoticeList = {
  title: string // 公告标题
  categoryId: string // 分类id
  startTime: string // 开始时间
  endTime: string // 结束时间
}

export type INoticeListDetail = {
  id: string
  title: string
  banner: string
  briefIntroduction?: string
  categoryId?: string
  contentType?: number
  state: number
  column: number
  endDateTime: string
  content: string
  updatedBy: string
  updatedTime: string
  createdBy: string
  applicable?: number
  enclosure?: string
  createdTime: string
  readCount: number
  sourceChannel: number
  wxArticleId?: string
  wxArticleUrl?: string
  targets: any[]
  terminals: {
    terminalCategory: number
    position: number
    level: number
  }[]
  villages: {
    messageId: string
    villageId: string
    villageName: string
    buildingId?: string
    buildingName?: string
  }[]
}

export type IEditNotice = {
  id: string
  title?: string
  categoryId?: string
  contentType?: number
  state?: number
  endDateTime?: string
  briefIntroduction?: string
  banner?: IUploadFile[]
  applicable?: number
  enclosure?: string
  content?: string
  targets?: string[]
  terminals?: {
    terminalCategory: number
    position: number
    level: number
  }[]
  position?: number
  level?: number
  villages?: {
    villageId: string
    villageName: string
  }[]
}

export enum ENoticePosition {
  首页 = 1,
  banner = 2,
  弹框 = 3
}

export enum ENoticeLevel {
  顶部 = 1,
  中部 = 2,
  左侧 = 3,
  右侧 = 4,
  底部 = 5
}

export enum ENoticeContentType {
  图 = 1,
  文 = 2,
  声 = 3,
  像 = 4,
  url = 5
}

export enum ENoticeState {
  待发布 = 0,
  已发布 = 1
}

export enum ENoticeApplicable {
  不支持 = 0,
  支持 = 1
}

export enum ENoticeTerminalCategory {
  APP = 1,
  小程序 = 2,
  pc端 = 3
}
