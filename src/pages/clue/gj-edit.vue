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
      <view class="center">{{ "新增跟进" }}</view>
      <view class="right"></view>
    </view>

    <scroll-view class="base-detail page-content" scroll-y>
      <view class="card">
        <view class="label-value" @click="clueDirectorIdsCheckPopRef?.open()">
          <view class="label">跟进人员<span class="red">*</span></view>
          <view class="value"> {{ formData.communicatorName }} </view>
        </view>
        <view class="label-value time">
          <view class="label">跟进日期<span class="red">*</span></view>
          <uni-datetime-picker
            class="value"
            type="date"
            :clear-icon="false"
            v-model="formData.communicateTime"
          >
            <view class="time-cot"
              >{{ formData.communicateTime.split(" ")[0] }}
            </view>
          </uni-datetime-picker>
        </view>
        <view class="label-value" @click="clueGjtypeCheckPopRef?.open()">
          <view class="label">跟进方式<span class="red">*</span></view>
          <view class="value">{{ formData.type || "-" }}</view>
        </view>
      </view>
      <view class="card">
        <view class="label-value remark">
          <view class="label">备注</view>
          <uni-easyinput
            type="textarea"
            v-model="formData.detail"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
      </view>
      <view class="card">
        <view class="label-value fj">
          <view class="label">上传附件</view>
          <view class="value">
            <template v-for="(item, index) in formData.files">
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
              v-if="formData.files.length < 7"
              @click="clickAddFile"
              class="add-file-btn"
              src="@/static/icon_contact_list_add.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <view class="label-value time">
          <view class="label">下次跟进时间</view>
          <uni-datetime-picker
            class="value"
            type="date"
            :clear-icon="false"
            v-model="formData.nextContactTime"
          >
            <view class="time-cot">{{ formData.nextContactTime }} </view>
          </uni-datetime-picker>
        </view>
      </view>
    </scroll-view>

    <view class="btns">
      <view class="cancel btn">取消</view>
      <view class="confirm btn" @click="save">保存</view>
    </view>
  </view>

  <clueAgencyCheckPop
    ref="clueAgencyCheckPopRef"
    v-model:agencyList="agencyList"
    @confirm="confirmAgency"
  />

  <clueGjtypeCheckPop
    ref="clueGjtypeCheckPopRef"
    v-model:dataList="gjtypeList"
    :multiply="false"
    @confirm="confirmGjtype"
  />
  <clueDirectorIdsCheckPop
    ref="clueDirectorIdsCheckPopRef"
    v-model:directors="directors"
    :multiply="false"
    @confirm="confirmDirectorIds"
  />

  <uni-popup ref="FileNameRef" type="dialog">
    <uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="请输入文件名"
      confirmText="确定"
      cancelText="取消"
      @confirm="confirmFileName"
    >
      <template #default>
        <uni-easyinput v-model="fileName" placeholder="请输入"></uni-easyinput>
        <view class="file-name-pop-content">{{ fileType }}</view>
      </template>
    </uni-popup-dialog>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { apiCrmCreateChanceContactRecord } from "@/http/api/clue";
import clueAgencyCheckPop from "@/pages/clue/components/clue-agency-check-pop.vue";
import clueGjtypeCheckPop from "@/pages/clue/components/clue-gjtype-check-pop.vue";
import clueDirectorIdsCheckPop from "@/pages/clue/components/clue-directorIds-check-pop.vue";

import { apiUploadFile } from "@/http/api/clue";

const clueAgencyCheckPopRef = ref();
const clueGjtypeCheckPopRef = ref();
const clueDirectorIdsCheckPopRef = ref();

const agencyList = ref<any>([]);
const gjtypeList = ref<any>([]);
const directors = ref([]);

