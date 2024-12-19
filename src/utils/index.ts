import Big from 'big.js'

// 数据类型
export function getType(target: unknown) {
  return Object.prototype.toString.call(target)
}

// 数组去重
export function unique(arr: []) {
  return [...new Set(arr)]
}

// 深拷贝
export function deepClone(target: any, map = new Map()) {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget: any = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

// 防抖
export function debounce(fn: (...arg: any[]) => any, duration: number = 300) {
  let timer = -1
  return function (this: unknown, ...args: any[]) {
    if (timer > -1) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.bind(this)(...args)
      timer = -1
    }, duration)
  }
}

// 节流
export function throttle(fn: (...arg: any[]) => any, interval: number = 300) {
  let lock = false
  return function (this: unknown, ...args: any[]) {
    if (lock) return
    lock = true
    setTimeout(() => (lock = false), interval)
    fn.bind(this)(...args)
  }
}

// 常用正则验证，注意type大小写
export function checkStr(str: string, type: string) {
  switch (type) {
    case 'phone': // 手机号码
      // 格式一：+86-XXXXXXXXXXX（X为数字）手机号
      // 格式二：XXXXXXXXXXX（X为数字）手机号
      return /^(\+86-)?1[1-9]\d{9}$/.test(str)
    case 'tel': // 座机
      // 支持固定电话格式输入；
      // 格式三：66778899
      // 格式四：86-10-66778899
      // 格式五：0757-XXXXXXX
      return /^((86-\d{2}-)|0\d{2,3}-)?\d{7,8}$/.test(str)
    // return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
    case 'card': // 身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
    case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'postal': // 邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str)
    case 'QQ': // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str)
    case 'email': // 邮箱
      return /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/.test(str)
    case 'money': // 金额(小数点2位)
      return /^\d*(?:.\d{0,2})?$/.test(str)
    case 'IP': // IP
      return /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/.test(str)
    case 'date': // 日期时间
      return (
        /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
        /^(\d{4})-(\d{2})-(\d{2})$/.test(str)
      )
    case 'number': // 数字
      return /^[0-9]$/.test(str)
    case 'english': // 英文
      return /^[a-zA-Z]+$/.test(str)
    case 'chinese': // 中文
      return /^[\u4E00-\u9FA5]+$/.test(str)
    case 'lower': // 小写
      return /^[a-z]+$/.test(str)
    case 'upper': // 大写
      return /^[A-Z]+$/.test(str)
    case 'HTML': // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
    default:
      return true
  }
}

