<template>
  <div v-if="groups?.length" class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div
      v-for="(group, i) in groups"
      :key="group.title"
      class="h-fit md:h-[400px] flex flex-col gap-5 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-5"
      data-aos="fade-up"
      data-aos-duration="800"
      :data-aos-delay="(i + 1) * delayBase"
    >
      <div class="flex items-center gap-2 text-black dark:text-white">
        <font-awesome-icon :icon="group.icon" class="mb-px" size="lg" />
        <h3 class="text-xl font-semibold font-mono text-black dark:text-white">
          {{ group.title }}
        </h3>
      </div>
      <ul class="w-fit md:h-30 flex flex-wrap content-start gap-2">
        <li
          v-for="skill in group.items"
          :key="skill"
          class="h-fit text-sm text-gray-600 dark:text-gray-300 text-nowrap px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full"
        >
          {{ skill }}
        </li>
      </ul>
      <ul
        v-if="group.checklist?.length"
        class="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-white/10"
      >
        <li
          v-for="item in group.checklist"
          :key="item"
          class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
        >
          <font-awesome-icon icon="fa-solid fa-check" class="mt-1 text-green-600 shrink-0" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SkillGroup } from '../data/about'

withDefaults(
  defineProps<{
    groups: SkillGroup[]
    delayBase?: number
  }>(),
  {
    delayBase: 50,
  },
)
</script>
