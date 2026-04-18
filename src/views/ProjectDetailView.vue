<template>
  <main class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-24">
      <div v-if="loading" class="animate-pulse space-y-6 mb-10">
        <div class="aspect-2/1 md:aspect-4/1 rounded-4xl bg-gray-200 border border-black/10" />
        <div
          class="px-6 md:px-8 py-10 md:py-12 bg-white rounded-4xl border border-black/15 space-y-8"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="h-7 bg-gray-200 rounded w-1/3" />
            <div class="flex gap-3">
              <span class="h-8 w-20 bg-gray-200 rounded-xl" />
              <span class="h-8 w-20 bg-gray-200 rounded-xl" />
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            <span class="h-6 w-16 bg-gray-200 rounded-full" />
            <span class="h-6 w-14 bg-gray-200 rounded-full" />
            <span class="h-6 w-18 bg-gray-200 rounded-full" />
            <span class="h-6 w-12 bg-gray-200 rounded-full" />
          </div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded w-full" />
            <div class="h-4 bg-gray-200 rounded w-5/6" />
            <div class="h-4 bg-gray-200 rounded w-4/5" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="n in 3" :key="n" class="aspect-3/2 bg-gray-200 rounded-2xl" />
          </div>
          <div class="space-y-3">
            <div class="h-6 bg-gray-200 rounded w-24" />
            <div class="flex gap-4">
              <div v-for="n in 6" :key="n" class="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <ProjectDetail v-else-if="project" :project="project" />
      <div v-else class="text-center">
        <h2 class="text-2xl font-bold text-gray-400">找不到該作品</h2>
        <RouterLink to="/" class="text-blue-500 hover:underline mt-4 inline-block">
          回到前一頁
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProjectBySlug, type Project } from '../data/projects'
import ProjectDetail from '../components/ProjectDetail.vue'

const route = useRoute()
const project = ref<Project | null>(null)
const loading = ref(true)

const loadProject = async () => {
  const slug = route.params.slug as string
  if (!slug) return
  loading.value = true
  try {
    project.value = await fetchProjectBySlug(slug)
  } catch (err) {
    project.value = null
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadProject)
watch(() => route.params.slug, loadProject)
</script>
