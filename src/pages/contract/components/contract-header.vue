<template>
  <view class="contract-page-header">
    <uni-icons class="left" type="left" size="20" @click="back"></uni-icons>
    <view class="center">
      <view
        class="item"
        :class="{ active: tabIndex === 0 }"
        @click="changeTabIndex(0)"
        >我的合同</view
      >
      <view
        class="item"
        :class="{ active: tabIndex === 1 }"
        @click="changeTabIndex(1)"
        >团队合同</view
      >
    </view>
    <view class="right" @click="showPop">
      <uni-icons type="search" size="18"></uni-icons>
      筛选
    </view>
  </view>
  <contractFilterPop
    ref="contractFilterPopRef"
    @confirm="confirm"
    :tabIndex="props.tabIndex"
    :params="props.params"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import contractFilterPop from "./contract-filter-pop.vue";

const emit = defineEmits(["update:tabIndex", "confirm", "PopOpenStatusChange"]);
const props = defineProps({
  tabIndex: {
    type: Number,
    default: 0,
  },
  params: {
    type: Object,
    default: () => {},
  },
});

const contractFilterPopRef = ref();
const showPop = () => {
  contractFilterPopRef.value?.open();
  emit("PopOpenStatusChange", false);
};

const confirm = (params: any) => {
  emit("confirm", params);
  emit("PopOpenStatusChange", true);
};

const tabIndex = computed({
  get: () => {
    return props.tabIndex;
  },
  set: (val) => {
    emit("update:tabIndex", val);
  },
});
const changeTabIndex = (val: number) => {
  contractFilterPopRef.value?.reset();
  tabIndex.value = val;
};

const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.contract-page-header {
  background-color: #fff;
  color: #a5a5a5;
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
    height: 30px;
    display: grid;
    grid-template-rows: repeat(1fr, 1fr);
    grid-template-columns: repeat(2, 1fr);
    column-gap: 6px;
    flex: 1;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    .item.active {
      color: #333;
    }
  }
}
</style>
