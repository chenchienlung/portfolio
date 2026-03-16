<template>
  <div class="flex flex-col gap-5">
    <div class="aspect-2/1 md:aspect-4/1 overflow-hidden rounded-4xl border border-black/15">
      <img
        :src="project.banner"
        :alt="project.title"
        fetchpriority="high"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="px-8 py-12 bg-white rounded-4xl border border-black/15">
      <div class="flex flex-col md:flex-row gap-2 justify-start md:items-center text-gray-600 mb-4">
        <h1 class="text-2xl font-bold text-black">{{ project.title }}</h1>
        <ProjectLinks
          class="gap-1"
          :website="project.website"
          :github="project.github"
          :figma="project.figma"
          :figma_prototype="project.figma_prototype"
        />
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-3 py-1 text-xs bg-gray-100 border border-black/5 rounded-full text-gray-500"
        >
          {{ tag }}
        </span>
      </div>
      <p class="text-lg text-gray-600 leading-relaxed mb-8">
        {{ project.detail_description }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        <img
          v-for="img in project.detail_img"
          :key="img"
          :src="img"
          :alt="project.title"
          fetchpriority="high"
          class="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div class="prose prose-gray max-w-none">
        <slot>
          <p v-for="content in project.content" :key="content">
            <font-awesome-icon icon="fa-solid fa-check" class="mr-1 text-green-600" />
            {{ content }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../data/projects'
import ProjectLinks from './ProjectLinks.vue'

defineProps<{
  project: Project
}>()
</script>
