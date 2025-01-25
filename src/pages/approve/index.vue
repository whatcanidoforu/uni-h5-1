<template>
  <view class="message-page">
    <view class="page-header">
      <uni-icons
        class="left"
        type="left"
        size="20"
        @click="back"
        color="#000000"
      ></uni-icons>
      <view class="center">
        {{ "我的审批" }}
      </view>
      <view class="right"></view>
    </view>

    <view class="tabs-list">
      <view
        class="tab"
        :class="{ active: tabIndex === 0 }"
        @click="checkTab(0)"
      >
        全部
      </view>
      <view
        class="tab"
        :class="{ active: tabIndex === 1 }"
        @click="checkTab(1)"
      >
        待审批
      </view>
      <view
        class="tab"
        :class="{ active: tabIndex === 2 }"
        @click="checkTab(2)"
      >
        已审批
      </view>
    </view>

    <view class="page-content">
      <z-paging
        class="card-list"
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
          class="card-item"
          v-for="(item, index) in list1"
          :key="'card-item' + index"
          @click="jumpContractDetail(item)"
        >
          <view class="card-item-name top">
            租赁合同审批
            <view class="jump-area">
              {{ item.statusName }}
              <uni-icons type="right" size="12"></uni-icons>
            </view>
          </view>
          <view class="departmentName line">
            <span>单据编号：</span>
            {{ item.code }}
          </view>
          <view class="departmentName line">
            <span>申请人：</span>
            {{ item.signedByName }}
          </view>
          <view class="departmentName line">
            <span>申请时间：</span>
            {{ item.createTime }}
          </view>
        </view>
        <view
          class="card-item"
          v-for="(item, index) in list2"
          :key="'card-item' + index"
          @click="jumpResourceLockDetail(item)"
        >
          <view class="card-item-name top">
            资源锁定审批
            <view
              class="jump-area"
              :class="{ 'clue-blue': item.status === 10 }"
            >
              {{
                item.status === 0
                  ? "申请中"
                  : item.status === 10
                  ? "审核通过"
                  : "审核驳回"
              }}
              <uni-icons type="right" size="12"></uni-icons>
            </view>
          </view>
          <view class="departmentName line">
            <span>单据编号：</span>
            {{ item.code }}
          </view>
          <view class="departmentName line">
            <span>申请人：</span>
            {{ item.createByName }}
          </view>
          <view class="departmentName line">
            <span>申请时间：</span>
            {{ item.createTime }}
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiGetContractList } from "@/http/api/contract";
import { apiResourceLockSearchLockApply } from "@/http/api/space";
import { onLoad, onShow } from "@dcloudio/uni-app";
import type { IContractTable } from "@/types/contract";
import type { IApiGetApplyLock } from "@/types/space";
import { useHeaderPark } from "@/stores/park";

const headerParkStore = useHeaderPark();
const tabIndex = ref(0);
const init = () => {};
onMounted(() => {
  init();
});
const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
});
onShow(() => {
  zPageing.value?.reload();
});
const dataList = ref<(IContractTable | IApiGetApplyLock)[]>([]);
const zPageing = ref();
const userId = ref(Number(localStorage.getItem("userId")) as number);

const checkTab = (index: number) => {
  tabIndex.value = index;
  zPageing.value?.reload();
};

