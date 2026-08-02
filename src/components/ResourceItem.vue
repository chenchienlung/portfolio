<template>
  <div class="text-neutral-600 dark:text-neutral-300 flex flex-row items-start gap-2">
    <ThemeIcon :icon="icon" :is-dark="isDark" :alt="text" class-name="w-4 h-4 my-1 shrink-0 mr-1" />
    <a
      v-if="url"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="hover:text-sky-600 dark:hover:text-sky-400 hover:underline transition-all duration-200"
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
