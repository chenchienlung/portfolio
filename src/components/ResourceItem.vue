<template>
  <div class="text-gray-600 dark:text-gray-300 flex flex-row items-start gap-2">
    <font-awesome-icon v-if="iconType === 'fa'" :icon="icon" class="w-4 h-4 my-1 shrink-0" />
    <img
      v-else
      :src="isDark && iconDark ? iconDark : icon"
      :alt="text"
      width="16"
      height="16"
      class="shrink-0 my-1 mr-1"
      fetchpriority="high"
    />
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
interface Props {
  iconType?: 'fa' | 'img'
  icon: string
  iconDark?: string // 圖片 icon 的深色模式版本
  prefix?: string
  text: string
  url?: string
  isDark?: boolean
}

withDefaults(defineProps<Props>(), {
  iconType: 'fa',
  isDark: false,
})
</script>
