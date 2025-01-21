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
      <view class="right" @click="jumpEdit">
        <span class="iconfont z-edit" style="font-size: 12px"></span>
        编辑
      </view>
    </view>

    <view class="tabs-list">
      <view
        class="tab"
        :class="{ active: tabIndex === 0 }"
        @click="tabIndex = 0"
      >
        资料详情
      </view>
      <view
        class="tab"
        :class="{ active: tabIndex === 1 }"
        @click="tabIndex = 1"
      >
        线索联系人
      </view>
      <view
        class="tab"
        :class="{ active: tabIndex === 2 }"
        @click="tabIndex = 2"
      >
        更多信息
      </view>
    </view>

    <scroll-view
      class="base-detail page-content"
      v-if="tabIndex === 0"
      scroll-y
    >
      <view class="card">
        <view class="tit">基本信息</view>
        <view class="label-value">
          <view class="label">线索编号</view>
          <view class="value a-link" @click="ClipboardData(formData.id)">
            {{ formData.id || "-" }}
          </view>
        </view>
        <view class="label-value">
          <view class="label">客户名称</view>
          <view class="value">{{ formData.customerName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">联系方式</view>
          <view class="value">{{ formData.customerPhone || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">园区</view>
          <view class="value">{{ formData.parkName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">公司名称</view>
          <view class="value">{{ formData.customerCompany || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">线索状态</view>
          <view class="value">{{ formData.statusName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">来源渠道</view>
          <view class="value">{{ formData.source || "-" }}</view>
        </view>

        <view class="label-value" v-if="formData.source === '渠道中介'">
          <view class="label">中介名称</view>
          <view class="value">{{ formData.agencyName || "-" }}</view>
        </view>
        <view class="label-value" v-if="formData.source === '渠道中介'">
          <view class="label">中介联系人</view>
          <view class="value">{{ formData.agencyContact || "-" }}</view>
        </view>
        <view class="label-value" v-if="formData.source === '渠道中介'">
          <view class="label">中介联系方式</view>
          <view class="value">{{ formData.agencyMobile || "-" }}</view>
        </view>

        <view class="label-value">
          <view class="label">线素负责人</view>
          <view class="value">{{ formData.directorName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">关联商机</view>
          <view class="value">{{ formData.businessChanceId || "-" }}</view>
        </view>
        <view class="label-value remark">
          <view class="label">备注</view>
          <view class="value">{{ formData.detail || "-" }}</view>
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
      <view class="card">
        <view class="tit">系统信息</view>
        <view class="label-value">
          <view class="label">创建人</view>
          <view class="value">{{ formData.createrName || "-" }}</view>
        </view>
        <view class="label-value">
          <view class="label">创建时间</view>
          <view class="value">
            {{
              formData.createTime ? formatDate(formData.createTime) || "" : "-"
            }}
          </view>
        </view>
        <view class="label-value">
          <view class="label">下次跟进时间</view>
          <view class="value">{{ 166718 }}</view>
        </view>
      </view>
    </scroll-view>
    <scroll-view
      class="director-detail page-content"
      v-if="tabIndex === 1"
      scroll-y
    >
      <view class="card" v-for="(item, index) in chanceContactList">
        <view class="label-value name">
          <view class="label">{{ item.name }}</view>
          <view class="value">{{ item.keyMan ? "关键决策人" : "" }}</view>
        </view>
        <view class="label-value">
          <view class="label">邮箱:</view>
          <view class="value">{{ item.email }}</view>
        </view>
        <view class="label-value">
          <view class="label">联系方式:</view>
          <view class="value">{{ item.phone }}</view>
        </view>
        <view class="label-value">
          <view class="label">备用联系方式:</view>
          <view class="value">{{ item.phone2 }}</view>
        </view>
        <view class="label-value">
          <view class="label">备注:</view>
          <view class="value">{{ item.remark }}</view>
        </view>
        <div class="director-btns-area">
          <view class="btn" @click="showPhonePop(item)">
            <view class="btn-text">
              <span class="iconfont z-dianhua" style="font-size: 14px"></span>
              电话
            </view>
          </view>
          <view class="btn">
            <view class="btn-text">
              <span class="iconfont z-youjian" style="font-size: 14px"></span>
              <uni-link
                color="#000000"
                class="value"
                :href="`mailto:`+item.email!"
                text="邮件"
                font-size="14"
              ></uni-link>
            </view>
          </view>

          <view class="btn" @click="jumpLxrEdit(item)" v-if="index > 0">
            <view class="btn-text">
              <span class="iconfont z-edit" style="font-size: 14px"></span>
              编辑
            </view>
          </view>
          <view class="btn" @click="delLxr(item)" v-if="index > 0">
            <view class="btn-text">
              <span class="iconfont z-shanchu" style="font-size: 14px"></span>
              删除
            </view>
          </view>
        </div>
      </view>
    </scroll-view>
    <scroll-view
      class="more-detail page-content"
      v-if="tabIndex === 2"
      scroll-y
    >
      <view class="card">
        <view class="label-value" @click="jumpGjList">
          <view class="label">
            <span class="iconfont z-genjinjilu" style="font-size: 17px"></span>
            跟进记录
          </view>
          <uni-icons class="right" type="right" size="18"></uni-icons>
        </view>
        <view class="label-value" @click="jumpCallLog">
          <view class="label">
            <span class="iconfont z-tonghuajilu" style="font-size: 9px"></span>
            通话记录
          </view>
          <uni-icons class="right" type="right" size="18"></uni-icons>
        </view>
        <view class="label-value" @click="jumpChangeLog">
          <view class="label">
            <span
              class="iconfont z-biangengrizhichaxun"
              style="font-size: 15px"
            ></span>
            变更日志
          </view>
          <uni-icons class="right" type="right" size="18"></uni-icons>
        </view>
      </view>
    </scroll-view>

    <view class="btns-area">
      <view class="btn" @click="jumpGjAdd">
        <span class="iconfont z-duihua" style="font-size: 20px"></span>
        新增跟进
      </view>
      <view class="btn" @click="jumpLxrAdd">
        <span
          class="iconfont z-tianjialianxiren"
          style="font-size: 20px"
        ></span>
        添加联系人
      </view>
      <view class="btn" @click="makePhoneCall(formData.customerPhone)">
        <span class="iconfont z-dianhua" style="font-size: 20px"></span>
        拨打电话
      </view>
      <view class="btn" @click="showMorePopup()">
        <span class="iconfont z-gengduo" style="font-size: 20px"></span>
        更多操作
      </view>
    </view>
  </view>

  <uni-popup
    ref="phonePopup"
    class="phone-popup"
    type="bottom"
    backgroundColor="transparent"
  >
    <view class="phone-popup-content">
      <view
        class="phone-item"
        v-for="item in phoneList"
        @click="makePhoneCall(item)"
      >
        <span class="iconfont z-dianhua" style="font-size: 16px"></span>
        <span class="phone">{{ item }}</span>
      </view>
      <view class="gray-line"> </view>
      <view class="cancel" @click="phonePopup?.close()"> 取消 </view>
    </view>
  </uni-popup>

  <uni-popup
    ref="morePopup"
    class="more-popup"
    type="bottom"
    backgroundColor="transparent"
  >
    <view class="more-popup-content">
      <view class="more-title">更多操作</view>
      <view class="more-item-list">
        <view class="more-item" @click="jumpEdit">
          <span class="iconfont z-edit" style="font-size: 16px"></span>
          <span class="txt">编辑线索</span>
        </view>
        <view class="more-item" @click="clickUnAssignChance">
          <span
            class="iconfont z-duankailianjie"
            style="font-size: 16px"
          ></span>
          <span class="txt">释放线索</span>
        </view>
        <view class="more-item" @click="clickDeleteChance">
          <span class="iconfont z-shanchu" style="font-size: 16px"></span>
          <span class="txt">删除线索</span>
        </view>
        <view class="more-item">
          <span class="iconfont z-zhuanshangji" style="font-size: 16px"></span>
          <span class="txt">转商机</span>
        </view>
        <view class="more-item" @click="clickSms">
          <span class="iconfont z-duihua" style="font-size: 16px"></span>
          <span class="txt">发送短信</span>
        </view>
      </view>
      <view class="cancel"> </view>
    </view>
  </uni-popup>

  <hbxw-confirm
    :is-show="showInfo.show"
    @cancel="showInfo.cancel"
    @sure="showInfo.sure"
    :title="showInfo.title"
    :content="showInfo.content"
  ></hbxw-confirm>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import hbxwConfirm from "@/uni_modules/hbxw-confirm/components/hbxw-confirm/hbxw-confirm.vue";
import {
  apiChanceGetChanceClueDetail,
  apiChanceGetChanceContactList,
  apiChanceDeleteChanceContact,
  apiChanceDeleteChance,
  apiChanceUnAssignChance,
} from "@/http/api/clue";
import { formatDate } from "@/utils/index";
import { useHeaderPark } from "@/stores/park";
import { sendSms } from "@/utils";

const headerParkStore = useHeaderPark();
const tabIndex = ref(0);

const formData = ref<any>({
  fileInfos: [],
});
const chanceContactList = ref<any>([]);
const pageOption = ref();
onLoad((option) => {
  pageOption.value = option;
});
const init = () => {
  apiChanceGetChanceClueDetailFun(Number(pageOption.value?.id));
  apiChanceGetChanceContactListFun(Number(pageOption.value?.id));
};
onShow(() => {
  init();
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
const ClipboardData = (e: any) => {
  uni.setClipboardData({
    data: e.toString(),
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
const phonePopup = ref();
const phoneList = ref<number[]>([]);
const showPhonePop = (e: any) => {
  console.log("e", e);
  phoneList.value = [];
  e.phone && phoneList.value.push(e.phone);
  e.phone2 && phoneList.value.push(e.phone2);
  phonePopup.value.open();
};
const makePhoneCall = (e: any) => {
  uni.makePhoneCall({
    phoneNumber: e,
  });
};

const morePopup = ref();
const showMorePopup = () => {
  morePopup.value.open();
};

const jumpEdit = () => {
  uni.navigateTo({ url: `/pages/clue/edit?id=${formData.value.id}` });
  morePopup.value?.close();
};

const showInfo = ref({
  show: false,
  title: "",
  content: "",
  cancel: () => {
    showInfo.value.show = false;
  },
  sure: () => {
    showInfo.value.show = false;
  },
});
// 释放
const clickUnAssignChance = () => {
  morePopup.value?.close();
  uni.showModal({
    title: "释放确认",
    content: "确认要释放该线索到线索池?",
    success: (res) => {
      if (res.confirm) {
        showInfo.value.show = false;
        apiChanceUnAssignChance([
          {
            id: formData.value.id,
            version: formData.value.version,
          },
        ]).then(() => {
          init();
          uni.showToast({ title: "释放成功", icon: "none", duration: 200 });
        });
      }
    },
  });
  // showInfo.value = {
  //   show: true,
  //   title: "释放确认",
  //   content: "确认要释放该线索到线索池?",
  //   cancel: () => {
  //     showInfo.value.show = false;
  //   },
  //   sure: () => {
  //     showInfo.value.show = false;
  //     apiChanceUnAssignChance([
  //       {
  //         id: formData.value.id,
  //         version: formData.value.version,
  //       },
  //     ]).then(() => {
  //       init();
  //       uni.showToast({ title: "释放成功", icon: "none", duration: 200 });
  //     });
  //   },
  // };
};
// 删除
const clickDeleteChance = () => {
  morePopup.value?.close();
  uni.showModal({
    title: "删除确认",
    content: "确认要删除该线索?",
    success: (res) => {
      if (res.confirm) {
        apiChanceDeleteChance({
          id: formData.value.id,
          version: formData.value.version,
        }).then(() => {
          uni.showToast({ title: "删除成功", icon: "none", duration: 200 });
          uni.navigateBack();
        });
      }
    },
  });

  // showInfo.value = {
  //   show: true,
  //   title: "删除确认",
  //   content: "确认要删除该线索?",
  //   cancel: () => {
  //     showInfo.value.show = false;
  //   },
  //   sure: () => {
  //     showInfo.value.show = false;
  //     apiChanceDeleteChance({
  //       id: formData.value.id,
  //       version: formData.value.version,
  //     }).then(() => {
  //       uni.showToast({ title: "删除成功", icon: "none", duration: 200 });
  //       uni.navigateBack();
  //     });
  //   },
  // };
};
const clickSms = () => {
  let phone = formData.value.customerPhone.toString(); // 手机号(可以是单个或则多个)
  let body = "客户, 你好"; // 短信发送的内容
  sendSms(phone, body);
  morePopup.value?.close();
};
const jumpGjAdd = () => {
  uni.navigateTo({
    url: `/pages/clue/gj-edit?chanceId=${pageOption.value.id}`,
  });
};
const jumpLxrAdd = () => {
  uni.navigateTo({
    url: `/pages/clue/lxr-edit?chanceId=${pageOption.value.id}`,
  });
};
const jumpLxrEdit = (item: any) => {
  uni.navigateTo({
    url: `/pages/clue/lxr-edit?chanceId=${pageOption.value.id}&id=${item.id}`,
  });
};
const delLxr = (item: any) => {
  apiChanceDeleteChanceContact({ id: item.id }).then((res) => {
    uni.showToast({ title: "删除成功", icon: "none", duration: 200 });
    init();
  });
};

const jumpGjList = () => {
  uni.navigateTo({
    url: `/pages/clue/gj-list?chanceId=${formData.value.id}`,
  });
};
const jumpCallLog = () => {
  uni.navigateTo({
    url: `/pages/clue/call-log?chanceId=${formData.value.id}`,
  });
};
const jumpChangeLog = () => {
  uni.navigateTo({
    url: `/pages/clue/change-log?chanceId=${formData.value.id}`,
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
.director-detail {
  .card {
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 10px 14px 0;
    margin-bottom: 10px;
    .label-value {
      font-size: 14px;
      min-height: 32px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .label {
        color: #686868;
        width: 100px;
        flex-shrink: 0;
      }
      .value {
        color: #3a3a3a;
        flex: 1;
        text-align: right;
      }
    }
    .label-value.name {
      .label {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .card:last-child {
    margin-bottom: 0;
  }
  .director-btns-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-top: 1px solid #ebebeb;
    font-size: 14px;
    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      .iconfont {
        margin-right: 6px;
      }
      .uni-link--withline {
        text-decoration: unset !important;
      }
    }
  }
}
.more-detail {
  .card {
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 0 14px;
    .label-value {
      font-size: 14px;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e3e3e3;
      .label {
        color: #686868;
        flex: 1;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 8px;
        }
      }
      .value {
        color: #3a3a3a;
        width: 76px;
        text-align: right;
      }
    }
  }
}

.btns-area {
  display: flex;
  width: 100vw;
  padding: 10px 0 30px;
  .btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    height: 40px;
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

.more-popup-content {
  background: #ffffff;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  .more-title {
    text-align: center;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    font-weight: 500;
  }
  .more-item-list {
    display: flex;
    flex-wrap: wrap;
  }
  .more-item {
    width: 25%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    .iconfont {
      margin-bottom: 10px;
      color: #686868;
    }
    .txt {
      font-size: 12px;
      color: #686868;
    }
  }
  .cancel {
    height: 30px;
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
</style>
