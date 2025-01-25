<template>
  <view class="clue-detail-page">
    <view class="page-header">
      <uni-icons
        class="left"
        type="left"
        size="20"
        @click="back"
        color="#fff"
      ></uni-icons>
      <view class="center">锁定详情</view>
      <view class="right"></view>
    </view>

    <view class="tabs-list">
      <view
        class="tab"
        :class="{ active: tabIndex === 0 }"
        @click="tabIndex = 0"
      >
        基本信息
      </view>
      <view
        class="tab"
        :class="{ active: tabIndex === 1 }"
        @click="tabIndex = 1"
      >
        锁定资源
      </view>
    </view>

    <scroll-view
      class="base-detail page-content"
      v-if="tabIndex === 0"
      scroll-y
    >
      <view class="card">
        <!-- <view class="tit">系统信息</view> -->
        <view class="label-value">
          <view class="label">合同状态</view>
          <view class="value">{{ formData.statusName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">申请人</view>
          <view class="value">
            <view class="value">{{ formData.createByName || "-" }}</view>
          </view>
        </view>
        <view class="label-value">
          <view class="label">锁定类型</view>
          <view class="value">{{ formData.lockTypeName }}</view>
        </view>
      </view>

      <view class="card">
        <view class="tit">基本信息</view>
        <view class="label-value">
          <view class="label">锁定编号</view>
          <view class="value">{{ formData.code || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">锁定客户</view>
          <view class="value">{{ formData.customerName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">锁定时间</view>
          {{
            formData.createTime ? formatDate(formData.createTime) || "" : "-"
          }}
        </view>
        <view class="label-value">
          <view class="label">释放时间</view>
          {{
            formData.releaseTime ? formatDate(formData.releaseTime) || "" : "-"
          }}
        </view>
        <view class="label-value">
          <view class="label">审核时间</view>
          {{
            formData.verifyTime ? formatDate(formData.verifyTime) || "" : "-"
          }}
        </view>
        <view class="label-value">
          <view class="label">审核人</view>
          <view class="value">{{ formData.verifiedByName || "-" }}</view>
        </view>
        <view class="label-value remark">
          <view class="label">锁定原因</view>
          <view class="value">{{ formData.lockReason || "-" }}</view>
        </view>
        <view class="label-value fj">
          <view class="label">附件 </view>
          <view class="value">
            <template v-for="item in formData.fileInfos">
              <image
                v-if="isPic(item.url)"
                class="pic"
                :key="item.url + '-image'"
                :src="item.url"
                @click="previewImage(item.url)"
                mode="aspectFill"
              ></image>
              <view
                v-else
                class="file"
                :key="item.url + '-file'"
                @click="clickFile(item.url)"
              ></view>
            </template>
          </view>
        </view>
      </view>
    </scroll-view>
    <scroll-view
      class="base-detail page-content"
      v-if="tabIndex === 1"
      scroll-y
    >
      <view class="card">
        <!-- <view class="tit">系统信息</view> -->
        <view class="label-value">
          <view class="label">状态</view>
          <view class="value">{{ formData.statusName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">申请人</view>
          <view class="value">{{ formData.createByName }}</view>
        </view>
        <view class="label-value">
          <view class="label">锁定类型</view>
          <view class="value">{{ formData.lockTypeName }}</view>
        </view>
      </view>
      <view class="card" v-for="item in formData.details">
        <view class="label-value tit">
          <view class="label">资源名称</view>
          <view class="value">{{ item.name || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">装修类型</view>
          <view class="value">{{ item.fitUp || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">计费面积</view>
          <view class="value">{{ item.buildingArea || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">朝向</view>
          <view class="value">{{ item.exposure || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">园区名称</view>
          <view class="value">{{ item.parkName || "-" }}</view>
        </view>
      </view>
    </scroll-view>

    <view
      class="btns-area"
      v-if="formData.status === 0 || formData.status === 10"
    >
      <view class="release btn" @click="release" v-if="formData.status === 0">
        审批驳回
      </view>
      <view class="verify btn" @click="verify" v-if="formData.status === 0">
        审批通过
      </view>
      <view class="verify btn" @click="release" v-if="formData.status === 10">
        释放
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { apiVerifyLockApply, apiReleaseLockApply } from "@/http/api/space";
import { apiGetApplyLock } from "@/http/api/space";
import { formatDate } from "@/utils/index";
import { useHeaderPark } from "@/stores/park";

const headerParkStore = useHeaderPark();
const tabIndex = ref(0);

const formData = ref<any>({
  fileInfos: [],
});
const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
});
const init = () => {
  apiGetApplyLockFun(pageOption.value?.code);
};
onShow(() => {
  init();
});

const apiGetApplyLockFun = (code: string) => {
  apiGetApplyLock(code).then((res) => {
    console.log("apiGetApplyLock", res);
    if (res) {
      formData.value = res;
    }
  });
};
const isPic = (url: any) => {
  console.log("url", url);
  const regex = /\.(bmp|gif|jpg|png|jpe?g|webp)$/i;
  return regex.test(url);
};

const previewImage = (url: any) => {
  uni.previewImage({
    urls: [url],
    longPressActions: {
      itemList: ["保存图片"],
    },
  });
};
const clickFile = (url: any) => {
  uni.downloadFile({
    url: url,
    success: function (res) {
      var filePath = res.tempFilePath;
      uni.openDocument({
        filePath: filePath,
        showMenu: true,
      });
    },
  });
};

// 审核通过
const verify = () => {
  uni.showModal({
    title: "提示",
    content: "确定审核通过吗?",
    success: (res) => {
      if (res.confirm) {
        apiVerifyLockApply({
          applyCode: formData.value.code,
          version: formData.value.version,
        }).then(() => {
          uni.showToast({ title: "审核通过", icon: "none", duration: 200 });
          init();
        });
      }
    },
  });
};

// 释放资源
const release = () => {
  uni.showModal({
    title: "提示",
    content: "确定审核驳回吗?",
    success: (res) => {
      if (res.confirm) {
        apiReleaseLockApply({
          applyCode: formData.value.code,
          version: formData.value.version,
        }).then(() => {
          uni.showToast({ title: "释放成功", icon: "none", duration: 200 });
          setTimeout(() => {
            uni.navigateBack();
          }, 300);
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
.clue-detail-page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-image: linear-gradient(
    180deg,
    #029deb 0,
    rgb(244, 247, 255) 300px,
    rgb(244, 247, 255) 100%
  );
}
view {
  box-sizing: border-box !important;
}
.page-header {
  color: #fff;
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
.tabs-list {
  display: flex;
  padding: 20px 0;
  .tab {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #ffffff;

    position: relative;
  }
  .tab.active::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 3px;
    background-color: #ffffff;
  }
}

.page-content {
  box-sizing: border-box;
  flex: 1;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px;
}
.base-detail {
  .card {
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 0 14px;
    margin-bottom: 10px;
    .tit {
      font-size: 14px;
      color: #000000;
      font-weight: 600;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .label-value {
      font-size: 14px;
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e3e3e3;
      .label {
        color: #686868;
        width: 90px;
        flex-shrink: 0;
      }
      .value {
        color: #3a3a3a;
        flex: 1;
        text-align: right;
      }
    }
    .label-value.remark {
      display: block;
      .label {
        width: 100%;
        height: 36px;
        line-height: 36px;
      }

      .value {
        min-height: 100px;
        text-align: left;
      }
    }
    .label-value.fj {
      display: block;

      .label {
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-weight: 600;
      }

      .value {
        min-height: 100px;
        text-align: left;
        .pic {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin: 0 16px 10px 0;
        }
        .file {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin: 0 16px 10px 0;
          background: url("~@/static/icon_file.png") no-repeat;
          background-size: 60px 60px;
        }
      }
    }
  }
}

.btns-area {
  display: flex;
  width: 100vw;
  padding: 10px 10px 30px;
  .btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    height: 40px;
    margin-right: 10px;
    border-radius: 6px;
  }
  .release {
    color: #ff3503;
    border: 1px solid #ff3503;
  }
  .verify {
    color: #ffffff;
    background-color: #019aee;
  }
  .btn:last-child {
    margin-right: 0;
  }
}

.a-link {
  color: #1e9ade !important;
  text-decoration: underline !important;
}
.blod {
}
</style>
