import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModals = defineStore('modals', () => {
  const isShowAllModals = ref(true)

  const showAllModals = () => {
    isShowAllModals.value = true
  }
  const hideAllModals = () => {
    isShowAllModals.value = false
  }

  return {
    isShowAllModals,
    showAllModals,
    hideAllModals
  }
})
