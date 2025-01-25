import rjkRequest from "../axios";
import uploadRequest from "../axios/upload";
import type {
  IParkSearch,
  IPark,
  IParkDetail,
  IBuilding,
  IBuildingDetail,
  IBuildingSearch,
  IHouseSearch,
  IHouse,
  IHouseDetail,
  IFloor,
  SearchGetAllRooms,
  ISearchGetAllRoomsBuilding,
  ISearchGetAllResources,
  IResourceDetail,
  IResourceSearch,
  IFloorDetail,
  IBuildingGroup,
  TSearchLockApply,
  ISearchLockApply,
  IToApplyLock,
  TCreateLockApply,
  IApiGetApplyLock,
  IResourceTreePark,
  IResourceTreeGroupItem,
  IResourceTreeBuildingItem,
  ICustomerList,
} from "@/types/space";
import { useRefresh } from "@/stores/refresh";
import type {
  TSearchCertificate,
  TCertificateCreate,
  ICertificate,
} from "@/types/space";

// 资源锁定申请列表
// params: {
//     "pageNo": 1,
//     "pageSize": 20,
//     "code": "",
//     "lockType": [],
//     "createStartTime": "",
//     "createEndTime": "",
//     "verifyStartTime": "",
//     "verifyEndTime": "",
//     "customerType": "",
//     "customerUserId": "",
//     "customerComId": "",
//     "status": [
//         0
//     ]
// }
export function apiResourceLockSearchLockApply(
  params: IPageParams<TSearchLockApply>
) {
  return rjkRequest<IPageBody<ISearchLockApply>>({
    url: "resource.lock.searchLockApply",
    data: params,
  });
}

// 通过锁定申请编号 查询锁定明细
export function apiGetApplyLock(params: string) {
  return rjkRequest<IApiGetApplyLock>({
    url: "resource.lock.getApplyLock",
    data: { data: params },
  });
}

// 审核资源
export function apiVerifyLockApply(params: {
  applyCode: string | undefined;
  version: number | undefined;
}) {
  return rjkRequest<any>({
    url: "resource.lock.verifyLockApply",
    data: params,
  });
}
// 释放资源
export function apiReleaseLockApply(params: {
  applyCode: string | undefined;
  version: number | undefined;
}) {
  return rjkRequest<any>({
    url: "resource.lock.releaseLockApply",
    data: params,
  });
}
