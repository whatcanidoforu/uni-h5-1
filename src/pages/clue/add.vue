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
      <view class="center">{{ formData.customerName }}</view>
      <view class="right"></view>
    </view>

    <scroll-view class="base-detail page-content" scroll-y>
      <view class="card">
        <view class="label-value">
          <view class="label required">客户名称<span class="red">*</span></view>
          <uni-easyinput
            class="text-align-right"
            v-model="formData.customerName"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
        <view class="label-value">
          <view class="label">联系方式<span class="red">*</span></view>
          <uni-easyinput
            class="text-align-right"
            v-model="formData.customerPhone"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
        <view class="label-value" @click="clueParkCheckPopRef?.open()">
          <view class="label">园区<span class="red">*</span></view>
          <view class="value">{{ formData.parkName || "-" }}</view>
        </view>

        <view class="label-value" @click="clueSourcesCheckPopRef?.open()">
          <view class="label">渠道来源</view>
          <view class="value">{{ formData.source || "-" }}</view>
        </view>
        <view
          class="label-value"
          v-if="formData.source === '渠道中介'"
          @click="clueAgencyCheckPopRef?.open()"
        >
          <view class="label">中介名称</view>
          <view class="value">{{ formData.agencyName || "-" }}</view>
        </view>
        <view
          class="label-value"
          v-if="formData.source === '渠道中介'"
          @click="clueAgencyCheckPopRef?.open()"
        >
          <view class="label">中介联系人</view>
          <view class="value">{{ formData.agencyContact || "-" }}</view>
        </view>
        <view
          class="label-value"
          v-if="formData.source === '渠道中介'"
          @click="clueAgencyCheckPopRef?.open()"
        >
          <view class="label">中介联系方式</view>
          <view class="value">{{ formData.agencyMobile || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">公司名称</view>
          <uni-easyinput
            class="text-align-right"
            v-model="formData.customerCompany"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>

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
        <view class="label-value fj">
          <view class="label">上传附件</view>
          <view class="value">
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
              v-if="formData.fileInfos.length < 7"
              @click="clickAddFile"
              class="add-file-btn"
              src="@/static/icon_contact_list_add.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="btns">
      <view class="cancel btn">取消</view>
      <view class="confirm btn" @click="save">保存</view>
    </view>
  </view>

  <clueParkCheckPop
    ref="clueParkCheckPopRef"
    v-model:parks="parks"
    @confirm="confirmPark"
  />

  <clueAgencyCheckPop
    ref="clueAgencyCheckPopRef"
    v-model:agencyList="agencyList"
    @confirm="confirmAgency"
  />

  <clueSourcesCheckPop
    ref="clueSourcesCheckPopRef"
    v-model:sources="sources"
    @confirm="confirmSources"
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
import {
  apiChanceGetChanceClueDetail,
  apiChanceGetChanceContactList,
  apiChanceUpdateChance,
} from "@/http/api/clue";
import clueParkCheckPop from "@/pages/clue/components/clue-park-check-pop.vue";
import clueAgencyCheckPop from "@/pages/clue/components/clue-agency-check-pop.vue";
import clueSourcesCheckPop from "@/pages/clue/components/clue-sources-check-pop.vue";
import { checkStr } from "@/utils";
import { useHeaderPark } from "@/stores/park";
import { apiUploadFile } from "@/http/api/clue";

const headerParkStore = useHeaderPark();

const clueParkCheckPopRef = ref();
const clueAgencyCheckPopRef = ref();
const clueSourcesCheckPopRef = ref();

const parks = ref<any>([]);
const agencyList = ref<any>([]);
const sources = ref<any>([]);

const formData = ref<any>({
  fileInfos: [],
});
const chanceContactList = ref<any>([]);
const pageOption = ref();
onLoad((option) => {
  if (option?.id) {
    apiChanceGetChanceClueDetailFun(Number(option?.id));
    apiChanceGetChanceContactListFun(Number(option?.id));
  }
});
// 详情
const apiChanceGetChanceClueDetailFun = (id: number) => {
  apiChanceGetChanceClueDetail({ data: id }).then((res) => {
    console.log("apiChanceGetChanceClueDetail", res);
    formData.value = res;
  });
};
// 联系人
const apiChanceGetChanceContactListFun = (id: number) => {
  apiChanceGetChanceContactList({ data: id }).then((res) => {
    console.log("apiChanceGetChanceContactList", res);
    chanceContactList.value = res.chanceContactList;
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

const save = () => {
  if (!formData.value.customerName) {
    uni.showToast({
      title: "客户名称不能为空",
      icon: "none",
    });
    return false;
  }
  if (!formData.value.customerPhone) {
    uni.showToast({ title: "联系方式不能为空", icon: "none", mask: true });
    return false;
  }
  if (
    formData.value.customerPhone &&
    !checkStr(formData.value.customerPhone, "phone")
  ) {
    uni.showToast({ title: "联系方式格式错误", icon: "none", mask: true });
    return false;
  }

  if (!formData.value.parkName || !formData.value.parkId) {
    uni.showToast({ title: "园区不能为空", icon: "none", mask: true });
    return false;
  }
  formData.value.files = formData.value.fileInfos
    .map((item: any) => item.id)
    .join(",");
  apiChanceUpdateChance(formData.value).then((res) => {
    console.log("apiChanceUpdateChance", res);
    apiChanceGetChanceClueDetailFun(Number(formData.value.id));
    apiChanceGetChanceContactListFun(Number(formData.value.id));
    uni.showToast({ title: "保存成功", icon: "none", duration: 200 });
    setTimeout(() => {
      uni.navigateBack();
    }, 200);
  });
};

const confirmPark = (e: any) => {
  if (e && e.length > 0) {
    formData.value.parkName = e[0].parkName;
    formData.value.parkId = e[0].id;
  }
};
const confirmAgency = (e: any) => {
  if (e && e.length > 0) {
    formData.value.agencyId = e[0].id;
    formData.value.agencyName = e[0].contact;
    formData.value.agencyContact = e[0].name;
    formData.value.agencyMobile = e[0].mobile;
  }
};
const confirmSources = (e: any) => {
  console.log("confirmSources", e);
  if (e && e.length > 0) {
    formData.value.source = e[0];
    if (formData.value.source !== "渠道中介") {
      formData.value.agencyId = "";
      formData.value.agencyName = "";
      formData.value.agencyContact = "";
      formData.value.agencyMobile = "";
    }
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
    if (formData.value.fileInfos) {
      formData.value.fileInfos.push(res);
    } else {
      formData.value.fileInfos = [res];
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
  formData.value.fileInfos.splice(index, 1);
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

.phone-popup {
  background: #ffffff !important;
  :deep(.uni-popup__wrapper.bottom) {
    background-color: #ffffff !important;
  }
}
.phone-popup-content {
  background: #ffffff;
  .phone-item {
    height: 50px;
    padding-left: 50px;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    .iconfont {
      margin-right: 20px;
    }
    .phone {
      color: #1e9ade;
    }
  }
  .gray-line {
    height: 10px;
    background-color: #ebebeb;
  }
  .cancel {
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
  }
}

.a-link {
  color: #1e9ade !important;
  text-decoration: underline !important;
}
.blod {
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
</style>
