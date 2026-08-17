<template>
  <RouterLink :to="link || '#'"
    class="block group w-full h-full md:p-5 rounded-3xl md:hover:ring md:hover:ring-surface hover:ring-surface md:hover:bg-neutral-100 dark:md:hover:bg-neutral-900 transition-all duration-300 md:hover:shadow-card-hover">
    <div class="w-full flex flex-col-reverse sm:flex-row gap-4 sm:justify-between items-stretch">
      <div class="flex flex-col justify-between gap-2.5">
        <div class="flex flex-col gap-2">
          <h3
            class="text-card-title font-bold text-content-primary group-hover:text-action-primary transition-colors line-clamp-2">
            {{ title }}
          </h3>
          <div v-if="category?.length" class="flex flex-row gap-1">
            <span v-for="c in category" :key="c"
              class="w-fit badge-default align-middle text-sm bg-action-subtle text-action-primary">
              {{ c }}
            </span>
          </div>
        </div>
        <p v-if="date" class="text-sm text-content-tertiary">
          {{ date }}
        </p>
      </div>

      <div class="h-fit shrink-0 w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-image-placeholder">
        <img :src="image || siteSettings.default_image" :alt="title" @error="handleImageError($event, DEFAULT_IMAGE)"
          class="w-full h-full object-cover" width="192" height="108" :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : 'auto'" decoding="async" />
      </div>
    </div>
  </RouterLink>
  <hr class="w-full md:w-[96%] mx-auto my-8 md:my-2.5 border-surface" />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { DEFAULT_IMAGE, handleImageError } from '../utils/imageFallback'
import { siteSettings } from '../data/siteSettings'

interface Props {
  title: string
  category?: string[]
  description?: string
  image?: string
  date?: string
  link?: string
  priority?: boolean
}

defineProps<Props>()
</script>
