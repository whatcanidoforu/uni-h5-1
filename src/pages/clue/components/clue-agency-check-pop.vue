<template>
  <uni-popup
    ref="clueDirectorIdsCheckPopRef"
    background-color="#fff"
    type="left"
  >
    <view class="popup-content">
      <view class="pop-header">
        <uni-icons
          class="left"
          type="left"
          size="20"
          @click="close"
        ></uni-icons>
        <view class="center">选择中介</view>
        <view class="right"></view>
      </view>

      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="searchValue"
        style="padding: 0; margin-top: 10px"
      />
      <scroll-view class="data-list" scroll-y>
        <telement v-for="item in DataList">
          <view
            :key="item.id"
            class="data-item"
            @click="clickDataItem(item)"
            v-if="
              item.name.includes(searchValue) ||
              item.contact.includes(searchValue) ||
              item.mobile.includes(searchValue)
            "
          >
            <view class="label">
              <view>中介名称:{{ item.name }}</view>
              <view>中介联系人:{{ item.contact }}</view>
              <view>中介联系方式:{{ item.mobile }}</view>
            </view>
            <uni-icons
              class="check"
              :type="
                useDataList
                  .map((ite:any) => ite.id)
                  .includes(item.id)
                  ? 'circle-filled'
                  : 'circle'
              "
              size="24"
            ></uni-icons>
          </view>
        </telement>
      </scroll-view>

      <view class="btns">
        <view class="cancel btn" @click="cancel">取消</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiGetAgencyList } from "@/http/api/clue";
import { useHeaderPark } from "@/stores/park";

const headerParkStore = useHeaderPark();
const clueDirectorIdsCheckPopRef = ref();
const emit = defineEmits(["update:agencyList", "confirm"]);
const props = defineProps({
  agencyList: {
    type: Array,
    default: () => [],
  },
});

const DataList = ref<any>([]);

const searchValue = ref("");
const apiSearchUserFun = () => {
  apiGetAgencyList({
    pageNo: 1,
    pageSize: 9999999,
  }).then((res) => {
    DataList.value = res.data;
  });
};
const clickDataItem = (item: any) => {
  let ids = useDataList.value.map((ite: any) => ite.id) || [];
  // if (ids.includes(item.id)) {
  //   useDataList.value.splice(ids.indexOf(item.id), 1);
  // } else {
  //   useDataList.value.push(item);
  // }
  console.log(" >>>>> clickDataItem", item);
  useDataList.value.splice(0);
  useDataList.value.push(item);
};

const useDataList = ref();
const cancel = () => {
  close();
};
const confirm = () => {
  emit("update:agencyList", useDataList.value);
  emit("confirm", useDataList.value);
  close();
};

const open = () => {
  apiSearchUserFun();
  useDataList.value = [...props.agencyList];
  clueDirectorIdsCheckPopRef.value.open();
};
const close = () => {
  useDataList.value = [];
  clueDirectorIdsCheckPopRef.value.close();
};
const timer = ref();
// const debouncedInput = (e: string) => {
//   if (timer.value) {
//     clearTimeout(timer.value);
//   }
//   timer.value = setTimeout(() => {
//     apiSearchUserFun();
//   }, 500);
// };

defineExpose({
  open,
  close,
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
.uni-searchbar {
  margin: 10px;
  :deep(.uni-searchbar__box) {
    background-color: #fafafa !important;
  }
}
.data-list {
  background-color: #f4f8fb;
  height: 1px;
  flex: 1;
  .data-item {
    background-color: #fff;
    margin: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-radius: 8px;
    .label {
      font-size: 14px;
      line-height: 20px;
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
