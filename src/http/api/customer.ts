import rjkRequest from "../axios";
// import { rjkRequestOuter } from '../axios'

import uploadRequest from "../axios/upload";
import type {
  ICostomer,
  TSearchCostomerForm,
  TSearchCompanyForm,
  ICompany,
  IUser,
  TSearchUserForm,
  TCompanyForm,
  TUserForm,
  TGetRoomsBy,
  TSearchInParkForm,
  TCompanyBankAccount,
  TCustomerContract,
  TCustomerBill,
  TSearchCustomerBillForm,
  TSearchRefundForm,
  TRefundList,
  TSearchReceiptForm,
  TReceiptList,
  TCompanyUserDetail,
  TCompanyClue,
  TCompanyRelation,
  TCompanyRelationList,
  TCompanyEmployeeDetail,
} from "@/types/customer";

// apiFun
export function apiFun(url: string, data: any) {
  return rjkRequest({
    url,
    data,
  });
}

// 用户查询分页列表
export function apiSearchUserByKeyword(data: TSearchCostomerForm) {
  return rjkRequest<IPageBody<ICostomer>>({
    url: "user.searchUserByKeyword",
    data: data,
  });
}

// 客户(仅仅客户，不包含用户)
export function apiSearchCompanyByKeyword(data: TSearchCostomerForm) {
  return rjkRequest<IPageBody<ICostomer>>({
    url: "company.searchCompanyByKeyword",
    data: data,
  });
}

// 客户查询分页列表
export function apiSearchUserAndComany(data: TSearchCostomerForm) {
  return rjkRequest<IPageBody<ICostomer>>({
    url: "user.searchUserAndCompany",
    data: data,
  });
}
// 客户管理在园客户列表
export function apiSearchInParkUserAndComany(
  data: IPageParams<TSearchInParkForm>
) {
  return rjkRequest<IPageBody<ICostomer>>({
    url: "user.searchUserAndCompanyInPark",
    data: data,
  });
}
// 企业客户分页列表
export function apiSearchCompany(data: TSearchCompanyForm) {
  return rjkRequest<IPageBody<ICompany>>({
    url: "company.searchCompany",
    data: data,
  });
}
// 个人客户分页列表
export function apiSearchUser(data: TSearchUserForm) {
  return rjkRequest<IPageBody<IUser>>({
    url: "user.searchUser",
    data: data,
  });
}

// 个人客户分页列表
export function apiAuthSearchUser(data: TSearchUserForm) {
  return rjkRequest<IPageBody<IUser>>({
    url: "auth.searchUser",
    data: data,
  });
}

// 企业-添加企业客户
export function apiCreateCompany(data: TCompanyForm) {
  return rjkRequest<number>({
    url: "company.createCompany",
    data: data,
  });
}
// 企业-修改企业客户
export function apiUpdateCompany(data: TCompanyForm) {
  return rjkRequest({
    url: "company.updateCompany",
    data: data,
  });
}
// 企业-企业客户详情
export function apiGetCompanyDetail(data: { data: number | string }) {
  return rjkRequest<TCompanyForm>({
    url: "company.getCompanyDetail",
    data: data,
  });
}

