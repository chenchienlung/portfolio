<template>
  <main class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-24">
      <ProjectDetail v-if="project" :project="project" />
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectById } from '../data/projects'
import ProjectDetail from '../components/ProjectDetail.vue'

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const project = computed(() => getProjectById(projectId.value))
</script>
