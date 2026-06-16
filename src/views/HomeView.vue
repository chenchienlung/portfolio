<template>
  <main class="mx-5 mb-10 flex flex-col gap-32">
    <section class="relative h-[calc(100dvh-80px)] flex flex-col justify-center" data-aos="fade-up"
      data-aos-duration="800">
      <div class="flex flex-col gap-6 md:gap-10 text-black dark:text-white">
        <div class="flex flex-col gap-2 font-display">
          <span class="text-sky-700 dark:text-sky-400 text-sm md:text-xl">
            Frontend Engineer | UI/UX Designer
          </span>
          <h2 class="text-5xl md:text-6xl mb-5">Hello! I'm Chris.</h2>
        </div>
        <p class="text-3xl md:text-4xl leading-[1.2em]">
          目前正在尋找
          <br />
          <span class="text-sky-600 md:text-nowrap font-bold">
            前端工程師<span class="text-neutral-400 dark:text-neutral-500 text-2xl"> 或 </span>
            UI/UX設計師
          </span>
          <br />
          相關職缺
        </p>
        <div class="mt-6 md:mt-12 flex flex-row flex-wrap gap-2">
          <a href="https://github.com/chenchienlung" target="_blank" rel="noopener noreferrer"
            class="px-4 h-11 flex items-center justify-center text-center text-nowrap text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200">
            <font-awesome-icon icon="fa-brands fa-github" />
            <span class="ml-1.5 text-sm">GitHub ↗</span>
          </a>
          <a href="#about"
            class="px-4 h-11 flex items-center justify-center text-center text-nowrap text-sky-800 dark:text-sky-400 border border-sky-700 dark:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-700 dark:hover:text-sky-300 hover:border-sky-700 rounded-full transition-all duration-200">
            <font-awesome-icon icon="fa-solid fa-user" />
            <span class="ml-1.5 text-sm">關於我 ↓</span>
          </a>
        </div>
      </div>
      <StatusBadge v-if="about?.job_status" class="absolute top-10 md:top-50 right-0" :label="about.job_status"
        :color="about.job_status_color" size="md" />
      <div v-else-if="loading"
        class="absolute top-10 md:top-50 right-0 animate-pulse h-8 w-32 rounded-full bg-black/10 dark:bg-white/10 ring-1 ring-black/10 dark:ring-white/10" />
    </section>
    <section class="relative min-h-[calc(100vh-80px)]" data-aos="fade-up" data-aos-duration="800">
      <h2 class="w-20 text-2xl text-sky-600 font-bold pb-2 border-b border-neutral-400 dark:border-neutral-600 mb-10">
        技能
      </h2>
      <SkillsCard v-if="about?.skill_groups?.length" :groups="about.skill_groups" />
      <SkillMarquee v-if="about?.skill_icons?.length" :icons="about.skill_icons" :is-dark="isDark" class="mt-10"
        data-aos="fade-up" data-aos-duration="800" data-aos-delay="300" />
      <div v-else-if="loading" class="grid grid-cols-1 sm:grid-cols-2 sm:auto-rows-fr gap-5">
        <div v-for="n in 4" :key="n"
          class="animate-pulse flex flex-col gap-5 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-5">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="h-6 w-32 bg-black/15 dark:bg-white/15 rounded" />
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="m in 6" :key="m" class="h-7 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
          </div>
          <div class="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-2">
            <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-4/5" />
            <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-3/5" />
          </div>
        </div>
      </div>
    </section>
    <section class="min-h-[calc(100vh-80px)]" data-aos="fade-up" data-aos-duration="800">
      <div class="text-2xl text-sky-600 flex flex-row justify-between">
        <h2 class="w-20 font-bold pb-2 border-b border-neutral-400 dark:border-neutral-600">
          作品
        </h2>
        <RouterLink to="/portfolio"
          class="w-11 h-11 flex justify-center items-center rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 inset-shadow-white inset-shadow-sm/20 hover:bg-neutral-200 dark:hover:bg-white/15 transition-all duration-200">
          →</RouterLink>
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        <div v-for="n in 3" :key="n"
          class="animate-pulse rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden shadow-xs/12">
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
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        <ProjectCard v-for="project in displayedProjects" :key="project.title" v-bind="project" />
      </div>
      <RouterLink to="/portfolio"
        class="lg:hidden w-full h-10 flex justify-center items-right mt-10 text-lg text-neutral-600 dark:text-neutral-300">
        查看更多作品 →
      </RouterLink>
      <p
        class="hidden lg:block w-full text-neutral-200 dark:text-neutral-800 text-[180px] text-center font-black mt-20">
        PORTFOLIO
      </p>
    </section>
    <section id="about" class="min-h-[calc(100vh-80px)] pt-10 md:pt-0" data-aos="fade-up" data-aos-duration="800">
      <div class="flex flex-col gap-10 mb-20">
        <h2 class="text-sky-600 text-2xl w-20 font-bold pb-2 border-b border-neutral-400 dark:border-neutral-600">
          關於我
        </h2>

        <!-- Loading skeleton -->
        <div v-if="!about && loading" class="grid grid-cols-1 md:grid-cols-6 gap-5 grid-flow-dense">
          <!-- 個人簡介 -->
          <div
            class="md:col-span-3 animate-pulse flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-44">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div class="h-6 w-40 bg-black/15 dark:bg-white/15 rounded" />
              <div class="h-4 w-56 bg-black/15 dark:bg-white/15 rounded" />
              <div class="h-4 w-32 bg-black/15 dark:bg-white/15 rounded" />
            </div>
          </div>

          <!-- 各種連結 -->
          <div
            class="md:col-span-3 animate-pulse flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-44">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="flex flex-col gap-2">
              <div v-for="n in 3" :key="`link-${n}`" class="h-5 w-2/3 bg-black/15 dark:bg-white/15 rounded" />
            </div>
          </div>

          <!-- 偏好工作型態 -->
          <div
            class="md:col-span-2 animate-pulse flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-44">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div v-for="n in 2" :key="`work-${n}`" class="flex flex-col gap-1">
                <div class="h-3 w-12 bg-black/15 dark:bg-white/15 rounded" />
                <div class="h-4 w-24 bg-black/15 dark:bg-white/15 rounded" />
              </div>
            </div>
          </div>

          <!-- 目前主力工具 -->
          <div
            class="md:col-span-2 animate-pulse flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-44">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="flex-1 flex flex-wrap items-center justify-center content-center gap-4">
              <div v-for="n in 5" :key="`tool-${n}`" class="w-8 h-8 bg-black/15 dark:bg-white/15 rounded" />
            </div>
          </div>

          <!-- 統計 -->
          <div
            class="md:col-span-2 animate-pulse flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-44">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="flex-1 grid grid-cols-3 gap-2">
              <div v-for="n in 3" :key="`stat-${n}`" class="flex flex-col items-center justify-center gap-1.5">
                <div class="h-7 w-10 bg-black/15 dark:bg-white/15 rounded" />
                <div class="h-3 w-12 bg-black/15 dark:bg-white/15 rounded" />
              </div>
            </div>
          </div>

          <!-- 經歷 -->
          <div
            class="md:col-span-6 animate-pulse flex flex-col gap-6 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-72">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div v-for="n in 2" :key="`exp-${n}`" class="flex flex-col gap-3">
              <div class="flex gap-6">
                <div class="h-5 w-24 bg-black/15 dark:bg-white/15 rounded" />
                <div class="h-5 w-40 bg-black/15 dark:bg-white/15 rounded" />
              </div>
              <div class="flex flex-col gap-2">
                <div class="h-4 w-full bg-black/15 dark:bg-white/15 rounded" />
                <div class="h-4 w-4/5 bg-black/15 dark:bg-white/15 rounded" />
              </div>
            </div>
          </div>

          <!-- 其他學習資源 -->
          <div
            class="md:col-span-6 animate-pulse flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6 h-40">
            <div class="w-6 h-6 bg-black/15 dark:bg-white/15 rounded" />
            <div class="flex flex-col gap-2">
              <div v-for="n in 3" :key="`res-${n}`" class="flex items-start gap-2">
                <div class="w-4 h-4 my-1 bg-black/15 dark:bg-white/15 rounded shrink-0" />
                <div class="h-5 w-1/2 bg-black/15 dark:bg-white/15 rounded" />
              </div>
            </div>
          </div>
        </div>

        <!-- about me 卡片區 -->
        <div v-else-if="about" class="grid grid-cols-1 md:grid-cols-6 gap-5 grid-flow-dense">
          <!-- 個人簡介 -->
          <div
            class="md:col-span-3 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="50">
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div class="flex flex-wrap items-center gap-3">
                <p class="text-black dark:text-white text-xl font-semibold font-mono">
                  陳仟龍 Chris
                </p>
                <StatusBadge v-if="about.job_status" :label="about.job_status" :color="about.job_status_color"
                  size="sm" />
              </div>
              <p class="text-sky-700 dark:text-sky-400 text-sm font-mono">
                Frontend Engineer | UI/UX Designer
              </p>
              <p v-if="about.location" class="text-neutral-600 dark:text-neutral-300 text-sm">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="mb-px mr-1" />
                {{ about.location }}
              </p>
            </div>
          </div>

          <!-- 各種連結 -->
          <div v-if="about.contacts?.length"
            class="md:col-span-3 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <font-awesome-icon icon="fa-solid fa-link" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="text-neutral-600 dark:text-neutral-300 font-mono flex flex-col gap-2">
              <a v-for="(contact, i) in about.contacts" :key="i" :href="contact.url"
                :target="isExternalUrl(contact.url) ? '_blank' : undefined"
                :rel="isExternalUrl(contact.url) ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-2 w-fit hover:text-sky-600 dark:hover:text-sky-400 hover:underline transition-all duration-200">
                <font-awesome-icon v-if="contact.iconType === 'fa'" :icon="contact.icon" class="mb-px" />
                <img v-else :src="isDark && contact.iconDark ? contact.iconDark : contact.icon" :alt="contact.label"
                  width="16" height="16" loading="lazy" class="shrink-0" />
                {{ contact.label }}
              </a>
            </div>
          </div>

          <!-- 偏好工作型態 -->
          <div v-if="about.work_preferences?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="125">
            <font-awesome-icon icon="fa-solid fa-suitcase" class="text-sky-600 dark:text-sky-400" size="lg" />
            <ul class="flex-1 flex flex-col justify-center gap-3">
              <li v-for="(item, i) in about.work_preferences" :key="i" class="flex flex-col gap-0.5">
                <span class="text-xs text-sky-700 dark:text-sky-400 font-mono">{{ item.label }}</span>
                <span class="text-sm text-black dark:text-white">{{ item.value }}</span>
              </li>
            </ul>
          </div>

          <!-- 目前主力工具 -->
          <div v-if="about.daily_tools?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="150">
            <font-awesome-icon icon="fa-solid fa-laptop-code" class="text-sky-600 dark:text-sky-400" size="lg" />
            <ul class="flex-1 flex flex-wrap items-center justify-center content-center gap-4">
              <li v-for="(tool, i) in about.daily_tools" :key="i" class="shrink-0" :title="tool.name">
                <img :src="isDark && tool.iconDark ? tool.iconDark : tool.icon" :alt="tool.name" width="32" height="32"
                  loading="lazy" class="w-8 h-8 object-contain" />
              </li>
            </ul>
          </div>

          <!-- 統計 -->
          <div v-if="about.stats?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="175">
            <font-awesome-icon icon="fa-solid fa-chart-simple" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="flex-1 grid grid-cols-3 gap-2">
              <div v-for="(stat, i) in about.stats" :key="i"
                class="flex flex-col items-center justify-center text-center">
                <span class="text-2xl font-bold text-black dark:text-white font-mono leading-none">
                  {{ stat.value }}
                </span>
                <span class="mt-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                  {{ stat.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- 經歷 -->
          <div v-if="about.experiences?.length"
            class="md:col-span-6 flex flex-col gap-8 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="flex flex-col gap-4">
              <div v-for="(exp, i) in about.experiences" :key="i" class="flex flex-col gap-2">
                <p class="text-black dark:text-white font-semibold">
                  {{ exp.date }}
                  <span class="text-nowrap md:ml-6">{{ exp.title }}</span>
                </p>
                <p class="text-neutral-600 dark:text-neutral-300">
                  {{ exp.description_before }}
                  <a v-if="exp.link" :href="exp.link.url" target="_blank" rel="noopener noreferrer"
                    class="hover:text-sky-600 dark:hover:text-sky-400 text-nowrap underline transition-all duration-200"
                    :alt="exp.link.alt">
                    {{ exp.link.text }} ↗
                  </a>
                  {{ exp.description_after }}
                </p>
              </div>
            </div>
          </div>

          <!-- 其他學習資源 -->
          <div v-if="about.resources?.length" :class="[
            'flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6',
            about.educations?.length ? 'md:col-span-4' : 'md:col-span-6',
          ]" data-aos="fade-up" data-aos-duration="800" data-aos-delay="250">
            <font-awesome-icon icon="fa-solid fa-book" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="flex flex-col gap-2">
              <ResourceItem v-for="(item, i) in about.resources" :key="i" v-bind="item" :is-dark="isDark" />
            </div>
          </div>

          <!-- 學歷 -->
          <div v-if="about.educations?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div v-for="(edu, i) in about.educations" :key="i" class="flex flex-col gap-1">
                <p class="text-black dark:text-white font-semibold">{{ edu.year }}</p>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">
                  {{ edu.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import ResourceItem from '../components/ResourceItem.vue'
import SkillMarquee from '../components/SkillMarquee.vue'
import SkillsCard from '../components/SkillsCard.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { fetchProjects, type Project } from '../data/projects'
import { fetchAbout, type About } from '../data/about'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()

const projects = ref<(Project & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

const about = ref<About | null>(null)

onMounted(async () => {
  loading.value = true

  // 分開 fetch，避免因 project fetch 較慢（資料較多），導致位於 about 中的 StatusBadge 延遲，進而影響 LCP
  const aboutPromise = fetchAbout()
  const projectsPromise = fetchProjects()

  aboutPromise.then((data) => {
    about.value = data
  })

  projectsPromise.then((data) => {
    projects.value = data.map((project) => ({
      ...project,
      link: `/portfolio/${project.slug}`,
    }))
  })

  try {
    await Promise.all([aboutPromise, projectsPromise])
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})

const displayedProjects = computed(() => projects.value.slice(0, 3))

// 只有 http/https 開頭的連結才需要 target="_blank"
// mailto:、tel: 等 scheme 應該在原分頁開啟
const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)
</script>
