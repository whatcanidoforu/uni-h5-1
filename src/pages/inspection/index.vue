<template>
  <view class="page">
    <view class="page-header">
      <uni-icons class="left" type="left" size="20" @click="back"></uni-icons>
      <view class="center"> 巡检管理 </view>
      <view class="right"> </view>
    </view>
    <view class="page-content">
      <view class="type-list">
        <view
          class="type-card"
          :class="{ active: params.type === item.type }"
          v-for="item in statusMapList"
          :key="tabIndex + '_' + item.type"
          @click="changeStatus(item)"
        >
          <uni-badge
            class="uni-badge-left-margin"
            :text="6"
            absolute="rightTop"
            :offset="[-5, 0]"
            size="small"
          >
            {{ item.label }}
          </uni-badge>
        </view>
      </view>
      <z-paging
        class="clue-card-list"
        ref="zPageing"
        :hide-empty-view="false"
        :refresher-enabled="true"
        v-model="dataList"
        @query="queryList"
        :auto-clean-list-when-reload="false"
        :auto="true"
        :fixed="false"
      >
        <view
          class="clue-card"
          v-for="(item, index) in dataList"
          :key="'clue-card' + index"
          @click="clickCardItem(item)"
        >
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
      </z-paging>
    </view>
  </view>
</template>

<script setup lang="ts">
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
const init = () => {};
onMounted(() => {
  init();
});
onShow(() => {});

const zPageing = ref();
const dataList = ref();
const queryList = async (pageNo: number, pageSize: number) => {
  dataList.value = [1, 2, 3];
  zPageing.value.complete(dataList.value);
};
const changeStatus = (item: any) => {
  params.value.type = item.type;
};
watch(
  () => tabIndex.value,
  (val) => {
    zPageing.value.reload();
  }
);

const clickCardItem = (item: any) => {
  console.log("clickCardItem", item);
  uni.navigateTo({ url: `/pages/inspection/detail?id=${item.id}` });
};
const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.type-list {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  .type-card {
    flex: 1;
    position: relative;
    color: #9a9a9a;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    .label {
      position: relative;
      font-size: 14px;
      .num {
        position: absolute;
        margin-top: 10px;
      }
    }
  }
  .type-card.active {
    color: rgba(25, 144, 255, 1);
  }
  .type-card.active::after {
    content: "";
    width: 36px;
    height: 2px;
    border-radius: 4px;
    background-color: rgba(25, 144, 255, 1);
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
  }
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

.clue-card-list {
  flex: 1;
  .clue-card {
    background-color: #ffffff;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    margin: 12px 10px 0;
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
}
</style>
