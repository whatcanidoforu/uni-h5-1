<template>
  <view class="page">
    <view class="page-header">
      <uni-icons class="left" type="left" size="20" @click="back"></uni-icons>
      <view class="center"> 巡检管理 </view>
      <view class="right"> </view>
    </view>
    <view class="clue-card">
      <view class="title">
        <view class="left">
          巡检任务名称巡检任务名称巡检任务名称称巡检任务名称巡检任务名称称巡检任务名称巡检任务名称
        </view>
        <view class="right" :class="`status-color-0`">已完成</view>
      </view>
      <view class="label-value">
        <view class="label">巡检人：</view>
        <view class="value">张三</view>
      </view>
      <view class="label-value">
        <view class="label">计划完成时间：</view>
        <view class="value">2025-01-01 09:00 ～ 11:30</view>
      </view>
      <view class="label-value">
        <view class="label">实际完成时间：</view>
        <view class="value">2025-01-01 11:21</view>
      </view>
      <view class="label-value">
        <view class="label">巡检进度（正常/异常/数量/进度）</view>
        <view class="value">30 / 2 / 32 / 100%</view>
      </view>
      <view class="btn-area">
        <image
          class="pic"
          mode="scaleToFill"
          src="@/static/icon_building.png"
        ></image>
        <view class="txt">移动智地一号楼南边</view>
      </view>
    </view>
    <view class="inspection-position-list">
      <view class="title">巡检明细</view>
      <scroll-view class="row-list" scroll-y>
        <view class="row">
          <view class="colomn1 colomn">序号</view>
          <view class="colomn2 colomn">巡检点</view>
          <view class="colomn3 colomn">巡检时间</view>
          <view class="colomn4 colomn">结果</view>
        </view>
        <view class="row" v-for="item in 30">
          <view class="colomn1 colomn">序号</view>
          <view class="colomn2 colomn">巡检点</view>
          <view class="colomn3 colomn">巡检时间</view>
          <view class="colomn4 colomn">结果</view>
        </view>
      </scroll-view>
    </view>
    <div class="bottom-btns-area">
      <div class="btn" @click="scanCode">二维码打卡</div>
      <div class="btn" @click="startNfcPay">NFC感应</div>
    </div>
  </view>
</template>

<script setup lang="ts">
// var nfcModule = uni.requireNativePlugin("L-NfcModule");
// const modal = uni.requireNativePlugin("modal");

import { ref, computed, watch, onMounted } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useHeaderPark } from "@/stores/park";

const headerParkStore = useHeaderPark();
const tabIndex = ref(0);

const statusMapList = ref<any>([
  { label: "带开始", type: 0, num: 0 },
  { label: "进行中", type: 1, num: 0 },
  { label: "已完成", type: 2, num: 0 },
]);

const params = ref<any>({
  type: 0,
});
const init = () => {
  console.log("init inspection index");
};
onMounted(() => {
  init();
});
onShow(() => {});

const zPageing = ref();
const dataList = ref();
watch(
  () => tabIndex.value,
  (val) => {
    zPageing.value.reload();
  }
);

const back = () => {
  uni.navigateBack();
};

const scanCode = () => {
  // 只允许通过相机扫码
  uni.scanCode({
    onlyFromCamera: true,
    success: function (res) {
      console.log("条码类型：" + res.scanType);
      console.log("条码内容：" + res.result);
      if (res.result) {
        uni.showToast({
          title: "扫描成功",
          icon: "none",
        });
        uni.navigateTo({
          url: `/pages/inspection/add?id=${res.result}`,
        });
      }
    },
  });
};
const startNfcPay = () => {
  //   nfcModule.startNfcPay(
  //     {
  //       amount: "0.01",
  //     },
  //     (ret: any) => {
  //       console.log(" >>>> ret", ret);
  //       uni.showToast({ title: ret, icon: "none", duration: 5000 });
  //     }
  //   );
};
</script>

<style lang="scss" scoped>
view,
view {
  box-sizing: border-box;
}
.page {
  height: 100vh;
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.page-header {
  padding-top: var(--status-bar-height);
  background-color: #fff;
  color: #686868;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
  }
  .left {
    justify-content: left;
    padding-left: 10px;
    box-sizing: border-box;
    width: 50px;
  }
  .right {
    font-size: 14px;
    width: 70px;
  }
  .center {
  }
}

.page-content {
  box-sizing: border-box;
  flex: 1;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-color-0 {
  color: #fd8f0a !important;
}
.status-color-1 {
  color: #1990ff !important;
}
.status-color-2 {
  color: #42d302 !important;
}

.clue-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 15px 15px 0;
  .title {
    display: flex;
    .left {
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      padding-right: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    .right {
      flex-shrink: 0;
      font-size: 12px;
    }
  }
  .label-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .label {
      color: rgba(153, 153, 153, 1);
      font-size: 12px;
      flex-shrink: 0;
      padding-right: 4px;
    }
    .value {
      flex: 1;
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
      text-align: right;
    }
  }
  .btn-area {
    margin-top: 10px;
    height: 38px;
    border-top: 1px solid rgba(187, 187, 187, 1);
    display: flex;
    align-items: center;
    .pic {
      width: 18px;
      height: 18px;
      padding-right: 4px;
    }
    .txt {
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
    }
  }
}

.inspection-position-list {
  background-color: #ffffff;
  width: 100%;
  color: rgba(16, 16, 16, 1);
  font-size: 12px;
  padding: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 1px;
  .title {
    padding: 16px 0 10px;
    font-weight: 600;
  }
  .row-list {
    flex: 1;
    height: 1px;
    border: 1px solid #bbbbbb;
    .row {
      height: 32px;
      width: 100%;
      display: flex;
      .colomn {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .colomn1 {
        flex: calc(51.75 / 375);
      }
      .colomn2 {
        flex: calc(116.62 / 375);
      }
      .colomn3 {
        flex: calc(88.82 / 375);
      }
      .colomn4 {
        flex: calc(88.82 / 375);
      }
    }
    .row:nth-child(2n + 1) {
      background-color: #f2f2f2;
    }
  }
}
.bottom-btns-area {
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 12px;
    width: 158px;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn:first-child {
    margin-right: 4px;
  }
}
</style>
