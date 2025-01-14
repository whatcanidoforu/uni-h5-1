export interface TSearchCompanyForm {
  companyName?: string | null;
  mobile?: string | null;
  idNumber?: string | null; // 证件号码
  customerType?: string; // 客户类型 0个人 1企业
  parkIds: string[] | number[];
  buildingId?: string | null;
  floorId?: string | null;
  pageNo?: number;
  pageSize?: number;
  userId?: any;
  excludeManager?: boolean;
}
export interface ICompany {
  companyId: number; // 企业id
  companyName: number; // 客户名称
  mobile: number; // 联系电话
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
  id: number;
  idNumber: string; // 证件号码
  userCount: number; // 用户数
  industry: string; // 行业
  grade: string; // 客户等级
  name?: string; // 客户名称
}
export type TCompanyForm = {
  type?: number;
  typeName?: string;
  createUserName?: string;
  createdBy?: string | null;
  // 地址，地址
  address?: string;
  // 开户行，开户行
  bank?: string;
  // 银行账号，银行账号
  bankAccount?: string;
  // 开户行行号，开户行行号
  bankNo?: string;
  createTime?: string;
  updateTime?: string;
  // 市
  city?: string;
  // 客户id，公司id
  id?: number;
  // 区
  district?: string;
  // 邮箱
  email?: string;
  // 证件信息
  idFileInfos: IUploadFile[];
  // 证件号码
  idNumber?: string;
  // 证件类型
  idType?: number;
  idTypeName?: string;
  // 手机，手机号
  mobile?: string;
  // 公司名，名称
  name?: string;
  // 固话，固话
  phone?: string;
  // 省
  province?: string;
  // 税号，税号
  taxNo?: string;
  // 版本号
  version?: number;
  wxMerchantId?: string; // 微信商户号
  industry?: string; // 行业
  grade?: string; // 客户等级
  userCount?: number; // 用户数
  corporate?: string; // 法人
  contact?: string; // 联系人
  econKind?: string; // 企业类型
  registCapi?: string; // 注册资金
  bizStatus?: string; // 经营状态
  taxInfo?: number; // 税收情况
  establishTime?: string; // 成立日期
  bizExpire?: string; // 营业期限
  website?: string; // 网址
  taxType?: string; // 纳税人类型
  regProvince?: string; // 注册省份
  regCity?: string; // 注册城市
  regDistrict?: string; // 注册区域
  regAddress?: string; // 注册地址
  introduce?: string; // 企业简介
  expireTime?: string; // 证件有效期
  code?: string;

  birthDate?: string | number;
  sex?: number;
  wxCode?: string;
  wxOpenId?: string;
  loginTime?: string;
  avatar?: string;
  identified?: boolean;
  mobileVerified?: boolean;
  loginName?: string;
  population?: string; // 民族
  nativePlace?: string; // 籍贯
  marriage?: string; // 婚姻状况
  education?: string; // 学历
  remark?: string; // 备注
  invoiceTitle?: string; // 发票抬头
  invoiceBank?: string; // 开户行
  invoiceAddress?: string; // 开户行地址
  invoicePhone?: string; // 开户行电话
  invoiceBankAccount?: string; // 银行账号
  expiredTime?: string; // 证件有效期
  passwd?: string; // 密码
};

export interface TSearchUserForm {
  // 身份证号
  parkIds: number[];
  idNumber?: string;
  // 手机号，手机号
  mobile?: string;
  // 页码
  pageNo?: number;
  // 页长
  pageSize?: number;
  // 名称，名称
  userName?: string;
  loginName?: string;
}
export interface IUser {
  createTime: string;
  createdByName: string;
  idNumber: string;
  identified: boolean;
  mobile: string;
  updateTime: string;
  userId: number;
  userName: string;
  id: number;
}
export type TUserForm = {
  createUserName?: string;
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
  createdBy?: string | null;
  // 出生日期
  birthDate?: string | number;
  // 邮箱
  email?: string;
  // 证件信息
  idFileInfos?: IUploadFile[];
  // 身份证号
  idNumber?: string;
  // 手机号
  mobile?: string;
  // 客户名称
  name: string;
  // 性别
  sex?: number;
  // 客户id
  id?: number | null | string;
  // 版本号
  version?: number | null | string;
  // 微信号
  wxCode?: string | null;
  wxOpenId?: string | null;
  loginTime?: string;
  avatar?: string;
  identified?: boolean;
  mobileVerified?: boolean;
  loginName?: string;
  population?: string; // 民族
  nativePlace?: string; // 籍贯
  marriage?: string; // 婚姻状况
  education?: string; // 学历
  province?: string; // 省
  city?: string; // 市
  district?: string; // 区
  address?: string; // 详细地址
  remark?: string; // 备注
  idType?: number; // 证件类型
  idTypeName?: string;
  invoiceTitle?: string; // 发票抬头
  invoiceBank?: string; // 开户行
  invoiceAddress?: string; // 开户行地址
  invoicePhone?: string; // 开户行电话
  taxType?: string; // 纳税人类型
  taxNo?: string; // 税号
  invoiceBankAccount?: string; // 银行账号
  expiredTime?: string; // 证件有效期
  bankAccount?: string; // 银行账号
  passwd?: string; // 密码
  code?: string;
  forbidLogin?: boolean;
};

