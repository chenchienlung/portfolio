<template>
  <main class="mx-5 flex flex-col gap-30">
    <section v-fade-up class="relative w-full min-h-[calc(100dvh-80px)] flex items-center">
      <div aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 hidden select-none items-center justify-end overflow-hidden lg:flex">
        <p
          class="text-right text-[10rem] font-black leading-[0.78] tracking-[-0.06em] text-neutral-200/70 dark:text-neutral-800/70">
          <span class="block">DESIGN</span>
          <span class="block">→ CODE</span>
        </p>
      </div>

      <div class="relative z-10 w-full max-w-3xl">
        <div class="flex flex-col text-left text-content-primary">
          <div class="flex flex-wrap items-center gap-3">
            <span class="font-mono text-sm text-action-primary md:text-base">
              Junior Frontend Developer × UI/UX Designer
            </span>
          </div>

          <h1 class="mt-6 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            從設計到開發，
            <br />
            <span class="text-action-primary">一手打造完整體驗。</span>
          </h1>

          <p class="mt-6 max-w-xl text-base text-content-secondary md:text-lg">
            專注 Vue 3、Tailwind CSS 與 UI/UX
            設計，具備從需求整理、介面設計到前端實作的完整專題經驗。
          </p>

          <ul class="mt-6 flex flex-wrap gap-2 text-xs font-mono text-content-secondary">
            <li v-for="skill in ['UI Design', 'Vue 3', 'Tailwind CSS', 'RWD 響應式設計/開發']" :key="skill"
              class="badge-lg border border-strong bg-surface-muted">
              {{ skill }}
            </li>
          </ul>

          <div class="mt-8 flex flex-row flex-wrap items-center gap-2 md:mt-10">
            <RouterLink to="/portfolio" class="button-primary rounded-full text-center text-sm hover:bg-action-primary-hover">
              查看作品
              <span class="ml-1.5">→</span>
            </RouterLink>
            <a href="#about" class="button-secondary rounded-full text-center text-sm hover:bg-control-hover">
              關於我
              <span class="ml-1.5">↓</span>
            </a>
            <a href="https://github.com/chenchienlung" target="_blank" rel="noopener noreferrer"
              class="button-secondary rounded-full text-center text-sm hover:bg-control-hover">
              <font-awesome-icon icon="fa-brands fa-github" />
              <span class="ml-1.5">GitHub ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="relative min-h-[calc(100vh-80px)]">
      <h2 v-fade-up
        class="w-20 text-section-title-lg text-action-primary font-bold section-title border-b border-strong">
        技能
      </h2>
      <SkillsCard v-if="about?.skill_groups?.length" v-fade-up-group :groups="about.skill_groups" />
      <SkillMarquee v-if="about?.skill_icons?.length" v-fade-up :icons="about.skill_icons" :is-dark="isDark"
        class="mt-10" />
      <div v-else-if="loading" class="grid grid-cols-1 sm:grid-cols-2 sm:auto-rows-fr card-grid">
        <div v-for="n in 4" :key="n"
          class="card-skeleton flex flex-col gap-5 card-default">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="h-6 w-32 bg-skeleton rounded-sm" />
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="m in 6" :key="m" class="h-7 w-14 bg-skeleton rounded-full" />
          </div>
          <div class="pt-4 border-t border-subtle flex flex-col gap-2">
            <div class="h-5 bg-skeleton rounded-sm w-4/5" />
            <div class="h-5 bg-skeleton rounded-sm w-3/5" />
          </div>
        </div>
      </div>
    </section>
    <section class="min-h-[calc(100vh-80px)]">
      <div v-fade-up class="text-section-title-lg text-action-primary flex flex-row justify-between">
        <h2 class="w-20 font-bold section-title border-b border-strong">
          作品
        </h2>
        <RouterLink to="/portfolio"
          class="w-11 h-11 flex justify-center items-center rounded-full bg-surface-muted border border-subtle inset-shadow-white inset-shadow-sm/20 hover:bg-neutral-200 dark:hover:bg-white/15 transition-all duration-200">
          →</RouterLink>
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 card-grid">
        <div v-for="n in 3" :key="n"
          class="card-skeleton overflow-hidden">
          <div class="aspect-3/2 bg-skeleton" />
          <div class="p-4">
            <div class="h-fit md:h-14 flex items-start">
              <div class="h-6 bg-skeleton rounded-sm w-3/5" />
            </div>
            <div class="flex flex-row flex-wrap gap-1 my-2">
              <span class="h-6 w-14 bg-skeleton rounded-full" />
              <span class="h-6 w-14 bg-skeleton rounded-full" />
              <span class="h-6 w-16 bg-skeleton rounded-full" />
            </div>
            <div class="flex flex-col gap-2">
              <div class="h-4 bg-skeleton rounded-sm w-full" />
              <div class="h-4 bg-skeleton rounded-sm w-4/5" />
            </div>
          </div>
        </div>
      </div>
      <p v-else-if="error" class="mt-6 text-center text-feedback-error">
        作品載入失敗，請稍後再試。
      </p>
      <div v-else v-fade-up-group class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="project in displayedProjects" :key="project.id" class="h-full">
          <ProjectCard v-bind="project" />
        </div>
      </div>
      <RouterLink to="/portfolio"
        class="lg:hidden w-full h-10 flex justify-center items-right mt-10 text-lg text-content-secondary">
        查看更多作品 →
      </RouterLink>
      <p
        class="hidden lg:block w-full text-neutral-200 dark:text-neutral-800 text-[180px] text-center font-black mt-20">
        PORTFOLIO
      </p>
    </section>
    <section id="about" class="min-h-[calc(100vh-80px)]">
      <div class="flex flex-col mb-20">
        <h2 v-fade-up
          class="text-action-primary text-section-title-lg w-20 font-bold section-title border-b border-strong">
          關於我
        </h2>

        <!-- Loading skeleton -->
        <div v-if="!about && loading" class="grid grid-cols-1 md:grid-cols-6 card-grid grid-flow-dense">
          <!-- 個人簡介 -->
          <div
            class="md:col-span-3 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div class="h-6 w-40 bg-skeleton rounded-sm" />
              <div class="h-4 w-56 bg-skeleton rounded-sm" />
              <div class="h-4 w-32 bg-skeleton rounded-sm" />
            </div>
          </div>

          <!-- 各種連結 -->
          <div
            class="md:col-span-3 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex flex-col gap-2">
              <div v-for="n in 3" :key="`link-${n}`" class="h-5 w-2/3 bg-skeleton rounded-sm" />
            </div>
          </div>

          <!-- 偏好工作型態 -->
          <div
            class="md:col-span-2 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div v-for="n in 2" :key="`work-${n}`" class="flex flex-col gap-1">
                <div class="h-3 w-12 bg-skeleton rounded-sm" />
                <div class="h-4 w-24 bg-skeleton rounded-sm" />
              </div>
            </div>
          </div>

          <!-- 目前主力工具 -->
          <div
            class="md:col-span-2 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex-1 flex flex-wrap items-center justify-center content-center gap-4">
              <div v-for="n in 5" :key="`tool-${n}`" class="w-8 h-8 bg-skeleton rounded-sm" />
            </div>
          </div>

          <!-- 統計 -->
          <div
            class="md:col-span-2 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex-1 grid grid-cols-3 gap-2">
              <div v-for="n in 3" :key="`stat-${n}`" class="flex flex-col items-center justify-center gap-1.5">
                <div class="h-7 w-10 bg-skeleton rounded-sm" />
                <div class="h-3 w-12 bg-skeleton rounded-sm" />
              </div>
            </div>
          </div>

          <!-- 經歷 -->
          <div
            class="md:col-span-6 card-skeleton flex flex-col gap-6 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div v-for="n in 2" :key="`exp-${n}`" class="flex flex-col gap-3">
              <div class="flex gap-6">
                <div class="h-5 w-24 bg-skeleton rounded-sm" />
                <div class="h-5 w-40 bg-skeleton rounded-sm" />
              </div>
              <div class="flex flex-col gap-2">
                <div class="h-4 w-full bg-skeleton rounded-sm" />
                <div class="h-4 w-4/5 bg-skeleton rounded-sm" />
              </div>
            </div>
          </div>

          <!-- 其他學習資源 -->
          <div
            class="md:col-span-4 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex flex-col gap-2">
              <div v-for="n in 3" :key="`res-${n}`" class="flex items-start gap-2">
                <div class="w-4 h-4 my-1 bg-skeleton rounded-sm shrink-0" />
                <div class="h-5 w-1/2 bg-skeleton rounded-sm" />
              </div>
            </div>
          </div>

          <!-- 學歷 -->
          <div
            class="md:col-span-2 card-skeleton flex flex-col gap-4 card-default">
            <div class="w-6 h-6 bg-skeleton rounded-sm" />
            <div class="flex flex-col gap-3">
              <div v-for="n in 2" :key="`edu-${n}`" class="flex flex-col gap-1">
                <div class="h-5 w-20 bg-skeleton rounded-sm" />
                <div class="h-4 w-full bg-skeleton rounded-sm" />
              </div>
            </div>
          </div>

          <!-- 目前學習中與我能做什麼 -->
          <div class="md:col-span-6 grid grid-cols-1 card-grid md:grid-cols-12">
            <div
              class="md:col-span-5 card-skeleton flex flex-col gap-5 card-default">
              <div class="flex items-center justify-between gap-3">
                <div class="w-6 h-6 bg-skeleton rounded-sm" />
                <div class="h-6 w-20 bg-skeleton rounded-full" />
              </div>
              <div class="flex flex-col gap-2">
                <div class="h-4 bg-skeleton rounded-sm w-full" />
                <div class="h-4 bg-skeleton rounded-sm w-4/5" />
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="n in 4" :key="`topic-${n}`" class="h-7 w-16 bg-skeleton rounded-full" />
              </div>
            </div>

            <div
              class="md:col-span-7 card-skeleton flex flex-col gap-5 card-default">
              <div class="w-6 h-6 bg-skeleton rounded-sm" />
              <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <div v-for="n in 4" :key="`capability-${n}`" class="flex items-start gap-3">
                  <div class="mt-1 w-4 h-4 bg-skeleton rounded-sm shrink-0" />
                  <div class="flex flex-1 flex-col gap-2">
                    <div class="h-4 bg-skeleton rounded-sm w-3/4" />
                    <div class="h-4 bg-skeleton rounded-sm w-full" />
                    <div class="h-4 bg-skeleton rounded-sm w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- about me 卡片區 -->
        <p v-else-if="aboutError" class="text-center text-feedback-error">
          {{ aboutError }}
        </p>

        <div v-else-if="about" v-fade-up-group class="grid grid-cols-1 md:grid-cols-6 card-grid grid-flow-dense">
          <!-- 個人簡介 -->
          <div
            class="md:col-span-3 card-surface flex flex-col gap-4 card-default">
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div class="flex flex-wrap items-center gap-3">
                <p class="text-content-primary text-xl font-semibold font-mono">
                  {{ about.profile_name }}
                </p>
                <StatusBadge v-if="about.job_status" :label="about.job_status" :color="about.job_status_color"
                  size="sm" />
              </div>
              <p class="text-action-primary text-sm font-mono">
                {{ about.profile_title }}
              </p>
              <p v-if="about.location" class="text-content-secondary text-sm">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="mb-px mr-1" />
                {{ about.location }}
              </p>
            </div>
          </div>

          <!-- 各種連結 -->
          <div v-if="about.contacts?.length"
            class="md:col-span-3 card-surface flex flex-col gap-4 card-default">
            <font-awesome-icon icon="fa-solid fa-link" class="text-action-primary" size="lg" />
            <div class="text-content-secondary font-mono flex flex-col gap-2">
              <a v-for="contact in about.contacts" :key="contact.url" :href="contact.url"
                :target="isExternalUrl(contact.url) ? '_blank' : undefined"
                :rel="isExternalUrl(contact.url) ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-2 w-fit hover:text-action-primary hover:underline transition-all duration-200">
                <ThemeIcon :icon="contact.icon" :is-dark="isDark" :alt="contact.label" class-name="w-4 h-4" />
                {{ contact.label }}
              </a>
            </div>
          </div>

          <!-- 偏好工作型態 -->
          <div v-if="about.work_preferences?.length"
            class="md:col-span-2 card-surface flex flex-col gap-4 card-default">
            <font-awesome-icon icon="fa-solid fa-suitcase" class="text-action-primary" size="lg" />
            <ul class="flex-1 flex flex-col justify-center gap-3">
              <li v-for="item in about.work_preferences" :key="item.label" class="flex flex-col gap-0.5">
                <span class="text-xs text-action-primary font-mono">{{
                  item.label
                  }}</span>
                <span class="text-sm text-content-primary">{{ item.value }}</span>
              </li>
            </ul>
          </div>

          <!-- 目前主力工具 -->
          <div v-if="about.daily_tools?.length"
            class="md:col-span-2 card-surface flex flex-col gap-4 card-default">
            <font-awesome-icon icon="fa-solid fa-laptop-code" class="text-action-primary" size="lg" />
            <ul class="flex-1 flex flex-wrap items-center justify-center content-center gap-4">
              <li v-for="tool in about.daily_tools" :key="tool.name" class="shrink-0" :title="tool.name">
                <ThemeIcon :icon="tool.icon" :is-dark="isDark" :alt="tool.name" class-name="w-8 h-8 object-contain" />
              </li>
            </ul>
          </div>

          <!-- 統計 -->
          <div v-if="about.stats?.length"
            class="md:col-span-2 card-surface flex flex-col gap-4 card-default">
            <font-awesome-icon icon="fa-solid fa-chart-simple" class="text-action-primary" size="lg" />
            <div class="flex-1 grid grid-cols-3 gap-2">
              <div v-for="stat in about.stats" :key="stat.label"
                class="flex flex-col items-center justify-center text-center">
                <span class="text-2xl font-bold text-content-primary font-mono leading-none">
                  {{ stat.value }}
                </span>
                <span class="mt-1.5 text-xs text-content-secondary">
                  {{ stat.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- 經歷 -->
          <div v-if="about.experiences?.length"
            class="md:col-span-6 card-surface flex flex-col gap-8 card-default">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-action-primary" size="lg" />
            <div class="flex flex-col gap-4">
              <div v-for="exp in about.experiences" :key="`${exp.date}-${exp.title}`" class="flex flex-col gap-2">
                <p class="text-content-primary font-semibold">
                  {{ exp.date }}
                  <span class="text-nowrap md:ml-6">{{ exp.title }}</span>
                </p>
                <p class="text-content-secondary">
                  {{ exp.description_before }}
                  <a v-if="exp.link" :href="exp.link.url" target="_blank" rel="noopener noreferrer"
                    class="hover:text-action-primary text-nowrap underline transition-all duration-200"
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
            'flex flex-col gap-4 card-surface card-default',
            about.educations?.length ? 'md:col-span-4' : 'md:col-span-6',
          ]">
            <font-awesome-icon icon="fa-solid fa-book" class="text-action-primary" size="lg" />
            <div class="flex flex-col gap-2">
              <ResourceItem v-for="item in about.resources" :key="item.text" v-bind="item" :is-dark="isDark" />
            </div>
          </div>

          <!-- 學歷 -->
          <div v-if="about.educations?.length"
            class="md:col-span-2 card-surface flex flex-col gap-4 card-default">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-action-primary" size="lg" />
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div v-for="edu in about.educations" :key="`${edu.year}-${edu.description}`" class="flex flex-col gap-1">
                <p class="text-content-primary font-semibold">{{ edu.year }}</p>
                <p class="text-content-secondary text-sm">
                  {{ edu.description }}
                </p>
              </div>
            </div>
          </div>

          <div data-fade-group class="md:col-span-6 grid grid-cols-1 card-grid md:grid-cols-12">
            <!-- 目前學習中 -->
            <div
              class="md:col-span-5 card-surface flex flex-col gap-5 card-default">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <font-awesome-icon icon="fa-solid fa-lightbulb" class="text-action-primary" size="lg" />
                </div>
                <span
                  class="badge-default border border-status-yellow bg-status-yellow text-status-yellow text-xs font-mono">
                  {{ about.learning.status }}
                </span>
              </div>
              <p class="text-sm leading-6 text-content-secondary">
                {{ about.learning.description }}
              </p>
              <ul class="flex flex-wrap gap-2">
                <li v-for="topic in about.learning.topics" :key="topic"
                  class="badge-lg border border-strong bg-surface-muted text-xs font-mono text-content-secondary">
                  {{ topic }}
                </li>
              </ul>
            </div>

            <!-- 我能做什麼 -->
            <div
              class="md:col-span-7 card-surface flex flex-col gap-5 card-default">
              <div class="flex items-center gap-3">
                <font-awesome-icon icon="fa-solid fa-code" class="text-action-primary" size="lg" />
              </div>
              <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <li v-for="capability in about.capabilities" :key="capability.title" class="flex items-start gap-3">
                  <font-awesome-icon icon="fa-solid fa-check" class="mt-1 shrink-0 text-action-primary" />
                  <div>
                    <p class="font-medium text-content-primary">{{ capability.title }}</p>
                    <p class="mt-1 text-sm leading-6 text-content-secondary">
                      {{ capability.description }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type ObjectDirective } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import ResourceItem from '../components/ResourceItem.vue'
import SkillMarquee from '../components/SkillMarquee.vue'
import SkillsCard from '../components/SkillsCard.vue'
import StatusBadge from '../components/StatusBadge.vue'
import ThemeIcon from '../components/ThemeIcon.vue'
import { fetchProjects, type Project } from '../data/projects'
import { fetchAbout, type About } from '../data/about'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()

const projects = ref<(Project & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

const about = ref<About | null>(null)
const aboutError = ref('')

let fadeUpObserver: IntersectionObserver | null = null

const getFadeUpObserver = () => {
  fadeUpObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-visible')
        fadeUpObserver?.unobserve(entry.target)
      })
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  return fadeUpObserver
}

