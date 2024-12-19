<template>
  <uni-section title="">
    <template v-slot:right>
      <picker @change="timeChange" mode="date" :value="date" fields="month">
        <view class="time-select">
          <text style="color: #333; font-weight: 600">日期：</text>
          <text style="color: #666">{{ date }}</text>
          <uni-icons type="bottom" size="14"></uni-icons>
        </view>
      </picker>
    </template>
    <view class="box-container">
      <view class="box-item">
        <view class="rate"><text>58.7%</text></view>
        <view class="name"><text>空间利用率</text></view>
      </view>
      <view class="box-item">
        <view class="rate"><text>33.0%</text></view>
        <view class="name"><text>计租率</text></view>
      </view>
      <view class="box-item">
        <view class="rate"><text>0.00%</text></view>
        <view class="name"><text>销售绩效完成率</text></view>
      </view>
      <view class="box-item">
        <view class="rate"><text>1.9%</text></view>
        <view class="name"><text>租赁绩效完成率</text></view>
      </view>
    </view>
  </uni-section>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const today = dayjs();
const date = ref(today.format("YYYY-MM"));

const timeChange = (e) => {
  date.value = e.detail.value;
};
</script>

<style lang="scss" scoped>
.box-container {
  display: flex;
  flex-wrap: wrap;
  .box-item {
    width: 50%;
    box-sizing: border-box;
    height: 80px;
    text-align: center;
    padding-top: 10px;
    &:nth-of-type(1) {
      border-right: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
    }
    &:nth-of-type(2) {
      border-bottom: 1px solid #d8d8d8;
    }
    &:nth-of-type(3) {
      border-right: 1px solid #d8d8d8;
    }
    .rate {
      height: 30px;
      line-height: 30px;
      background-image: linear-gradient(#027bec, #0939d7);
      background-clip: text;
      font-weight: bold;
      font-size: 18px;
      color: transparent;
    }
    .name {
      color: #555555;
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
