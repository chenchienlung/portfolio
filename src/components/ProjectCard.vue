<template>
  <RouterLink
    :to="link || '#'"
    class="block group cursor-pointer w-full h-full rounded-3xl overflow-hidden border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-300 shadow-xs/12 hover:shadow-lg/12 hover:-translate-y-1"
  >
    <div class="aspect-3/2 overflow-hidden">
      <img class="w-full h-full object-cover" :src="image" :alt="title" fetchpriority="high" />
    </div>
    <div class="p-4">
      <h3
        class="text-lg font-bold text-black dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
      >
        {{ title }}
      </h3>
      <div class="flex flex-row flex-wrap gap-1 my-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-2 py-0.5 text-sm bg-gray-100 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full text-gray-600 dark:text-gray-300"
        >
          {{ tag }}
        </span>
      </div>
      <p class="text-gray-600 dark:text-gray-300 text-base line-clamp-2">{{ description }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

defineProps<Props>()
</script>
