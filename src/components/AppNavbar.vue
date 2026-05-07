<template>
  <nav
    class="w-full h-fit fixed bottom-5 md:top-6 z-50"
    :class="isIOSSafari ? 'bottom-[4px]' : 'bottom-5'"
  >
    <div
      class="w-fit mx-auto flex flex-row justify-center items-center gap-2 p-1 bg-gray-200/30 dark:bg-black/40 backdrop-blur-sm inset-shadow-sm rounded-full border border-black/5 dark:border-white/10"
    >
      <ul
        class="w-fit flex flex-row justify-center p-0.5 bg-gray-200/45 dark:bg-black/20 backdrop-blur-sm inset-shadow-sm rounded-full border border-black/5 dark:border-white/10"
      >
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            :class="[
              'h-10 flex flex-row items-center justify-center rounded-full transition-all duration-300 ease-out text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/35 dark:hover:bg-white/10',
              item.match(route.path) ? 'w-22' : 'w-10',
            ]"
            active-class="!bg-gray-50 dark:!bg-white/10 shadow-sm inset-shadow-black/10 dark:inset-shadow-white/60 inset-shadow-sm/50 dark:inset-shadow-sm/20 !text-gray-900 dark:!text-white"
          >
            <font-awesome-icon :icon="item.icon" class="w-10 h-10 mb-px shrink-0" />
            <span
              class="overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
              :class="
                item.match(route.path) ? 'max-w-22 ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
              "
            >
              {{ item.label }}
            </span>
          </RouterLink>
        </li>
      </ul>
      <div class="flex flex-row">
        <a
          class="w-11.5 h-11.5 rounded-full flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
          href="https://github.com/chenchienlung"
          target="_blank"
          rel="noopener noreferrer"
          title="我的GitHub"
        >
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <button
          @click="toggle"
          class="w-11.5 h-11.5 rounded-full flex items-center justify-center text-xl text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
          :title="isDark ? '切換亮色模式' : '切換深色模式'"
        >
          <font-awesome-icon :icon="isDark ? 'fa-regular fa-moon' : 'fa-regular fa-sun'" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
const route = useRoute()

const navItems = [
  {
    to: '/',
    icon: 'fa-solid fa-house',
    label: '首頁',
    match: (path: string) => path === '/',
  },
  {
    to: '/portfolio',
    icon: 'fa-solid fa-file',
    label: '作品',
    match: (path: string) => path.startsWith('/portfolio'),
  },
  // {
  //   to: '/blog',
  //   icon: 'fa-solid fa-pen',
  //   label: '文章',
  //   match: (path: string) => path.startsWith('/blog'),
  // },
]

const isIOSSafari =
  /iP(hone|ad)/.test(navigator.userAgent) &&
  /Safari/.test(navigator.userAgent) &&
  !/CriOS|FxiOS|OPiOS|GSA|Mobile/.test(navigator.userAgent)
</script>
