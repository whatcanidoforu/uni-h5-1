import { defineStore } from "pinia";
import { ref } from "vue";
import type { IPark } from "@/types/permission";

export const useHeaderPark = defineStore("headerParks", () => {
  const userId = uni.getStorageSync("userId") || "";
  const storagedParkId =
    Number(uni.getStorageSync(`parkId_zhaoshang_${userId}`)) || undefined;
  const storagedParkIdWuye =
    String(uni.getStorageSync(`parkId_wuye_${userId}`)) || "";

  const selectedId = ref<number>();
  const selectedIdWuye = ref<string>("");
  if (storagedParkId) {
    selectedId.value = storagedParkId;
  }
  if (storagedParkIdWuye) {
    selectedIdWuye.value = storagedParkIdWuye;
  }

  const setParkId = (id: number) => {
    selectedId.value = id;
    const userId = uni.getStorageSync("userId") || "";
    uni.setStorageSync(`parkId_zhaoshang_${userId}`, "" + id);
  };
  const setParkIdWuye = (id: string) => {
    selectedIdWuye.value = id;
    const userId = uni.getStorageSync("userId") || "";
    uni.setStorageSync(`parkId_wuye_${userId}`, "" + id);
  };

  const parks = ref<IPark[]>([]);
  const setParks = (list: any) => {
    parks.value = list;
  };

  return {
    selectedId,
    selectedIdWuye,
    parks,
    setParkId,
    setParkIdWuye,
    setParks,
  };
});
