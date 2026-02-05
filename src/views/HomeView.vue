<template>
  <main class="min-h-screen mx-5 pt-12 md:pt-24">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-12">我的作品集</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects as projectData } from '../data/projects'

const projects = computed(() =>
  projectData.map((project) => ({
    ...project,
    id: `/project/${project.id}`,
  })),
)
</script>
