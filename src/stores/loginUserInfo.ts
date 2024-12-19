import { defineStore } from "pinia";
import { ref } from "vue";
import { apiGetUserDetail } from "@/http/api/customer";

export const useLoginUserInfo = defineStore("loginUserInfo", () => {
  const userId = ref(Number(localStorage.getItem("userId"))); // 登录用户id
  const userName = ref(""); // 登录用户姓名
  const userMobile = ref(""); // 登录用户手机号
  const userAvatar = ref(localStorage.getItem("userAvatar") || ""); // 登录用户头像

  const getLoginUserInfo = (reload?: string) => {
    if (reload) {
      userId.value = Number(localStorage.getItem("userId"));
    }
    apiGetUserDetail({ data: userId.value }).then((res: any) => {
      if (Object.prototype.hasOwnProperty.call(res, "name")) {
        userName.value = res.name || "";
        userMobile.value = res.mobile || "";
        userAvatar.value = res.avatar || "";
        localStorage.setItem("userAvatar", userAvatar.value);
      }
    });
  };

  const updateUserInfo = (data: {
    name?: string;
    mobile?: string;
    avatar?: string;
  }) => {
    userName.value = data.name || userName.value || "";
    userMobile.value = data.mobile || userMobile.value || "";
    userAvatar.value = data.avatar || userAvatar.value || "";
    localStorage.setItem("userAvatar", userAvatar.value);
  };

  return {
    userId,
    userName,
    userMobile,
    userAvatar,
    getLoginUserInfo,
    updateUserInfo,
  };
});
