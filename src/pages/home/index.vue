<template>
  <view class="home-page">
    <picker
      @change="parkChange"
      :value="currentParkIndex"
      :range="parks"
      range-key="name"
    >
      <view class="park-name">
        <text style="margin-right: 4px">{{ parkName }}</text>
        <uni-icons type="arrowdown" size="16" color="#fff"></uni-icons>
      </view>
    </picker>
    <view class="home-main">
      <view class="page-part">
        <view class="top-search">
          <uni-search-bar
            class="top-search-bar"
            radius="30"
            placeholder="搜索客户、商机、线索"
            bgColor="#EAF7FD"
            clearButton="auto"
            cancelButton="none"
            @confirm="search"
          />
        </view>
        <top-overview :park-id="parkId"></top-overview>
      </view>
      <view class="page-part">
        <app-list />
      </view>
      <view class="page-part">
        <todo-list />
      </view>
      <view class="page-part">
        <clue-funnel />
      </view>
      <view class="page-part">
        <rate-part />
      </view>
      <view class="page-part">
        <rent-line-char />
      </view>
      <view class="page-part">
        <rank-list />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import type { IPark } from "@/types/permission";
import TopOverview from "./components/top-overview.vue";
import AppList from "./components/app-list.vue";
import TodoList from "./components/todo-list.vue";
import ClueFunnel from "./components/clue-funnel.vue";
import RatePart from "./components/rate-part.vue";
import RentLineChar from "./components/rent-line-char.vue";
import RankList from "./components/rank-list.vue";
import { apiGetUserAuthInfo } from "@/http/api/login";
import { useHeaderPark } from "@/stores/park";

const headerParkStore = useHeaderPark();
const parks = ref<IPark[]>([]);

const currentParkIndex = ref(0);
const parkChange = (e: any) => {
  currentParkIndex.value = e.detail.value;
};

const parkName = computed(() => {
  const park = parks.value.find(
    (item) => item.id === headerParkStore.selectedId
  );
  return park ? park.name : undefined;
});

const parkId = computed(() => {
  return parks.value[currentParkIndex.value]?.id ?? 0;
});

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

const search = (res: any) => {
  uni.showToast({
    title: "搜索" + res.value,
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  overflow: hidden;
}
.park-name {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  // position: fixed;
  // top: 0;
  width: 100%;
  z-index: 2;
  background-color: #1a8cff;
}
.home-main {
  height: calc(100% - 40px);
  overflow: auto;
  background-color: #f5f5f5;
}
.arrow {
  font-size: 0.9em;
}
.page-part {
  background-color: #fff;
  & + .page-part {
    margin-top: 10px;
  }
}
.top-search {
  width: 80%;
  margin: 0 auto;
}
</style>
