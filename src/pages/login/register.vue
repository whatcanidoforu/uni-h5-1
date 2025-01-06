<template>
  <view class="login">
    <view class="back-arrow" @click="toLogin">
      <uni-icons type="left" color="" size="24" />
    </view>
    <view class="main">
      <image src="../../static/icon_logo.png" class="logo" />
      <view class="title">
        <text>新用户注册</text>
      </view>
      <view class="sub-title">请输入账号信息</view>
      <Register @success="toLogin" />
      <view class="register-container">
        <view></view>
        <view style="color: #009ceb" @click="toLogin">已有账号？点击登录</view>
      </view>
    </view>
    <view class="bottom-text">
      注册即代表已阅读并同意
      <a href="javascript:;">《用户协议》</a>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Register from "./components/register.vue";

const loginType = ref(1);

const gatewayPath = ref(window.globalApi?.business ?? "");
if (!gatewayPath.value) {
  gatewayPath.value = "https://test-api.ruijiakeyun.com:2643/gateway-app";
  window.globalApi = {
    business: gatewayPath.value,
    property: window.globalApi?.property ?? "",
  };
}

const toLogin = () => {
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
  .register-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 14px;
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
}
</style>
