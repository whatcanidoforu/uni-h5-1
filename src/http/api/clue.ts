import rjkRequest from "../axios";

import uploadRequest from "../axios/upload";
import type { TCompanyEmployeeDetail } from "@/types/customer";

import type {
  IThreadSearch,
  IThreadTable,
  IThreadChangeRequest,
  IThreadDetail,
  IOpportunitySearch,
  IOpportunityTable,
  IOpportunityDetail,
  IChanceContact,
  IContactDetail,
  IContactSearch,
  IContactTable,
  IOperationSearch,
  IOperationTable,
} from "@/types/business";
import type { ISalesFunnel } from "@/types/home";
import type { IOrganizationDepartment } from "@/types/organization";
import { rjkOpenRequest } from "../axios";
import type {
  IAgencyListItem,
  ISearchAgencyList,
  IAgencyDetail,
} from "@/types/agency";

// 我的线索
// 我的线索列表接口
export function apiChanceSearchMyChanceClueList(data: IPageParams<any>) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.searchMyChanceClueList",
    data: data,
  });
}

// 团队线索列表接口
export function apiChanceSearchChanceClueTeam(data: IPageParams<any>) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.searchChanceClueTeam",
    data: data,
  });
}

// 线索公海列表接口
export function apiChanceSearchChanceClueList(data: IPageParams<any>) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.searchChanceClueList",
    data: data,
  });
}

// 线索详情
export function apiChanceGetChanceClueDetail(data: { data: number }) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.getChanceClueDetail",
    data: data,
  });
}

// 线索 联系人信息
export function apiChanceGetChanceContactList(data: { data: number }) {
  return rjkRequest<any>({
    url: "chance.getChanceContactList",
    data: data,
  });
}

// 新增线索
export function apiChanceCreateChance(params: IThreadDetail) {
  return rjkRequest<{ data: number }>({
    url: "chance.createChance",
    data: params,
  });
}
// 编辑线索
export function apiChanceUpdateChance(params: IThreadDetail) {
  return rjkRequest({
    url: "chance.updateChance",
    data: params,
  });
}

// 中介列表
export function apiGetAgencyList(params: IPageParams<ISearchAgencyList>) {
  return rjkRequest<IPageBody<IAgencyListItem>>({
    url: "agency.searchAgency",
    data: params,
  });
}

// 上传文件
export function apiUploadFile(file: File, fileName: string) {
  return uploadRequest<IUploadFile>({
    url: "common.uploadFile",
    data: { file, fileName },
  });
}

// 删除线索
export function apiChanceDeleteChance(params: IThreadChangeRequest) {
  return rjkRequest({
    url: "chance.deleteChance",
    data: params,
  });
}
// 释放线索
export function apiChanceUnAssignChance(params: IThreadChangeRequest[]) {
  return rjkRequest({
    url: "chance.unAssignChance",
    data: { assignChances: params },
  });
}

// 新增沟通记录
export function apiCrmCreateChanceContactRecord(params: IContactDetail) {
  return rjkRequest({
    url: "crm.createChanceContactRecord",
    data: params,
  });
}
// 编辑沟通记录
export function apiCrmUpdateChanceContactRecord(params: IContactDetail) {
  return rjkRequest({
    url: "crm.updateChanceContactRecord",
    data: params,
  });
}