// 股东信息
export function apiEnterpriseGetEntPartners(
  keyword: string = "", // 企业全名/注册号/统一社会信用代码
  skip: number = 0 // 跳过条目数（默认为0，单页返回20条数据）
) {
  return rjkRequest<{
    items: {
      totalRealCapi: string; // 总实缴
      isHistory: number; // 历史股东
      stockType: string; // 股东类型
      name: string; // 股东姓名
      pid: string; // 人员id（股东为自然人显示pid）
      totalShouldCapi: string; // 总认缴
      eid: string; // 企业id（股东为企业显示eid）
      identifyType: string; // 类型
      identifyNo: string; // 股东ID
    }[];
  }>({
    url: "company.qixin.gateway",
    data: {
      path: "enterprise/getEntPartners",
      params: { keyword, skip },
    },
  });
}
// 知识产权
export function apiKnowledgeGetKnowledgePropertyPledgeByName(
  name: string = "", // 企业全名/统一社会信用代码
  skip: number = 0 // 分页参数
) {
  return rjkRequest<{
    items: {
      pawnee: string; // 质权人名称
      period: string; // 质权登记期限
      pawnee_type: string; // 质权人类型（质权人为公司）：0 企业，4社团，5律所，6香港公司
      pledgor_eid: string; // 出质企业id（出质人为公司）
      status: string; // 状态
      public_date: string; // 公示日期
      name: string; // 知识产权名称
      eid: string; // 企业id
      pledgor_type: string; // 出质人类型：0 企业，4社团，5律所，6香港公司
      pledgor: string; // 出质人名称
      pawnee_eid: string; // 质权企业id
      number: string; // 注册号
      type: string; // 种类
    }[];
  }>({
    url: "company.qixin.gateway",
    data: {
      path: "knowledge/getKnowledgePropertyPledgeByName",
      params: { name, skip },
    },
  });
}
// 工商风险
export function apiEnterpriseGetEnterpriseCountInfo(
  name: string = "" // 企业全名/注册号/统一社会信用代码
) {
  return rjkRequest<{
    data: {
      xzcf_count: number; // 行政处罚数量
      dcdy_count: number; // 动产抵押数量
      gsgd_count: number; // 工商股东数量
      total_count: number; // 所有信息数量
      ccjc_count: number; // 抽查检查数量
      xzxk_count: number; // 行政许可数量
      sswf_count: number; // 重大税收违法数量
      sfxz_count: number; // 司法协助数量
      zqxx_count: number; // 债券基础信息数量
      zpxx_count: number; // 招聘信息数量
      gqdj_count: number; // 股权冻结数量
      zyry_count: number; // 主要人员数量
      hbcf_count: number; // 环保处罚列表数量
      bgjl_count: number; // 变更记录数量
      dwtz_count: number; // 对外投资数量（最优股比）
      fzch_count: number; // 非正常户数量
      qsxx_count: number; // 欠税信息数量
      jyyc_count: number; // 经营异常数量
      yzwf_count: number; // 严重违法数量
      fzjg_count: number; // 分支机构数量
      gczz_count: number; // 工程资质资格数量
      gxqy_count: number; // 高新技术企业资质数量
      gqcz_count: number; // 股权出质数量
      ztb_count: number; // 招投标列表数量
    }[];
  }>({
    url: "company.qixin.gateway",
    data: {
      path: "enterprise/getEnterpriseCountInfo",
      params: { name },
    },
  });
}

// 个人-添加个人客户
export function apiCreateUser(data: TUserForm) {
  return rjkRequest<number>({
    url: "user.createUser",
    data: data,
  });
}
// 个人-修改个人用户
export function apiUpdateUser(data: TUserForm) {
  return rjkRequest({
    url: "user.updateUser",
    data: data,
  });
}
// 个人-个人客户详情
export function apiGetUserDetail(data: { data: number | string }) {
  return rjkRequest<TUserForm>({
    url: "user.getUserDetail",
    data: data,
  });
}

// 个人客户关联房产
export function apiGetRoomsByUserId(data: {
  id: number | string;
  parkIds: (number | string)[];
}) {
  return rjkRequest<TGetRoomsBy>({
    url: "user.getResourceByUserId",
    data: data,
  });
}

// 个人客户关联房产
export function apiGetRoomsByCompanyId(data: {
  id: number;
  parkIds: (number | string)[];
}) {
  return rjkRequest<TGetRoomsBy>({
    url: "company.getResourceByCompanyId",
    data: data,
  });
}

// 修改个人手机号
export function apiModifyCustomerMobile(data: {
  id: number;
  mobile: string;
  checkCode: string;
  version: number;
}) {
  return rjkRequest({
    url: "user.updatePersonalMobile",
    data: data,
  });
}

// 修改用户信息
export function apiModifyUserInfo(data: {
  id: number;
  name: string;
  email: string;
  avatar: string;
  version: number;
}) {
  return rjkRequest({
    url: "user.updatePersonalInfo",
    data: data,
  });
}

// 园区和权限码搜索人员列表的接口 - cj
export function apiSearchParkAuthUser(data: {
  parkId: number | undefined;
  authCode: string;
}) {
  return rjkRequest({
    url: "auth.searchParkAuthUser",
    data: data,
  });
}

