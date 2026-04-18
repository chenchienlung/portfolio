import { ref, watch } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  const toggle = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (dark) => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('darkMode', String(dark))
  })

  return { isDark, toggle }
}

export function initDarkMode() {
  const saved = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved !== null ? saved === 'true' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)
}
