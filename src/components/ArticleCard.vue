<template>
  <RouterLink
    :to="link || '#'"
    class="block group cursor-pointer w-full h-full p-5 rounded-3xl dark:border-white/15 md:hover:ring md:hover:ring-black/15 dark:md:hover:ring-white/10 hover:ring-black/15 dark:hover:ring-white/10 md:hover:bg-white dark:md:hover:bg-white/5 transition-all duration-300 shadow-xs/12 md:hover:shadow-lg/12"
  >
    <div class="flex flex-row gap-4 md:gap-6 items-start">
      <div class="flex-1 min-w-0 flex flex-col gap-2">
        <h3
          class="text-lg font-bold text-black dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2"
        >
          {{ title }}
        </h3>
        <div v-if="category?.length" class="flex flex-row flex-wrap gap-1">
          <span
            v-for="c in category"
            :key="c"
            class="w-fit px-2 py-0.5 align-middle text-xs font-normal bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-full"
          >
            {{ c }}
          </span>
        </div>
        <p v-if="description" class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {{ description }}
        </p>
        <p v-if="date" class="text-xs text-gray-400 dark:text-gray-500 mt-auto">
          {{ date }}
        </p>
      </div>

      <div
        class="shrink-0 w-32 md:w-48 aspect-video rounded-xl overflow-hidden bg-black/5 dark:bg-black/40"
      >
        <img
          v-if="image"
          :src="image"
          :alt="title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </RouterLink>
  <div class="w-[95%] mx-auto border-b border-black/15 dark:border-white/15"></div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  title: string
  category?: string[]
  description?: string
  image?: string
  date?: string
  link?: string
}

defineProps<Props>()
</script>
