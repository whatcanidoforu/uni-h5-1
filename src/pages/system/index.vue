<template>
  <view class="page-system">
    <view class="content-card">
      <view class="content-item" @click="openParkUnit">
        <text>所选园区</text>
        <view>
          {{ parks[currentParkIndex]?.name ?? "暂无园区" }}
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
      <view class="content-item" @click="openSystemUnit">
        <text>切换应用</text>
        <view>
          {{ systems[currentSystemIndex]?.name ?? "" }}
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
      <view class="content-item" @click="updateVersion">
        <text>版本更新</text>
        <view>
          1.0.77
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
      <view class="content-item" @click="toVersionRecordsPage">
        <text>功能内容</text>
        <view>
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
      <view class="content-item" @click="">
        <text>隐私政策</text>
        <view>
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
      <view class="content-item" @click="">
        <text>用户协议</text>
        <view>
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
      <view class="content-item" @click="deleteAccount">
        <text>注销账号</text>
        <view>
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons>
        </view>
      </view>
    </view>
    <view
      class="content-card"
      style="text-align: center; padding: 20px"
      @click="signOut"
    >
      退出登录
    </view>

    <uni-popup ref="parkPopup" type="bottom">
      <view class="popup-content">
        <view class="popup-title">
          <view></view>
          <view style="font-size: larger">选择园区</view>
          <view style="text-align: right" @click="confirmPark">确定</view>
        </view>
        <picker-view :value="[0]" @change="parkChange" class="pick-park">
          <picker-view-column>
            <view
              style="text-align: center"
              v-for="item in parks"
              :key="item.id"
              >{{ item.name }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
    <uni-popup ref="systemPopup" type="bottom">
      <view class="popup-content">
        <view class="popup-title">
          <view></view>
          <view style="font-size: larger">切换应用</view>
          <view style="text-align: right" @click="confirmSystem">确定</view>
        </view>
        <picker-view :value="[0]" @change="systemChange" class="pick-park">
          <picker-view-column>
            <view
              style="text-align: center"
              v-for="item in systems"
              :key="item.id"
              >{{ item.name }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { apiGetUserAuthInfo } from "@/http/api/login";
import { useHeaderPark } from "@/stores/park";
import type { IPark } from "@/types/permission";

const headerParkStore = useHeaderPark();
const parks = ref<IPark[]>([]);

onBeforeMount(async () => {
  const userId = localStorage.getItem("userId") || "";

  const storagedParkId =
    Number(localStorage.getItem(`parkId_zhaoshang_${userId}`)) || undefined;
  const storagedParkIdWuye =
    String(localStorage.getItem(`parkId_wuye_${userId}`)) || "";
  try {
    const res = await apiGetUserAuthInfo(userId);
    parks.value = res.parks;
    headerParkStore.setParks(parks.value);
  } catch (e) {
    parks.value = [];
  }
  if (parks.value.length) {
    if (parks.value.some((item) => item.id == storagedParkId)) {
      headerParkStore.selectedId = storagedParkId;
    } else {
      headerParkStore.setParkId(parks.value[0].id);
    }

    if (parks.value.some((item) => item.wyParkId == storagedParkIdWuye)) {
      headerParkStore.selectedIdWuye = storagedParkIdWuye;
    } else {
      headerParkStore.setParkIdWuye(parks.value[0].wyParkId);
    }
  } else {
    headerParkStore.selectedId = undefined;
    headerParkStore.selectedIdWuye = "";
  }
});
const systems = ref([
  {
    id: 11,
    name: "招商系统",
  },
  {
    id: 22,
    name: "物业系统",
  },
]);

//园区
const parkPopup = ref();
const currentParkIndex = ref(0);
const tempParkIndex = ref(0);
const openParkUnit = () => {
  parkPopup.value.open();
  tempParkIndex.value = 0;
};

const parkChange = (e: any) => {
  console.log(e.detail.value);
  tempParkIndex.value = e.detail.value;
};
const confirmPark = () => {
  currentParkIndex.value = tempParkIndex.value;
  parkPopup.value.close();
  //设置当前园区的id到headerParkStore中
  headerParkStore.setParkId(currentParkIndex.value);
};
//系统
const systemPopup = ref();
const currentSystemIndex = ref(0);
const tempSystemIndex = ref(0);

const openSystemUnit = () => {
  systemPopup.value.open();
  tempSystemIndex.value = 0;
};

const systemChange = (e: any) => {
  console.log(e.detail.value);
  tempSystemIndex.value = e.detail.value;
};
const confirmSystem = () => {
  currentSystemIndex.value = tempSystemIndex.value;
  systemPopup.value.close();
  //跳转到物业系统的首页
};

const updateVersion = () => {
  uni.showModal({
    title: "提示",
    content: "是否更新版本",
    success: (res) => {
      if (res.confirm) {
        //掉用更新接口，判断是否为最新版本
        console.log("点击了确定");
        if (true) {
          uni.showToast({
            title: "已经是最新版本",
            icon: "none",
          });
        }
      }
    },
  });
};

const deleteAccount = () => {
  uni.showModal({
    title: "温馨提示",
    content: "您即将注销您的账户。注销后，您的所有个人信息将被删除，且无法恢复",
    confirmText: "注销",
    cancelText: "返回",
    confirmColor: "#FF4500",
    success: (res) => {
      if (res.confirm) {
        //掉用注销接口
        console.log("点击了注销");
      }
    },
  });
};
const toVersionRecordsPage = () => {
  uni.navigateTo({
    url: "/pages/system/versionRecords/index",
  });
};
const signOut = () => {
  console.log("退出登录");
};
</script>

<style lang="scss" scoped>
.page-system {
  background-color: #f5f5f5;
  height: 100%;
  overflow: hidden;
  padding: 0px 10px;
}

.content-card {
  box-sizing: border-box;
  padding: 10rpx 30px 10rpx 30rpx;
  width: 99%;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 7rpx 3rpx rgba(230, 230, 230, 1);
  border-radius: 17rpx;
  margin: 40rpx auto;
  .content-item {
    display: flex;
    padding: 30rpx 0;
    font-size: 14px;
    justify-content: space-between;

    border-bottom: 1px solid #ccc;
  }

  .content-item:last-child {
    border-bottom: none;
  }
}

.popup-content {
  height: 230px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 16px 16px 0 0;

  .popup-title {
    height: 10%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 30rpx 30rpx;
    display: flex;
    view {
      flex: 1;
    }
  }
}

.pick-park {
  flex: 1; // 使 picker-view 占据剩余空间
}
</style>
