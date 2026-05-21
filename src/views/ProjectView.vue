<template>
  <section class="min-h-[calc(100dvh-168px)] max-w-6xl mx-auto mb-4">
    <div class="mx-5 mt-12 md:mt-28">
      <h2 class="text-3xl font-bold text-center text-neutral-900 dark:text-white mb-10">
        我的作品
      </h2>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="n in 6"
          :key="n"
          class="animate-pulse rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden shadow-xs/12"
        >
          <div class="aspect-3/2 bg-black/15 dark:bg-white/15" />
          <div class="p-4">
            <div class="h-fit md:h-14 flex items-start">
              <div class="h-6 bg-black/15 dark:bg-white/15 rounded w-3/5" />
            </div>
            <div class="flex flex-row flex-wrap gap-1 my-2">
              <span class="h-6 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
              <span class="h-6 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
              <span class="h-6 w-16 bg-black/15 dark:bg-white/15 rounded-full" />
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-full" />
              <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-4/5" />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
