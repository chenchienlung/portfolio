<template>
  <main class="flex flex-col items-center justify-center gap-6 text-center">
    <p class="text-8xl font-bold text-neutral-600 dark:text-neutral-300">＊ 404 Not Found ＊</p>
    <h1 class="text-2xl text-neutral-800 dark:text-neutral-200">＊ 哇！找不到這個頁面！ ＊</h1>
    <img
      :src="src"
      alt="404"
      width="200"
      height="200"
      class="w-50 h-50 rounded-xl"
      fetchpriority="high"
    />
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      您輸入的網址不存在，或是已經被移除了。
    </p>
    <RouterLink
      to="/"
      class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
    >
      回首頁
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const images = [
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1776337741/404-3_p75xgt.jpg',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1776337750/404-2_v5o2zs.jpg',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1776337757/404-1_pea3pg.jpg',
]

const src = images[Math.floor(Math.random() * images.length)]
</script>
