<template>
  <view class="chance-page">
    <chanceHeader
      v-model:tabIndex="tabIndex"
      :params="params"
      @confirm="confirmParams"
      @PopOpenStatusChange="PopOpenStatusChange"
    ></chanceHeader>
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
        <template v-if="tabIndex === 0">
          <view
            class="type-card"
            :class="{ active: isActive(item) }"
            v-for="item in statusMapList"
            :key="tabIndex + '_statuses_' + item.statuses.join('-')"
            @click="changeStatus(item)"
          >
            <view class="label"> {{ item.label }} </view>
            <view class="num"> {{ item.num }} </view>
          </view>
        </template>
        <template v-else>
          <view
            class="type-card"
            :class="{ active: isActive(item) }"
            v-for="item in statusMapList"
            :key="tabIndex + '_type_' + item.type"
            @click="changeStatus(item)"
          >
            <view class="label"> {{ item.label }} </view>
            <view class="num"> {{ item.num }} </view>
          </view>
        </template>
      </view>

      <z-paging
        class="chance-card-list"
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
          class="chance-card"
          v-for="(item, index) in dataList"
          :key="'chance-card' + index"
          @click="clickCardItem(item)"
        >
          <view class="chance-name top">
            {{ item.customerName }}
            <view class="jump-area">
              {{ item.stageName }}
              <uni-icons type="right" size="12"></uni-icons>
            </view>
          </view>
          <view class="phone center">联系方式: {{ item.customerPhone }}</view>
          <view class="btns-area bottom">
            <view class="btn" @click.stop="jumpFollow(item)">
              <uni-icons type="chat" size="18"></uni-icons>跟进
            </view>
            <view class="btn" @click.stop="jumpPhone(item)">
              <uni-icons type="phone" size="18"></uni-icons>电话
            </view>
            <!-- <view class="btn" @click.stop="jumpWx(item)">
              <uni-icons type="chat" size="18"></uni-icons>微信
            </view> -->
          </view>
        </view>
      </z-paging>
    </view>

    <uni-icons
      v-if="!isFilterPopOpen"
      class="jump-add"
      type="plus-filled"
      size="60"
      color="#009bf4"
      @click="jumpAdd"
    ></uni-icons>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import chanceHeader from "./components/chance-header.vue";
import {
  apiChanceSearchMyChanceBusinessList,
  apiChanceSearchChanceBusinessTeam,
  apiChanceSearchChanceBusinessList,
} from "@/http/api/chance";

import { onLoad, onShow } from "@dcloudio/uni-app";
import { useHeaderPark } from "@/stores/park";

const tabIndex = ref(0);

const statusMapList = ref<any>([
  { label: "全部", statuses: [], type: undefined, num: 0 },
  { label: "待跟进", statuses: ["0"], type: undefined, num: 0 },
  { label: "跟进中", statuses: ["10"], type: undefined, num: 0 },
  { label: "已成交", statuses: ["100"], type: undefined, num: 0 },
  { label: "已关闭", statuses: ["-10"], type: undefined, num: 0 },
]);

