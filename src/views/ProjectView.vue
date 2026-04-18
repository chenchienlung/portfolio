<template>
  <section class="min-h-[calc(100dvh-168px)] max-w-6xl mx-auto mb-4">
    <div class="mx-5 mt-12 md:mt-28">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">我的作品</h2>
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="n in 6"
          :key="n"
          class="animate-pulse rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <div class="aspect-3/2 bg-gray-200 dark:bg-gray-700" />
          <div class="p-4 space-y-3">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
            <div class="flex gap-2">
              <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          </div>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { fetchProjects, type Project } from '../data/projects'

const projects = ref<(Project & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    loading.value = true
    const data: Project[] = await fetchProjects()

    projects.value = data.map((project) => ({
      ...project,
      link: `/portfolio/${project.slug}`,
    }))
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})
</script>
