<template>
  <view class="contract-page">
    <contractHeader
      v-model:tabIndex="tabIndex"
      :params="params"
      @confirm="confirmParams"
      @PopOpenStatusChange="PopOpenStatusChange"
    ></contractHeader>
    <view class="page-content">
      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="params.keyWords"
        @input="debouncedInput"
        @confirm="debouncedInput"
        style="padding: 0; margin-top: 10px"
      />
      <z-paging
        class="contract-card-list"
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
          class="contract-card"
          v-for="(item, index) in dataList"
          :key="'contract-card' + index"
          @click="clickCardItem(item)"
        >
          <view class="contract-name top">
            {{ item.code }}
            <view class="jump-area">
              {{ item.statusName }}
              <uni-icons type="right" size="12"></uni-icons>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">客户名称:</view>
            <view class="form-value">{{ item.customerName }}</view>
          </view>
          <view class="form-item">
            <view class="form-label">合同金额:</view>
            <view class="form-value"
              >￥<text v-money-format="item.amount"></text
            ></view>
          </view>
          <view class="form-item">
            <view class="form-label">合同类型:</view>
            <view class="form-value">{{ item.typeName }}</view>
          </view>
          <view class="form-item">
            <view class="form-label">招商负责人:</view>
            <view class="form-value">{{ item.signedByName }}</view>
          </view>
          <view class="form-item">
            <view class="form-label">签订日期:</view>
            <view class="form-value"
              ><text v-time-format="item.signTime"></text
            ></view>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import contractHeader from "./components/contract-header.vue";
import { apiGetContractList } from "@/http/api/contract";
import { useHeaderPark } from "@/stores/park";

const tabIndex = ref(0);

const timer = ref();
const debouncedInput = (e: string) => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    zPageing.value.reload();
  }, 500);
};

const params = ref<any>();
const init = () => {
  const headerParkStore = useHeaderPark();
  params.value = {
    pageNo: 1,
    pageSize: 10,
    keyWords: "",
    type: 100,
    startDate: "",
    endDate: "",
    signedBy: [],
    selectedSignBy: [],
    departmentIds: [],
    selectedDepartments: [],
    statuses: [],
    parkIds: headerParkStore.selectedId ? [headerParkStore.selectedId] : [],
    parks: headerParkStore.parks.filter(
      (item) => item.id === headerParkStore.selectedId
    ),
  };
};

onMounted(() => {
  init();
  const headerParkStore = useHeaderPark();
  if (headerParkStore.parks) {
    params.value.parks = headerParkStore.parks.filter(
      (item) => item.id === headerParkStore.selectedId
    );
  } else {
    params.value.parks = [];
  }
  params.value.parkIds = headerParkStore.selectedId
    ? [headerParkStore.selectedId]
    : [];
});

const dataList = ref<any>([]);
const zPageing = ref();
const queryList = async (pageNo: number, pageSize: number) => {
  let userId = Number(uni.getStorageSync("userId")) as number;
  let signedBy: number[] = [];
  if (tabIndex.value === 0) {
    signedBy.push(userId);
  } else {
    signedBy = params.value.signedBy;
  }
  let res = await apiGetContractList({
    pageNo: pageNo,
    pageSize: pageSize,
    keyWords: params.value.keyWords,
    type: params.value.type,
    startDate: params.value.startDate,
    endDate: params.value.endDate,
    statuses: params.value.statuses,
    parkIds: params.value.parkIds,
    signedBy,
    departmentIds: params.value.departmentIds,
  });
  if (!res) {
    zPageing.value.complete(false);
  }
  zPageing.value.complete(res.data);
};

const confirmParams = (obj: any) => {
  const headerParkStore = useHeaderPark();
  params.value.startDate = obj.startDate;
  params.value.endDate = obj.endDate;
  params.value.parks = obj.parks;
  params.value.parkIds =
    obj.parks && obj.parks.length > 0
      ? obj.parks.map((item: any) => item.id)
      : [headerParkStore.selectedId];
  params.value.type = obj.type;
  params.value.signedBy = obj.signedBy;
  params.value.statuses = obj.statuses;
  params.value.departmentIds = obj.departmentIds;
  params.value.selectedDepartments = obj.selectedDepartments;
  params.value.selectedSignBy = obj.selectedSignBy;
  zPageing.value.reload();
};

const isFilterPopOpen = ref(false);
const PopOpenStatusChange = (e: any) => {
  isFilterPopOpen.value = e;
};

watch(
  () => tabIndex.value,
  (val) => {
    const headerParkStore = useHeaderPark();
    params.value.keyWords = "";
    params.value.startDate = "";
    params.value.endDate = "";
    if (headerParkStore.parks) {
      params.value.parks = headerParkStore.parks.filter(
        (item) => item.id === headerParkStore.selectedId
      );
    } else {
      params.value.parks = [];
    }
    params.value.parkIds = headerParkStore.selectedId
      ? [headerParkStore.selectedId]
      : [];
    params.value.statuses = [];
    params.value.departmentIds = [];
    params.value.selectedDepartments = [];
    params.value.selectedSignBy = [];
    params.value.type = undefined;
    if (val === 0) {
      let userId = Number(uni.getStorageSync("userId")) as number;
      params.value.signedBy = [userId];
    } else {
      params.value.signedBy = [];
    }
    zPageing.value.reload();
  }
);

const clickCardItem = (item: any) => {
  uni.navigateTo({ url: `/pages/contract/detail?id=${item.id}` });
};
</script>

<style lang="scss" scoped>
.contract-page {
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

.contract-card-list {
  flex: 1;
  .contract-card {
    background-color: #ffffff;
    margin-top: 12px;
    border-radius: 12px;
    padding-bottom: 8px;
    .contract-name {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      color: #292929;
      padding-left: 14px;
      position: relative;
      padding-right: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    .form-item {
      display: flex;
      color: #5f5f5f;
      justify-content: space-between;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
    }
  }
}
.jump-add {
  position: fixed;
  right: 0;
  top: 70%;
  z-index: 999;
}
</style>
