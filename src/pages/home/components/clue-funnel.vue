<template>
  <uni-section title="销售漏斗" type="line" padding>
    <template v-slot:right>
      <picker @change="timeChange" mode="date" :value="date" fields="month">
        <view class="time-select">
          <text style="color: #333; font-weight: 600">日期：</text>
          <text style="color: #666">{{ date }}</text>
          <uni-icons type="bottom" size="14"></uni-icons>
        </view>
      </picker>
    </template>
    <view class="type-container">
      <view
        class="type-item"
        :class="{ active: type == 'group' }"
        @click="type = 'group'"
      >
        <text>团队</text>
        <view class="type-bottom"></view>
      </view>
      <view
        class="type-item"
        :class="{ active: type == 'mine' }"
        @click="type = 'mine'"
      >
        <text>我的</text>
        <view class="type-bottom"></view>
      </view>
    </view>
    <view style="height: 200px">
      <l-echart ref="RefClueFunnel"></l-echart>
    </view>
  </uni-section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";

const today = dayjs();
const date = ref(today.format("YYYY-MM"));

const timeChange = (e) => {
  date.value = e.detail.value;
};

const type = ref("group");

const data = [
  { value: 50, name: "线索" },
  { value: 35, name: "商机首看" },
  { value: 25, name: "商机复看" },
  // { value: 15, name: '待定' },
  { value: 5, name: "成交" },
];

const option = {
  color: ["#f7c122", "#6395fa", "#63daab", "#657798", "#006EB8"],
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}",
    extraCssText: "border-radius: 0;",
  },
  series: [
    {
      name: "招商漏斗",
      type: "funnel",
      sort: "none",
      left: "center",
      top: 0,
      height: "100%",
      width: "50%",
      maxSize: "100%",
      minSize: "25%",
      label: {
        position: "right",
      },
      labelLine: {
        show: true,
      },
      emphasis: {
        disabled: true,
      },
      data: data,
      z: 100,
    },
    {
      name: "招商漏斗",
      type: "funnel",
      sort: "none",
      left: "center",
      top: 0,
      height: "100%",
      width: "50%",
      maxSize: "100%",
      minSize: "25%",
      label: {
        position: "inside",
        color: "#fff",
        formatter: (params) => {
          return `${params.value}`;
        },
      },
      labelLine: {
        show: false,
      },
      data: data,
      z: 100,
    },
  ],
};

const charData = {
  chanceQuantity: Math.floor(Math.random() * 100),
  firstVisitQuantity: Math.floor(Math.random() * 100),
  secondVisitQuantity: Math.floor(Math.random() * 100),
  dealQuantity: Math.floor(Math.random() * 100),
};
const RefClueFunnel = ref();
const myChart = ref();
const renderFunnel = () => {
  if (!myChart.value) {
    return false;
  }
  data[0].value = charData.chanceQuantity ?? 0;
  data[1].value = charData.firstVisitQuantity ?? 0;
  data[2].value = charData.secondVisitQuantity ?? 0;
  data[3].value = charData.dealQuantity;
  myChart.value.setOption(option);
  // myChart.value.hideLoading()
};

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  setTimeout(async () => {
    if (!RefClueFunnel.value) return;
    myChart.value = await RefClueFunnel.value.init(echarts);
    renderFunnel();
  }, 300);
});
</script>

<style lang="scss" scoped>
.time-select {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.type-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  .type-item {
    font-weight: 500;
    margin: 0 20px;
    .type-bottom {
      height: 4px;
      border-radius: 5px;
      margin-top: 4px;
    }
    &.active {
      color: #3897c7;
      .type-bottom {
        background-image: linear-gradient(90deg, #0696ec, #445ff6);
      }
    }
  }
}
</style>
