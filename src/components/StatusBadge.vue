<template>
  <span
    class="w-fit h-fit flex items-center gap-1.5 ring-1 rounded-full"
    :class="[styles.container, 'shadow-status', sizeClass]"
    :style="{ '--status-shadow-color': styles.shadowColor }"
  >
    <span class="w-2 h-2 rounded-full animate-pulse shrink-0" :class="styles.dot"></span>
    <slot>{{ label }}</slot>
  </span>
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

const COLOR_MAP: Record<JobStatusColor, { container: string; dot: string; shadowColor: string }> = {
  green: {
    container:
      'bg-status-green text-status-green ring-status-green',
    dot: 'bg-status-green-dot',
    shadowColor: 'var(--semantic-status-green-shadow-color)',
  },
  blue: {
    container:
      'bg-status-blue text-status-blue ring-status-blue',
    dot: 'bg-status-blue-dot',
    shadowColor: 'var(--semantic-status-blue-shadow-color)',
  },
  rose: {
    container:
      'bg-status-rose text-status-rose ring-status-rose',
    dot: 'bg-status-rose-dot',
    shadowColor: 'var(--semantic-status-rose-shadow-color)',
  },
  yellow: {
    container:
      'bg-status-yellow text-status-yellow ring-status-yellow',
    dot: 'bg-status-yellow-dot',
    shadowColor: 'var(--semantic-status-yellow-shadow-color)',
  },
  purple: {
    container:
      'bg-status-purple text-status-purple ring-status-purple',
    dot: 'bg-status-purple-dot',
    shadowColor: 'var(--semantic-status-purple-shadow-color)',
  },
  neutral: {
    container:
      'bg-status-neutral text-status-neutral ring-status-neutral',
    dot: 'bg-status-neutral-dot',
    shadowColor: 'var(--semantic-status-neutral-shadow-color)',
  },
}

const styles = computed(() => COLOR_MAP[props.color] ?? COLOR_MAP.green)

const sizeClass = computed(() =>
  props.size === 'sm' ? 'badge-sm text-xs' : 'badge-lg text-sm',
)
</script>
