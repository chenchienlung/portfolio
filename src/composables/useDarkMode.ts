import { ref, watch } from 'vue'

const isDark = ref(false)

const THEME_COLOR_LIGHT = '#f8f8f8'
const THEME_COLOR_DARK = '#181818'

const updateThemeColor = (dark: boolean) => {
  document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove())
  const meta = document.createElement('meta')
  meta.name = 'theme-color'
  meta.content = dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT
  document.head.appendChild(meta)
}

export function useDarkMode() {
  const toggle = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (dark) => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('darkMode', String(dark))
    updateThemeColor(dark)
  })

  return { isDark, toggle }
}

export function initDarkMode() {
  const saved = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved !== null ? saved === 'true' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)

  if (saved !== null) {
    updateThemeColor(isDark.value)
  }
}
