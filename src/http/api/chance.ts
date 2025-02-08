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
import rjkRequest from "../axios";
import uploadRequest from "../axios/upload";
import { rjkOpenRequest } from "../axios";

// 我的商机列表接口
export function apiChanceSearchMyChanceBusinessList(
  params: IPageParams<IOpportunitySearch>
) {
  return rjkRequest<IPageBody<IOpportunityTable> & any>({
    url: "chance.searchMyChanceBusinessList",
    data: params,
  });
}
// 商机列表
export function apiChanceSearchChanceBusinessList(
  params: IPageParams<IOpportunitySearch>
) {
  return rjkRequest<IPageBody<IOpportunityTable> & any>({
    url: "chance.searchChanceBusinessList",
    data: params,
  });
}

// 团队商机
export function apiChanceSearchChanceBusinessTeam(
  params: IPageParams<IOpportunitySearch>
) {
  return rjkRequest<IPageBody<IOpportunityTable> & any>({
    url: "chance.searchChanceBusinessTeam",
    data: params,
  });
}
