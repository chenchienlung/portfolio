<template>
  <RouterLink
    :to="link || '#'"
    class="block group cursor-pointer w-full h-full rounded-3xl overflow-hidden border border-black/15 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    <div class="aspect-3/2 overflow-hidden">
      <img
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        :src="image"
        :alt="title"
      />
    </div>
    <div class="p-4">
      <h2 class="text-lg font-bold text-black group-hover:text-sky-600 transition-colors">
        {{ title }}
      </h2>
      <div class="flex flex-row flex-wrap gap-1 my-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-2 py-0.5 text-xs bg-gray-100 border border-black/5 rounded-full text-gray-500"
        >
          {{ tag }}
        </span>
      </div>
      <p class="text-gray-600 text-sm line-clamp-2">{{ description }}</p>
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
