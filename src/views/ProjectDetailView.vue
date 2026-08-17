<template>
  <main class="mx-5 mt-12 md:mt-24">
    <div v-if="loading" class="animate-pulse flex flex-col gap-5">
      <div
        class="detail-banner-skeleton bg-skeleton md:aspect-4/1" />
      <div
        class="detail-content card-skeleton flex flex-col gap-20">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
            <div class="h-8 bg-skeleton rounded-sm w-1/3" />
            <div class="flex gap-3">
              <span class="h-9 w-20 bg-skeleton rounded-xl" />
              <span class="h-9 w-20 bg-skeleton rounded-xl" />
            </div>
          </div>
        <div class="flex flex-wrap gap-2">
            <span v-for="n in 3" :key="`tag-${n}`" class="h-7 w-16 bg-skeleton rounded-full" />
          </div>
        </div>

        <div class="p-5 bg-surface-muted rounded-xl flex flex-col gap-2">
          <div class="h-6 w-6 bg-skeleton rounded-sm mb-2" />
          <div class="h-5 bg-skeleton rounded-sm w-5/6" />
          <div class="h-5 bg-skeleton rounded-sm w-3/4" />
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-5 bg-skeleton rounded-sm w-full" />
          <div class="h-5 bg-skeleton rounded-sm w-5/6" />
          <div class="h-5 bg-skeleton rounded-sm w-4/5" />
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-7 bg-skeleton rounded-sm w-28 mb-2" />
          <div class="flex flex-row flex-wrap gap-5">
            <div v-for="n in 6" :key="n" class="size-detail-icon bg-skeleton rounded-sm" />
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-7 bg-skeleton rounded-sm w-28 mb-2" />
          <div class="flex flex-row flex-wrap gap-5">
            <div v-for="n in 4" :key="`ai-${n}`" class="size-detail-icon bg-skeleton rounded-sm" />
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-7 bg-skeleton rounded-sm w-28 mb-2" />
          <div class="flex flex-col md:flex-row gap-10">
            <div v-for="n in 2" :key="`deploy-${n}`" class="flex items-center gap-3">
              <div class="h-5 w-16 bg-skeleton rounded-sm" />
              <div class="h-6 w-24 bg-skeleton rounded-sm" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-7 bg-skeleton rounded-sm w-28 mb-2" />
          <div v-for="n in 2" :key="`development-${n}`"
            class="flex flex-col md:flex-row gap-5 items-center">
            <div class="aspect-3/2 w-full md:w-1/2 bg-skeleton rounded-xl" />
            <div class="w-full md:w-1/2 flex flex-col gap-2">
              <div class="h-6 bg-skeleton rounded-sm w-3/5" />
              <div class="h-5 bg-skeleton rounded-sm w-full" />
              <div class="h-5 bg-skeleton rounded-sm w-4/5" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-7 bg-skeleton rounded-sm w-28 mb-2" />
          <div v-for="n in 2" :key="`detail-${n}`" class="flex flex-col gap-2">
            <div class="h-6 bg-skeleton rounded-sm w-2/5" />
            <div class="h-5 bg-skeleton rounded-sm w-full" />
            <div class="h-5 bg-skeleton rounded-sm w-5/6" />
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-7 bg-skeleton rounded-sm w-28 mb-2" />
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="n in 3" :key="n" class="aspect-3/2 bg-skeleton rounded-xl" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div v-for="n in 3" :key="`content-${n}`"
            class="h-5 bg-skeleton rounded-sm w-4/5" />
        </div>
      </div>

      <section class="flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="n in 2" :key="n"
            class="flex items-center gap-3 detail-nav-skeleton">
            <div class="w-4 h-4 bg-skeleton rounded-sm shrink-0" />
            <div class="h-4 bg-skeleton rounded-sm w-2/3" />
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="error" class="text-center py-empty-state">
      <h1 class="text-state-title font-bold text-feedback-error mb-10">{{ error }}</h1>
      <RouterLink to="/portfolio"
        class="button-primary rounded-full button-action hover:bg-action-primary-hover">
        回到作品列表
      </RouterLink>
    </div>
    <ProjectDetail v-else-if="project" :project="project" :prev="prevProject" :next="nextProject" />
    <div v-else class="text-center py-empty-state">
      <h1 class="text-state-title font-bold text-content-tertiary mb-10">找不到該作品</h1>
      <RouterLink to="/portfolio"
        class="button-primary rounded-full button-action hover:bg-action-primary-hover">
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
import { setSeoMetadata, SITE_URL } from '../utils/seo'
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

const prevProject = computed((): ProjectNavigationItem | null => {
  const i = currentIndex.value
  if (i <= 0) return null
  return projectList.value[i - 1] ?? null
})

const nextProject = computed((): ProjectNavigationItem | null => {
  const i = currentIndex.value
  if (i < 0 || i + 1 >= projectList.value.length) return null
  return projectList.value[i + 1] ?? null
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
    setSeoMetadata({
      title: project.value.title,
      description: project.value.description,
      image: project.value.banner || project.value.image,
      url: `${SITE_URL}/portfolio/${project.value.slug}`,
      keywords: project.value.tags,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.value.title,
        description: project.value.description,
        url: `${SITE_URL}/portfolio/${project.value.slug}`,
        image: project.value.banner || project.value.image,
        author: { '@type': 'Person', name: '陳仟龍 Chris Chen', url: SITE_URL },
        keywords: project.value.tags?.join(', '),
      },
    })
  } catch (err) {
    if (currentRequestId !== requestId) return
    if (isNotFoundError(err)) {
      setSeoMetadata({ title: '找不到該作品', url: '/portfolio' })
      return
    }
    error.value = '作品載入失敗，請稍後再試。'
    setSeoMetadata({ title: '找不到該作品', url: '/portfolio' })
    console.error(err)
  } finally {
    if (currentRequestId === requestId) loading.value = false
  }
}


onMounted(loadProject)
watch(() => route.params.slug, loadProject)
</script>
