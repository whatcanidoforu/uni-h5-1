interface IPage {
  pageNo: number
  pageSize: number
}

declare type IPageParams<T> = IPage & T // 分页查询类型

// 分页返回数据类型
declare interface IPageBody<T> {
  total: number
  data: T[]
}

interface IPageWuye {
  page: number
  rows: number
}
declare type IPageParamsWuye<T> = IPageWuye & T // 分页查询类型
// 分页返回数据类型
declare interface IPageBodyWuye<T> {
  page: number
  records: number
  rows: T[]
  total: number
}

declare interface IOptions {
  value: string | number
  label: string
}

/**
 * 主要通过K extends keyof T约束K必须为keyof T的子类型
 * keyof T得到的是T的所有key组成的联合类型
 */
type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
}

/**
 * 附件类型
 */
type IUploadFile = {
  id: number | string
  fileName: string
  url: string
  createTime: string
}
