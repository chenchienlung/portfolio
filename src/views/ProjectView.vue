<template>
  <main class="min-h-screen mx-5 pb-20">
    <div class="max-w-6xl mx-auto mt-24">
      <ProjectDetail v-if="project" :project="project" />
      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-400">找不到該作品</h2>
        <RouterLink to="/" class="text-blue-500 hover:underline mt-4 inline-block">
          回到首頁
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectById } from '../data/projects'
import ProjectDetail from '../components/ProjectDetail.vue'

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const project = computed(() => getProjectById(projectId.value))
</script>
