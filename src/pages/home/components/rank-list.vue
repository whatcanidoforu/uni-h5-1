<template>
  <uni-section title="欠费排行" type="line">
    <view class="rank-container">
      <view class="rank-item" v-for="(item, index) in list" :key="item.name">
        <view class="rank-num">
          <text>{{ index + 1 }}</text>
        </view>
        <view class="name">
          <text style="white-space: nowrap">{{ item.name }}</text>
        </view>
        <view class="value">
          <text>{{ item.value }}</text>
        </view>
      </view>
    </view>
  </uni-section>
</template>

<script setup>
import { ref } from "vue";
import { moneyFormat } from "@/utils/index.ts";

const list = [
  { name: "上海卉元股权投资管理有限公司", value: -1255047.2 },
  { name: "革匠莱比斯奢品科技服务（上海分公司）", value: -215288 },
  { name: "上海汇盈食品有限公司", value: -121078.8 },
  { name: "上海伊杉食品有限公司", value: -101736 },
  { name: "张根元", value: -95010 },
  { name: "上海幂赐餐饮管理有限公司", value: -1255047.2 },
  { name: "上海雷豪环保科技有限公司", value: -88151.04 },
  { name: "旭道（上海）投资管理有限公司", value: -82676.16 },
  { name: "上海铭虹电气有限公司", value: -80719.2 },
  { name: "上海信辞云信息科技有限公司", value: -80719.2 },
];

list.forEach((item) => {
  item.value = moneyFormat(item.value);
});
</script>

<style lang="scss" scoped>
.rank-item {
  display: flex;
  height: 40px;
  overflow: hidden;
  align-items: center;
  .rank-num {
    width: 40px;
    font-weight: bold;
    text-align: center;
  }
  .name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
  }
  .value {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0 10px;
  }
  & + .rank-item {
    border-top: 1px solid #e5e5e5;
  }
  &:nth-of-type(1) {
    .rank-num {
      color: #f45454;
    }
  }
  &:nth-of-type(2) {
    .rank-num {
      color: #fc9024;
    }
  }
  &:nth-of-type(3) {
    .rank-num {
      color: #f4c31e;
    }
  }
}
</style>
