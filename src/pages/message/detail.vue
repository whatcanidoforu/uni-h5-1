<template>
  <view class="message-detail-page">
    <view class="page-header">
      <uni-icons
        class="left"
        type="left"
        size="20"
        @click="back"
        color="#000000"
      ></uni-icons>
      <view class="center">{{ "消息详情" }}</view>
      <view class="right"></view>
    </view>

    <view class="page-content">
      <view class="title"> {{ formData.title }} </view>
      <view class="time"> {{ formData.createTime }} </view>
      <view class="content"> {{ formData.content }} </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiGetUserNoticeDetail } from "@/http/api/message";
import { onLoad, onShow } from "@dcloudio/uni-app";

const formData = ref<any>({});
onLoad((option) => {
  apiGetUserNoticeDetailFun(Number(option?.id));
});
const apiGetUserNoticeDetailFun = async (id: number) => {
  const userId = ref(Number(localStorage.getItem("userId")) as number);
  apiGetUserNoticeDetail({
    id,
    userId: userId.value,
  })
    .then((res) => {
      //       {
      //     "content": "交房提醒\n租赁位置:【1#栋203】 \n客户: 【LBS位置服务管理有限公司】 \n合同：【HT2024122307315494】\n负责人：彭文文\n信息：已超期【28】天未交房，请及时跟进交房信息！",
      //     "createTime": "2025-01-20 09:30:52",
      //     "createdBy": null,
      //     "deleted": false,
      //     "id": 125708,
      //     "isRead": true,
      //     "oid": 1,
      //     "readTime": "2025-01-20 11:17:15",
      //     "title": "交房提醒",
      //     "url": "",
      //     "userId": 6296,
      //     "version": 0
      // }
      if (res && res.id) {
        formData.value = res;
      } else {
        uni.showToast({
          title: "获取详情失败",
          icon: "none",
        });
      }
    })
    .catch((err) => {
      uni.showToast({
        title: err || err.message || "获取详情失败",
        icon: "none",
      });
    });
};

const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.message-detail-page {
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
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
  word-break: break-all;

  .title {
    font-size: 25px;
    text-align: left;
  }
  .time {
    font-size: 16px;
    padding: 6px 0;
    text-align: left;
    color: #c5c5c5;
  }
  .content {
    color: #7c7c7c;
    font-size: 20px;
    padding: 20px 0 0;
  }
}
</style>
