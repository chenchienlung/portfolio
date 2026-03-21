<template>
  <main class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-24">
      <div v-if="loading" class="text-center text-gray-500">載入中...</div>
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
import { fetchProjectById, type Project } from '../data/projects'
import ProjectDetail from '../components/ProjectDetail.vue'

const route = useRoute()
const project = ref<Project | null>(null)
const loading = ref(true)

const loadProject = async () => {
  const id = route.params.id as string
  if (!id) return
  loading.value = true
  try {
    project.value = await fetchProjectById(id)
  } catch (err) {
    project.value = null
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadProject)
watch(() => route.params.id, loadProject)
</script>
