<template>
  <uni-popup ref="clueFilterPopupRef" background-color="#fff" type="left">
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

      <view class="pop-content">
        <view class="time tit">创建时间</view>
        <view class="time cot">
          <uni-datetime-picker type="date" v-model="startDate" />
          <view style="padding: 12px">-</view>
          <uni-datetime-picker type="date" v-model="endDate" />
        </view>

        <view class="sources tit">渠道选择</view>
        <view class="sources cot" @click="clueSourcesCheckPopRef?.open()">
          <view class="left">
            {{ sources && sources.length > 0 ? sources.join("; ") : "请选择" }}
          </view>
          <uni-icons class="right" type="right" size="16"></uni-icons>
        </view>

        <view class="park tit">园区</view>
        <view class="park cot">
          <view class="cot-hearder">
            <view class="label">园区选择</view>
            <view class="jump" @click="clueParkCheckPopRef?.open()">
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
    </view>
  </uni-popup>
  <clueSourcesCheckPop ref="clueSourcesCheckPopRef" v-model:sources="sources" />
  <clueParkCheckPop ref="clueParkCheckPopRef" v-model:parks="parks" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import clueSourcesCheckPop from "./clue-sources-check-pop.vue";
import clueParkCheckPop from "./clue-park-check-pop.vue";
import type { IPark } from "@/types/permission";

const clueFilterPopupRef = ref();
const clueSourcesCheckPopRef = ref();
const clueParkCheckPopRef = ref();

const startDate = ref("");
const endDate = ref("");

const sources = ref([]);
const parks = ref<IPark[]>([]);

const clearPark = (item: IPark) => {
  let arr: number[] = parks.value.map((ite: any) => ite.id);
  parks.value.splice(arr.indexOf(item.id), 1);
};

const open = () => {
  clueFilterPopupRef.value.open();
};
const close = () => {
  clueFilterPopupRef.value.close();
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
.sources.cot {
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
</style>
