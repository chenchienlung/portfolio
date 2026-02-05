<template>
  <div class="flex flex-col gap-5">
    <div class="aspect-2/1 md:aspect-4/1 overflow-hidden rounded-4xl border border-black/15">
      <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
    </div>
    <div class="px-8 py-12 bg-white rounded-4xl border border-black/15">
      <div class="max-w-3xl">
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-3 py-1 text-xs bg-gray-100 border border-black/5 rounded-full text-gray-500"
          >
            {{ tag }}
          </span>
        </div>
        <h1 class="text-3xl font-bold text-black mb-6">{{ project.title }}</h1>
        <p class="text-lg text-gray-600 leading-relaxed mb-8">
          {{ project.description }}
        </p>

        <div class="prose prose-gray max-w-none">
          <slot>
            <p v-if="project.content">{{ project.content }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../data/projects'

defineProps<{
  project: Project
}>()
</script>
