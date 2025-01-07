<template>
  <view class="login">
    <view class="back-arrow" @click="goBack">
      <uni-icons type="left" color="" size="24" />
    </view>
    <view class="main">
      <view class="title">
        <text>修改密码</text>
      </view>
      <view class="sub-title">请输入你的新密码</view>
      <view class="login-form">
        <uni-easyinput
          class="login-input"
          :class="{ filled: !!userForm.oldPassword }"
          type="password"
          v-model="userForm.oldPassword"
          placeholder="请输入原密码"
          :trim="true"
          :clearable="false"
          :inputBorder="false"
        ></uni-easyinput>
        <uni-easyinput
          class="login-input"
          :class="{ filled: !!userForm.newPassword }"
          type="password"
          v-model="userForm.newPassword"
          placeholder="请输入新密码"
          :trim="true"
          :clearable="false"
          :inputBorder="false"
        ></uni-easyinput>
        <uni-easyinput
          class="login-input"
          :class="{ filled: !!userForm.confirmPassword }"
          type="password"
          v-model="userForm.confirmPassword"
          placeholder="请再次输入新密码"
          :trim="true"
          :clearable="false"
          :inputBorder="false"
        ></uni-easyinput>
        <view class="button-container">
          <button
            class="login-button"
            @click="resetPwd"
            :loading="loading"
            :disabled="loading"
          >
            保存
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiChangePassword } from "@/http/api/login";

const userForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const loading = ref(false);

const emit = defineEmits(["success"]);

const resetPwd = () => {
  const oldPassword = userForm.value.oldPassword;
  const newPassword = userForm.value.newPassword;
  const confirmPassword = userForm.value.confirmPassword;
  if (!oldPassword) {
    uni.showToast({
      title: "旧密码不能为空",
      icon: "none",
    });
    return false;
  }
  if (oldPassword.length < 4 || oldPassword.length > 16) {
    uni.showToast({
      title: "旧密码必须位6-16位",
      icon: "none",
    });
    return false;
  }
  if (!newPassword) {
    uni.showToast({
      title: "新密码不能为空",
      icon: "none",
    });
    return false;
  }
  if (newPassword.length < 4 || newPassword.length > 16) {
    uni.showToast({
      title: "新密码必须位6-16位",
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
  if (confirmPassword != newPassword) {
    uni.showToast({
      title: "两次输入密码不一致",
      icon: "none",
    });
    return false;
  }
  loading.value = true;
  apiChangePassword(newPassword, oldPassword)
    .then(() => {
      uni.showToast({
        title: "修改成功",
        icon: "none",
      });
      goBack();
    })
    .finally(() => {
      loading.value = false;
    });
};

const goBack = () => {
  uni.navigateBack({ delta: 1 });
};
</script>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-size: 100% 100%;
  background-image: linear-gradient(#dfeffe, #f4f8fb);
  box-sizing: border-box;
  padding-bottom: 80px;
  .back-arrow {
    position: absolute;
    top: 40px;
    left: 10px;
  }
  .main {
    padding: 30px;
    padding-top: 80px;
  }
  .logo {
    width: 80px;
    height: 80px;
  }
  .title {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 500;
  }
  .sub-title {
    font-size: 14px;
    margin-top: 4px;
    color: #999;
  }
}

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
</style>
