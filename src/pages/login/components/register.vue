<template>
  <view class="login-form">
    <uni-easyinput
      class="login-input"
      :class="{ filled: !!userForm.loginName }"
      v-model="userForm.loginName"
      placeholder="请输入用户名"
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
    <uni-easyinput
      class="login-input"
      :class="{ filled: !!userForm.confirmPassword }"
      type="password"
      v-model="userForm.confirmPassword"
      placeholder="请再次输入密码"
      :trim="true"
      :clearable="false"
      :inputBorder="false"
    ></uni-easyinput>
    <view class="button-container">
      <button
        class="login-button"
        @click="registerUser"
        :loading="userLoginLoading"
        :disabled="userLoginLoading"
      >
        注册
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiRegister } from "@/http/api/login";

const userForm = ref({
  loginName: "",
  password: "",
  confirmPassword: "",
});
const userLoginLoading = ref(false);

const emit = defineEmits(["success"]);

const registerUser = () => {
  const loginName = userForm.value.loginName;
  const password = userForm.value.password;
  const confirmPassword = userForm.value.confirmPassword;
  if (!loginName) {
    uni.showToast({
      title: "用户名不能为空",
      icon: "none",
    });
    return false;
  }
  if (loginName.length < 4 || loginName.length > 16) {
    uni.showToast({
      title: "用户名必须由4-16位数字/字母/._-@组成",
      icon: "none",
    });
    return false;
  }
  if (!password) {
    uni.showToast({
      title: "密码不能为空",
      icon: "none",
    });
    return false;
  }
  if (password.length < 4 || password.length > 16) {
    uni.showToast({
      title: "密码必须位6-16位",
      icon: "none",
    });
    return false;
  }
  if (!confirmPassword) {
    uni.showToast({
      title: "再次输入密码不能为空",
      icon: "none",
    });
    return false;
  }
  if (confirmPassword != password) {
    uni.showToast({
      title: "两次输入密码不一致",
      icon: "none",
    });
    return false;
  }
  userLoginLoading.value = true;
  apiRegister(userForm.value)
    .then(() => {
      uni.showToast({
        title: "注册成功",
        icon: "none",
      });
      emit("success", loginName);
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
