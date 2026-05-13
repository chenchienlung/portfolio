<template>
  <RouterLink
    :to="link || '#'"
    class="block group cursor-pointer w-full h-full md:p-5 rounded-3xl dark:border-white/15 md:hover:ring md:hover:ring-black/15 dark:md:hover:ring-white/10 hover:ring-black/15 dark:hover:ring-white/10 md:hover:bg-white dark:md:hover:bg-white/5 transition-all duration-300 md:hover:shadow-lg/12"
  >
    <div class="w-full flex flex-row gap-4 md:justify-between items-stretch">
      <div class="flex flex-col justify-between gap-2.5">
        <div class="flex flex-col gap-2">
          <h3
            class="text-lg font-bold text-black dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2"
          >
            {{ title }}
          </h3>
          <div v-if="category?.length" class="flex flex-row gap-1">
            <span
              v-for="c in category"
              :key="c"
              class="w-fit px-2 py-0.5 align-middle text-sm font-normal bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-full"
            >
              {{ c }}
            </span>
          </div>
        </div>
        <p v-if="date" class="text-sm text-neutral-400 dark:text-neutral-500">
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
  <hr class="w-full md:w-[96%] mx-auto my-2.5 dark:border-white/15 border-black/15" />
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
