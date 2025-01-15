<template>
  <uni-popup ref="billCustomerSelectionRef" type="left" :animation="false">
    <view class="company-page">
      <z-paging
        ref="paging"
        v-model="dataList"
        :fixed="false"
        @query="queryList"
        overflow="hidden"
      >
        <template #top>
          <view class="company-header">
            <uni-icons
              style="font-weight: bolder"
              type="left"
              size="20"
              @click="closeCustomerPop"
            ></uni-icons>
            <view class="company-tille">客户选择</view>
            <view class="placeholder"></view>
          </view>
          <view class="page-content">
            <uni-search-bar
              radius="5"
              bgColor="#FFFFFF"
              placeholder="请输入关键字搜索"
              clearButton="auto"
              cancelButton="none"
              @input="searchBillsByKeyWords"
              style="padding: 0; margin-top: 10px"
            />
          </view>
        </template>
        <radio-group @change="changeCustomer">
          <view
            class="company-content-card"
            v-for="item in dataList"
            :key="item.id"
          >
            <view class="company-content-item">
              <image
                style="
                  width: 30px;
                  height: 50px;
                  background-color: white;
                  margin-right: 30px;
                "
                mode="aspectFit"
                src="/src/static/rgkyun.png"
              ></image>
              <view class="company-content-text">
                <view class="company-item">{{ item.customerName }}</view>
                <view class="company-item">{{ item.mobile }}</view></view
              >
              <view class="company-content-radio">
                <radio
                  class="company-content-radio-position"
                  :value="String(item.customerId)"
                />
              </view>
            </view>
          </view>
        </radio-group>
        <template #bottom>
          <view class="company-button-container">
            <button
              type="default"
              class="company-reset"
              @click="closeCustomerPop"
            >
              取消
            </button>
            <button
              type="primary"
              class="company-confirm"
              @click="confirmCustomer"
            >
              确认
            </button>
          </view>
        </template>
      </z-paging>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { apiSearchCompanyByKeyword } from "@/http/api/customer";
import type { ICostomer } from "@/types/customer";

const emit = defineEmits(["confirm"]);
const close = () => {
  billCustomerSelectionRef.value.close();
};
const open = () => {
  billCustomerSelectionRef.value.open();
};

const billCustomerSelectionRef = ref();
const closeCustomerPop = () => {
  billCustomerSelectionRef.value.close();
};

const dataList = ref<ICostomer[]>([]);
const customerComId = ref();
const customerName = ref();
const customerType = ref();
const paging = ref();
const keywords = ref("");
const searchBillsByKeyWords = (e: any) => {
  keywords.value = e;
  paging.value.reload();
};

const queryList = async (pageNo: any, pageSize: any) => {
  const params = {
    keywords: keywords.value,
  };
  await apiSearchCompanyByKeyword(params).then((res) => {
    if (!res) {
      paging.value.complete(false);
    }
    const { data } = res;
    paging.value.complete(data);
  });
};
const confirmCustomer = () => {
  emit("confirm", {
    customerComId: customerComId.value ? customerComId.value : undefined,
    customerName: customerName.value ? customerName.value : undefined,
    customerType: customerType.value ? customerType.value : undefined,
  });
  billCustomerSelectionRef.value.close();
};

const changeCustomer = (e: any) => {
  const customerItem = dataList.value.find(
    (item) => item.customerId === Number(e.detail.value)
  );

  if (customerItem) {
    customerComId.value = customerItem.customerId;
    customerName.value = customerItem.customerName;
    customerType.value = customerItem.customerType;
  }
};
defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.company-header {
  align-items: center;
  height: 60px;
  background-color: white;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}
.company-tille {
  font-size: larger;
  color: black;
  font-weight: bold;
}
.company-page {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  scrollbar-width: none;
  .company-button-container {
    bottom: 10px;
    width: 95%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: white;
  }
}

.page-content {
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.placeholder {
  width: 20px; //与icon宽度一致
}
.company-reset {
  width: 50%;
  margin: 5px;
}
.company-confirm {
  width: 50%;
  margin: 5px;
}
.company-content-card {
  box-sizing: border-box;
  padding: 5px 11px 5px 15px;
  width: 97%;
  background: #ffffff;
  border-radius: 10px;
  margin: 10px;
  margin-left: 5px;
  .company-content-item {
    display: flex;
    font-size: 14px;
    color: black;
  }
  .company-item {
    padding: 5px 0;
    font-size: 12px;
  }

  .company-content-text {
    flex: 1;
  }
  .company-content-radio {
    position: relative;
    flex: 1;
    .company-content-radio-position {
      ::v-deep .uni-radio-wrapper {
        position: absolute;
        left: 75%;
      }
    }
  }
}
</style>
