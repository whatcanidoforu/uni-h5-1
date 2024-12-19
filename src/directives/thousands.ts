import type { DirectiveBinding } from 'vue'

const unitMap = new Map([
  ['area', '㎡'],
  ['percent', '%'],
  ['percentNormal', '']
])

const thousands = (el: any, binding: DirectiveBinding) => {
  if (binding.value === null || binding.value === undefined) {
    el.textContent = ''
  } else {
    el.textContent = binding.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (unitMap.get(binding.arg!) || '')
  }
}

export default thousands
