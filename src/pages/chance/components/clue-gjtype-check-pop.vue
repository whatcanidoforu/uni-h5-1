<template>
  <uni-popup ref="CheckPopRef" background-color="#fff" type="left">
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
        <template v-for="item in dataMapList">
          <view
            v-if="item[0].includes(searchValue)"
            :key="item[0]"
            class="sources-item"
            @click="clickDataItem(item)"
          >
            <view class="label">{{ item[0] }}</view>
            <uni-icons
              class="check"
              :type="useDataList.includes(item[0]) ? 'circle-filled' : 'circle'"
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

const CheckPopRef = ref();
const emit = defineEmits(["update:dataList", "confirm"]);
const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  multiply: {
    type: Boolean,
    default: true,
  },
});

const dataMapList = new Map([
  ["电话呼入", "电话呼入"],
  ["电询客户", "电询客户"],
  ["微信沟通", "微信沟通"],
  ["邮件沟通", "邮件沟通"],
  ["短信沟通", "短信沟通"],
  ["上门拜访", "上门拜访"],
  ["客户上门", "客户上门"],
  ["其它方式", "其它方式"],
]);

const searchValue = ref("");
const search = () => {
  console.log(searchValue.value);
};

const clickDataItem = (item: any) => {
  if (props.multiply) {
    if (useDataList.value.includes(item[0])) {
      useDataList.value.splice(useDataList.value.indexOf(item[0]), 1);
    } else {
      useDataList.value.push(item[0]);
    }
  } else {
    useDataList.value.splice(0);
    useDataList.value.push(item[0]);
  }
};

const useDataList = ref();
const cancel = () => {
  close();
};
const confirm = () => {
  emit("update:dataList", useDataList.value);
  emit("confirm", useDataList.value);
  close();
};

const open = () => {
  useDataList.value = [...props.dataList];
  CheckPopRef.value.open();
};
const close = () => {
  useDataList.value = [];
  CheckPopRef.value.close();
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
