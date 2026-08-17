<template>
  <div v-if="groups?.length" class="grid grid-cols-1 sm:grid-cols-2 sm:auto-rows-fr card-grid">
    <div v-for="group in groups" :key="group.title" class="flex flex-col gap-5 card-surface p-5">
      <div class="flex items-center gap-2 text-content-primary">
        <font-awesome-icon :icon="group.icon" class="mb-px" size="lg" />
        <h3 class="text-card-title font-semibold font-mono text-content-primary">
          {{ group.title }}
        </h3>
      </div>
      <ul class="w-fit flex flex-wrap content-start gap-2">
        <li v-for="skill in group.items" :key="skill"
          class="h-fit badge-lg text-sm text-content-secondary text-nowrap bg-surface border border-strong">
          {{ skill }}
        </li>
      </ul>
      <ul v-if="group.checklist?.length" class="flex flex-col gap-2 pt-4 border-t border-subtle">
        <li v-for="item in group.checklist" :key="item" class="flex items-start gap-2 text-sm text-content-secondary">
          <font-awesome-icon icon="fa-solid fa-check" class="mt-1 text-feedback-success shrink-0" />
          <span class="text-base">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SkillGroup } from '../data/about'

defineProps<{
  groups: SkillGroup[]
}>()
</script>
