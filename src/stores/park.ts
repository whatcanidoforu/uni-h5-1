import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPark } from '@/types/permission'

export const useHeaderPark = defineStore('headerParks', () => {
  const userId = localStorage.getItem('userId') || ''
  const storagedParkId = Number(localStorage.getItem(`parkId_zhaoshang_${userId}`)) || undefined
  const storagedParkIdWuye = String(localStorage.getItem(`parkId_wuye_${userId}`)) || ''

  const selectedId = ref<number>()
  const selectedIdWuye = ref<string>('')
  if (storagedParkId) {
    selectedId.value = storagedParkId
  }
  if (storagedParkIdWuye) {
    selectedIdWuye.value = storagedParkIdWuye
  }

  const setParkId = (id: number) => {
    selectedId.value = id
    const userId = localStorage.getItem('userId') || ''
    localStorage.setItem(`parkId_zhaoshang_${userId}`, '' + id)
  }
  const setParkIdWuye = (id: string) => {
    selectedIdWuye.value = id
    const userId = localStorage.getItem('userId') || ''
    localStorage.setItem(`parkId_wuye_${userId}`, '' + id)
  }

  const parks = ref<IPark[]>([])
  const setParks = (list: any) => {
    parks.value = list
  }

  return {
    selectedId,
    selectedIdWuye,
    parks,
    setParkId,
    setParkIdWuye,
    setParks
  }
})
