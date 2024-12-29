<template>
  <view class="page-system">
    <view class="content-card">
      <view class="content-item">
        <view style="font-size: large"> {{ title }}</view>
        <view>
          <text> {{ content }} </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref, computed } from "vue";

const title = ref("");
const content = ref("");
const versionLsit = ref<any>([
  {
    version: "1.0.0",
    contants: "这是1.0的功能更新内容",
  },
  {
    version: "1.0.1",
    contants: "这是1.0.1的功能更新内容",
  },
  {
    version: "1.0.2",
    contants: "这是1.0.2的功能更新内容",
  },
]);
onLoad((option: any) => {
  //调用详情接口填充数据
  console.log(option.title);
  title.value = option.title;
  for (let index = 0; index < versionLsit.value.length; index++) {
    const element = versionLsit.value[index];
    if (element.version == option.title) {
      content.value = element.contants;
    }
  }
});
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
    color: black;
    flex-direction: column;
  }
}
</style>
