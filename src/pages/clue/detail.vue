<template>
  <view class="clue-detail-page">
    <view class="page-header">
      <uni-icons
        class="left"
        type="left"
        size="20"
        @click="back"
        color="#fff"
      ></uni-icons>
      <view class="center">111</view>
      <view class="right">
        <span class="iconfont icon-edit" style="font-size: 12px"></span>
        编辑
      </view>
    </view>

    <view class="page-content"> </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import clueHeader from "./components/clue-header.vue";
import {
  apiChanceSearchMyChanceClueList,
  apiChanceSearchChanceClueTeam,
  apiChanceSearchChanceClueList,
} from "@/http/api/clue";
import { useHeaderPark } from "@/stores/park";

const headerParkStore = useHeaderPark();

const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
@import "/src/static/icons/icon1/iconfont.css";
.clue-detail-page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid red;
  background-color: #029deb;
}
.page-header {
  color: #fff;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left,
  .right {
    justify-content: left;
    padding-left: 10px;
    box-sizing: border-box;
    width: 50px;
  }
  .center {
    font-size: 14px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.page-content {
  padding: 0 10px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
