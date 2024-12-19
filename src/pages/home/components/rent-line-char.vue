<template>
  <uni-section title="销售漏斗" type="line">
    <template v-slot:right>
      <picker @change="timeChange" mode="date" :value="date" fields="year">
        <view class="time-select">
          <text style="color: #333; font-weight: 600">日期：</text>
          <text style="color: #666">{{ date }}</text>
          <uni-icons type="bottom" size="14"></uni-icons>
        </view>
      </picker>
    </template>
    <view style="height: 200px">
      <l-echart ref="RefRentLine"></l-echart>
    </view>
  </uni-section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";

const today = dayjs();
const date = ref(today.format("YYYY"));

const timeChange = (e) => {
  date.value = e.detail.value;
};

const getRandomData = () => {
  let result = [];
  for (let i = 0; i < 12; i++) {
    result.push(Math.floor(Math.random() * 1000) + 1000);
  }
  return result;
};

const option = {
  color: ["#FFAD35", "#01CAF6", "#6A1F64", "#63daab", "#657798", "#006EB8"],
  legend: {},
  grid: {
    top: 40,
    left: 10,
    right: 10,
    bottom: 0,
    containLabel: true,
  },
  tooltip: {
    show: true,
    // trigger: 'axis',
    // formatter: '{b0} : \n{a0} {c0}m²\n{a1} {c1}m²\n{a2} {c2}m²'
  },
  yAxis: {
    type: "value",
    minInterval: 1,
    axisLabel: {
      formatter: function (value) {
        return value.toString() + "m²";
      },
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
  },
  series: [
    {
      name: "目标租赁面积",
      type: "line",
      data: getRandomData(),
    },
    {
      name: "完成面积",
      type: "bar",
      data: getRandomData(),
    },
    {
      name: "",
      type: "line",
      data: getRandomData(),
    },
  ],
};

const RefRentLine = ref();
const myChart = ref();
const renderFunnel = () => {
  if (!myChart.value) {
    return false;
  }
  myChart.value.setOption(option);
  // myChart.value.hideLoading()
};

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  setTimeout(async () => {
    if (!RefRentLine.value) return;
    myChart.value = await RefRentLine.value.init(echarts);
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
</style>
