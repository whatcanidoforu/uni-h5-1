import type { DirectiveBinding } from "vue";

function checkArray(key: string) {
  const list = JSON.parse(localStorage.getItem("userPermission") || "[]");
  const index = list.indexOf(key);
  if (index > -1) {
    return true; // 有权限
  } else {
    return false; // 无权限
  }
}

const permission = (el: any, binding: DirectiveBinding) => {
  if (!binding || !binding.value) {
    return false;
  }
  const permission = binding.value; // 获取到 v-permission的值
  if (permission) {
    const hasPermission = checkArray(permission);
    if (!hasPermission) {
      // 没有权限 移除Dom元素
      // el.parentNode && el.parentNode.removeChild(el)
      el.style.cssText =
        "display:none !important;width:0 !important;height: 0 !important;";
    }
  }
};

// 有一条就满足
const somePermission = (el: any, binding: DirectiveBinding) => {
  if (!binding || !binding.value) {
    return false;
  }
  const permission = binding.value; // 获取到 v-permission的值
  if (permission) {
    const p = permission.some((item: string) => checkArray(item));
    if (!p) {
      // 没有权限 移除Dom元素
      // el.parentNode && el.parentNode.removeChild(el)
      el.style.cssText =
        "display:none !important;width:0 !important;height: 0 !important;";
    }
  }
};

export default permission;
export { somePermission };
