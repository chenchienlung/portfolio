<template>
  <nav class="w-full h-11 fixed bottom-5 md:top-6 z-50">
    <div class="mx-auto flex flex-row justify-center gap-4">
      <ul
        class="flex flex-row p-0.5 w-fit bg-gray-200/45 backdrop-blur-sm inset-shadow-sm rounded-full border border-black/5"
      >
        <li class="w-24">
          <RouterLink
            to="/"
            class="h-10 flex flex-row gap-1 items-center justify-center rounded-full transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-black/5"
            active-class="bg-gray-50 shadow-sm inset-shadow-white inset-shadow-sm/50 !text-gray-900 hover:bg-white"
          >
            <font-awesome-icon icon="fa-solid fa-house" class="mb-px" />
            首頁
          </RouterLink>
        </li>
        <li class="w-24">
          <RouterLink
            to="/project"
            class="h-10 flex flex-row gap-1 items-center justify-center rounded-full transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-black/5"
            active-class="bg-gray-50 shadow-sm inset-shadow-white inset-shadow-sm/50 !text-gray-900 hover:bg-white"
          >
            <font-awesome-icon icon="fa-solid fa-file" class="mb-px" />
            作品
          </RouterLink>
        </li>
        <!-- <li class="w-24">
          <RouterLink
            to="/about"
            class="h-10 flex flex-row gap-1 items-center justify-center rounded-full transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-black/5"
            active-class="bg-gray-50 shadow-sm inset-shadow-white inset-shadow-sm/50 !text-gray-900 hover:bg-white"
          >
            <font-awesome-icon icon="fa-solid fa-user" class="mb-px" />
            關於
          </RouterLink>
        </li> -->
      </ul>
      <a
        class="h-11.5 w-11.5 bg-gray-200/45 backdrop-blur-sm inset-shadow-sm rounded-full border border-black/5 flex items-center justify-center text-2xl text-gray-600 hover:text-gray-900 hover:bg-black/5 transition-all duration-200"
        href="https://github.com/chenchienlung"
        target="_blank"
        rel="noopener noreferrer"
        title="我的GitHub"
      >
        <font-awesome-icon icon="fa-brands fa-github" />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
