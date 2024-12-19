import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  // apiLogin, apiGetUserAuthInfo,
  apiLogout,
  apiGetMenuConfig,
  apiGetUserPermission
} from '@/http/api/permission'
import { useRoute, useRouter } from 'vue-router'
import type { IMenu, IUserAuth } from '@/types/permission'
import assetsMenu from '@/assets/menus'

export const usePermissionStore = defineStore(
  'permission',
  () => {
    const route = useRoute()
    const router = useRouter()

    const sessionId = ref('')
    const userId = ref('')
    const userAuth = ref<IUserAuth>({
      authValues: [],
      bizCates: [],
      companies: [],
      parkAuths: [],
      parks: [],
      salesAuths: [],
      sysAdmin: false,
      wuyeAuths: []
    })
    const menuData = ref<IMenu[]>([])
    let menusMap: Record<string, IMenu[]> = {}
    const currentMenus = ref('attractInvestment')
    const menuList = ref<IMenu[]>([])
    const menuChildList = computed(() => {
      const _chilMenus = menuList.value.find((item) => route.path.startsWith(item.path))
      return _chilMenus?.children
    })
    const headerMenuList = ref<IMenu[]>([])

    // 设置当前项目菜单
    const setCurrentMenus = (val: string) => {
      if (Object.prototype.hasOwnProperty.call(menusMap, val)) {
        if (currentMenus.value != val) {
          currentMenus.value = val
          menuList.value = menusMap[val as keyof typeof menusMap] || []
        }
      }
    }

    // 根据当前路由设置顶部项目菜单的高亮
    if (route?.meta?.projectName) {
      const projectName = (route?.meta?.projectName ?? '').toString()
      if (headerMenuList.value.find((item) => item.id == projectName)) {
        setCurrentMenus(projectName)
      }
    }

    // 登录
    // async function login(mobile: string, checkCode: string) {
    //   const _res = await apiLogin({mobile, checkCode, oid: 1})
    //   sessionId.value = _res.sessionId
    //   userId.value = _res.userId
    //   await getUserAuthInfo()
    //   await getMenuList()
    // }
    // 获取用户权限
    // async function getUserAuthInfo() {
    //   const _res = await apiGetUserAuthInfo(userId.value)
    //   userAuth.value = _res
    // }

    async function getUserAllPermission() {
      let list: string[] = []
      const _userId = userId.value || localStorage.getItem('userId')
      if (!_userId) {
        localStorage.setItem('userPermission', JSON.stringify(list))
        return []
      } else {
        const _res = await apiGetUserPermission()
        list = _res.map((item) => item.code)
        localStorage.setItem('userPermission', JSON.stringify(list))
      }
      return list
    }

    // 根据hide字段过滤菜单
    function filterMenu(menu: IMenu[]) {
      return menu.filter((item) => {
        if (item.hide) {
          return false
        } else {
          if (item.children && item.children.length > 0) {
            item.children = filterMenu(item.children)
            return item.children.length > 0
          } else {
            return true
          }
        }
      })
    }

    // 获取菜单列表
    async function getMenuList(routeObj: any = {}) {
      let res = assetsMenu
      if (!import.meta.env.DEV) {
        res = await apiGetMenuConfig()
      }
      menuData.value = filterMenu(res)
      menusMap = {
        attractInvestment: menuData.value.find((item) => item.id == 'attractInvestment')?.children || [],
        propertyManager: menuData.value.find((item) => item.id == 'propertyManager')?.children || []
      }
      menuList.value = menuData.value.find((item) => item.id == 'attractInvestment')?.children || []
      headerMenuList.value = menuData.value
      // 根据当前路由设置顶部项目菜单的高亮
      if (routeObj?.meta?.projectName) {
        const projectName = (routeObj?.meta?.projectName ?? '').toString()
        if (headerMenuList.value.find((item) => item.id == projectName)) {
          setCurrentMenus(projectName)
        }
      }
    }
    // 退出登录
    async function logout() {
      await apiLogout(userId.value)
      sessionId.value = ''
      userId.value = ''
      userAuth.value = {
        authValues: [],
        bizCates: [],
        companies: [],
        parkAuths: [],
        parks: [],
        salesAuths: [],
        sysAdmin: false,
        wuyeAuths: []
      }
      router.push('/login')
    }

    return {
      sessionId,
      userId,
      userAuth,
      // login,
      menuList,
      menuChildList,
      logout,
      headerMenuList,
      setCurrentMenus,
      currentMenus,
      getMenuList,
      getUserAllPermission
    }
  },
  {
    persist: {
      paths: ['sessionId', 'userId', 'userAuth']
    }
  }
)
