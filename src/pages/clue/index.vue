<template>
  <view class="clue-page">
    <clueHeader
      v-model:tabIndex="tabIndex"
      :params="params"
      @confirm="confirmParams"
    ></clueHeader>
    <view class="page-content">
      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="params.keyWords"
        @input="debouncedInput"
        @confirm="debouncedInput"
        style="padding: 0; margin-top: 10px"
      />
      <view class="type-list">
        <view
          class="type-card"
          :class="{ active: params.type === item.type }"
          v-for="item in statusMapList"
          :key="tabIndex + '_' + item.type"
          @click="changeStatus(item)"
        >
          <view class="label"> {{ item.label }} </view>
          <view class="num"> {{ item.num }} </view>
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
        >
          <view class="clue-name top">
            万表样动切委
            <view class="jump-area">
              未跟进<uni-icons type="right" size="12"></uni-icons>
            </view>
          </view>
          <view class="phone center">联系方式: 18662282621</view>
          <view class="btns-area bottom">
            <div class="btn">
              <uni-icons type="chat" size="18"></uni-icons>跟进
            </div>
            <div class="btn">
              <uni-icons type="phone" size="18"></uni-icons>电话
            </div>
            <div class="btn">
              <uni-icons type="chat" size="18"></uni-icons>微信
            </div>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import clueHeader from "./components/clue-header.vue";
import {
  apiChanceSearchMyChanceClueList,
  apiChanceSearchChanceClueTeam,
  apiChanceSearchChanceClueList,
} from "@/http/api/clue";

const tabIndex = ref(0);
const keyWords = ref("");

const statusMapList = ref<any>([
  { label: "全部", type: 0, num: 0 },
  { label: "待跟进", type: 1, num: 0 },
  { label: "跟进中", type: 2, num: 0 },
  { label: "已转商机", type: 3, num: 0 },
]);

const timer = ref();
const debouncedInput = (e: string) => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    zPageing.value.reload();
  }, 500);
};

const params = ref<any>({
  pageNo: 1,
  pageSize: 10,
  keyWords: "",
  type: 0,
  startDate: "",
  endDate: "",
  directorIds: 0,
  stages: [],
  parkIds: [103],
  sources: [],
  notExistsDirector: false,
});
const changeStatus = (item: any) => {
  params.value.type = item.type;
  zPageing.value.reload();
};
const dataList = ref([]);
const zPageing = ref();
const queryList = async (pageNo: number, pageSize: number) => {
  let userId = Number(localStorage.getItem("userId")) as number;
  params.value.pageNo = pageNo;
  params.value.pageSize = pageSize;
  params.value.directorIds = userId;

  if (tabIndex.value === 0) {
    let res = await apiChanceSearchMyChanceClueList(params.value as any);
    if (!res) {
      zPageing.value.complete(false);
    }
    zPageing.value.complete(res.data);
    statusMapList.value = [
      { label: "全部", type: 0, num: res.myClueTotal },
      { label: "待跟进", type: 1, num: res.waitDealTotal },
      { label: "跟进中", type: 2, num: res.dealedTotal },
      { label: "已转商机", type: 3, num: res.businessTotal },
    ];
  } else if (tabIndex.value === 1) {
    let res = await apiChanceSearchChanceClueTeam(params.value as any);
    if (!res) {
      zPageing.value.complete(false);
    }
    zPageing.value.complete(res.data);
    statusMapList.value = [
      { label: "全部", type: 0, num: res.myClueTotal },
      { label: "待跟进", type: 1, num: res.waitDealTotal },
      { label: "跟进中", type: 2, num: res.dealedTotal },
      { label: "已转商机", type: 3, num: res.businessTotal },
    ];
  } else if (tabIndex.value === 2) {
    let res = await apiChanceSearchChanceClueList(params.value as any);
    if (!res) {
      zPageing.value.complete(false);
    }
    zPageing.value.complete(res.data);
    statusMapList.value = [
      { label: "全部", type: 1, num: res.totalClueNum },
      { label: "新线索", type: 2, num: res.newChanceClueNum },
      { label: "历史线索", type: 3, num: res.historyChanceClueNum },
    ];
  }
};

const confirmParams = (obj) => {
  console.log("index confirmParams", obj);
  params.value.startDate = obj.startDate;
  params.value.endDate = obj.endDate;
  params.value.sources = obj.sources;
  params.value.parks = obj.parks;
  params.value.parkIds = obj.parks.map((item: any) => item.id);
  zPageing.value.reload();
};

watch(
  () => tabIndex.value,
  (val) => {
    if (val === 0) {
      params.value.type = 0;
    } else if (val === 1) {
      params.value.type = 0;
    } else if (val === 2) {
      params.value.type = 1;
    }
    zPageing.value.reload();
  }
);
</script>

<style lang="scss" scoped>
.clue-page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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

.uni-searchbar {
  width: 100%;
}
.type-list {
  width: 100%;
  margin-top: 10px;
  background-color: #ffffff;
  display: flex;
  align-self: center;
  height: 80px;
  .type-card {
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
  .type-card::before {
    content: "";
    width: 1px;
    height: 80%;
    background-color: #eaf3fc;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .type-card.active {
    color: #000;
  }
  .type-card.active::after {
    content: "";
    width: 36px;
    height: 4px;
    border-radius: 4px;
    background-color: #000;
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.clue-card-list {
  flex: 1;
  .clue-card {
    background-color: #ffffff;
    margin-top: 12px;
    border-radius: 12px;
    .clue-name {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      color: #292929;
      padding-left: 14px;
      position: relative;
      .jump-area {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #c7806a;
        font-size: 12px;
        .uni-icons {
          margin-left: 4px;
        }
      }
    }
    .phone {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      color: #5f5f5f;
      padding-left: 14px;
    }
    .btns-area {
      display: flex;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      .btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .uni-icons {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
