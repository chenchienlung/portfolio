<template>
  <div class="flex flex-row">
    <a
      v-if="website"
      class="w-8 h-8 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="website"
      target="_blank"
      rel="noopener noreferrer"
      title="前往網站"
    >
      <font-awesome-icon icon="fa-solid fa-globe" />
    </a>
    <a
      v-if="github"
      class="w-8 h-8 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="github"
      target="_blank"
      rel="noopener noreferrer"
      title="查看 GitHub"
    >
      <font-awesome-icon icon="fa-brands fa-github" />
    </a>
    <a
      v-if="figma"
      class="w-8 h-8 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="figma"
      target="_blank"
      rel="noopener noreferrer"
      title="查看 Figma"
    >
      <font-awesome-icon icon="fa-brands fa-figma" />
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  website?: string
  github?: string
  figma?: string
}>()
</script>
