<template>
  <uni-popup ref="contractFilterPopupRef" background-color="#fff" type="left">
    <view class="popup-content">
      <view class="pop-header">
        <uni-icons
          class="left"
          type="left"
          size="20"
          @click="close"
        ></uni-icons>
        <view class="center">数据筛选</view>
        <view class="right"></view>
      </view>

      <view class="pop-cot">
        <view class="type tit">状态选择</view>
        <view class="type cot">
          <view
            class="type-item"
            :class="{ active: selectedStatuses['-1'] }"
            @click="changeStatuses(-1)"
            ><text>全部</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['0'] }"
            @click="changeStatuses(0)"
            ><text>未提交</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['1'] }"
            @click="changeStatuses(1)"
            ><text>待审核</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['5'] }"
            @click="changeStatuses(5)"
            ><text>审核驳回</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['10'] }"
            @click="changeStatuses(10)"
            ><text>已生效</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['20'] }"
            @click="changeStatuses(20)"
            ><text>执行中</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['30'] }"
            @click="changeStatuses(30)"
            ><text>已到期</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['100'] }"
            @click="changeStatuses(100)"
            ><text>已退租</text></view
          >
          <view
            class="type-item"
            :class="{ active: selectedStatuses['101'] }"
            @click="changeStatuses(101)"
            ><text>已续约</text></view
          >
        </view>

        <view class="type tit">类型选择</view>
        <view class="type cot">
          <view
            class="type-item"
            :class="{ active: type == 100 }"
            @click="type = 100"
            ><text>租赁</text></view
          >
          <view
            class="type-item"
            :class="{ active: type == 102 }"
            @click="type = 102"
            ><text>虚拟注册</text></view
          >
          <view class="type-item" style="background-color: transparent"></view>
        </view>

        <view v-if="tabIndex === 1" class="directorIds tit">部门选择</view>
        <view
          v-if="tabIndex === 1"
          class="directorIds cot"
          @click="contractDepartmentCheckPopRef?.open()"
        >
          <view class="left">
            {{
              selectedDepartments && selectedDepartments.length > 0
                ? selectedDepartments.map((item: any) => item.name).join("; ")
                : "部门选择"
            }}
          </view>
          <uni-icons class="right" type="right" size="16"></uni-icons>
        </view>

        <view v-if="tabIndex === 1" class="directorIds tit">负责人</view>
        <view
          v-if="tabIndex === 1"
          class="directorIds cot"
          @click="contractDirectorIdsCheckPopRef?.open()"
        >
          <view class="left">
            {{
              selectedSignBy && selectedSignBy.length > 0
                ? selectedSignBy
                    .map((item: any) => item.customerName)
                    .join("; ")
                : "负责人选择"
            }}
          </view>
          <uni-icons class="right" type="right" size="16"></uni-icons>
        </view>

        <view class="time tit">签订日期</view>
        <view class="time cot">
          <uni-datetime-picker
            type="date"
            v-model="startDate"
            placeholder="开始时间"
          />
          <view style="padding: 12px">-</view>
          <uni-datetime-picker
            type="date"
            v-model="endDate"
            placeholder="结束时间"
          />
        </view>

        <view class="park tit">园区</view>
        <view class="park cot">
          <view class="cot-hearder">
            <view class="label">园区选择</view>
            <view class="jump" @click="contractParkCheckPopRef?.open()">
              请选择
              <uni-icons type="right" size="14"></uni-icons>
            </view>
          </view>
          <view class="park-list">
            <view class="park-tag" v-for="item in parks" :key="item.id">
              {{ item.name }}
              <uni-icons
                class="clear"
                type="clear"
                size="20"
                @click="clearPark(item)"
              ></uni-icons>
            </view>
          </view>
        </view>
      </view>

      <view class="btns">
        <view class="cancel btn" @click="reset">重置</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
  <contractParkCheckPop ref="contractParkCheckPopRef" v-model:parks="parks" />
  <contractDirectorIdsCheckPop
    ref="contractDirectorIdsCheckPopRef"
    v-model:selectedSignBy="selectedSignBy"
    :departments="selectedDepartments"
  />
  <contractDepartmentCheckPop
    ref="contractDepartmentCheckPopRef"
    v-model:selectedDepartments="selectedDepartments"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import contractParkCheckPop from "./contract-park-check-pop.vue";
import contractDirectorIdsCheckPop from "./contract-directorIds-check-pop.vue";
import contractDepartmentCheckPop from "./contract-department-check-pop.vue";
import type { IPark } from "@/types/permission";

const contractFilterPopupRef = ref();
const contractParkCheckPopRef = ref();
const contractDirectorIdsCheckPopRef = ref();
const contractDepartmentCheckPopRef = ref();

