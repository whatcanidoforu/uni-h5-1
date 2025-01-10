<template>
  <view class="bill-header">
    <uni-icons
      class="left"
      style="font-weight: bolder"
      type="left"
      size="20"
      @click="goBacktoHome"
    ></uni-icons>
    <view class="bill-tille">账单管理</view>
    <view @click="searchBill"
      ><uni-icons
        class="iconfont icon-loudou"
        style="padding-right: 5px"
        :size="18"
      ></uni-icons
      >筛选</view
    >
  </view>
  <view class="bill-page">
    <view class="z-paging-container">
      <z-paging
        ref="paging"
        v-model="dataList"
        :fixed="false"
        @query="queryList"
        overflow="hidden"
      >
        <template #top>
          <view class="page-content">
            <uni-search-bar
              radius="5"
              bgColor="#FFFFFF"
              placeholder="请输入关键字搜索"
              clearButton="auto"
              cancelButton="none"
              @input="searchBills"
              style="padding: 0; margin-top: 10px"
            />
            <view class="bill-status-list">
              <view
                class="bill-status-card"
                :class="{ active: labelType === item.value }"
                v-for="item in statusMapList"
                :key="item.value"
                @click="changeStatus(item.value)"
              >
                <view class="label"> {{ item.label }} </view>
                <view class="num" v-if="item.value == 1">
                  {{ total }}
                </view>
                <view class="num" v-if="item.value == 2">
                  {{ unReceived }}
                </view>
                <view class="num" v-if="item.value == 3">
                  {{ partReceived }}
                </view>
                <view class="num" v-if="item.value == 4"> {{ received }} </view>
              </view>
            </view>
          </view>
        </template>

        <view class="bill-content-card" v-for="item in dataList" :key="item.id">
          <view class="bill-code">
            <view class="bill-content-item" style="font-weight: bold"
              >账单编号：{{ item.code }}</view
            >
            <view class="bill-content-item" style="padding-left: 10px">{{
              item.receiveStatusName
            }}</view>
          </view>
          <view class="bill-content-item"
            >客户名称：{{ item.customerName }}</view
          >
          <view class="bill-content-item"
            >出账公司：{{ item.companyName }}</view
          >
          <view class="bill-content-item"
            >出账金额：{{ item.amountReceivable }}.00</view
          >
          <view class="bill-content-item"
            >已收金额：{{ item.amountReceived }}.00</view
          >
          <view class="bill-content-item"
            >未受金额：{{ item.amountUnReceived }}.00</view
          >
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { apiSearchBill } from "@/http/api/charge";
import type { IBill } from "@/types/charge";

const searchBill = () => {
  //跳转数据筛选页面
  console.log("searchBill");
};
const goBacktoHome = () => {
  uni.navigateBack({ delta: 1 });
};

const statusMapList = [
  { label: "全部", value: 1 },
  { label: "未收款", value: 2 },
  { label: "部分收款", value: 3 },
  { label: "已收款", value: 4 },
];

const labelType = ref(1);
const changeStatus = (value: any) => {
  labelType.value = value;
  paging.value.reload();
};
const keyWords = ref("");
const searchBills = (e: any) => {
  keyWords.value = e;
  paging.value.reload();
};

const paging = ref();
const dataList = ref<IBill[]>([]);
let total = ref(0);
let unReceived = ref(0);
let partReceived = ref(0);
let received = ref(0);
const queryList = async (pageNo: any, pageSize: any) => {
  uni.showLoading({
    title: "加载中...",
    mask: true,
  });
  setTimeout(function () {
    uni.hideLoading();
  }, 10);
  let userId = Number(localStorage.getItem("userId"));
  const params = {
    pageNo: pageNo,
    pageSize: pageSize,
    parkIds: [77],
    labelType: labelType.value,
    userId: userId,
    keyWords: keyWords.value,
  };
  let res = await apiSearchBill(params);
  if (!res) {
    paging.value.complete(false);
  }
  const {
    data,
    totalCount,
    unReceivedCount,
    partReceivedCount,
    receivedCount,
  } = res;
  total.value = totalCount;
  unReceived.value = unReceivedCount;
  partReceived.value = partReceivedCount;
  received.value = receivedCount;
  paging.value.complete(data);
};
</script>

<style lang="scss" scoped>
.z-paging-container {
  height: 100%;
}
.bill-header {
  align-items: center;
  height: 60px;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.bill-tille {
  font-size: larger;
  color: black;
  font-weight: bold;
}
.bill-page {
  height: calc(100% - 62px);
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.page-content {
  padding: 0 10px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

.uni-searchbar {
  width: 100%;
}
.bill-status-list {
  width: 100%;
  margin-top: 10px;
  background-color: #ffffff;
  display: flex;
  align-self: center;
  height: 80px;
  border-radius: 3%;
  .bill-status-card {
    flex: 1;
    position: relative;
    color: #9a9a9a;
    text-align: center;
    .label {
      margin-top: 14px;
    }
    .num {
      margin-top: 10px;
    }
  }
  .bill-status-card::before {
    content: "";
    width: 1px;
    height: 80%;
    background-color: #eaf3fc;
    position: absolute;
    right: 0;
    top: 10%;
  }

  .bill-status-card.active {
    color: #000;
  }
  .bill-status-card.active::after {
    content: "";
    width: 36px;
    height: 4px;
    border-radius: 4px;
    background-color: #000;
    position: absolute;
    bottom: 4px;
    left: 30%;
  }
}
.bill-content-card {
  box-sizing: border-box;
  padding: 10px 11px 10px 15px;
  width: 94%;
  background: #ffffff;
  box-shadow: 0px 4px 7px 3px rgba(230, 230, 230, 1);
  border-radius: 17px;
  margin: 15px;
  margin-left: 10px;
  .bill-content-item {
    display: flex;
    padding: 5px 0;
    font-size: 14px;
    color: black;
    flex-direction: column;
  }
  .bill-code {
    display: flex;
    justify-content: space-between;
  }
}
</style>
