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
        <view class="center">选择负责人</view>
        <view class="right"></view>
      </view>

      <uni-search-bar
        placeholder="请输入关键字搜索"
        bgColor="#FFFFFF"
        v-model="searchValue"
        @input="debouncedInput"
        @confirm="debouncedInput"
        style="padding: 0; margin-top: 10px"
      />
      <scroll-view class="directorIds-list" scroll-y>
        <view
          v-for="item in directorsList"
          :key="item.customerId"
          class="sources-item"
          @click="clickDirectorIdsItem(item)"
        >
          <view class="label">
            <view class="left">
              <image
                class="pic"
                mode="aspectFill"
                src="https://test-file.ruijiakeyun.com:2644/user-file///c766a3c1-6edb-4b00-9abe-006bc1fb861a.png"
              />
            </view>
            <view class="right">
              <view>{{ item.customerName }}</view>
              <view>{{ item.mobile }}</view>
            </view>
          </view>
          <uni-icons
            class="check"
            :type="
                useDirectors
                  .map((ite:any) => ite.customerId)
                  .includes(item.customerId)
                  ? 'circle-filled'
                  : 'circle'
              "
            size="24"
          ></uni-icons>
        </view>
      </scroll-view>

      <view class="btns">
        <view class="cancel btn" @click="cancel">取消</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  apiSearchUser,
  apiSearchUserByKeyword,
  apiSearchCompanyByKeyword,
  apiAuthSearchUser,
} from "@/http/api/customer";

const clueDirectorIdsCheckPopRef = ref();
const emit = defineEmits(["update:directors", "confirm"]);
const props = defineProps({
  directors: {
    type: Array,
    default: () => [],
  },
  multiply: {
    type: Boolean,
    default: true,
  },
});

const directorsList = ref<any>([]);

const searchValue = ref("");
const apiSearchUserFun = () => {
  apiSearchUserByKeyword({
    customerType: 1,
    keywords: searchValue.value,
    pageNo: 1,
    pageSize: 99999,
  }).then((res) => {
    directorsList.value = res.data;
  });
};
const clickDirectorIdsItem = (item: any) => {
  let ids = useDirectors.value.map((ite: any) => ite.customerId) || [];
  if (props.multiply) {
    if (ids.includes(item.customerId)) {
      useDirectors.value.splice(ids.indexOf(item.customerId), 1);
    } else {
      useDirectors.value.push(item);
    }
  } else {
    useDirectors.value.splice(0);
    useDirectors.value.push(item);
  }
};

const useDirectors = ref();
const cancel = () => {
  close();
};
const confirm = () => {
  emit("update:directors", useDirectors.value);
  emit("confirm", useDirectors.value);
  close();
};

const open = () => {
  console.log("open", open);
  apiSearchUserFun();
  useDirectors.value = [...props.directors];
  clueDirectorIdsCheckPopRef.value.open();
};
const close = () => {
  useDirectors.value = [];
  clueDirectorIdsCheckPopRef.value.close();
};
const timer = ref();
const debouncedInput = (e: string) => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    apiSearchUserFun();
  }, 200);
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
.directorIds-list {
  background-color: #f4f8fb;
  height: 1px;
  flex: 1;
  .sources-item {
    background-color: #fff;
    margin: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-radius: 8px;

    .label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        margin-right: 10px;
        .pic {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1;
      }
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
