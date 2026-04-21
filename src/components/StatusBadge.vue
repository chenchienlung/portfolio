<template>
  <div
    class="w-fit h-fit flex items-center gap-1.5 ring-1 rounded-full shadow-[0_0_12px]"
    :class="[styles.container, styles.shadow, sizeClass]"
  >
    <span class="w-2 h-2 rounded-full animate-pulse shrink-0" :class="styles.dot"></span>
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobStatusColor } from '../data/about'

interface Props {
  label?: string
  color?: JobStatusColor
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'green',
  size: 'md',
})

const COLOR_MAP: Record<JobStatusColor, { container: string; dot: string; shadow: string }> = {
  green: {
    container:
      'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 ring-green-400 dark:ring-green-500/60',
    dot: 'bg-green-500 dark:bg-green-400',
    shadow: 'shadow-green-400/30 dark:shadow-green-400/20',
  },
  blue: {
    container:
      'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 ring-blue-400 dark:ring-blue-500/60',
    dot: 'bg-blue-500 dark:bg-blue-400',
    shadow: 'shadow-blue-400/30 dark:shadow-blue-400/20',
  },
  rose: {
    container:
      'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 ring-rose-400 dark:ring-rose-500/60',
    dot: 'bg-rose-500 dark:bg-rose-400',
    shadow: 'shadow-rose-400/30 dark:shadow-rose-400/20',
  },
  gray: {
    container:
      'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 ring-gray-400 dark:ring-gray-500/60',
    dot: 'bg-gray-500 dark:bg-gray-400',
    shadow: 'shadow-gray-400/30 dark:shadow-gray-400/20',
  },
}

const styles = computed(() => COLOR_MAP[props.color] ?? COLOR_MAP.green)

const sizeClass = computed(() =>
  props.size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
)
</script>