const userId = ref(Number(uni.getStorageSync("userId")) as number);
const formData = ref<any>({
  chanceId: "", // 线索id
  type: "", // 跟进方式
  title: "",
  detail: "", // 跟进内容
  communicatorId: userId.value, // 跟进人id
  communicateTime: "", // 跟进日期
  files: [],
  communicatorName: "",
  nextContactTime: "", // 下次跟进时间
});

const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
  formData.value.chanceId = pageOption.value.chanceId;
});
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

const save = () => {
  console.log("formData", formData.value);
  if (!formData.value.communicatorName) {
    uni.showToast({ title: "跟进人员不能为空", icon: "none", mask: true });
    return false;
  }
  if (!formData.value.communicateTime) {
    uni.showToast({ title: "跟进日期不能为空", icon: "none", mask: true });
    return false;
  }

  if (!formData.value.type) {
    uni.showToast({ title: "跟进方式不能为空", icon: "none", mask: true });
    return false;
  }

  apiCrmCreateChanceContactRecord(formData.value).then((res) => {
    console.log("apiCrmCreateChanceContactRecord", res);
    uni.showToast({ title: "保存成功", icon: "none", duration: 200 });
    setTimeout(() => {
      uni.navigateBack();
    }, 200);
  });
};

const confirmAgency = (e: any) => {
  if (e && e.length > 0) {
    formData.value.agencyId = e[0].id;
    formData.value.agencyName = e[0].contact;
    formData.value.agencyContact = e[0].name;
    formData.value.agencyMobile = e[0].mobile;
  }
};
const confirmGjtype = (e: any) => {
  console.log("confirmGjtype", e);
  if (e && e.length > 0) {
    formData.value.type = e[0];
  }
};
const confirmDirectorIds = (e: any) => {
  console.log("confirmDirectorIds", e);
  if (e && e.length > 0) {
    formData.value.communicatorId = e[0].customerId;
    formData.value.communicatorName = e[0].customerName;
  }
};

const fileName = ref("");
const fileType = ref("");
const FileNameRef = ref();
const currentFileItem = ref<any>();
const confirmFileName = () => {
  console.log("fileName", fileName.value);
  if (!fileName.value) {
    return uni.showToast({
      title: "名称不能为空",
      icon: "none",
      mask: true,
    });
  }
  apiUploadFile(
    currentFileItem.value,
    fileName.value + "." + fileType.value
  ).then((res) => {
    uni.showToast({ title: "上传成功", icon: "none", duration: 200 });
    if (formData.value.files) {
      formData.value.files.push(res);
    } else {
      formData.value.files = [res];
    }
  });
};
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
      FileNameRef.value.open();
    },
  });
};
const delFileItem = (index: number) => {
  formData.value.files.splice(index, 1);
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
  :deep(.uni-file-picker__lists) {
    display: none !important;
  }
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
    font-size: 13px;
    justify-content: right;
    padding-right: 14px;
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
    margin-bottom: 10px;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 0 14px;
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
        position: relative;
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
  }
  .card:last-child {
    margin-bottom: 0 !important;
  }
}

.btns {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  .btn {
    border-radius: 4px;
    flex: 1;
    height: 40px;
    border: 1px solid #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cancel {
    margin-right: 20px;
  }
  .confirm {
    color: #fff;
    background-color: #009beb;
  }
}

.text-align-right {
  text-align: right !important;

  :deep(.uni-easyinput__content-input) {
    padding-right: 0 !important;
  }
}
.red {
  color: red;
}

.file-name-pop-content {
  background-color: #efecec;
  color: #6a6a6a;
  height: 37px;
  line-height: 37px;
  padding: 0 10px;
}

.time {
  :deep(.icon-calendar) {
    display: none;
  }
  :deep(.uni-date__x-input) {
    text-align: right;
  }
  :deep(.uni-date-editor--x.uni-date-x--border) {
    border: 1px solid transparent !important;
  }
  .time-cot {
    text-align: right;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  :deep(.uni-date-editor) {
    height: 36px;
  }
}
</style>