const vFadeUp: ObjectDirective<HTMLElement> = {
  mounted(element) {
    element.classList.add('fade-up')
    getFadeUpObserver().observe(element)
  },
  unmounted(element) {
    fadeUpObserver?.unobserve(element)
  },
}

const vFadeUpGroup: ObjectDirective<HTMLElement> = {
  mounted(element) {
    const targets = getFadeTargets(element)
    targets.forEach((child, index) => {

      child.classList.add('fade-up-card')
      // 依 DOM 順序逐張延遲，包含最下方容器內的兩張卡片。
      child.style.setProperty('--fade-up-delay', `${index * 90}ms`)
      getFadeUpObserver().observe(child)
    })
  },
  unmounted(element) {
    getFadeTargets(element).forEach((child) => {
      fadeUpObserver?.unobserve(child)
    })
  },
}

const getFadeTargets = (element: HTMLElement): HTMLElement[] =>
  Array.from(element.children).flatMap((child) => {
    if (!(child instanceof HTMLElement)) return []
    return child.hasAttribute('data-fade-group') ? getFadeTargets(child) : [child]
  })

onMounted(async () => {
  loading.value = true

  // 分開 fetch，避免因 project fetch 較慢（資料較多），導致位於 about 中的 StatusBadge 延遲，進而影響 LCP
  const aboutPromise = fetchAbout()
  const projectsPromise = fetchProjects()

  aboutPromise
    .then((data) => {
      about.value = data
    })
    .catch((err) => {
      console.error('About fetch error:', err)
      aboutError.value = '關於我內容載入失敗，請稍後再試。'
    })

  projectsPromise.then((data) => {
    projects.value = data.map((project) => ({
      ...project,
      link: `/portfolio/${project.slug}`,
    }))
  })

  projectsPromise.catch((err) => {
    console.error('Projects fetch error:', err)
    error.value = err instanceof Error ? err.message : '作品載入失敗'
  })

  await Promise.allSettled([aboutPromise, projectsPromise])
  loading.value = false
})

const displayedProjects = computed(() => projects.value.slice(0, 3))


// 只有 http/https 開頭的連結才需要 target="_blank"
// mailto:、tel: 等 scheme 應該在原分頁開啟
const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)

onUnmounted(() => {
  fadeUpObserver?.disconnect()
  fadeUpObserver = null
})
</script>

<style scoped>
.fade-up,
:deep(.fade-up-card) {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 600ms ease,
    transform 600ms ease;
}

:deep(.fade-up-card) {
  transition-delay: var(--fade-up-delay, 0ms);
}

@media (min-width: 768px) {

  .fade-up,
  :deep(.fade-up-card) {
    transform: translateY(24px);
  }
}

.fade-up.is-visible,
:deep(.fade-up-card.is-visible) {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {

  .fade-up,
  :deep(.fade-up-card) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
