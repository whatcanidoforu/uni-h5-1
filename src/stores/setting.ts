import { apiSystemConfig } from '@/http/api/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSetting = defineStore('setting', () => {
  const copyright = ref('')
  const loginBackground = ref('')
  const loginPic = ref('')
  const logo = ref('')

  const getSetting = () => {
    apiSystemConfig().then((res) => {
      copyright.value = res.copyright
      loginBackground.value = res.loginBackground
      loginPic.value = res.loginPic
      logo.value = res.logo
    })
  }

  return {
    copyright,
    loginBackground,
    loginPic,
    logo,
    getSetting
  }
})
