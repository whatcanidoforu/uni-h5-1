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
