<template>
  <view class="home-page">
    <picker
      @change="parkChange"
      :value="currentParkIndex"
      :range="parks"
      range-key="name"
    >
      <view class="park-name">
        <text style="margin-right: 4px">{{
          parks[currentParkIndex].name
        }}</text>
        <uni-icons type="arrowdown" size="16" color="#fff"></uni-icons>
      </view>
    </picker>
    <view class="home-main">
      <view class="page-part" @click="test">
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

<script setup>
import { ref, computed } from "vue";
import TopOverview from "./components/top-overview.vue";
import AppList from "./components/app-list.vue";
import TodoList from "./components/todo-list.vue";
import ClueFunnel from "./components/clue-funnel.vue";
import RatePart from "./components/rate-part.vue";
import RentLineChar from "./components/rent-line-char.vue";
import RankList from "./components/rank-list.vue";

const parks = ref([
  { id: 1, name: "移动智地" },
  { id: 2, name: "园区2" },
  { id: 3, name: "园区3" },
  { id: 4, name: "园区4" },
]);
const currentParkIndex = ref(0);
const parkChange = (e) => {
  currentParkIndex.value = e.detail.value;
};

const parkId = computed(() => {
  return parks.value[currentParkIndex.value]?.id ?? 0;
});

const test = () => {
  // uni.navigateTo({
  //   url: "/pages/index/index",
  // });
};

const search = (res) => {
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
