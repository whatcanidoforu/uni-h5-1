<template>
  <view class="clue-page-header">
    <uni-icons class="left" type="left" size="20" @click="back"></uni-icons>
    <view class="center">
      <view
        class="item"
        :class="{ active: tabIndex === 0 }"
        @click="changeTabIndex(0)"
        >我的线索</view
      >
      <view
        class="item"
        :class="{ active: tabIndex === 1 }"
        @click="changeTabIndex(1)"
        >团队线索</view
      >
      <view
        class="item"
        :class="{ active: tabIndex === 2 }"
        @click="changeTabIndex(2)"
        >线索公海</view
      >
    </view>
    <view class="right" @click="clickClueFilterPopRef">
      <uni-icons type="search" size="18"></uni-icons>
      筛选
    </view>
  </view>
  <clueFilterPop
    ref="clueFilterPopRef"
    @confirm="confirm"
    :tabIndex="props.tabIndex"
    :params="props.params"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import clueFilterPop from "./clue-filter-pop.vue";

const emit = defineEmits(["update:tabIndex", "confirm"]);
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

const clueFilterPopRef = ref();
const clickClueFilterPopRef = () => {
  console.log("clickClueFilterPopRef", clueFilterPopRef.value);
  clueFilterPopRef.value?.open();
};

const confirm = (params: any) => {
  console.log("clue-header confirm", params);
  emit("confirm", params);
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
  clueFilterPopRef.value?.reset();
  tabIndex.value = val;
};

const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.clue-page-header {
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
    height: 30px;
    display: grid;
    grid-template-rows: repeat(1fr, 1fr);
    grid-template-columns: repeat(3, 1fr);
    column-gap: 6px;

    flex: 1;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border-radius: 4px;
      font-size: 14px;
    }
    .item.active {
      color: #fff;
      background-color: #4884df;
    }
  }
}
</style>