const list1 = ref<IContractTable[]>([]);
const list2 = ref<IApiGetApplyLock[]>([]);
const apiGetContractListFun = async () => {
  console.log("tabIndex.value", tabIndex.value);
  return new Promise((resolve, reject) => {
    let labelType = undefined;
    let statuses: number[] = [];
    if (tabIndex.value === 0) {
      // labelType = 1
      statuses = [];
    } else if (tabIndex.value === 1) {
      // labelType = 3
      statuses = [1];
    } else if (tabIndex.value === 2) {
      // labelType = 2
      statuses = [10, 20, 30];
    }
    apiGetContractList({
      pageNo: 1,
      pageSize: 999999,
      keyWords: "",
      startDate: "",
      endDate: "",
      code: "",
      statuses: statuses,
      customerUserIds: [],
      customerComIds: [],
      // parkIds: headerParkStore.selectedId ? [headerParkStore.selectedId] : [],
      parkIds: [], // 77
      buildingIds: [],
      floorIds: [],
      roomIds: [],
      resourceCode: "",
      signedBy: [],
      type: 100,
      labelType: labelType,
      rentStartTime: "",
      rentEndTime: "",
      expiredDays: undefined, // 到期天数
      comId: undefined, // 企业id
    }).then((res) => {
      if (res) {
        // list1 = {
        //   code: "SD2025012394380530",
        //   createByName: "18066797763",
        //   createTime: "2025-01-23 14:33:36",
        //   createdBy: 6299,
        //   customerComId: 10014,
        //   customerName: "上海斗阳重工科技有限公司",
        //   customerType: 2,
        //   customerUserId: null,
        //   lockType: 1,
        //   lockTypeName: "租赁",
        //   releaseTime: "2025-01-24 23:59:00",
        //   status: 0,
        //   statusName: "申请中",
        //   verifiedBy: null,
        //   verifiedByName: "",
        //   verifyTime: null,
        //   version: 0,
        // };
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};
const apiResourceLockSearchLockApplyFun = async () => {
  let status: number[] = [];
  if (tabIndex.value === 0) {
    status = [];
  } else if (tabIndex.value === 1) {
    status = [0];
  } else if (tabIndex.value === 2) {
    status = [10, 20];
  }
  return new Promise((resolve, reject) => {
    apiResourceLockSearchLockApply({
      pageNo: 1,
      pageSize: 999999,
      code: "",
      lockType: [],
      createStartTime: "",
      createEndTime: "",
      verifyStartTime: "",
      verifyEndTime: "",
      customerType: "",
      customerUserId: "",
      customerComId: "",
      status: status,
    }).then((res) => {
      // list2 = {
      //   code: "SD2025012394380530",
      //   createByName: "18066797763",
      //   createTime: "2025-01-23 14:33:36",
      //   createdBy: 6299,
      //   customerComId: 10014,
      //   customerName: "上海斗阳重工科技有限公司",
      //   customerType: 2,
      //   customerUserId: null,
      //   lockType: 1,
      //   lockTypeName: "租赁",
      //   releaseTime: "2025-01-24 23:59:00",
      //   status: 0,
      //   statusName: "申请中",
      //   verifiedBy: null,
      //   verifiedByName: "",
      //   verifyTime: null,
      //   version: 0,
      // };
      if (res) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};

const queryList = async (pageNo: number, pageSize: number) => {
  uni.showLoading();
  try {
    const [res1, res2]: [any, any] = await Promise.all([
      apiGetContractListFun(),
      apiResourceLockSearchLockApplyFun(),
    ]);
    uni.hideLoading();

    if (!res1 || !res2) {
      zPageing.value.complete(false);
      return;
    }
    list1.value = res1.data || [];
    list2.value =
      res2.data.filter((item: any) => item.createdBy === userId.value) || [];
    zPageing.value.complete([...list1.value, ...list2.value]);
  } catch (error) {
    console.error("Error fetching data:", error);
    uni.hideLoading();
    zPageing.value.complete(false);
  }
};

const jumpContractDetail = (item: any) => {};
const jumpResourceLockDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/approve/resource-lock-detail?code=${item.code}`,
  });
};

const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
@import "/src/static/icons/icon1/iconfont.css";
.message-page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
view {
  box-sizing: border-box !important;
}
.page-header {
  background-color: #ffffff;
  color: #000000;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left,
  .right {
    justify-content: left;
    padding-left: 10px;
    box-sizing: border-box;
    width: 80px;
  }
  .center {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .left {
    text-align: left;
  }
  .right {
    // width: max-content;
    font-size: 13px;
    justify-content: right;
    padding-right: 14px;
  }
}
.tabs-list {
  background-color: #fff;
  display: flex;
  padding: 20px 0;
  .tab {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #686868;
    position: relative;
  }
  .tab.active {
    color: #353535;
  }
  .tab.active::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 3px;
    background-color: #0c94d7;
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

.card-list {
  flex: 1;
  .card-item {
    background-color: #ffffff;
    margin-top: 12px;
    border-radius: 12px;
    .card-item-name {
      font-size: 18px;
      height: 36px;
      line-height: 36px;
      color: #2e2e2e;
      padding-left: 14px;
      position: relative;
      padding-right: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .jump-area {
        color: #fab897;
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        .uni-icons {
          margin-left: 4px;
        }
      }
    }
    .line {
      min-height: 28px;
      min-height: 28px;
      word-break: break-all;
      color: #9b9b9b;

      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 0 14px;
    }
  }
}
.jump-add {
  position: fixed;
  right: 0;
  top: 70%;
  z-index: 999;
}
.clue-blue {
  color: #0c94d7 !important;
}
</style>
