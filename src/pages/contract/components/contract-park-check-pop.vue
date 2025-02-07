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
        <view
          v-for="item in parks"
          :key="item.id"
          class="sources-item"
          @click="clickParkItem(item)"
        >
          <view class="label">{{ item.name }}</view>
          <uni-icons
            class="check"
            :type="useParks.map((ite: any) => ite.id).includes(item.id) ? 'circle-filled' : 'circle'"
            size="24"
          ></uni-icons>
        </view>
      </scroll-view>

      <view class="btns">
        <view class="cancel btn" @click="cancel">取消</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiGetUserAuthInfo } from "@/http/api/login";
import type { IPark } from "@/types/permission";

const clueSourcesCheckPopRef = ref();
const emit = defineEmits(["update:parks", "confirm"]);
const props = defineProps({
  parks: {
    type: Array,
    default: () => [],
  },
});
const allParks = ref<IPark[]>([]);
const parks = ref<IPark[]>([]);

const getAuthParks = async () => {
  try {
    const userId = localStorage.getItem("userId") || "";
    const res = await apiGetUserAuthInfo(userId);
    allParks.value = res.parks;
    parks.value = res.parks;
  } catch (e) {
    allParks.value = [];
  }
};

const searchValue = ref("");
const search = () => {
  const text = searchValue.value.replace(/\s/g, "");
  searchValue.value = text;
  if (text) {
    parks.value = allParks.value.filter((item) => item.name?.includes(text));
  } else {
    parks.value = allParks.value;
  }
};
const clickParkItem = (item: IPark) => {
  useParks.value.splice(0);
  useParks.value.push(item);
};

const useParks = ref();
const cancel = () => {
  close();
};
const confirm = () => {
  emit("update:parks", useParks.value);
  emit("confirm", useParks.value);
  close();
};

const open = () => {
  getAuthParks();
  useParks.value = [...props.parks];
  clueSourcesCheckPopRef.value.open();
};
const close = () => {
  useParks.value = [];
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
