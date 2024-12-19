import type { DirectiveBinding } from 'vue'

export function format(date: any, type: number | string = 1): string {
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
      const timestamp = Date.parse(date.replace(/-/g, '/'))
      if (!timestamp) {
        return ''
      }
      date = new Date(date)
    } else if (date.match(matchDateTime)) {
      date = date.replace(/-/g, '/')
      date = new Date(date)
    } else if (date.match(matchTimeStamp)) {
      date = new Date(Number(date))
    }
  }
  let result = ''
  switch (type) {
    case 1:
      result = formatdate(date, 1)
      break
    case 2:
      result = formatdate(date, 2)
      break
    case 3:
      result = formatweek(date)
      break
    case 4:
      result = formattimestamp(date)
      break
  }
  //格式化日期/日期时间：yyyy-MM-dd/yyyy-MM-dd HH:mm:ss
  function formatdate(date: Date, type: number | string) {
    const year = date.getFullYear()
    const month = addzero(date.getMonth() + 1)
    const weekday = addzero(date.getDate())
    const hour = addzero(date.getHours())
    const minute = addzero(date.getMinutes())
    const second = addzero(date.getSeconds())
    function addzero(value: number) {
      return value < 10 ? `0${value}` : value
    }
    if (type == 1) {
      return year + '-' + month + '-' + weekday
    } else {
      return year + '-' + month + '-' + weekday + ' ' + hour + ':' + minute + ':' + second
    }
  }
  // 格式化周几
  function formatweek(date: Date) {
    let week = ''
    if (date.getDay() == 0) week = '星期日'
    if (date.getDay() == 1) week = '星期一'
    if (date.getDay() == 2) week = '星期二'
    if (date.getDay() == 3) week = '星期三'
    if (date.getDay() == 4) week = '星期四'
    if (date.getDay() == 5) week = '星期五'
    if (date.getDay() == 6) week = '星期六'
    return week
  }
  //格式化时间戳
  function formattimestamp(date: Date) {
    const timestamp = date.getTime()
    return '' + timestamp
  }
  return result
}

const formatTime = (el: any, binding: DirectiveBinding) => {
  el.textContent = format(binding.value)
}

export default formatTime