// post 企信慧眼api转发
// path参数传递企信平台接口url的相对路径部分，比如调用https://api.qixin.com/APIService/v2/search/advSearch 这个接口，就传递/v2/search/advSearch即可。
export function apiPostQXHY(data: { path: string; params: any }) {
  return rjkRequest({
    url: "company.qixin.gateway",
    data: data,
  }).then((res: any) => {
    function parseResponse(data: any) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (Object.prototype.toString.call(data[key]) == "[object String]") {
            data[key] = data[key].trim();
            if (data[key] == "_" || data[key] == "-") {
              data[key] = "";
            }
          }
          if (Object.prototype.toString.call(data[key]) == "[object Object]") {
            parseResponse(data[key]);
          }
        }
      }
    }
    parseResponse(res);
    return res;
  });
}

// 根据企业名称查询企业信息
export function apiGetCompanyByName(name: string) {
  return rjkRequest<TCompanyForm>({
    url: "company.getCompanyByName",
    data: { name },
  });
}

// 企业-获取企业银行账号列表
export function apiGetCompanyBankList(companyId: number) {
  return rjkRequest<TCompanyBankAccount[]>({
    url: "company.getCompanyBankList",
    data: { companyId },
  });
}
// 个人-获取个人银行账号列表
export function apiGetUserBankList(userId: number) {
  return rjkRequest<TCompanyBankAccount[]>({
    url: "user.getUserBankList",
    data: { userId },
  });
}
// 个人-添加个人银行账号
export function apiAddUserBank(data: TCompanyBankAccount) {
  return rjkRequest({
    url: "user.createUserBank",
    data,
  });
}
// 企业-添加企业银行账号
export function apiAddCompanyBank(data: TCompanyBankAccount) {
  return rjkRequest({
    url: "company.createCompanyBank",
    data,
  });
}
// 企业-编辑企业银行账号
export function apiEditCompanyBank(data: TCompanyBankAccount) {
  return rjkRequest({
    url: "company.updateCompanyBank",
    data,
  });
}
// 个人-编辑个人银行账号
export function apiEditUserBank(data: TCompanyBankAccount) {
  return rjkRequest({
    url: "user.updateUserBank",
    data,
  });
}
// 企业-删除企业银行账号
export function apiDeleteCompanyBank(id: number) {
  return rjkRequest({
    url: "company.deleteCompanyBank",
    data: { id },
  });
}
// 个人-删除个人银行账号
export function apiDeleteUserBank(id: number) {
  return rjkRequest({
    url: "user.deleteUserBank",
    data: { id },
  });
}
// 客户详情合同列表
export function apiGetContractListByCustomerId(
  customerType: number,
  customerUserId: number | undefined,
  customerComId: number | undefined
) {
  return rjkRequest<{ contractList: TCustomerContract[] }>({
    url: "contract.searchContractByCustomer",
    data: {
      customerType,
      customerUserId,
      customerComId,
    },
  });
}
// 客户帐单列表
export function apiGetBillListByCustomerId(data: TSearchCustomerBillForm) {
  return rjkRequest<{
    billList: TCustomerBill[];
    totalCount: number;
    receivableCount: number;
    partReceivedCount: number;
    receivedCount: number;
  }>({
    url: "bill.searchBillByCustomer",
    data,
  });
}
// 企业详情日志
export function apiGetCompanyLogList(
  data: IPageParams<{
    id: number;
    startTime: string;
    endTime: string;
    types: number[];
  }>
) {
  return rjkRequest<IPageBody<TCustomerBill>>({
    url: "company.searchCompanyLog",
    data,
  });
}
// 个人详情日志
export function apiGetUserLogList(
  data: IPageParams<{
    id: number;
    startTime: string;
    endTime: string;
    types: number[];
  }>
) {
  return rjkRequest<IPageBody<TCustomerBill>>({
    url: "user.searchUserLog",
    data,
  });
}
// 查询应退列表
export function apiGetRefundList(data: IPageParams<TSearchRefundForm>) {
  return rjkRequest<IPageBody<TRefundList>>({
    url: "bill.refund.searchRefundable",
    data,
  });
}
// 查询收款列表
export function apiGetReceiveList(data: IPageParams<TSearchReceiptForm>) {
  return rjkRequest<IPageBody<TReceiptList>>({
    url: "bill.receive.searchReceived",
    data,
  });
}
// 获取企业员工列表
export function apiGetCompanyUserList(
  data: IPageParams<{
    companyId: number;
    keywords: string;
    positionName: string;
  }>
) {
  return rjkRequest<IPageBody<IUser>>({
    url: "company.searchCompanyUsers",
    data,
  });
}

