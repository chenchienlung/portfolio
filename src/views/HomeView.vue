<template>
  <section class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-28">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">我的作品</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects as projectData } from '../data/projects'

const projects = computed(() =>
  projectData.map((project) => ({
    ...project,
    link: `/${project.id}`,
  })),
)
</script>
