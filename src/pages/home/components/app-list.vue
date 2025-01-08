<template>
  <view class="app-container">
    <view
      class="app-item"
      v-for="item in appList"
      :key="item.name"
      @click="clickItem(item)"
    >
      <image :src="item.imgPath" mode="widthFix"></image>
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup>
const appList = [
  {
    name: "线索管理",
    imgPath: "/static/image/home/xsgl.png",
    path: "/pages/clue/index",
  },
  {
    name: "商机管理",
    imgPath: "/static/image/home/sjgl.png",
  },
  {
    name: "合同管理",
    imgPath: "/static/image/home/htgl.png",
  },
  {
    name: "账单管理",
    imgPath: "/static/image/home/zdgl.png",
  },
  {
    name: "电销管理",
    imgPath: "/static/image/home/dxgl.png",
  },
  {
    name: "分享房源",
    imgPath: "/static/image/home/fxfy.png",
  },
  {
    name: "寻源拓客",
    imgPath: "/static/image/home/xytk.png",
  },
  {
    name: "锁定房源",
    imgPath: "/static/image/home/sdfy.png",
  },
];

const clickItem = (item) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path,
    });
    return;
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 10px 10px;
  .app-item {
    width: 22%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    image {
      width: 60%;
      margin-bottom: 10px;
    }
  }
}
</style>
