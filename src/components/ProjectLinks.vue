<template>
  <div class="flex flex-row">
    <a
      v-if="website"
      class="h-10 px-3 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="website"
      target="_blank"
      rel="noopener noreferrer"
      title="前往網站"
    >
      <font-awesome-icon icon="fa-solid fa-globe" />
      <span class="mx-1 text-sm after:content-['_↗']">Website</span>
    </a>
    <a
      v-if="github"
      class="h-10 px-3 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="github"
      target="_blank"
      rel="noopener noreferrer"
      title="查看 GitHub"
    >
      <font-awesome-icon icon="fa-brands fa-github" />
      <span class="mx-1 text-sm after:content-['_↗']">GitHub</span>
    </a>
    <a
      v-if="figma"
      class="h-10 px-3 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="figma"
      target="_blank"
      rel="noopener noreferrer"
      title="查看 Figma"
    >
      <font-awesome-icon icon="fa-brands fa-figma" />
      <span class="mx-1 text-sm after:content-['_↗']">Figma</span>
    </a>
    <a
      v-if="figma_prototype"
      class="h-10 px-3 flex items-center justify-center rounded-xl hover:text-sky-600 hover:bg-black/5 transition-all duration-200"
      :href="figma_prototype"
      target="_blank"
      rel="noopener noreferrer"
      title="Prototype"
    >
      <font-awesome-icon icon="fa-brands fa-figma" />
      <span class="mx-1 text-sm after:content-['_↗']">Prototype</span>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  website?: string
  github?: string
  figma?: string
  figma_prototype?: string
}>()
</script>