// 自定义手机号校验
export function validatePhone(rule: any, value: string, callback: any) {
  if (!value) {
    return callback()
  }
  if (!checkStr(value, 'phone')) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 自定义手机号+座机校验
export function validatePhoneAndTel(rule: any, value: string, callback: any) {
  if (!value) {
    return callback()
  }
  if (!checkStr(value, 'phone') && !checkStr(value, 'tel')) {
    callback(new Error('请输入正确的手机号或座机'))
  } else {
    callback()
  }
}

//格式化日期/日期时间：yyyy-MM-dd/yyyy-MM-dd HH:mm:ss
export function formatDate(date: any, type: number | string = 1) {
  if (!date) return ''
  date = typeof date === 'number' ? String(date) : date // 时间戳如果是number类型转化成string类型
  // 匹配日期时间
  const matchDateTime = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/g
  // 匹配日期
  const matchDate = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/g
  // 匹配时间戳
  const matchTimeStamp = /[0-9]{13}|[0-9]{10}/g
  if (typeof date !== 'object') {
    if (date.match(matchDate)) {
      date = new Date(Date.parse(date.replace(/-/g, '/')))
    } else if (date.match(matchDateTime)) {
      date = date.replace(/-/g, '/')
      date = new Date(date)
    } else if (date.match(matchTimeStamp)) {
      date = new Date(Number(date))
    }
  }
  function addzero(value: number) {
    return value < 10 ? `0${value}` : value
  }
  const year = date.getFullYear()
  const month = addzero(date.getMonth() + 1)
  const weekday = addzero(date.getDate())
  const hour = addzero(date.getHours())
  const minute = addzero(date.getMinutes())
  const second = addzero(date.getSeconds())
  if (type == 1) {
    return year + '-' + month + '-' + weekday
  } else {
    return year + '-' + month + '-' + weekday + ' ' + hour + ':' + minute + ':' + second
  }
}

// 格式化金额
export function moneyFormat(money: string | number, decimalDigit: number = 2): string {
  if (!money && money !== 0) {
    return ''
  }
  if (decimalDigit < 0) {
    decimalDigit = 0
  }
  money = Big(money).toFixed(decimalDigit)
  const arr = money.split('.')
  const decimal = arr[1]
  money = arr[0].replace(/(?=\B(\d{3})+$)/g, ',')
  if (decimalDigit > 0) {
    return money + '.' + decimal
  } else {
    return money
  }
}

export function formatBigAmount(params: {
  money: string | number // 金额
  unit?: number // 单位
  threshold?: number // 阈值 超过这个值才显示单位
  unitName?: string // 单位名称
  decimalDigit?: number // 小数位数
}): string {
  let money = params.money
  const unit = params.unit || 10000
  let decimalDigit = params.decimalDigit || 2
  if (params.decimalDigit === 0) {
    decimalDigit = 0
  }
  const unitName = params.unitName || '万'
  const threshold = params.threshold || 10000
  if (!money && money !== 0) {
    return ''
  }
  money = Number(money)
  if (money >= threshold) {
    return moneyFormat(money / unit, decimalDigit) + unitName
  } else {
    return moneyFormat(money, decimalDigit)
  }
}

// 计算日期的时间差，以xx天xx小时xx分xx秒的形式返回
export function dateDiff(params: {
  startTime: string | number
  endTime?: string | number
  hasDay?: boolean
  hasHour?: boolean
  hasMin?: boolean
  hasSec?: boolean
}) {
  try {
    const start = new Date(params.startTime).getTime()
    let end
    if (params.endTime) {
      end = new Date(params.endTime).getTime()
    } else {
      end = new Date().getTime()
    }
    let diff = end - start
    let days = ''
    let hours = ''
    let minutes = ''
    let seconds = ''
    if (diff >= 0) {
      days = Math.floor(diff / (24 * 3600 * 1000)) + '天'
      diff = diff % (24 * 3600 * 1000)
      hours = Math.floor(diff / (3600 * 1000)) + '小时'
      diff = diff % (3600 * 1000)
      minutes = Math.floor(diff / (60 * 1000)) + '分'
      diff = diff % (60 * 1000)
      seconds = Math.floor(diff / 1000) + '秒'
    } else {
      days = Math.ceil(diff / (24 * 3600 * 1000)) + '天'
      diff = diff % (24 * 3600 * 1000)
      hours = Math.ceil(diff / (3600 * 1000)) + '小时'
      diff = diff % (3600 * 1000)
      minutes = Math.ceil(diff / (60 * 1000)) + '分'
      diff = diff % (60 * 1000)
      seconds = Math.ceil(diff / 1000) + '秒'
    }
    // return `${params.hasDay?days: ''}${hours}${minutes}${seconds}`
    return `${params.hasDay ? days : ''}${params.hasHour ? hours : ''}${params.hasMin ? minutes : ''}${
      params.hasSec ? seconds : ''
    }`
  } catch (e) {
    return ''
  }
}

export function downloadLinkFile(url: string, name?: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = name || ''
  link.click()
}

export function getSysConfigValue(value: any, valueType: string | undefined) {
  if (!valueType) {
    return value
  }
  if (valueType === 'number') {
    return Number(value)
  } else if (valueType === 'string') {
    return String(value)
  } else if (valueType === 'boolean') {
    return JSON.parse(value)
  } else if (valueType === 'symbol') {
    return value
  } else if (valueType === 'array') {
    return value
  } else if (valueType === 'object') {
    return value
  } else if (valueType === 'undefined') {
    return undefined
  } else if (valueType === 'null') {
    return null
  } else if (valueType === 'map') {
    return value
  } else if (valueType === 'date') {
    return value
  } else {
    return value
  }
}