const emit = defineEmits(["confirm"]);
const props = defineProps({
  tabIndex: {
    type: Number,
    default: 0,
  },
  params: {
    type: Object as any,
    default: () => {},
  },
});

const startDate = ref("");
const endDate = ref("");
const parks = ref<IPark[]>([]);
const departmentIds = ref([]);
const selectedDepartments = ref([]);
const signedBy = ref([]);
const selectedSignBy = ref([]);
const statuses = ref<number[]>([]);
const selectedStatuses = ref({
  "-1": true,
  "0": false,
  "1": false,
  "5": false,
  "10": false,
  "20": false,
  "30": false,
  "100": false,
  "101": false,
});

const type = ref(100);

const changeStatuses = (val: number) => {
  if (val == -1) {
    statuses.value = [];
    for (let key in selectedStatuses.value) {
      selectedStatuses.value[key as keyof typeof selectedStatuses.value] =
        false;
    }
    selectedStatuses.value["-1"] = true;
  } else {
    selectedStatuses.value["-1"] = false;
    const valIndex = statuses.value.findIndex((item) => item == val);
    const key = ("" + val) as keyof typeof selectedStatuses.value;
    if (valIndex > -1) {
      selectedStatuses.value[key] = false;
      statuses.value.splice(valIndex, 1);
    } else {
      statuses.value.push(val);
      selectedStatuses.value[key] = true;
    }
  }
};

const clearPark = (item: IPark) => {
  let arr: number[] = parks.value.map((ite: any) => ite.id);
  parks.value.splice(arr.indexOf(item.id), 1);
};

const reset = () => {
  startDate.value = "";
  endDate.value = "";
  parks.value = [];
  statuses.value = [];
  type.value = 100;
  selectedStatuses.value = {
    "-1": true,
    "0": false,
    "1": false,
    "5": false,
    "10": false,
    "20": false,
    "30": false,
    "100": false,
    "101": false,
  };
  departmentIds.value = [];
  selectedDepartments.value = [];
  signedBy.value = [];
  selectedSignBy.value = [];
};
const confirm = () => {
  contractFilterPopupRef.value.close();
  emit("confirm", {
    startDate: startDate.value,
    endDate: endDate.value,
    parks: parks.value,
    type: type.value,
    statuses: statuses.value,
    signedBy: selectedSignBy.value.map((item: any) => item.customerId),
    departmentIds: selectedDepartments.value.map((item: any) => item.id),
    selectedDepartments: selectedDepartments.value,
    selectedSignBy: selectedSignBy.value,
  });
};

const open = () => {
  startDate.value = props.params?.startDate;
  endDate.value = props.params?.endDate;
  parks.value = props.params?.parks;
  statuses.value = props.params?.statuses;
  type.value = props.params?.type;
  signedBy.value = props.params?.signedBy;
  departmentIds.value = props.params?.departmentIds;
  selectedDepartments.value = props.params?.selectedDepartments;
  selectedSignBy.value = props.params.selectedSignBy;
  contractFilterPopupRef.value.open();
};
const close = () => {
  contractFilterPopupRef.value.close();
};

defineExpose({
  open,
  close,
  reset,
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
.pop-cot {
  flex: 1;
}

.tit {
  font-size: 14px;
  margin: 10px;
}
.cot {
  margin: 10px;
}
.time.cot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.type.cot {
  font-size: 14px;
  color: #666;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .type-item {
    width: 32%;
    background-color: #f5f5f5;
    color: #616161;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 10px;
    height: 32px;
    line-height: 32px;
    &.active {
      background-color: #ebf8fe;
      color: #3e9acd;
      position: relative;
      overflow: hidden;
      &::before {
        position: absolute;
        content: "";
        bottom: -16px;
        right: -6px;
        transform: rotate(50deg);
        width: 20px;
        height: 40px;
        background-color: #0896ea;
        z-index: 1;
      }
      &::after {
        content: "\2714";
        display: block;
        position: absolute;
        width: 14px;
        height: 14px;
        bottom: 0;
        right: 0;
        color: #fff;
        font-size: 12px;
        line-height: 14px;
        z-index: 2;
      }
    }
  }
}
.directorIds.cot {
  border: 1px solid #ececec;
  font-size: 14px;
  color: #666;
  padding: 12px;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
  }
  .right {
    margin-left: 10px;
  }
}
.park.cot {
  .cot-hearder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label {
      font-size: 14px;
      color: #666;
    }
    .jump {
      color: #00d0ff;
      font-size: 12px;
    }
  }
}
.park-list {
  .park-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ebf8fe;
    color: #00d0ff;
    font-size: 14px;
    margin-top: 10px;
    height: 40px;
    border-radius: 8px;
    position: relative;
    .clear {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
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
