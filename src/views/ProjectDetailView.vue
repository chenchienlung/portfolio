<template>
  <main class="mx-5 mt-12 md:mt-24">
    <div v-if="loading" class="animate-pulse flex flex-col gap-5 mb-4">
      <div
        class="aspect-2/1 md:aspect-4/1 rounded-4xl bg-black/15 dark:bg-white/15 border border-black/15 dark:border-white/10 shadow-xs/12" />
      <div
        class="px-5 py-8 md:px-8 md:py-12 bg-white dark:bg-white/5 rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12 flex flex-col gap-20">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col md:flex-row gap-2 md:items-center md:justify-between mb-4">
            <div class="h-8 bg-black/15 dark:bg-white/15 rounded w-1/3" />
            <div class="flex gap-3">
              <span class="h-9 w-20 bg-black/15 dark:bg-white/15 rounded-xl" />
              <span class="h-9 w-20 bg-black/15 dark:bg-white/15 rounded-xl" />
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="h-7 w-16 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-7 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-7 w-20 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-7 w-12 bg-black/15 dark:bg-white/15 rounded-full" />
          </div>
        </div>

        <div class="p-5 bg-neutral-100 dark:bg-neutral-700/60 rounded-xl flex flex-col gap-3">
          <div class="h-6 w-6 bg-black/15 dark:bg-white/15 rounded mb-2" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-5/6" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-3/4" />
        </div>

        <div class="space-y-3">
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-full" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-5/6" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-4/5" />
        </div>

        <div class="space-y-3">
          <div class="h-7 bg-black/15 dark:bg-white/15 rounded w-28 mb-2" />
          <div class="flex flex-row flex-wrap gap-5">
            <div v-for="n in 6" :key="n" class="w-8 h-8 bg-black/15 dark:bg-white/15 rounded" />
          </div>
        </div>

        <div class="space-y-3">
          <div class="h-7 bg-black/15 dark:bg-white/15 rounded w-28 mb-2" />
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="n in 3" :key="n" class="aspect-3/2 bg-black/15 dark:bg-white/15 rounded-xl" />
          </div>
        </div>
      </div>

      <section class="flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="n in 2" :key="n"
            class="h-18 flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12">
            <div class="w-4 h-4 bg-black/15 dark:bg-white/15 rounded shrink-0" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-2/3" />
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="error" class="text-center py-20">
      <h2 class="text-2xl font-bold text-red-500 mb-10">{{ error }}</h2>
      <RouterLink to="/portfolio"
        class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200">
        回到作品列表
      </RouterLink>
    </div>
    <ProjectDetail v-else-if="project" :project="project" :prev="prevProject" :next="nextProject" />
    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-neutral-400 dark:text-neutral-500 mb-10">找不到該作品</h2>
      <RouterLink to="/portfolio"
        class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200">
        回到作品列表
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  fetchProjectBySlug,
  fetchProjectNavigation,
  type Project,
  type ProjectNavigationItem,
} from '../data/projects'
import ProjectDetail from '../components/ProjectDetail.vue'
import { setPageTitle } from '../utils/pageTitle'
import { isNotFoundError } from '../utils/supabase'

const route = useRoute()
const project = ref<Project | null>(null)
const projectList = ref<ProjectNavigationItem[]>([])
const loading = ref(true)
const error = ref('')
let requestId = 0

const currentIndex = computed(() => {
  if (!project.value) return -1
  return projectList.value.findIndex((p) => p.slug === project.value!.slug)
})

// projectList 已用 id desc 排序，所以 index 越大 = 越早的作品
// 上一個 = 更早 = currentIndex + 1
// 下一個 = 更新 = currentIndex - 1
const prevProject = computed((): ProjectNavigationItem | null => {
  const i = currentIndex.value
  if (i < 0 || i + 1 >= projectList.value.length) return null
  return projectList.value[i + 1] ?? null
})

const nextProject = computed((): ProjectNavigationItem | null => {
  const i = currentIndex.value
  if (i <= 0) return null
  return projectList.value[i - 1] ?? null
})

const loadProject = async () => {
  const slug = route.params.slug as string
  if (!slug) return
  const currentRequestId = ++requestId
  loading.value = true
  error.value = ''
  project.value = null
  try {
    const [projectData, listData] = await Promise.all([
      fetchProjectBySlug(slug),
      fetchProjectNavigation(),
    ])
    if (currentRequestId !== requestId) return
    project.value = projectData
    projectList.value = listData
    setPageTitle(project.value?.title)
  } catch (err) {
    if (currentRequestId !== requestId) return
    if (isNotFoundError(err)) {
      setPageTitle('找不到該作品')
      return
    }
    error.value = '作品載入失敗，請稍後再試。'
    setPageTitle('找不到該作品')
    console.error(err)
  } finally {
    if (currentRequestId === requestId) loading.value = false
  }
}

onMounted(loadProject)
watch(() => route.params.slug, loadProject)
</script>
