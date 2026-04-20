<template>
  <main
    class="h-[calc(100dvh-136px)] md:h-[calc(100dvh-40px)] flex flex-col items-center justify-center gap-6 text-center"
  >
    <p class="text-8xl font-bold text-gray-600 dark:text-gray-300">＊ 404 Not Found ＊</p>
    <h1 class="text-2xl text-gray-800 dark:text-gray-200">＊ 哇！找不到這個頁面！ ＊</h1>
    <img :src="src" alt="404" class="w-50 h-50 rounded-xl" fetchpriority="high" />
    <p class="text-lg text-gray-600 dark:text-gray-300">您輸入的網址不存在，或是已經被移除了。</p>
    <RouterLink
      to="/"
      class="px-6 py-3 text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
    >
      回首頁
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const images = [
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776337741/404-3_p75xgt.jpg',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776337750/404-2_v5o2zs.jpg',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776337757/404-1_pea3pg.jpg',
]

const src = images[Math.floor(Math.random() * images.length)]
</script>
