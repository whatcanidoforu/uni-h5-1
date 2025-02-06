<template>
  <view>
    <view class="company-header">
      <uni-icons
        style="font-weight: bolder"
        type="left"
        size="20"
        @click="goBackHome"
      ></uni-icons>
      <view class="company-tille">寻源拓客</view>
      <view class="placeholder"></view>
    </view>

    <view class="tab-container">
      <view
        class="tab-item"
        :class="{ active: tab == 'merchant' }"
        @click="clickTab('merchant')"
      >
        <text>客商搜索</text>
        <view class="tab-bottom"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: tab == 'map' }"
        @click="clickTab('map')"
      >
        <text>地图搜索</text>
        <view class="tab-bottom"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: tab == 'industry' }"
        @click="clickTab('industry')"
      >
        <text>产业库</text>
        <view class="tab-bottom"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: tab == 'company' }"
        @click="clickTab('company')"
      >
        <text>企业库</text>
        <view class="tab-bottom"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: tab == 'monitor' }"
        @click="clickTab('monitor')"
      >
        <text>企业监控</text>
        <view class="tab-bottom"></view>
      </view>
    </view>
    <view class="search-iframe">
      <iframe
        class="search-iframe__content"
        :src="iframeUrl"
        frameborder="0"
      ></iframe>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  apiGetPluginToken,
  apiMogeGetMoGeAccessToken,
} from "@/http/api/customer";

const iframeUrl = ref("");
const tab = ref("merchant");
let token = "";
let tenant = "";
const init = () => {
  apiGetPluginToken().then((res) => {
    token = res.token || "";
    tenant = res.tenant || "";

    if (token && tenant) {
      if (tab.value == "merchant") {
        iframeUrl.value = `https://b-plugin-m.qixin.com/third-login?tenant=${tenant}&token=${token}&returnUrl=${encodeURIComponent(
          "/advance-search" + "?" + "hideHeader=1"
        )} `;
      }
    }
  });
};
onMounted(() => {
  init();
});

const clickTab = (e: string) => {
  tab.value = e;
  if (tab.value == "merchant") {
    iframeUrl.value = `https://b-plugin-m.qixin.com/third-login?tenant=${tenant}&token=${token}&returnUrl=${encodeURIComponent(
      "/advance-search" + "?" + "hideHeader=1"
    )} `;
  }
  if (tab.value == "map") {
    iframeUrl.value = `https://b-plugin-m.qixin.com/third-login?tenant=${tenant}&token=${token}&returnUrl=${encodeURIComponent(
      "/map-search" + "?" + "hideHeader=1"
    )} `;
  }
  if (tab.value == "industry") {
    iframeUrl.value = `https://b-plugin-m.qixin.com/third-login?tenant=${tenant}&token=${token}&returnUrl=${encodeURIComponent(
      "/enterprise-library/industry" +
        "?" +
        "hideHeader=1" +
        "&" +
        "type=new_industry"
    )} `;
  }
  if (tab.value == "company") {
    const specialSearch = new Object({
      params: {},
      searchType: "specialized_and_new",
    }).toString();
    iframeUrl.value = `https://b-plugin-m.qixin.com/third-login?tenant=${tenant}&token=${token}&returnUrl=${encodeURIComponent(
      "/enterprise-library/list" +
        "?" +
        "hideHeader=1" +
        "&" +
        "type=specialized_and_new"
    )}&specialSearch=${JSON.stringify(specialSearch)} `;
  }
  if (tab.value == "monitor") {
    iframeUrl.value = `https://b-plugin-m.qixin.com/third-login?tenant=${tenant}&token=${token}&returnUrl=${encodeURIComponent(
      "/enterprise-monitor/content" + "?" + "hideHeader=1"
    )} `;
  }
};
const goBackHome = () => {
  uni.switchTab({
    url: "/pages/home/index",
  });
};
</script>

<style lang="scss" scoped>
.company-header {
  align-items: center;
  height: 60px;
  background-color: white;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}
.company-tille {
  font-size: larger;
  color: black;
  font-weight: bold;
}
.company-page {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  scrollbar-width: none;
}

.placeholder {
  width: 20px; //与icon宽度一致
}
.tab-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  .tab-item {
    font-weight: 500;
    .tab-bottom {
      height: 4px;
      border-radius: 5px;
      margin-top: 4px;
    }
    &.active {
      color: #3897c7;
      .tab-bottom {
        background-image: linear-gradient(90deg, #0696ec, #445ff6);
      }
    }
  }
}

.search-iframe {
  overflow: hidden;
  height: 90vh;

  &__content {
    width: 100%;
    height: 100%;
  }
}
</style>
