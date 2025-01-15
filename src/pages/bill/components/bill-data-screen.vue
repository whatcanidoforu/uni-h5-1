<template>
  <uni-popup ref="billDataScreenRef" type="left" :animation="false">
    <view class="popup-content-page">
      <view class="billDataScreen-header">
        <uni-icons
          class="billDataScreenIcon"
          type="left"
          size="20"
          @click="close"
        ></uni-icons>
        <view class="billDataScreenl-tille">数据筛选</view>
      </view>
      <view class="page-container">
        <view class="billDataScreenl-content">出账时间</view>
        <view class="bill-date-picker-input">
          <view class="billDataScreenl-content-item">起始时间</view>
          <view
            class="bill-date-input"
            :class="{ active: startBillDate }"
            @click="billStartDate"
          >
            {{ startBillDate ? startBillDate : "请选择起始时间" }}</view
          >
        </view>
        <view class="bill-date-picker-input">
          <view class="billDataScreenl-content-item">终止时间</view>
          <view
            class="bill-date-input"
            :class="{ active: endBillDate }"
            @click="billEndDate"
          >
            {{ endBillDate ? endBillDate : "请选择起始时间" }}</view
          >
        </view>

        <view class="bill-customer-picker-input">
          <view class="billDataScreenl-content"> 客户</view>
          <view class="bill-customer-input" @click="toCustomerSelection">
            <view> 客户选择</view>
            <view
              class="bill-customer-selection"
              :class="{ active: customerName }"
            >
              <view> {{ customerName ? customerName : "请选择客户" }}</view>
              <uni-icons
                type="right"
                size="20"
                color="#ccc"
                flex="0"
              ></uni-icons> </view
          ></view>
        </view>
        <view class="bill-button-container">
          <button type="default" class="bill-reset" @click="resetBillOptions">
            重置
          </button>
          <button
            type="primary"
            class="bill-confirm"
            @click="confirmBillOptions"
          >
            确认
          </button>
        </view>
        <view class="billDataScreenl-content-item"></view>
        <uni-popup ref="bilStartDatePopup" type="bottom">
          <view class="popup-content">
            <view class="popup-title">
              <view></view>
              <view style="font-size: larger">选择时间</view>
              <uni-icons
                type="closeempty"
                size="25"
                class="closeemptyIcons"
                @click="closeStartDatePopup"
              ></uni-icons>
            </view>
            <picker-view
              :value="selectedDate"
              @change="billDateChange"
              class="pick-bill-date"
            >
              <picker-view-column>
                <view class="item" v-for="(item, index) in years" :key="index"
                  >{{ item }}年</view
                >
              </picker-view-column>
              <picker-view-column>
                <view class="item" v-for="(item, index) in months" :key="index"
                  >{{ item }}月</view
                >
              </picker-view-column>
              <picker-view-column>
                <view class="item" v-for="(item, index) in days" :key="index"
                  >{{ item }}日</view
                >
              </picker-view-column>
            </picker-view>
            <button
              type="primary"
              class="dateConfirmButton"
              @click="confirmStartBillDate"
            >
              确定
            </button>
          </view>
        </uni-popup>
        <uni-popup ref="bilEndDatePopup" type="bottom">
          <view class="popup-content">
            <view class="popup-title">
              <view></view>
              <view style="font-size: larger">选择时间</view>
              <uni-icons
                type="closeempty"
                size="25"
                class="closeemptyIcons"
                @click="closeEndDatePopup"
              ></uni-icons>
            </view>
            <picker-view
              :value="selectedDate"
              @change="billDateChange"
              class="pick-bill-date"
            >
              <picker-view-column>
                <view class="item" v-for="(item, index) in years" :key="index"
                  >{{ item }}年</view
                >
              </picker-view-column>
              <picker-view-column>
                <view class="item" v-for="(item, index) in months" :key="index"
                  >{{ item }}月</view
                >
              </picker-view-column>
              <picker-view-column>
                <view class="item" v-for="(item, index) in days" :key="index"
                  >{{ item }}日</view
                >
              </picker-view-column>
            </picker-view>
            <button
              type="primary"
              class="dateConfirmButton"
              @click="confirmEndBillDate"
            >
              确定
            </button>
          </view>
        </uni-popup>
      </view>
      <billCustomerSelection
        ref="billCustomerSelectionRef"
        @confirm="billCustomerConfirm"
      />
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import billCustomerSelection from "./bill-customer-selection.vue";

const emit = defineEmits(["confirm"]);
const open = () => {
  billDataScreenRef.value.open();
};
const close = () => {
  billDataScreenRef.value.close();
};
const billDataScreenRef = ref();
const customerName = ref();
const customerComId = ref();
const customerType = ref();
const billCustomerSelectionRef = ref();
const confirmBillOptions = () => {
  emit("confirm", {
    startDate: startBillDate.value,
    endDate: endBillDate.value,
    customerComId: customerComId.value ? customerComId.value : undefined,
    customerType: customerType.value ? customerType.value : undefined,
  });
  billDataScreenRef.value.close();
};

const billCustomerConfirm = (options: any) => {
  customerName.value = options.customerName;
  customerComId.value = options.customerComId;
  customerType.value = options.customerType;
};

