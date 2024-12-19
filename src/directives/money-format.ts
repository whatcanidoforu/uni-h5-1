import type { DirectiveBinding } from 'vue'
import { moneyFormat } from '@/utils'

export function format(money: string | number): string {
  return moneyFormat(money, 2)
}

const formatMoney = (el: any, binding: DirectiveBinding) => {
  if (binding.value === null || binding.value === undefined) {
    el.textContent = ''
  } else {
    el.textContent = format(binding.value)
  }
}

export default formatMoney
