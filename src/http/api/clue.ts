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

// 我的线索
// 我的线索列表接口
export function apiChanceSearchMyChanceClueList(
  data: IPageParams<IThreadSearch>
) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.searchMyChanceClueList",
    data: data,
  });
}

// 团队线索列表接口
export function apiChanceSearchChanceClueTeam(
  data: IPageParams<IThreadSearch>
) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.searchChanceClueTeam",
    data: data,
  });
}

// 线索公海列表接口
export function apiChanceSearchChanceClueList(
  data: IPageParams<IThreadSearch>
) {
  return rjkRequest<IPageBody<IThreadTable> & any>({
    url: "chance.searchChanceClueList",
    data: data,
  });
}
