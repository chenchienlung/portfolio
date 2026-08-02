<template>
  <font-awesome-icon v-if="icon.type === 'fa'" :icon="icon.light" :class="className" />
  <img
    v-else
    :src="isDark && icon.dark ? icon.dark : icon.light"
    :alt="alt"
    :class="className"
    loading="lazy"
    decoding="async"
  />
</template>

<script setup lang="ts">
import type { ThemeIcon } from '../types/icon'

withDefaults(
  defineProps<{
    icon: ThemeIcon
    isDark?: boolean
    alt?: string
    className?: string
  }>(),
  {
    isDark: false,
    alt: '',
    className: '',
  },
)
</script>