const toCustomerSelection = () => {
  billCustomerSelectionRef.value.open();
};
const bilStartDatePopup = ref();
const bilEndDatePopup = ref();
const billStartDate = () => {
  bilStartDatePopup.value.open();
};
const billEndDate = () => {
  bilEndDatePopup.value.open();
};

const closeStartDatePopup = () => {
  bilStartDatePopup.value.close();
};
const closeEndDatePopup = () => {
  bilEndDatePopup.value.close();
};

// 生成年份数组
const generateYears = (): number[] => {
  const startYear = 2000;
  const endYear = 3999;
  const years: number[] = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
};

// 生成月份数组
const generateMonths = (): number[] => {
  const months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months;
};

// 生成日期数组
const generateDays = (year: number, month: number): number[] => {
  const days: number[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

const years = ref(generateYears());
const months = ref(generateMonths());
const days = ref(
  generateDays(new Date().getFullYear(), new Date().getMonth() + 1)
);

const selectedDate = ref([0, 0, 0]); // [yearIndex, monthIndex, dayIndex]

const billDateChange = (e: any) => {
  const [yearIndex, monthIndex, dayIndex] = e.detail.value;
  selectedDate.value = [yearIndex, monthIndex, dayIndex];

  // 更新日期数组
  const selectedYear = years.value[yearIndex];
  const selectedMonth = months.value[monthIndex];
  days.value = generateDays(selectedYear, selectedMonth);
};
const startBillDate = ref();
const endBillDate = ref();
const confirmStartBillDate = () => {
  const [yearIndex, monthIndex, dayIndex] = selectedDate.value;
  const selectedYear = years.value[yearIndex];
  const selectedMonth = months.value[monthIndex];
  const selectedDay = days.value[dayIndex];
  const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(
    2,
    "0"
  )}-${String(selectedDay).padStart(2, "0")}`;
  console.log("Selected Date:", formattedDate);
  startBillDate.value = formattedDate;
  bilStartDatePopup.value.close();
};

const confirmEndBillDate = () => {
  const [yearIndex, monthIndex, dayIndex] = selectedDate.value;
  const selectedYear = years.value[yearIndex];
  const selectedMonth = months.value[monthIndex];
  const selectedDay = days.value[dayIndex];
  const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(
    2,
    "0"
  )}-${String(selectedDay).padStart(2, "0")}`;
  console.log("Selected Date:", formattedDate);
  endBillDate.value = formattedDate;
  bilEndDatePopup.value.close();
};
onMounted(() => {
  // 初始化选择器的值为当前日期
  const today = new Date();
  const currentYearIndex = years.value.indexOf(today.getFullYear());
  const currentMonthIndex = today.getMonth();
  const currentDayIndex = today.getDate() - 1; // 日期数组从 1 开始，索引从 0 开始

  selectedDate.value = [currentYearIndex, currentMonthIndex, currentDayIndex];
  days.value = generateDays(today.getFullYear(), today.getMonth() + 1);
});

const resetBillOptions = () => {
  startBillDate.value = "";
  endBillDate.value = "";
  customerName.value = undefined;
  customerComId.value = undefined;
  customerType.value = undefined;
};

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.popup-content-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.billDataScreen-header {
  position: relative;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 25px;
  .billDataScreenl-tille {
    font-size: larger;
    color: black;
    font-weight: bold;
  }

  .billDataScreenIcon {
    font-weight: bolder;
    position: absolute;
    left: 20px;
  }
}
.page-container {
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .bill-button-container {
    position: absolute;
    bottom: 50px;
    width: 95%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
}
.billDataScreenl-content {
  color: black;
  font-weight: bold;
  margin: 20px;
}
.billDataScreenl-content-item {
  color: black;
  margin: 20px;
}
.popup-content {
  height: 290px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 16px 16px 0 0;

  .popup-title {
    height: 10%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 30rpx 30rpx;
    display: flex;
    view {
      flex: 1;
    }
  }
}

.pick-bill-date {
  flex: 1;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dateConfirmButton {
  text-align: center;
  width: 90%;
}
.closeemptyIcons {
  text-align: right;
  flex: 1;
}
.bill-date-picker-input {
  display: flex;
  align-items: center;
  height: 50px;
  width: 95%;
  .bill-date-input {
    border: 1px solid #ccc;
    flex: 1;
    height: 50%;
    border-radius: 8px 8px 8px 8px;
    font-size: medium;
    color: #ccc;
    padding: 5px;
  }
  .bill-date-input.active {
    color: black;
  }
}

.bill-customer-picker-input {
  align-items: center;
  height: 50px;
  width: 100%;
  .bill-customer-input {
    display: flex;
    border: 1px solid #ccc;
    flex: 1;
    height: 50%;
    margin: 20px;
    border-radius: 8px 8px 8px 8px;
    font-size: medium;
    color: #ccc;
    padding: 5px;
    justify-content: space-between;
  }

  .bill-customer-selection {
    display: flex;
    align-items: right;
  }
  .bill-customer-selection.active {
    color: black;
  }
}
.bill-reset {
  width: 50%;
  margin: 5px;
}
.bill-confirm {
  width: 50%;
  margin: 5px;
}
</style>
