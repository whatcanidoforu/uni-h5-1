<template>
  <view class="login">
    <view class="gateway-btn" @click="setGateway">网关设置</view>
    <uni-popup ref="RefGatewayDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        title="网关设置"
        confirmText="确定"
        cancelText="取消"
        @confirm="gatewayConfirm"
      >
        <template #default>
          <uni-easyinput
            type="textarea"
            v-model="gatewayPath"
            placeholder="请输入"
          ></uni-easyinput>
        </template>
      </uni-popup-dialog>
    </uni-popup>
    <view class="main">
      <image src="../../static/icon_logo.png" class="logo" />
      <view class="title">
        <text>欢迎登录锐嘉科云</text>
      </view>
      <view class="sub-title">{{ subTitle }}</view>
      <AccountForm v-if="loginType == 1" />
      <Cellphone v-if="loginType == 2" />
      <view class="register-container">
        <view>
          <!-- <text v-if="loginType == 1" @click="toRegister"
            >没有账号？点此注册</text
          > -->
        </view>
        <view style="color: #009ceb" @click="changeLoginType">
          {{ toggleLoginText }}登录
        </view>
      </view>
    </view>
    <view class="bottom-text">
      登录即代表已阅读并同意
      <a href="javascript:;">《隐私政策》</a>
      <a href="javascript:;">《用户协议》</a>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AccountForm from "./components/account.vue";
import Cellphone from "./components/cellphone.vue";

const loginType = ref(1);

const subTitle = ref("账号密码直接登录");
const toggleLoginText = ref("验证码");

const gatewayPath = ref(window.globalApi?.business ?? "");
if (!gatewayPath.value) {
  gatewayPath.value = "https://test-api.ruijiakeyun.com:2643/gateway-app";
  window.globalApi = {
    business: gatewayPath.value,
    property: window.globalApi?.property ?? "",
  };
}

const changeLoginType = () => {
  if (loginType.value == 1) {
    loginType.value = 2;
    subTitle.value = "手机验证码直接登录";
    toggleLoginText.value = "账号";
  } else {
    loginType.value = 1;
    subTitle.value = "账号密码直接登录";
    toggleLoginText.value = "验证码";
  }
};

const toRegister = () => {
  uni.navigateTo({
    url: "/pages/login/register",
  });
};

const RefGatewayDialog = ref();
const setGateway = () => {
  RefGatewayDialog.value?.open();
};
const gatewayConfirm = () => {
  window.globalApi = {
    business: gatewayPath.value,
    property: window.globalApi?.property ?? "",
  };
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
  .gateway-btn {
    position: absolute;
    right: 20px;
    top: 40px;
    color: #333;
    font-size: 14px;
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
