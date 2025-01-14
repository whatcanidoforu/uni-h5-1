<template>
  <uni-popup ref="clueSourcesCheckPopRef" background-color="#fff" type="left">
    <view class="popup-content">
      <view class="pop-header">
        <uni-icons
          class="left"
          type="left"
          size="20"
          @click="close"
        ></uni-icons>
        <view class="center">项目选择</view>
        <view class="right"></view>
      </view>

      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="searchValue"
        @confirm="search"
        style="padding: 0; margin-top: 10px"
      />

      <scroll-view class="sources-list" scroll-y>
        <template v-for="item in sourcesList">
          <view
            v-if="item[0].includes(searchValue)"
            :key="item[0]"
            class="sources-item"
            @click="clickSourcesItem(item)"
          >
            <view class="label">{{ item[0] }}</view>
            <uni-icons
              class="check"
              :type="useSources.includes(item[0]) ? 'circle-filled' : 'circle'"
              size="24"
            ></uni-icons>
          </view>
        </template>
      </scroll-view>

      <view class="btns">
        <view class="cancel btn" @click="cancel">取消</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const clueSourcesCheckPopRef = ref();
const emit = defineEmits(["update:sources", "confirm"]);
const props = defineProps({
  sources: {
    type: Array,
    default: () => [],
  },
});

const sourcesList = new Map([
  ["渠道中介", "渠道中介"],
  ["自主拓客", "自主拓客"],
  ["朋友介绍", "朋友介绍"],
  ["领导推荐", "领导推荐"],
  ["同事推荐", "同事推荐"],
  ["园区活动", "园区活动"],
  ["网站信息", "网站信息"],
  ["电销客户", "电销客户"],
  ["其它渠道", "其它渠道"],
]);

const searchValue = ref("");
const search = () => {
  console.log(searchValue.value);
};

const clickSourcesItem = (item: any) => {
  if (useSources.value.includes(item[0])) {
    useSources.value.splice(useSources.value.indexOf(item[0]), 1);
  } else {
    useSources.value.push(item[0]);
  }
};

const useSources = ref();
const cancel = () => {
  close();
};
const confirm = () => {
  emit("update:sources", useSources.value);
  emit("confirm", useSources.value);
  close();
};

const open = () => {
  useSources.value = [...props.sources];
  clueSourcesCheckPopRef.value.open();
};
const close = () => {
  useSources.value = [];
  clueSourcesCheckPopRef.value.close();
};

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.popup-content {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.pop-header {
  background-color: #fff;
  color: #686868;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.uni-searchbar {
  margin: 10px;
  :deep(.uni-searchbar__box) {
    background-color: #fafafa !important;
  }
}
.sources-list {
  background-color: #f4f8fb;
  height: 1px;
  flex: 1;
  .sources-item {
    background-color: #fff;
    margin: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-radius: 8px;
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
</style>
