<template>
  <div class="text-content-secondary flex flex-row items-start gap-2">
    <ThemeIcon :icon="icon" :is-dark="isDark" :alt="text" class-name="w-4 h-4 my-1 shrink-0 mr-1" />
    <a
      v-if="url"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="hover:text-action-primary hover:underline transition-all duration-200"
    >
      {{ text }} ↗
    </a>
    <span v-else class="">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import ThemeIcon from './ThemeIcon.vue'
import type { ThemeIcon as ThemeIconData } from '../types/icon'

interface Props {
  icon: ThemeIconData
  prefix?: string
  text: string
  url?: string
  isDark?: boolean
}

withDefaults(defineProps<Props>(), {
  isDark: false,
})
</script>
