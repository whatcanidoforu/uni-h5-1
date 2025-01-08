<template>
  <view class="clue-page">
    <clueHeader v-model:tabIndex="tabIndex"></clueHeader>

    <view class="page-content">
      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="searchValue"
        @confirm="search"
        style="padding: 0; margin-top: 10px"
      />
      <view class="status-list">
        <view
          class="status-card"
          :class="{ active: status === item.value }"
          v-for="item in statusMapList"
          :key="tabIndex + '_' + item.value"
          @click="changeStatus(item.value)"
        >
          <view class="label"> {{ item.label }} </view>
          <view class="num"> {{ 32 }} </view>
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

<script setup>
import { ref, computed } from "vue";
import clueHeader from "./components/clue-header.vue";
import { apiChanceSearchMyChanceClueList } from "@/http/api/clue.ts";

const tabIndex = ref(0);
const searchValue = ref("");

const statusMapList = computed(() => {
  switch (tabIndex.value) {
    case 0:
      return [
        { label: "全部", value: 0 },
        { label: "待跟进", value: 1 },
        { label: "跟进中", value: 2 },
        { label: "已转商机", value: 3 },
      ];
    case 1:
      return [
        { label: "全部", value: 0 },
        { label: "待跟进", value: 1 },
        { label: "跟进中", value: 2 },
        { label: "已转商机", value: 3 },
      ];
    case 2:
      return [
        { label: "全部", value: 0 },
        { label: "新线索", value: 1 },
        { label: "历史线索", value: 2 },
      ];
    default:
      return "";
  }
});

const status = ref(0);
const changeStatus = (value) => {
  console.log(value);
  status.value = value;
};

const search = () => {
  console.log(searchValue.value);
};

const dataList = ref([]);
const zPageing = ref();
const queryList = async (pageNo, pageSize) => {
  let userId = Number(localStorage.getItem("userId"));
  const params = {
    pageNo: pageNo,
    pageSize: pageSize,
    type: "0",
    startDate: "",
    endDate: "",
    directorIds: userId,
    stages: [],
    parkIds: [103],
    notExistsDirector: false,
  };
  let res = await apiChanceSearchMyChanceClueList(params);
  console.log("apiChanceSearchMyChanceClueList", res);

  if (!res) {
    zPageing.value.complete(false);
  }
  const {
    businessTotal,
    data,
    dealedTotal,
    myClueTotal,
    total,
    waitDealTotal,
  } = res;
  zPageing.value.complete(data);
};
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
.status-list {
  width: 100%;
  margin-top: 10px;
  background-color: #ffffff;
  display: flex;
  align-self: center;
  height: 80px;
  .status-card {
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
  .status-card::before {
    content: "";
    width: 1px;
    height: 80%;
    background-color: #eaf3fc;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .status-card.active {
    color: #000;
  }
  .status-card.active::after {
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