const isActive = (item: any) => {
  console.log("isActive", params.value.statuses, item.type);
  if (tabIndex.value === 0) {
    return (
      JSON.stringify(params.value.statuses) === JSON.stringify(item.statuses)
    );
  } else if (tabIndex.value === 1) {
    return params.value.type === item.type;
  } else if (tabIndex.value === 2) {
    return params.value.type === item.type;
  }
};
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
};
onMounted(() => {
  init();
});
onShow(() => {
  const headerParkStore = useHeaderPark();
  params.value = {
    pageNo: 1,
    pageSize: 10,
    id: "",
    startDate: "",
    endDate: "",
    customerName: "",
    customerPhone: "",
    customerCates: [], // ["B", "C", "D"],
    statuses: [],
    directors: [],
    directorIds: undefined,
    intentions: [], // ["租赁", "购买"],
    sources: [],
    searchType: 1,
    parkIds: headerParkStore.selectedId ? [headerParkStore.selectedId] : [],
    parks: headerParkStore.parks.filter(
      (item) => item.id === headerParkStore.selectedId
    ),
    contactDays: "",
    keyWords: "",
    stages: [], //[30, 40],
    customerCompany: "",
    customerIndustries: [], //["机械/制造", "制药/医疗", "交通/物流", "能源/化工/环保"],
    intentedAreaStart: undefined, // 1,
    intentedAreaEnd: undefined, // 2,
  };
  changeStatus(statusMapList.value[0]);
});
const changeStatus = (item: any) => {
  console.log("changeStatus 1", item.statuses);
  if (tabIndex.value === 0) {
    params.value.statuses = JSON.parse(JSON.stringify(item.statuses));
    console.log("changeStatus 2", params.value.statuses);
    console.log("changeStatus 3", params.value);
    params.value.type = undefined;
  } else if (tabIndex.value === 1) {
    params.value.statuses = [];
    params.value.type = item.type;
  } else if (tabIndex.value === 2) {
    params.value.statuses = [];
    params.value.type = item.type;
  }
  zPageing.value?.reload();
};
const dataList = ref<any>([]);
const zPageing = ref();
const queryList = async (pageNo: number, pageSize: number) => {
  const headerParkStore = useHeaderPark();
  let userId = Number(uni.getStorageSync("userId")) as number;
  if (tabIndex.value === 0) {
    console.log("params.value", params.value);
    let res = await apiChanceSearchMyChanceBusinessList({
      pageNo: pageNo,
      pageSize: pageSize,
      id: "",
      startDate: params.value.startDate,
      endDate: params.value.endDate,
      customerName: "",
      customerPhone: "",
      customerCates: params.value.customerCates, //["B", "C", "D"],
      statuses: params.value.statuses,
      directorIds: userId,
      intentions: params.value.intentions, //["租赁", "购买"],
      sources: params.value.sources,
      searchType: 1,
      parkIds: params.value.parkIds,
      contactDays: "",
      keyWords: params.value.keyWords,
      stages: params.value.stages, //[30, 40],
      customerCompany: "",
      customerIndustries: params.value.customerIndustries, //["机械/制造", "制药/医疗", "交通/物流", "能源/化工/环保"],
      intentedAreaStart: params.value.intentedAreaStart, // 1,
      intentedAreaEnd: params.value.intentedAreaEnd, // 2,
    });
    if (!res) {
      zPageing.value.complete(false);
    }
    zPageing.value.complete(res.data);
    statusMapList.value = [
      { label: "全部", statuses: [], type: undefined, num: res.allTotal },
      {
        label: "待跟进",
        statuses: ["0"],
        type: undefined,
        num: res.nofollowTotal,
      },
      {
        label: "跟进中",
        statuses: ["10"],
        type: undefined,
        num: res.followUpTotal,
      },
      {
        label: "已成交",
        statuses: ["100"],
        type: undefined,
        num: res.finishedTotal,
      },
      {
        label: "已关闭",
        statuses: ["-10"],
        type: undefined,
        num: res.closedTotal,
      },
    ];
  } else if (tabIndex.value === 1) {
    let res = await apiChanceSearchChanceBusinessTeam({
      pageNo: pageNo,
      pageSize: pageSize,
      id: "",
      startDate: params.value.startDate,
      endDate: params.value.endDate,
      customerName: "",
      customerPhone: "",
      customerCates: params.value.customerCates, //["B", "C", "D"],
      statuses: [], // params.value.statuses,
      directorIds: "",
      intentions: params.value.intentions, //["租赁", "购买"],
      sources: params.value.sources,
      parkIds: params.value.parkIds,
      keyWords: params.value.keyWords,
      contactDays: "",
      notExistsDirector: false,
      stages: params.value.stages, //[30, 40],
      type: params.value.type,
      customerIndustries: params.value.customerIndustries, //["机械/制造", "制药/医疗", "交通/物流", "能源/化工/环保"],
      intentedAreaStart: params.value.intentedAreaStart, // 1,
      intentedAreaEnd: params.value.intentedAreaEnd, // 2,
    });
    if (!res) {
      zPageing.value.complete(false);
    }
    zPageing.value.complete(res.data);
    statusMapList.value = [
      { label: "全部", statuses: [], type: 0, num: res.allTotal },
      { label: "待跟进", statuses: [], type: 1, num: res.nofollowTotal },
      { label: "跟进中", statuses: [], type: 2, num: res.followUpTotal },
      { label: "已成交", statuses: [], type: 3, num: res.finishedTotal },
      { label: "已关闭", statuses: [], type: 4, num: res.closedTotal },
    ];
  } else if (tabIndex.value === 2) {
    let res = await apiChanceSearchChanceBusinessList({
      pageNo: pageNo,
      pageSize: pageSize,
      id: "",
      startDate: params.value.startDate,
      endDate: params.value.endDate,
      customerName: "",
      customerPhone: "",
      customerCates: params.value.customerCates, //["B", "C", "D"],
      statuses: [], // params.value.statuses,
      directorIds: "",
      intentions: params.value.intentions, //["租赁", "购买"],
      sources: params.value.sources,
      searchType: 2,
      parkIds: params.value.parkIds,
      keyWords: params.value.keyWords,
      contactDays: "",
      notExistsDirector: false,
      stages: params.value.stages, //[30, 40],
      type: params.value.type,
      customerIndustries: params.value.customerIndustries, //["机械/制造", "制药/医疗", "交通/物流", "能源/化工/环保"],
      intentedAreaStart: params.value.intentedAreaStart, // 1,
      intentedAreaEnd: params.value.intentedAreaEnd, // 2,
    });
    if (!res) {
      zPageing.value.complete(false);
    }
    zPageing.value.complete(res.data);
    statusMapList.value = [
      { label: "全部", statuses: [], type: 0, num: res.totalNum },
      { label: "新商机", statuses: [], type: 1, num: res.newChanceBusinessNum },
      {
        label: "历史商机",
        statuses: [],
        type: 2,
        num: res.historyChanceBusinessNum,
      },
    ];
  }
};

