<template>
  <uni-popup ref="TagCheckPopRef" background-color="#fff" type="left">
    <view class="popup-content">
      <view class="pop-header">
        <uni-icons
          class="left"
          type="left"
          size="20"
          @click="close"
        ></uni-icons>
        <view class="center">{{ props.title }}</view>
        <view class="right"></view>
      </view>

      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="searchValue"
        @confirm="search"
        style="padding: 0; margin-top: 10px"
      />

      <scroll-view class="tag-list" scroll-y>
        <template v-for="item in MapList">
          <view
            v-if="item[0].includes(searchValue)"
            :key="item[0]"
            class="tag-item"
            @click="clickItem(item)"
          >
            <view class="label">{{ item[0] }}</view>
            <uni-icons
              class="check"
              :type="useTags.includes(item[0]) ? 'circle-filled' : 'circle'"
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

const TagCheckPopRef = ref();
const emit = defineEmits(["update:tags", "confirm"]);
const props = defineProps({
  title: {
    type: String,
    default: "项目选择",
  },
  tags: {
    type: Array,
    default: () => [],
  },
  MapList: {
    type: Map as any,
    default: () =>
      new Map([
        ["渠道中介", "渠道中介"],
        ["自主拓客", "自主拓客"],
        ["朋友介绍", "朋友介绍"],
        ["领导推荐", "领导推荐"],
        ["同事推荐", "同事推荐"],
        ["园区活动", "园区活动"],
        ["网站信息", "网站信息"],
        ["电销客户", "电销客户"],
        ["其它渠道", "其它渠道"],
      ]),
  },
});

const searchValue = ref("");
const search = () => {
  console.log(searchValue.value);
};

const clickItem = (item: any) => {
  if (useTags.value.includes(item[0])) {
    useTags.value.splice(useTags.value.indexOf(item[0]), 1);
  } else {
    useTags.value.push(item[0]);
  }
};

const useTags = ref();
const cancel = () => {
  close();
};
const confirm = () => {
  emit("update:tags", useTags.value);
  emit("confirm", useTags.value);
  close();
};

const open = () => {
  useTags.value = [...props.tags];
  TagCheckPopRef.value.open();
};
const close = () => {
  useTags.value = [];
  TagCheckPopRef.value.close();
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
.tag-list {
  background-color: #f4f8fb;
  height: 1px;
  flex: 1;
  .tag-item {
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
