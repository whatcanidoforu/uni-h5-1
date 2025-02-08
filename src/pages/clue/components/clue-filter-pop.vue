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

      <view class="pop-cot">
        <view class="time tit">创建时间</view>
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

        <view class="sources tit">渠道选择</view>
        <view class="sources cot" @click="clueSourcesCheckPopRef?.open()">
          <view class="left">
            {{
              sources && sources.length > 0 ? sources.join("; ") : "渠道选择"
            }}
          </view>
          <uni-icons class="right" type="right" size="16"></uni-icons>
        </view>

        <view v-if="tabIndex === 1" class="directorIds tit">线索负责人</view>
        <view
          v-if="tabIndex === 1"
          class="directorIds cot"
          @click="clueDirectorIdsCheckPopRef?.open()"
        >
          <view class="left">
            {{
              directors && directors.length > 0
                ? directors.map((item: any) => item.customerName).join("; ")
                : "线索负责人"
            }}
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

      <view class="btns">
        <view class="cancel btn" @click="reset">重置</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
  <clueSourcesCheckPop ref="clueSourcesCheckPopRef" v-model:sources="sources" />
  <clueParkCheckPop ref="clueParkCheckPopRef" v-model:parks="parks" />
  <clueDirectorIdsCheckPop
    ref="clueDirectorIdsCheckPopRef"
    v-model:directors="directors"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import clueSourcesCheckPop from "./clue-sources-check-pop.vue";
import clueParkCheckPop from "./clue-park-check-pop.vue";
import clueDirectorIdsCheckPop from "./clue-directorIds-check-pop.vue";
import type { IPark } from "@/types/permission";

const clueFilterPopupRef = ref();
const clueSourcesCheckPopRef = ref();
const clueParkCheckPopRef = ref();
const clueDirectorIdsCheckPopRef = ref();

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
const sources = ref([]);
const directors = ref([]);

const clearPark = (item: IPark) => {
  let arr: number[] = parks.value.map((ite: any) => ite.id);
  parks.value.splice(arr.indexOf(item.id), 1);
};

const reset = () => {
  startDate.value = "";
  endDate.value = "";
  parks.value = [];
  sources.value = [];
  directors.value = [];
};
const confirm = () => {
  clueFilterPopupRef.value.close();
  emit("confirm", {
    startDate: startDate.value,
    endDate: endDate.value,
    parks: parks.value,
    sources: sources.value,
    directors: directors.value,
  });
};

const open = () => {
  startDate.value = props.params?.startDate;
  endDate.value = props.params?.endDate;
  parks.value = props.params?.parks;
  sources.value = props.params?.sources;
  directors.value = props.params?.directors;
  clueFilterPopupRef.value.open();
};
const close = () => {
  clueFilterPopupRef.value.close();
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