export interface TSearchCostomerForm {
  industry?: string;
  // 楼栋ID
  buildingId?: number;
  // 客户名
  customerName?: string;
  // 客户类型，客户类型（0:个人 1：企业）
  customerType?: number | string;
  // 楼层ID
  floorId?: number;
  // 证件号码
  idNumber?: string;
  // 手机号
  mobile?: string;
  // 页码
  pageNo?: number;
  // 页长
  pageSize?: number;
  // 园区ID
  parkId?: number | string;
  userId?: null | number | string;
  // 客户名/手机号
  keywords?: string;
  excludeManager?: boolean;
  isInPark?: boolean;
  industries?: string[];
  customerCharacter?: number; // 1,租客 2，业主
}
export interface ICostomer {
  // 楼栋ID
  buildingId?: number;
  // 客户名
  customerName?: string;
  // 客户类型，客户类型（1:个人 2：企业）
  customerType: 1 | 2;
  // 楼层ID
  floorId?: number;
  // 证件号码
  idNumber?: string;
  // 手机号
  mobile?: string;
  // 园区ID
  parkId?: number;
  id: number;
  customerId: number;
  customerTypeName: string | null;
  parkName: string | null;
  roomName: string | null;
  resourceCode: string;
  resourceDetail: string;
  roomNum: null;
  type: null;
}

export interface TGetRoomsBy {
  roomItems: IGetRoomsBy[];
}

export interface IGetRoomsBy {
  roomId: number;
  associationTime: string;
  contractCode: string;
  contractId: string; //合同Id
  parkName: string;
  roomName: string;
  resourceCode: string;
  resourceName: string;
  type: number;
}

/**
 * 在园客户查询
 */
export type TSearchInParkForm = {
  customerStatus: number;
  keywords: string;
  customerType?: number;
  industries: string[];
  taxAreaStart: number | undefined;
  taxAreaEnd: number | undefined;
  parkId: number | undefined;
  buildingId: number | undefined;
  floorId: number | undefined;
  roomId: number | undefined;
  customerCharacter: number | undefined;
  customerName: string;
  mobile: string;
  industry: string;
  idNumber: string;
  resourceName: string;
};

/**
 * 企业银行账号列表
 */
export type TCompanyBankAccount = {
  id: number | undefined;
  bankName: string;
  account: string;
  bankNo: string;
  creatorName: string;
  createTime: string;
  version: number | undefined;
  companyId: number | undefined;
  userId: number | undefined;
  remark?: string;
};

/**
 * 客户详情合同列表
 */
export type TCustomerContract = {
  code: string;
  signTime: string;
  contractAmount: number;
  type: number;
  typeName: string;
  status: number;
  statusName: string;
  signedByName: string;
  companyName: string;
};

/**
 * 客户帐单列表
 */
export type TCustomerBill = {
  code: string;
  createTime: string;
  amount: number;
  amountReceived: number;
  amountReceivable: number;
  receiveStatus: number;
  receiveStatusName: string;
  createdByName: string;
  companyName: string;
};
/**
 * 客户账单查询条件
 */
export type TSearchCustomerBillForm = {
  customerType: number;
  customerUserId: number | undefined;
  customerComId: number | undefined;
  startTime: string;
  endTime: string;
  code: string;
  receiveStatus: number | undefined;
};
/**
 * 查询应退列表查询条件
 */
export type TSearchRefundForm = {
  customerType: number;
  customerUserId: number | undefined;
  customerComId: number | undefined;
  startTime: string;
  endTime: string;
  comId: number | undefined;
  feeItemId: number | undefined;
};
/**
 * 应退列表
 */
export type TRefundList = {
  createTime: string;
  feeItemId: number;
  feeItemName: string;
  amountRefundable: number;
  amountRefunded: number;
  amountBalance: number;
  companyName: string;
};
/**
 * 查询收款列表查询条件
 */
export type TSearchReceiptForm = {
  customerType: number;
  customerUserId: number | undefined;
  customerComId: number | undefined;
  startTime: string;
  endTime: string;
  code: string;
};
/**
 * 收款列表
 */
export type TReceiptList = {
  code: string;
  receivedTime: string;
  amount: number;
  receiveStatusName: string;
  createUserName: string;
  companyName: string;
  id: number; // 收款id(应收id)
};
/**
 * 企业员工详情
 */
export type TCompanyUserDetail = {
  companyId: number;
  name: string;
  sex: number | undefined;
  mobile: string;
  email: string;
  position: string;
  birthDate: string;
  mobile2?: string;
};

export type TCompanyEmployeeDetail = {
  companyId: number;
  name: string;
  sex?: number;
  id?: number;
  mobile: string;
  email: string;
  position: string;
  billReceiver: boolean;
};
/**
 * 企业线索商机信息
 */
export type TCompanyClue = {
  id: number | undefined;
  createTime: string;
  chanceType: string;
  customerName: string;
  customerPhone: string;
  source: string;
  status: number | undefined;
  statusName: string;
};

/**
 * 关联关系详情
 */
export type TCompanyRelation = {
  id?: number;
  srcType: number;
  srcCustomerId: number;
  dstType: number | undefined;
  dstCustomerId: number | undefined;
};
/**
 * 关联关系列表
 */
export type TCompanyRelationList = {
  customerId: number;
  customerName: string;
  customerType: number;
  customerTypeName: string;
  mobile: string;
};
