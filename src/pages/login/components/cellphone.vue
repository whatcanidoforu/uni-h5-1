<template>
  <view class="login-form">
    <uni-easyinput
      class="login-input"
      :class="{ filled: !!userForm.mobile }"
      v-model="userForm.mobile"
      placeholder="请输入你的手机号"
      type="number"
      :trim="true"
      :clearable="false"
      :inputBorder="false"
      :maxlength="11"
    ></uni-easyinput>
    <uni-easyinput
      class="login-input"
      :class="{ filled: !!userForm.checkCode }"
      type="number"
      v-model="userForm.checkCode"
      placeholder="请输入验证码"
      :trim="true"
      :clearable="false"
      :inputBorder="false"
      :maxlength="6"
    >
      <template #right>
        <text
          class="check-code-btn"
          :class="{ disabled: !canGetCode }"
          @click="getCheckCode"
          >{{ checkCodeText }}</text
        >
      </template>
    </uni-easyinput>
    <view class="button-container">
      <button
        class="login-button"
        @click="mobileLogin"
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
import { apiLogin, apiSendCheckCode } from "@/http/api/login";

// 用户登录表单
const userForm = ref({
  mobile: "",
  checkCode: "",
});
const userLoginLoading = ref(false);

const checkCodeText = ref("获取验证码");
const canGetCode = ref(true);

const getCheckCode = () => {
  if (!canGetCode.value) {
    return false;
  }
  if (!userForm.value.mobile) {
    uni.showToast({
      title: "手机号不能为空",
      icon: "none",
    });
    return false;
  }
  const validatePhone = /^1[0-9]{10}$/.test(userForm.value.mobile);
  if (!validatePhone) {
    uni.showToast({
      title: "请输入正确的手机号",
      icon: "none",
    });
    return false;
  }
  apiSendCheckCode(userForm.value.mobile).then(() => {
    let second = 60;
    checkCodeText.value = `重新发送(${second}S)`;
    canGetCode.value = false;
    let timer = setInterval(() => {
      second--;
      if (!second) {
        clearInterval(timer);
        checkCodeText.value = "重新发送";
        canGetCode.value = true;
      } else {
        checkCodeText.value = `重新发送(${second}S)`;
      }
    }, 1000);
  });
};

const mobileLogin = () => {
  if (!userForm.value.mobile) {
    uni.showToast({
      title: "手机号不能为空",
      icon: "none",
    });
    return false;
  }
  const validatePhone = /^1[0-9]{10}$/.test(userForm.value.mobile);
  if (!validatePhone) {
    uni.showToast({
      title: "请输入正确的手机号",
      icon: "none",
    });
    return false;
  }
  if (!userForm.value.checkCode) {
    uni.showToast({
      title: "验证码不能为空",
      icon: "none",
    });
    return false;
  }
  userLoginLoading.value = true;
  apiLogin({
    mobile: userForm.value.mobile,
    checkCode: userForm.value.checkCode,
  })
    .then((res) => {
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

.check-code-btn {
  color: #009ceb;
  font-size: 16px;
  &.disabled {
    color: #999;
  }
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
