import { defineStore } from "pinia";
import { ref } from "vue";
import type { IMessage } from "@/types/message";
import { apiCountUserNotice, apiSearchUserNotice } from "@/http/api/message";

export const useMessageInfo = defineStore("messageInfo", () => {
  // 消息统计
  const messageCount = ref(0);
  const apiCountUserNoticeFun = () => {
    const _sessionId = uni.getStorageSync("sessionId");
    const _userId = uni.getStorageSync("userId");
    const _oid = uni.getStorageSync("oid");
    if (!_sessionId || !_userId || !_oid) return;
    apiCountUserNotice({ userId: _userId, isRead: false }).then((res) => {
      messageCount.value = res.count;
    });
  };
  apiCountUserNoticeFun();

  // 消息列表
  const messageList = ref<IMessage[]>();
  const apiSearchUserNoticeFun = () => {
    const _sessionId = uni.getStorageSync("sessionId");
    const _userId = uni.getStorageSync("userId");
    const _oid = uni.getStorageSync("oid");
    if (!_sessionId || !_userId || !_oid) return;
    apiSearchUserNotice({
      pageNo: 1,
      pageSize: 99999,
      userId: _userId,
      isRead: false,
    }).then((res) => {
      messageList.value = res.data;
    });
  };
  apiSearchUserNoticeFun();

  let timer: any;
  const setTimer = () => {
    clearInterval(timer);
    timer = null;
    apiSearchUserNoticeFun();
    apiCountUserNoticeFun();
    timer = setInterval(() => {
      apiSearchUserNoticeFun();
      apiCountUserNoticeFun();
    }, 30000);
  };

  const clearTimer = () => {
    clearInterval(timer);
  };

  return {
    messageList,
    messageCount,
    apiSearchUserNoticeFun,
    apiCountUserNoticeFun,
    clearTimer,
    setTimer,
  };
});
