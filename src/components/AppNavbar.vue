<template>
  <nav class="w-full h-fit fixed bottom-5 md:top-6 z-50">
    <div
      class="w-fit mx-auto flex flex-row justify-center items-center gap-2 p-1 bg-gray-200/30 dark:bg-gray-700/30 backdrop-blur-sm inset-shadow-sm rounded-full border border-black/5 dark:border-white/10"
    >
      <ul
        class="flex flex-row p-0.5 bg-gray-200/45 dark:bg-gray-700/45 backdrop-blur-sm inset-shadow-sm rounded-full border border-black/5 dark:border-white/10"
      >
        <li class="w-24">
          <RouterLink
            to="/"
            class="h-10 flex flex-row gap-1 items-center justify-center rounded-full transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
            active-class="bg-gray-50 dark:bg-gray-600/70 shadow-sm inset-shadow-white inset-shadow-sm/50 !text-gray-900 dark:!text-white hover:bg-white dark:hover:bg-gray-600/90"
          >
            <font-awesome-icon icon="fa-solid fa-house" class="mb-px" />
            首頁
          </RouterLink>
        </li>
        <li class="w-24">
          <RouterLink
            to="/portfolio"
            class="h-10 flex flex-row gap-1 items-center justify-center rounded-full transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
            active-class="bg-gray-50 dark:bg-gray-600/70 shadow-sm inset-shadow-white inset-shadow-sm/50 !text-gray-900 dark:!text-white hover:bg-white dark:hover:bg-gray-600/90"
          >
            <font-awesome-icon icon="fa-solid fa-file" class="mb-px" />
            作品
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
          class="w-11.5 h-11.5 rounded-full flex items-center justify-center text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
          :title="isDark ? '切換亮色模式' : '切換深色模式'"
        >
          <font-awesome-icon :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>
