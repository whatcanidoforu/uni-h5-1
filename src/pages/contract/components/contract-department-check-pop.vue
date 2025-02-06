<template>
  <uni-popup
    ref="contractDepartmentCheckPopRef"
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

      <departmentTree :treeData="departmentData" />

      <view class="btns">
        <view class="cancel btn" @click="cancel">取消</view>
        <view class="confirm btn" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiCompanyDepartmentGetDepartmentTree } from "@/http/api/contract";
import departmentTree from "./department-tree.vue";

const emit = defineEmits(["update:selectedDepartments", "confirm"]);
const props = defineProps({
  selectedDepartments: {
    type: Array,
    default: () => [],
  },
  multiply: {
    type: Boolean,
    default: true,
  },
});

const departmentData = ref<any>([]);

const contractDepartmentCheckPopRef = ref();

const formatTreeData = (params: any, parentLevel = 0) => {
  if (parentLevel < 3) {
    params.open = true;
  } else {
    params.open = false;
  }
  params.checked = false;
  if (result.value && result.value.length) {
    if (result.value.find((item) => item.id == params.id)) {
      params.checked = true;
    }
  }
  params.level = parentLevel + 1;
  if (Array.isArray(params.subDepartments) && params.subDepartments.length) {
    params.hasChild = true;
    params.subDepartments.forEach((item: any) => {
      formatTreeData(item, params.level);
    });
  } else {
    params.hasChild = false;
  }
};

const getDepartmentTree = () => {
  apiCompanyDepartmentGetDepartmentTree({}).then((res) => {
    if (res) {
      formatTreeData(res);
      departmentData.value = res;
    }
  });
};

const cancel = () => {
  close();
};

const result = ref<any[]>([]);

const getResult = (params: any) => {
  if (params.checked) {
    result.value.push({
      id: params.id,
      name: params.name,
    });
  }
  if (Array.isArray(params.subDepartments) && params.subDepartments.length) {
    params.subDepartments.forEach((item: any) => {
      getResult(item);
    });
  }
};
const confirm = () => {
  result.value = [];
  getResult(departmentData.value);
  emit("update:selectedDepartments", result.value);
  emit("confirm", result.value);
  close();
};

const open = () => {
  result.value = [...props.selectedDepartments];
  getDepartmentTree();
  contractDepartmentCheckPopRef.value.open();
};
const close = () => {
  result.value = [];
  contractDepartmentCheckPopRef.value.close();
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
