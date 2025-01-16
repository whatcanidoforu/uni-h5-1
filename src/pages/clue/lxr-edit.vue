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
      <view class="center">
        {{ pageOption.id ? "编辑联系人" : "新建联系人" }}
      </view>
      <view class="right"></view>
    </view>

    <scroll-view class="base-detail page-content" scroll-y>
      <view class="card">
        <view class="label-value">
          <view class="label">客户姓名<span class="red">*</span></view>
          <uni-easyinput
            class="text-align-right value"
            v-model="formData.name"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
        <view class="label-value">
          <view class="label">手机<span class="red">*</span></view>
          <uni-easyinput
            class="text-align-right value"
            v-model="formData.phone"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
        <view class="label-value">
          <view class="label">手机2</view>
          <uni-easyinput
            class="text-align-right value"
            v-model="formData.phone2"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
        <view class="label-value">
          <view class="label">邮箱地址</view>
          <uni-easyinput
            class="text-align-right value"
            v-model="formData.email"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
        <view class="label-value radio">
          <view class="label">关键决策人</view>
          <radio-group class="value" @change="radioChange">
            <radio
              :checked="formData.keyMan"
              :value="true"
              style="margin-right: 10px"
              >是</radio
            >
            <radio :checked="!formData.keyMan" :value="false">否</radio>
          </radio-group>
        </view>
        <view class="label-value remark">
          <view class="label">备注</view>
          <uni-easyinput
            class="value"
            type="textarea"
            v-model="formData.remark"
            placeholder="请输入"
            :trim="true"
            :clearable="false"
            :inputBorder="false"
          ></uni-easyinput>
        </view>
      </view>
    </scroll-view>

    <view class="btns">
      <view class="cancel btn">取消</view>
      <view class="confirm btn" @click="save">保存</view>
    </view>
  </view>

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
  apiChanceGetChanceContactList,
  apiChanceCreateChanceContact,
  apiChanceUpdateChanceContact,
} from "@/http/api/clue";
import { checkStr } from "@/utils";
import { useHeaderPark } from "@/stores/park";
import { apiUploadFile } from "@/http/api/clue";

const headerParkStore = useHeaderPark();

const userId = ref(Number(localStorage.getItem("userId")) as number);
const formData = ref<any>({
  name: "",
  phone: "",
  phone2: "",
  email: "",
  position: "", // 职位
  keyMan: false,
  remark: "",
  chanceId: "",
  id: "",
});

const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
  formData.value.chanceId = pageOption.value.chanceId;
  if (pageOption.value.id) {
    apiChanceGetChanceContactListFun();
  }
});

const save = () => {
  console.log("formData", formData.value);
  if (!formData.value.name) {
    uni.showToast({ title: "跟进人员不能为空", icon: "none", mask: true });
    return false;
  }
  if (!formData.value.phone) {
    uni.showToast({ title: "手机不能为空", icon: "none", mask: true });
    return false;
  }
  if (formData.value.phone && !checkStr(formData.value.phone, "phone")) {
    uni.showToast({ title: "手机格式错误", icon: "none", mask: true });
    return false;
  }
  if (formData.value.phone2 && !checkStr(formData.value.phone2, "phone")) {
    uni.showToast({ title: "手机2格式错误", icon: "none", mask: true });
    return false;
  }
  if (formData.value.email && !checkStr(formData.value.email, "email")) {
    uni.showToast({ title: "邮箱地址格式错误", icon: "none", mask: true });
    return false;
  }
  if (pageOption.value.id) {
    apiChanceUpdateChanceContact(formData.value).then((res) => {
      console.log("apiCreateContact", res);
      uni.showToast({ title: "保存成功", icon: "none", duration: 200 });
      setTimeout(() => {
        uni.navigateBack();
      }, 200);
    });
  } else {
    apiChanceCreateChanceContact(formData.value).then((res) => {
      console.log("apiCreateContact", res);
      uni.showToast({ title: "保存成功", icon: "none", duration: 200 });
      setTimeout(() => {
        uni.navigateBack();
      }, 200);
    });
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

const radioChange = (e: any) => {
  console.log("radioChange", e);
  formData.value.keyMan = e.detail.value;
};

const chanceContactDetail = ref<any>();
const chanceContactList = ref<any>([]);
// 联系人
const apiChanceGetChanceContactListFun = () => {
  apiChanceGetChanceContactList({ data: pageOption.value.chanceId }).then(
    (res) => {
      console.log("apiChanceGetChanceContactList", res);
      chanceContactList.value = res.chanceContactList;
      formData.value = chanceContactList.value.filter(
        (item: any) => item.id == pageOption.value.id
      )[0];
    }
  );
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
    .label-value.radio {
      :deep(.uni-radio-input) {
        width: 15px;
        height: 15px;
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
