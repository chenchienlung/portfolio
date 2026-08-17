<template>
  <main
    class="min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center gap-6 text-center">
    <p class="text-4xl lg:text-8xl font-bold text-content-secondary">＊ 404 Not Found ＊</p>
    <h1 class="text-state-title text-content-primary">＊ 哇！找不到這個頁面！ ＊</h1>
    <img
      :src="src"
      alt="404"
      width="200"
      height="200"
      class="w-50 h-50 rounded-xl"
      fetchpriority="high"
      decoding="async"
    />
    <p class="text-lg text-content-secondary">
      您輸入的網址不存在，或是已經被移除了。
    </p>
    <RouterLink to="/"
        class="button-primary rounded-full button-action hover:bg-action-primary-hover">
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
