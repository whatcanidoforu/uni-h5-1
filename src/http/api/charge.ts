import rjkRequest from "../axios";
import { rjkOpenRequest } from "../axios";
import { useRefresh } from "@/stores/refresh";
import uploadRequest from "../axios/upload";
import type {
  TSearchReceiveForm,
  IReceiveDetail,
  TSearchBill,
  IBill,
  TBillDetail,
  TAdjustForAdd,
  TCreateReceivableAdjust,
  TSearchReceivableAdjust,
  IReceivableAdjust,
  IDetailReceivableAdjust,
  TSendWriteOffReceivable,
  TSearchReceived,
  IReceived,
  IGetReceivedDetail,
  TCashierEntry,
  TUpdateReceived,
  TSearchRefundable,
  ISearchRefundable,
  TSearchReceivableDeposit,
  ISearchReceivableDeposit,
  TGetRefundable,
  IRefundableOffInfo,
  IReceivableOffInfo,
  TCreateRefundedApply,
  TCreateReceivableRefund,
  TUpdateRefunded,
  TUpdateReceivableRefunded,
  TCreateRefundableAdjust,
  TGetRefundedDetail,
  ISearchRefundableAdjust,
  TSearchRefundableAdjust,
  TGetRefundableAdjust,
  TSearchRefunded,
  ISearchRefunded,
  TCreateRefundableAdjustForAdd,
  IGetPersonalBillInfo,
  IAdvanceReceiptSearch,
  IAdvanceReceiptTable,
  IParkCashierList,
  TCreateCashierReceived,
  IGetDepositRefundListParams,
  TBillReceiveSearchCanReceivedReceivable,
  TCreateReceived,
} from "@/types/charge";
// 查询应收列表
export function apiSearchReceivable(data: IPageParams<TSearchReceiveForm>) {
  return rjkRequest<IPageBody<IReceiveDetail>>({
    url: "bill.receive.searchReceivable",
    data: data,
  });
}

// 查询应收列表：按客户主体分组 bill.receive.searchReceivableGroupByCustomer
export function apiSearchReceivableGroupByCustomer(
  data: IPageParams<TSearchReceiveForm>
) {
  return rjkRequest<IPageBody<any>>({
    url: "bill.receive.searchReceivableGroupByCustomer",
    data: data,
  }).then((res) => {
    res.data?.forEach((row: any, index) => {
      row.selected = false;
      row.selectedAll = false;
      row.key = index;
      row.items?.forEach((item: any) => {
        item.selected = false;
      });
    });
    return res;
  });
}

// 查询应收明细
export function apiGetReceivable(data: {
  id: string | number | null;
  code: string | number | null;
}): Promise<IReceiveDetail> {
  return rjkRequest({
    url: "bill.receive.getReceivable",
    data: data,
  });
}

// 查询应收详情下收款列表
export function apiGetReceivableOffInfo(data: {
  receivableId: number | string;
}): Promise<IPageBody<IReceivableOffInfo>> {
  return rjkRequest({
    url: "bill.receive.getReceivableOffInfo",
    data: data,
  });
}
// 查询账单列表
export function apiSearchBill(
  data: IPageParams<TSearchBill> & { keyWords: string | undefined }
) {
  return rjkRequest<
    IPageBody<IBill> & {
      totalCount: number | 0;
      unReceivedCount: number | 0;
      partReceivedCount: number | 0;
      receivedCount: number | 0;
    }
  >({
    url: "bill.searchBill",
    data: data,
  });
}
// 查询账单明细
export function apiGetBill(data: {
  id: number | string | undefined;
  code: number | string | undefined;
}): Promise<TBillDetail> {
  return rjkRequest({
    url: "bill.getBill",
    data: data,
  });
}
