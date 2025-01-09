<template>
  <view class="login-form">
    <uni-easyinput
      class="login-input"
      :class="{ filled: !!userForm.loginName }"
      v-model="userForm.loginName"
      placeholder="请输入你的用户名"
      :trim="true"
      :clearable="false"
      :inputBorder="false"
    ></uni-easyinput>
    <uni-easyinput
      class="login-input"
      :class="{ filled: !!userForm.password }"
      type="password"
      v-model="userForm.password"
      placeholder="请输入密码"
      :trim="true"
      :clearable="false"
      :inputBorder="false"
    ></uni-easyinput>
    <view class="checkbox-container">
      <view style="display: flex; align-items: center">
        <checkbox-group @change="rememberChange">
          <checkbox
            style="transform: scale(0.7)"
            value="1"
            color="#009ceb"
          ></checkbox>
        </checkbox-group>
        <text>记住用户名</text>
      </view>
      <text @click="forget">忘记密码？</text>
    </view>
    <view class="button-container">
      <button
        class="login-button"
        @click="userNameLogin"
        :loading="userLoginLoading"
        :disabled="userLoginLoading"
      >
        登录
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiLoginByLoginName } from "@/http/api/login";

const props = defineProps({
  registerName: {
    type: String,
    default: "",
  },
});

// 账号密码登录
const remember = ref(localStorage.getItem("loginName") ? true : false);

const rememberChange = (e: any) => {
  const length = e?.detail?.value?.length ?? 0;
  remember.value = !!length;
};

// 用户登录表单
const userForm = ref({
  loginName: props.registerName || localStorage.getItem("loginName") || "",
  password: "",
});
const userLoginLoading = ref(false);

const forget = () => {
  uni.showToast({
    title: "请联系管理员重置密码",
    icon: "none",
  });
};

const userNameLogin = () => {
  if (!userForm.value.loginName) {
    uni.showToast({
      title: "用户名不能为空",
      icon: "none",
    });
    return false;
  }
  if (!userForm.value.password) {
    uni.showToast({
      title: "密码不能为空",
      icon: "none",
    });
    return false;
  }
  userLoginLoading.value = true;
  apiLoginByLoginName({
    loginName: userForm.value.loginName,
    password: userForm.value.password,
  })
    .then((res) => {
      if (remember.value) {
        localStorage.setItem("loginName", userForm.value.loginName);
      } else {
        localStorage.removeItem("loginName");
      }
      localStorage.setItem("sessionId", res.sessionId);
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("oldToken", res.oldToken);
      localStorage.setItem("oldEmpId", res.oldEmpId);
      uni.switchTab({
        url: "/pages/home/index",
      });
    })
    .finally(() => {
      userLoginLoading.value = false;
    });
};
</script>

<style scoped lang="scss">
.login-form {
  margin-top: 60px;
}
.login-input {
  height: 40px;
  border-bottom: 1px solid #ddd;
}
.login-input {
  border-bottom: 1px solid #ddd;
  &.filled {
    border-color: #333;
  }
  :deep(.uni-easyinput__content) {
    background-color: transparent !important;
    .uni-easyinput__content-input {
      height: 40px;
      padding: 0 !important;
      font-size: 16px;
    }
    .uni-easyinput__placeholder-class {
      font-size: 16px;
    }
  }
  & + .login-input {
    margin-top: 40px;
  }
}
.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.button-container {
  margin-top: 40px;
}
.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: #ffffff;
  background: #009ceb;
  border-radius: 2px;
}
.bottom-text {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 38px;
  left: 50%;
  color: #666;
  font-size: 12px;
  line-height: 22px;
  transform: translateX(-50%);
  a {
    text-decoration: none;
    color: #009ceb;
  }
}
</style>
