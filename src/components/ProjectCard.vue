<template>
  <RouterLink :to="link || '#'"
    class="block group w-full h-full card-surface overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
    <div class="aspect-3/2 overflow-hidden">
      <img class="w-full h-full object-cover bg-image-placeholder" :src="image || siteSettings.default_image"
        :alt="title" @error="handleImageError($event, DEFAULT_IMAGE)" width="480" height="360"
        :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'" decoding="async" />
    </div>
    <div class="flex flex-col gap-2 card-compact">
      <h3
        class="h-fit md:h-14 text-card-title font-bold text-content-primary group-hover:text-action-primary transition-colors">
        {{ title }}
      </h3>
      <div class="flex flex-row flex-wrap gap-1">
        <span v-for="tag in tags" :key="tag"
          class="badge-sm text-sm bg-surface-muted border border-strong text-content-secondary">
          {{ tag }}
        </span>
      </div>
      <p class="text-content-secondary text-base line-clamp-2">{{ description }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { DEFAULT_IMAGE, handleImageError } from '../utils/imageFallback'
import { siteSettings } from '../data/siteSettings'

interface Props {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  priority?: boolean
}

defineProps<Props>()
</script>