const confirmParams = (obj: any) => {
  const headerParkStore = useHeaderPark();
  console.log("index confirmParams", obj);
  params.value.startDate = obj.startDate;
  params.value.endDate = obj.endDate;
  params.value.intentions = obj.intentions;
  params.value.customerCates = obj.customerCates;
  params.value.parks = obj.parks;
  params.value.parkIds =
    obj.parks && obj.parks.length > 0
      ? obj.parks.map((item: any) => item.id)
      : [headerParkStore.selectedId];
  params.value.sources = obj.sources;
  params.value.customerIndustries = obj.customerIndustries;
  params.value.stages = obj.stages;
  params.value.intentedAreaStart = obj.intentedAreaStart;
  params.value.intentedAreaEnd = obj.intentedAreaEnd;
  params.value.directors = obj.directors;
  params.value.directorIds = obj.directors.map((item: any) => item.customerId);
  zPageing.value.reload();
};
const jumpAdd = () => {
  uni.navigateTo({ url: `/pages/chance/edit` });
};
const jumpFollow = (item: any) => {
  uni.navigateTo({ url: `/pages/chance/gj-edit?chanceId=${item.id}` });
};
const jumpPhone = (item: any) => {
  uni.makePhoneCall({ phoneNumber: item.customerPhone });
};
const jumpWx = (item: any) => {
  // let url = "weixin://biz/ww/profile/";
  // let url = "weixin://";
  // plus.runtime.openURL(url);

  // var UIApplication = plus.ios.import("UIApplication");
  // var NSURL = plus.ios.import("NSURL");
  // var setting = NSURL.URLWithString("weixin://");
  // var application = UIApplication.sharedApplication();
  // application.openURL(setting);
  // plus.ios.deleteObject(setting);
  // plus.ios.deleteObject(application);

  uni.share({
    provider: "weixin",
    scene: "WXSceneSession",
    type: 1,
    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
    success: function (res) {
      uni.showToast({
        title: "success:" + JSON.stringify(res),
        icon: "none",
      });
      console.log("success:" + JSON.stringify(res));
    },
    fail: function (err) {
      uni.showToast({
        title: "fail:" + JSON.stringify(err),
        icon: "none",
      });
      console.log("fail:" + JSON.stringify(err));
    },
  });
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
    params.value.sources = [];
    params.value.directors = [];
    params.value.directorIds = [];
    if (val === 0) {
      params.value.statuses = [];
      params.value.type = undefined;
    } else if (val === 1) {
      params.value.statuses = [];
      params.value.type = 0;
    } else if (val === 2) {
      params.value.statuses = [];
      params.value.type = 0;
    }
    zPageing.value.reload();
  }
);

const clickCardItem = (item: any) => {
  uni.navigateTo({ url: `/pages/chance/detail?id=${item.id}` });
};
</script>

<style lang="scss" scoped>
.chance-page {
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

.chance-card-list {
  flex: 1;
  .chance-card {
    background-color: #ffffff;
    margin-top: 12px;
    border-radius: 12px;
    .chance-name {
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
.jump-add {
  position: fixed;
  right: 0;
  top: 70%;
  z-index: 999;
}
</style>
