<template>
  <view class="page">
    <view class="page-header">
      <uni-icons class="left" type="left" size="20" @click="back"></uni-icons>
      <view class="center"> 巡检提报 </view>
      <view class="right"> </view>
    </view>
    <view class="clue-card">
      <view class="title">
        <view class="left"> 1#东侧小路 </view>
      </view>
      <view class="label-value">
        <view class="label">巡检人：</view>
        <view class="value">张三</view>
      </view>
      <view class="label-value">
        <view class="label">巡检时间：</view>
        <view class="value">2025-01-01 09:00</view>
      </view>
      <view class="label-value" style="margin-bottom: 10px">
        <view class="label">巡检结果：</view>
        <view
          class="value"
          v-if="props.from === 'add'"
          :class="`status-color-0`"
        >
          <radio-group class="radio-group" @change="radioChange">
            <view class="radio-area">
              <radio color="#42d302" :value="1" :checked="formData.status" />
              <view style="color: #42d302">正常</view>
            </view>
            <view class="radio-area">
              <radio color="#ff1313" :value="0" :checked="!formData.status" />
              <view style="color: #ff1313">异常</view>
            </view>
          </radio-group>
        </view>
        <view
          v-else
          class="value"
          :style="{ color: formData.status ? '#42d302' : '#ff1313' }"
        >
          {{ formData.status ? "异常" : "正常" }}
        </view>
      </view>
    </view>
    <view class="content-area">
      <view class="title">请添加巡检描述</view>
      <view class="remark-area">
        <template v-if="props.from === 'add'">
          <uni-easyinput
            type="textarea"
            v-model="formData.remark"
            placeholder="请添加"
            maxlength="100"
          ></uni-easyinput>
          <span class="remark-len">{{
            formData.remark.length + " / " + 100
          }}</span>
        </template>
        <template v-else>{{ formData.remark }} </template>
      </view>
      <view class="title">* 请上传巡检图片</view>
      <view class="file-area">
        <template v-for="(item, index) in formData.fileInfos">
          <view class="file-item-out">
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
            <uni-icons
              class="del-btn"
              type="clear"
              size="20"
              @click="delFileItem(index)"
            ></uni-icons>
          </view>
        </template>
        <image
          v-if="formData.fileInfos.length < 3"
          @click="clickAddFile"
          class="add-file-btn"
          src="@/static/icon_contact_list_add.png"
          mode="aspectFill"
        ></image>
      </view>
    </view>
    <div class="bottom-btns-area">
      <div
        class="btn"
        @click="submit"
        :class="{ disabled: formData.fileInfos.length === 0 }"
      >
        提交
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
// var nfcModule = uni.requireNativePlugin("L-NfcModule");
// const modal = uni.requireNativePlugin("modal");

import { ref, computed, watch, onMounted } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useHeaderPark } from "@/stores/park";
import { apiUploadFile } from "@/http/api/clue";

const headerParkStore = useHeaderPark();
const tabIndex = ref(0);

const props = defineProps({
  from: {
    type: String,
    default: "detail",
  },
});

const formData = ref<any>({
  type: 0,
  remark:
    "撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒撒大大撒",
  fileInfos: [],
  status: 0, // 0异常 1正常
});
const init = () => {
  console.log("init inspection detail");
};
onMounted(() => {
  init();
});

const radioChange = (e: any) => {
  formData.value.status.value = e.detail.value;
};

const back = () => {
  uni.navigateBack();
};
const isPic = (url: any) => {
  console.log("url", url);
  const regex = /\.(bmp|gif|jpg|png|jpe?g|webp)$/i;
  return regex.test(url);
};
const fileName = ref("");
const fileType = ref("");
const currentFileItem = ref<any>();
const clickAddFile = () => {
  uni.chooseImage({
    success: (chooseImageRes: any) => {
      console.log("chooseImageRes", chooseImageRes);
      const tempFilePaths = chooseImageRes.tempFilePaths;
      currentFileItem.value = chooseImageRes.tempFiles[0];
      if (currentFileItem.value.size > 1024 * 1024 * 10) {
        return uni.showToast({
          title: "文件大小不能超过10MB",
          icon: "none",
          mask: true,
        });
      }
      fileName.value = currentFileItem.value.name.split(".")[0];
      fileType.value = currentFileItem.value.name.split(".")[1];
      apiUploadFile(
        currentFileItem.value,
        fileName.value + "." + fileType.value
      ).then((res) => {
        uni.showToast({ title: "上传成功", icon: "none", duration: 200 });
        if (formData.value.fileInfos) {
          formData.value.fileInfos.push(res);
        } else {
          formData.value.fileInfos = [res];
        }
      });
    },
  });
};
const delFileItem = (index: number) => {
  formData.value.fileInfos.splice(index, 1);
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
const submit = () => {
  if (formData.value.fileInfos.length === 0) {
    console.log("submit 1", formData);
    return;
  }
  console.log("submit 2", formData);
};
</script>

<style lang="scss" scoped>
view,
view {
  box-sizing: border-box;
}
.page {
  height: 100vh;
  overflow: hidden;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.page-header {
  padding-top: var(--status-bar-height);
  background-color: #fff;
  color: #686868;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
  }
  .left {
    justify-content: left;
    padding-left: 10px;
    box-sizing: border-box;
    width: 50px;
  }
  .right {
    font-size: 14px;
    width: 70px;
  }
  .center {
  }
}

.page-content {
  box-sizing: border-box;
  flex: 1;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-color-0 {
  color: #fd8f0a !important;
}
.status-color-1 {
  color: #1990ff !important;
}
.status-color-2 {
  color: #42d302 !important;
}

.clue-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 15px 15px 0;
  .title {
    display: flex;
    .left {
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      padding-right: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    .right {
      flex-shrink: 0;
      font-size: 12px;
    }
  }
  .label-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .label {
      color: rgba(153, 153, 153, 1);
      font-size: 12px;
      flex-shrink: 0;
      padding-right: 4px;
    }
    .value {
      flex: 1;
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .radio-group {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .radio-area {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      :deep(.uni-radio-input) {
        width: 16px !important;
        height: 16px !important;
        margin: 0 8px 0 12px;
      }
    }
  }
  .btn-area {
    margin-top: 10px;
    height: 38px;
    border-top: 1px solid rgba(187, 187, 187, 1);
    display: flex;
    align-items: center;
    .pic {
      width: 18px;
      height: 18px;
      padding-right: 4px;
    }
    .txt {
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
    }
  }
}

.content-area {
  background: #ffffff;
  margin-top: 10px;
  flex: 1;
  .title {
    margin: 20px 25px 0 25px;
    color: rgba(102, 102, 102, 1);
    font-size: 14px;
  }
  .remark-area {
    margin: 15px 25px 0 25px;
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    position: relative;
    .remark-len {
      position: absolute;
      right: 8px;
      bottom: 8px;
      color: rgba(204, 204, 204, 1);
      font-size: 12px;
    }
  }
  .file-area {
    margin: 15px 25px 0 25px;
    .file-item-out {
      display: inline-block;
      position: relative;
      .del-btn {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(-50%, -50%);
      }
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
    .add-file-btn {
      width: 60px;
      height: 60px;
      margin: 0 16px 10px 0;
      border: 1px solid #efebeb;
    }
  }
}
.bottom-btns-area {
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 12px;
    width: 258px;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn.disabled {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .btn:first-child {
    margin-right: 4px;
  }
}
</style>
