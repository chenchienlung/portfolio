<template>
  <nav class="w-full fixed bottom-5 md:top-6 z-50">
    <div class="mx-auto flex flex-row justify-center gap-4">
      <ul
        class="flex flex-row p-0.5 w-fit bg-gray-200/45 backdrop-blur-sm rounded-full border border-black/5"
      >
        <li class="w-24">
          <RouterLink
            to="/"
            class="h-10 flex items-center justify-center rounded-full transition-all duration-200 text-gray-600 hover:text-gray-900"
            active-class="bg-white shadow-sm !text-gray-900"
          >
            作品集
          </RouterLink>
        </li>
        <li class="w-24">
          <RouterLink
            to="/about"
            class="h-10 flex items-center justify-center rounded-full transition-all duration-200 text-gray-600 hover:text-gray-900"
            active-class="bg-white shadow-sm !text-gray-900"
          >
            關於我
          </RouterLink>
        </li>
      </ul>
      <a
        class="h-11.5 w-11.5 bg-gray-200/45 backdrop-blur-sm rounded-full border border-black/5 flex items-center justify-center text-2xl text-gray-900 hover:text-gray-600 transition-all duration-200"
        href="https://github.com/chenchienlung"
        target="_blank"
      >
        <font-awesome-icon icon="fa-brands fa-github" />
      </a>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
