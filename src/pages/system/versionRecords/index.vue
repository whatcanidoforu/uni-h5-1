<template>
  <view class="page-system">
    <view class="content-card" v-for="item in versionList">
      <view class="content-item" @click="toVersionDetail(item)">
        <view style="color: black; font-size: large"> {{ item.title }}</view>
        <view class="content-item-subitem">
          <text>{{ item.desc }}</text>
          <uni-icons type="right" size="16" color="#8B8989"></uni-icons
        ></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";

const versionList = ref([
  {
    id: 1,
    title: "1.0.0",
    desc: "2021-08-01",
  },
  {
    id: 2,
    title: "1.0.1",
    desc: "2021-08-02",
  },
  {
    id: 3,
    title: "1.0.2",
    desc: "2021-08-03",
  },
]);

const toVersionDetail = (item) => {
  uni.navigateTo({
    url: "/pages/system/versionRecords/versionDetail/index?title=" + item.title,
  });
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
    padding: 20rpx 0;
    font-size: 14px;
    color: #bebebe;
    flex-direction: column;

    .content-item-subitem {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
