<template>
  <view class="tree-item-container">
    <view class="tree-item">
      <uni-icons
        type="arrowdown"
        size="14"
        class="icon"
        @click="toggle"
        v-if="treeData.hasChild && treeData.open"
      ></uni-icons>
      <uni-icons
        type="right"
        size="14"
        class="icon"
        @click="toggle"
        v-if="treeData.hasChild && !treeData.open"
      ></uni-icons>
      <view class="name" @click="toggle">{{ treeData.name }}</view>
      <view class="radio-container">
        <checkbox-group @change="checkChange">
          <checkbox :value="treeData.id + ''" :checked="treeData.checked" />
        </checkbox-group>
      </view>
    </view>
    <view v-if="!!treeData.hasChild" v-show="treeData.open">
      <department-tree
        v-for="item in treeData.subDepartments"
        :key="item.id"
        :tree-data="item"
      />
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: "department-tree",
};
</script>
<script lang="ts" setup>
const props = defineProps({
  treeData: {
    type: Object,
    default: () => ({}),
  },
});

const toggle = () => {
  props.treeData.open = !props.treeData.open;
};

const checkChange = (e: any) => {
  let value = false;
  if (e.detail?.value && e.detail?.value.length) {
    value = true;
  }
  props.treeData.checked = value;
};
</script>

<style lang="scss" scoped>
.tree-item-container {
  padding-left: 12px;
}
.tree-item {
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 10px;
  .icon {
    width: 14px;
    height: 14px;
  }
  .name {
    flex: 1;
    margin: 0 10px;
  }
}
</style>
