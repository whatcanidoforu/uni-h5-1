import type {
  IContractSearch,
  IContractTable,
  IContractDetail,
  IModifyCustomer,
  IModifyDate,
  IDepositAndReceive,
  IReceivableList,
  IModifyTable,
  IModifyDetail,
  ISurrenderSearch,
  ISurrenderTable,
  ISurrenderDetail,
  ISettleDetail,
} from "@/types/contract";
import rjkRequest from "../axios";
import { rjkOpenRequest } from "../axios";

// 合同列表
//   params:  {
//     "pageNo": 1,
//     "pageSize": 20,
//     "keyWords": "",
//     "startDate": "",
//     "endDate": "",
//     "code": "",
//     "statuses": [],
//     "customerUserIds": [],
//     "customerComIds": [],
//     "parkIds": [
//         77
//     ],
//     "buildingIds": [],
//     "floorIds": [],
//     "roomIds": [],
//     "resourceCode": "",
//     "signedBy": [],
//     "type": 100,
//     "labelType": 3,
//     "rentStartTime": "",
//     "rentEndTime": ""
// }
export function apiGetContractList(params: IPageParams<IContractSearch>) {
  return rjkRequest<IPageBody<IContractTable>>({
    url: "contract.searchContractList",
    data: params,
  });
}
