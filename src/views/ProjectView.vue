<template>
    <main class="mx-5">
    <h1 class="text-page-title font-bold text-center text-content-primary py-10">我的作品</h1>
    <h2 class="sr-only">作品列表</h2>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 card-grid">
      <div
        v-for="n in 6"
        :key="n"
        class="card-skeleton w-full h-full overflow-hidden"
      >
        <div class="aspect-3/2 bg-skeleton" />
        <div class="flex flex-col gap-2 p-4">
          <div class="h-auto md:h-14 flex items-start">
            <div class="h-6 bg-skeleton rounded-sm w-4/5 sm:w-3/4 lg:w-3/5" />
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <span class="h-6 w-16 sm:w-14 bg-skeleton rounded-full" />
            <span class="h-6 w-14 sm:w-12 bg-skeleton rounded-full" />
            <span class="h-6 w-20 sm:w-16 bg-skeleton rounded-full" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-4 bg-skeleton rounded-sm w-full" />
            <div class="h-4 bg-skeleton rounded-sm w-11/12 sm:w-4/5" />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="text-center text-feedback-error">{{ error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        v-bind="project"
        :priority="index === 0"
      />
    </div>
  </main>
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