// 添加企业员工
export function apiAddCompanyUser(data: TCompanyUserDetail) {
  return rjkRequest({
    url: "company.createCompanyUser",
    data,
  });
}

// 获取企业的雇员列表
export function apiGetCompanyEmployeeList(
  data: IPageParams<{ companyId: number; keywords: string }>
) {
  return rjkRequest<IPageBody<IUser>>({
    url: "company.employee.searchEmployee",
    data,
  });
}

// 新增企业的雇员
export function apiAddCompanyEmployee(data: TCompanyEmployeeDetail) {
  return rjkRequest({
    url: "company.employee.createEmployee",
    data,
  });
}

// 编辑企业的雇员
export function apiEditCompanyEmployee(data: TCompanyEmployeeDetail) {
  return rjkRequest({
    url: "company.employee.updateEmployee",
    data,
  });
}

// 删除企业的雇员
export function apiDeleteCompanyEmployee(id: number) {
  return rjkRequest({
    url: "company.employee.deleteEmployee",
    data: { id },
  });
}

// 获取企业线索商机信息
export function apiGetCompanyClueInfo(companyId: number) {
  return rjkRequest<TCompanyClue[]>({
    url: "chance.getChanceInfoByCompanyId",
    data: { companyId },
  });
}
// 获取个人线索商机信息
export function apiGetUserClueInfo(userId: number) {
  return rjkRequest<TCompanyClue[]>({
    url: "chance.getChanceInfoByUserId",
    data: { userId },
  });
}

// 查询关联关系
export function apiGetRelationList(customerId: number, customerType: number) {
  return rjkRequest<TCompanyRelationList[]>({
    url: "company.getCompanyRelation",
    data: { customerId, customerType },
  });
}
// 创建关联关系
export function apiCreateRelation(data: TCompanyRelation) {
  return rjkRequest({
    url: "company.createCompanyRelation",
    data,
  });
}
// 删除关联关系
export function apiDeleteRelation(customerId: number, customerType: number) {
  return rjkRequest({
    url: "company.deleteCompanyRelation",
    data: { customerId, customerType },
  });
}

// 个人设置登录名
export function apiSetLoginName(data: {
  id: number;
  loginName: string;
  version: number;
}) {
  return rjkRequest({
    url: "user.updatePersonalLoginName",
    data,
  });
}

// 获取关联公司列表
export function apiGetRelationCompanyList(parkId: number) {
  return rjkRequest<TCompanyForm[]>({
    url: "park.getRelatedCompany",
    data: { park_id: parkId },
  });
}

// 企信慧眼插件获取token company.qixin.getPluginToken
export function apiGetPluginToken() {
  return rjkRequest<{
    token: string;
    tenant: string;
  }>({
    url: "company.qixin.getPluginToken",
  });
}

// 魔鸽获取token company.qixin.getPluginToken
export function apiMogeGetMoGeAccessToken() {
  return rjkRequest<{
    token: string;
    tenant: string;
  }>({
    url: "moge.getMoGeAccessToken",
  });
}

// 批量导入客户 company.importCompany
export function apiImportCompany(file: File) {
  return uploadRequest({
    url: "company.importCompany",
    data: { file },
  });
}

// 删除客户(在园/离园)
export function apiCompanyDeleteCompanyById(params: {
  customerType?: number;
  customerComId?: number;
}) {
  return rjkRequest<{
    data?: any[];
    unit: "0" | "1";
  }>({
    url: "company.deleteCompanyById",
    data: params,
  });
}

// 导出在园客户 company.exportCompanyInPark
export function apiExportCompanyInPark(params: IPageParams<TSearchInParkForm>) {
  return rjkRequest<IUploadFile>({
    url: "company.exportCompanyInPark",
    method: "POST",
    data: params,
  });
}

// 导出离园客户 company.exportCompanyLeavePark
export function apiExportCompanyLeavePark(params: TSearchCostomerForm) {
  return rjkRequest<IUploadFile>({
    url: "company.exportCompanyLeavePark",
    method: "POST",
    data: params,
  });
}
