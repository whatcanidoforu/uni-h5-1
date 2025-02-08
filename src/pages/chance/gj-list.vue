<template>
  <view class="clue-page">
    <view class="page-header">
      <uni-icons
        class="left"
        type="left"
        size="20"
        @click="back"
        color="#000000"
      ></uni-icons>
      <view class="center">{{ "跟进记录" }}</view>
      <view class="right"></view>
    </view>

    <view class="page-content">
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
          @click="jumpGjDetail(item)"
        >
          <view class="clue-name top">
            {{ item.communicateTime.split(" ")[0] }}
            <view class="jump-area">
              {{ item.type }}
              <uni-icons type="right" size="12"></uni-icons>
            </view>
          </view>
          <view class="detail center">{{ item.detail }}</view>
          <view class="communicator center"
            >跟进人: {{ item.communicatorName }}</view
          >
        </view>
      </z-paging>
    </view>
  </view>

  <uni-icons
    class="jump-add"
    type="plus-filled"
    size="60"
    color="#009bf4"
    @click="jumpGjAdd"
  ></uni-icons>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { apiSearchChanceContactRecord } from "@/http/api/clue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useHeaderPark } from "@/stores/park";

const tabIndex = ref(0);

const params = ref<any>({});
const init = () => {};
onMounted(() => {
  init();
});
const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
});
onShow(() => {
  const headerParkStore = useHeaderPark();
  params.value = {
    pageNo: 1,
    pageSize: 10,
    keyWords: "",
    type: 0,
    startDate: "",
    endDate: "",
    directors: [],
    directorIds: 0,
    stages: [],
    parkIds: headerParkStore.selectedId ? [headerParkStore.selectedId] : [],
    parks: headerParkStore.parks.filter(
      (item) => item.id === headerParkStore.selectedId
    ),
    sources: [],
    notExistsDirector: false,
  };
  zPageing.value.reload();
});
const dataList = ref<any>([]);
const zPageing = ref();
const queryList = async (pageNo: number, pageSize: number) => {
  let res = await apiSearchChanceContactRecord({
    pageNo: pageNo,
    pageSize: pageSize,
    communicateStartTime: "",
    communicateEndTime: "",
    createStartTime: "",
    createEndTime: "",
    keyWord: "",
    type: [],
    chanceId: Number(pageOption.value.chanceId),
  });
  if (!res) {
    zPageing.value.complete(false);
  }
  zPageing.value.complete(res.data);
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
      params.value.type = 0;
    } else if (val === 1) {
      params.value.type = 0;
    } else if (val === 2) {
      params.value.type = 1;
    }
    zPageing.value.reload();
  }
);

const jumpGjDetail = (item: any) => {
  uni.navigateTo({ url: `/pages/clue/gj-detail?id=${item.id}` });
};
const jumpGjAdd = () => {
  uni.navigateTo({
    url: `/pages/clue/gj-edit?chanceId=${pageOption.value.chanceId}`,
  });
};
const back = () => {
  uni.navigateBack();
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
    width: 50px;
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
    width: max-content;
    font-size: 13px;
    justify-content: right;
    padding-right: 14px;
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

.clue-card-list {
  flex: 1;
  .clue-card {
    background-color: #ffffff;
    margin-top: 12px;
    border-radius: 12px;
    .clue-name {
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
        color: #9b9b9b;
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
    .detail {
      font-size: 16px;
      min-height: 30px;
      word-break: break-all;
      min-height: 30px;
      color: #9b9b9b;
      padding-left: 14px;
    }
    .communicator {
      font-size: 14px;
      min-height: 28px;
      line-height: 28px;
      color: #9b9b9b;
      padding-left: 14px;
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
