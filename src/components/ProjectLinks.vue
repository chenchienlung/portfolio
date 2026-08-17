<template>
  <div class="flex flex-row gap-2">
    <a
      v-if="website"
      class="project-link hover:text-action-primary hover:bg-control-hover"
      :href="website"
      target="_blank"
      rel="noopener noreferrer"
      title="前往網站"
    >
      <font-awesome-icon icon="fa-solid fa-globe" class="mb-px" />
      <span class="mx-1 text-sm after:content-['_↗']">Website</span>
    </a>
    <a
      v-if="github"
      class="project-link hover:text-action-primary hover:bg-control-hover"
      :href="github"
      target="_blank"
      rel="noopener noreferrer"
      title="查看 GitHub"
    >
      <font-awesome-icon icon="fa-brands fa-github" class="mb-px" />
      <span class="mx-1 text-sm after:content-['_↗']">GitHub</span>
    </a>
    <a
      v-if="figma"
      class="project-link hover:text-action-primary hover:bg-control-hover"
      :href="figma"
      target="_blank"
      rel="noopener noreferrer"
      title="查看 Figma"
    >
      <font-awesome-icon icon="fa-brands fa-figma" class="mb-px" />
      <span class="mx-1 text-sm after:content-['_↗']">Figma</span>
    </a>
    <a
      v-if="figma_prototype"
      class="project-link hover:text-action-primary hover:bg-control-hover"
      :href="figma_prototype"
      target="_blank"
      rel="noopener noreferrer"
      title="Prototype"
    >
      <font-awesome-icon icon="fa-brands fa-figma" class="mb-px" />
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
