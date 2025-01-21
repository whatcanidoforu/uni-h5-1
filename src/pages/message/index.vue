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
      <view class="center" @click="clickDelAll">
        {{ "消息通知" }}
        <span class="iconfont z-iconsaoba" style="font-size: 12px"></span>
      </view>
      <view class="right" @click="clickReadAll">全部已读</view>
    </view>

    <view class="page-content">
      <z-paging
        class="message-card-list"
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
          class="message-card"
          v-for="(item, index) in dataList"
          :key="'message-card' + index"
          @click="jumpCardDetail(item)"
        >
          <view class="message-name top">
            {{ item.title }}
            <view class="jump-area">
              <uni-icons type="right" size="12"></uni-icons>
              <view class="red-dot" v-if="!item.isRead"></view>
            </view>
          </view>
          <view class="detail line">
            <span>{{ item.createTime }}</span>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  apiSearchUserNotice,
  apiDeleteUserNoticeByUserId,
  apiReadUserNotice,
} from "@/http/api/message";
import type { TSearchNotice } from "@/types/message";
import { onLoad, onShow } from "@dcloudio/uni-app";

const init = () => {};
onMounted(() => {
  init();
});
const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
});
onShow(() => {
  zPageing.value.reload();
});
const dataList = ref<any>([]);
const zPageing = ref();
const userId = ref(Number(localStorage.getItem("userId")) as number);
const queryList = async (pageNo: number, pageSize: number) => {
  let res = await apiSearchUserNotice({
    userId: userId.value,
  });
  if (!res) {
    zPageing.value.complete(false);
  }
  zPageing.value.complete(res.data);

  // let item = {
  //   content:
  //     "交房提醒\n租赁位置:【1#栋203】 \n客户: 【LBS位置服务管理有限公司】 \n合同：【HT2024122307315494】\n负责人：彭文文\n信息：已超期【28】天未交房，请及时跟进交房信息！",
  //   createTime: "2025-01-20 09:30:52",
  //   createdBy: null,
  //   id: 125708,
  //   isRead: true,
  //   readTime: "2025-01-20 11:17:15",
  //   title: "交房提醒",
  //   url: "",
  //   userId: 6296,
  //   version: 0,
  // };
};

const jumpCardDetail = (item: any) => {
  uni.navigateTo({ url: `/pages/message/detail?id=${item.id}` });
};
const clickDelAll = () => {
  uni.showModal({
    title: "提示",
    content: "确定删除全部消息？",
    success: (res) => {
      if (res.confirm) {
        apiDeleteUserNoticeByUserId({
          data: userId.value,
        }).then((res) => {
          if (res) {
            uni.showToast({
              title: "删除成功",
            });
          }
        });
      }
    },
  });
};
const clickReadAll = () => {
  uni.showModal({
    title: "提示",
    content: "确定全部已读？",
    success: (res) => {
      if (res.confirm) {
        apiReadUserNotice({
          userId: userId.value,
        }).then((res) => {
          if (res) {
            uni.showToast({});
          }
        });
      }
    },
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

.message-card-list {
  flex: 1;
  .message-card {
    background-color: #ffffff;
    margin-top: 12px;
    border-radius: 12px;
    .message-name {
      font-size: 18px;
      height: 36px;
      line-height: 36px;
      color: #2e2e2e;
      padding-left: 14px;
      position: relative;
      padding-right: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .jump-area {
        color: #9b9b9b;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        width: 25px;
        .uni-icons {
          margin-left: 4px;
        }
        .red-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ff0000;
          position: relative;
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
</style>
