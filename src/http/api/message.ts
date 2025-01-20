import rjkRequest from "../axios";

import uploadRequest from "../axios/upload";
import type {} from "@/types/permission";
import type { IMessage, DetailMessage } from "@/types/message";
import type { TSearchNotice } from "@/types/message";

// 消息统计
export function apiCountUserNotice(data: {
  userId: number | string;
  isRead: boolean;
}) {
  return rjkRequest<{ count: number }>({
    url: "user.countUserNotice",
    data: data,
  });
}

// 消息列表
export function apiSearchUserNotice(data: TSearchNotice) {
  return rjkRequest<IPageBody<IMessage>>({
    url: "user.searchUserNotice",
    data: data,
  });
}

// 消息详情
export function apiGetUserNoticeDetail(data: {
  id: number | string;
  userId: number | string;
}) {
  return rjkRequest<DetailMessage>({
    url: "user.getUserNoticeDetail",
    data: data,
  });
}

// 读取消息
export function apiReadUserNotice(data: {
  id?: number | string;
  userId: number | string;
}) {
  return rjkRequest({
    url: "user.readUserNotice",
    data: data,
  });
}

// 清空消息列表
export function apiDeleteUserNoticeByUserId(data: { data: number | string }) {
  return rjkRequest({
    url: "user.deleteUserNoticeByUserId",
    data: data,
  });
}
