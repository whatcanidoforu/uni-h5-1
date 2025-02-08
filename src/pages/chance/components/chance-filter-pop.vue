<template>
  <uni-popup ref="FilterPopupRef" background-color="#fff" type="left">
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

        <view class="intentions tit">意向类型</view>
        <view class="tag-block-list cot">
          <view
            v-for="item in IntentionsMapList"
            class="tag-block"
            :class="{ active: intentions.includes(item[0]) }"
            @click="clickIntentions(item[0])"
          >
            {{ item[0] }}
          </view>
        </view>

        <view class="customerCates tit">客户等级</view>
        <view class="tag-block-list cot">
          <view
            v-for="item in CustomerCatesMapList"
            class="tag-block"
            :class="{ active: customerCates.includes(item[0]) }"
            @click="clickCustomerCates(item[0])"
          >
            {{ item[0] }}
          </view>
        </view>

        <view class="sources tit">渠道选择</view>
        <view class="sources cot" @click="SourcesCheckPopRef?.open()">
          <view class="left">
            {{
              sources && sources.length > 0 ? sources.join("; ") : "渠道选择"
            }}
          </view>
          <uni-icons class="right" type="right" size="16"></uni-icons>
        </view>

        <view class="industries tit">行业选择</view>
        <view class="industries cot" @click="IndustriesCheckPopRef?.open()">
          <view class="left">
            {{
              customerIndustries && customerIndustries.length > 0
                ? customerIndustries.join("; ")
                : "行业选择"
            }}
          </view>
          <uni-icons class="right" type="right" size="16"></uni-icons>
        </view>

        <view class="stages tit">阶段</view>
        <view class="tag-block-list cot">
          <view
            v-for="item in StagesMapList"
            class="tag-block"
            :class="{ active: stages.includes(item[1]) }"
            @click="clickStages(item[1])"
          >
            {{ item[0] }}
          </view>
        </view>

        <view v-if="tabIndex === 1" class="directorIds tit">线索负责人</view>
        <view
          v-if="tabIndex === 1"
          class="directorIds cot"
          @click="DirectorIdsCheckPopRef?.open()"
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
            <view class="jump" @click="ParkCheckPopRef?.open()">
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
  <TagPageCheckPop
    ref="SourcesCheckPopRef"
    v-model:tags="sources"
    :MapList="SourcesMapList"
  />
  <TagPageCheckPop
    ref="IndustriesCheckPopRef"
    v-model:tags="customerIndustries"
    :MapList="IndustriesMapList"
  />
  <ParkCheckPop ref="ParkCheckPopRef" v-model:parks="parks" />
  <DirectorIdsCheckPop
    ref="DirectorIdsCheckPopRef"
    v-model:directors="directors"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TagPageCheckPop from "./tag-check-pop.vue";
import ParkCheckPop from "./park-check-pop.vue";
import DirectorIdsCheckPop from "./directorIds-check-pop.vue";
import type { IPark } from "@/types/permission";

const FilterPopupRef = ref();
const SourcesCheckPopRef = ref();
const IndustriesCheckPopRef = ref();
const ParkCheckPopRef = ref();
const DirectorIdsCheckPopRef = ref();

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

const SourcesMapList = new Map([
  ["渠道中介", "渠道中介"],
  ["自主拓客", "自主拓客"],
  ["朋友介绍", "朋友介绍"],
  ["领导推荐", "领导推荐"],
  ["同事推荐", "同事推荐"],
  ["园区活动", "园区活动"],
  ["网站信息", "网站信息"],
  ["电销客户", "电销客户"],
  ["其它渠道", "其它渠道"],
]);

const IndustriesMapList = new Map([
  ["互联网/AI", "互联网/AI"],
  ["计算机/电子/通信", "计算机/电子/通信"],
  ["制药/医疗", "制药/医疗"],
  ["能源/化工/环保", "能源/化工/环保"],
  ["交通/物流", "交通/物流"],
  ["机械/制造", "机械/制造"],
  ["房地产/建筑", "房地产/建筑"],
  ["广告/传媒", "广告/传媒"],
  ["文化/体育", "文化/体育"],
  ["咨询/专业服务", "咨询/专业服务"],
  ["教育/培训", "教育/培训"],
  ["金融", "金融"],
  ["汽车", "汽车"],
  ["消费品", "消费品"],
  ["餐饮/家政/娱乐服务", "餐饮/家政/娱乐服务"],
  ["政府/非盈利机构/其它", "政府/非盈利机构/其它"],
]);

// 意向【租赁，购买】
const IntentionsMapList = new Map([
  ["租赁", "租赁"],
  ["购买", "购买"],
]);
// 客户类别【A,B,C】
const CustomerCatesMapList = new Map([
  ["A", "A"],
  ["B", "B"],
  ["C", "C"],
  ["D", "D"],
  ["E", "E"],
]);

const StagesMapList = new Map([
  // ["未看", 10],
  ["首看", 20],
  ["复看", 30],
  ["意向", 40],
  // ["签约", 90],
  ["成交", 90],
]);

const startDate = ref("");
const endDate = ref("");
const intentions = ref<string[]>([]); // 意向【租赁，购买】
const customerCates = ref<string[]>([]); // 客户类别【A,B,C】
const parks = ref<IPark[]>([]);
const sources = ref([]); // 渠道选择
const customerIndustries = ref([]); // 行业选择
const stages = ref<number[]>([]);
const directors = ref([]);

const clickIntentions = (item: string) => {
  if (intentions.value.includes(item)) {
    intentions.value.splice(intentions.value.indexOf(item), 1);
  } else {
    intentions.value.push(item);
  }
};
const clickCustomerCates = (item: string) => {
  if (customerCates.value.includes(item)) {
    customerCates.value.splice(customerCates.value.indexOf(item), 1);
  } else {
    customerCates.value.push(item);
  }
};
const clickStages = (item: number) => {
  if (stages.value.includes(item)) {
    stages.value.splice(stages.value.indexOf(item), 1);
  } else {
    stages.value.push(item);
  }
};
const clearPark = (item: IPark) => {
  let arr: number[] = parks.value.map((ite: any) => ite.id);
  parks.value.splice(arr.indexOf(item.id), 1);
};

const reset = () => {
  startDate.value = "";
  endDate.value = "";
  intentions.value = [];
  customerCates.value = [];
  parks.value = [];
  sources.value = [];
  customerIndustries.value = [];
  stages.value = [];
  directors.value = [];
};
const confirm = () => {
  FilterPopupRef.value.close();
  emit("confirm", {
    startDate: startDate.value,
    endDate: endDate.value,
    intentions: intentions.value,
    customerCates: customerCates.value,
    parks: parks.value,
    sources: sources.value,
    customerIndustries: customerIndustries.value,
    stages: stages.value,
    directors: directors.value,
  });
};

const open = () => {
  startDate.value = props.params?.startDate;
  endDate.value = props.params?.endDate;
  intentions.value = props.params?.intentions;
  customerCates.value = props.params?.customerCates;
  parks.value = props.params?.parks;
  sources.value = props.params?.sources;
  customerIndustries.value = props.params?.customerIndustries;
  stages.value = props.params?.stages;
  directors.value = props.params?.directors;
  FilterPopupRef.value.open();
};
const close = () => {
  FilterPopupRef.value.close();
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
.tag-block-list.cot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .tag-block {
    height: 40px;
    border-radius: 2px;
    background-color: #f5f5f5;
    color: #767676;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px 10px 0;
  }
  .tag-block.active {
    background-color: #ebf8fe;
    color: #00d0ff;
  }
}
.sources.cot,
.industries.cot {
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
