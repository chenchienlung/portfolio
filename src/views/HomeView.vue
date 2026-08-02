<template>
  <main class="mx-5 mb-10 flex flex-col gap-32">
    <section v-fade-up class="relative w-full min-h-[calc(100dvh-80px)] flex items-center py-14 md:py-20">
      <div aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 hidden select-none items-center justify-end overflow-hidden lg:flex">
        <p
          class="text-right text-[9rem] font-black leading-[0.78] tracking-[-0.08em] text-neutral-200/70 dark:text-neutral-800/70">
          <span class="block">DESIGN</span>
          <span class="block">→ CODE</span>
        </p>
      </div>

      <div class="relative z-10 w-full max-w-3xl">
        <div class="flex flex-col text-left text-black dark:text-white">
          <div class="flex flex-wrap items-center gap-3">
            <span class="font-mono text-sm text-sky-700 dark:text-sky-400 md:text-base">
              Junior Frontend Developer × UI/UX Designer
            </span>
          </div>

          <h1 class="mt-6 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            從設計到開發，
            <br />
            <span class="text-sky-600 dark:text-sky-400">一手打造完整體驗。</span>
          </h1>

          <p class="mt-6 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-300 md:text-lg md:leading-8">
            專注 Vue 3、Tailwind CSS 與 UI/UX
            設計，具備從需求整理、介面設計到前端實作的完整專題經驗。
          </p>

          <ul class="mt-6 flex flex-wrap gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300">
            <li v-for="skill in ['UI Design', 'Vue 3', 'Tailwind CSS', 'RWD 響應式設計/開發']" :key="skill"
              class="rounded-full border border-black/10 bg-white/60 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              {{ skill }}
            </li>
          </ul>

          <div class="mt-8 flex flex-row flex-wrap items-center gap-2 md:mt-10">
            <RouterLink to="/portfolio"
              class="flex h-11 items-center justify-center rounded-full bg-sky-800 px-5 text-center text-sm text-white transition-colors duration-200 hover:bg-sky-700">
              查看作品
              <span class="ml-1.5">→</span>
            </RouterLink>
            <a href="#about"
              class="flex h-11 items-center justify-center rounded-full border border-sky-700 px-5 text-center text-sm text-sky-800 transition-colors duration-200 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-900/30 dark:hover:text-sky-300">
              關於我
              <span class="ml-1.5">↓</span>
            </a>
            <a href="https://github.com/chenchienlung" target="_blank" rel="noopener noreferrer"
              class="flex h-11 items-center justify-center rounded-full border border-sky-700 px-5 text-center text-sm text-sky-800 transition-colors duration-200 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-900/30 dark:hover:text-sky-300">
              <font-awesome-icon icon="fa-brands fa-github" />
              <span class="ml-1.5">GitHub ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="relative min-h-[calc(100vh-80px)]">
      <h2 v-fade-up
        class="w-20 text-2xl text-sky-600 font-bold pb-2 border-b border-neutral-400 dark:border-neutral-600 mb-10">
        技能
      </h2>
      <SkillsCard v-if="about?.skill_groups?.length" v-fade-up-group :groups="about.skill_groups" />
      <SkillMarquee v-if="about?.skill_icons?.length" v-fade-up :icons="about.skill_icons" :is-dark="isDark"
        class="mt-10" />
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
    <section class="min-h-[calc(100vh-80px)]">
      <div v-fade-up class="text-2xl text-sky-600 flex flex-row justify-between">
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
      <div v-else v-fade-up-group class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        <div v-for="project in displayedProjects" :key="project.title" class="h-full">
          <ProjectCard v-bind="project" />
        </div>
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
    <section id="about" class="min-h-[calc(100vh-80px)] pt-10 md:pt-0">
      <div class="flex flex-col gap-10 mb-20">
        <h2 v-fade-up
          class="text-sky-600 text-2xl w-20 font-bold pb-2 border-b border-neutral-400 dark:border-neutral-600">
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
        <div v-else-if="about" v-fade-up-group class="grid grid-cols-1 md:grid-cols-6 gap-5 grid-flow-dense">
          <!-- 個人簡介 -->
          <div
            class="md:col-span-3 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
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
            class="md:col-span-3 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
            <font-awesome-icon icon="fa-solid fa-link" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="text-neutral-600 dark:text-neutral-300 font-mono flex flex-col gap-2">
              <a v-for="(contact, i) in about.contacts" :key="i" :href="contact.url"
                :target="isExternalUrl(contact.url) ? '_blank' : undefined"
                :rel="isExternalUrl(contact.url) ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-2 w-fit hover:text-sky-600 dark:hover:text-sky-400 hover:underline transition-all duration-200">
                <ThemeIcon :icon="contact.icon" :is-dark="isDark" :alt="contact.label" class-name="w-4 h-4" />
                {{ contact.label }}
              </a>
            </div>
          </div>

          <!-- 偏好工作型態 -->
          <div v-if="about.work_preferences?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
            <font-awesome-icon icon="fa-solid fa-suitcase" class="text-sky-600 dark:text-sky-400" size="lg" />
            <ul class="flex-1 flex flex-col justify-center gap-3">
              <li v-for="(item, i) in about.work_preferences" :key="i" class="flex flex-col gap-0.5">
                <span class="text-xs text-sky-700 dark:text-sky-400 font-mono">{{
                  item.label
                  }}</span>
                <span class="text-sm text-black dark:text-white">{{ item.value }}</span>
              </li>
            </ul>
          </div>

          <!-- 目前主力工具 -->
          <div v-if="about.daily_tools?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
            <font-awesome-icon icon="fa-solid fa-laptop-code" class="text-sky-600 dark:text-sky-400" size="lg" />
            <ul class="flex-1 flex flex-wrap items-center justify-center content-center gap-4">
              <li v-for="(tool, i) in about.daily_tools" :key="i" class="shrink-0" :title="tool.name">
                <ThemeIcon :icon="tool.icon" :is-dark="isDark" :alt="tool.name" class-name="w-8 h-8 object-contain" />
              </li>
            </ul>
          </div>

          <!-- 統計 -->
          <div v-if="about.stats?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
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
            class="md:col-span-6 flex flex-col gap-8 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
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
          ]">
            <font-awesome-icon icon="fa-solid fa-book" class="text-sky-600 dark:text-sky-400" size="lg" />
            <div class="flex flex-col gap-2">
              <ResourceItem v-for="(item, i) in about.resources" :key="i" v-bind="item" :is-dark="isDark" />
            </div>
          </div>

          <!-- 學歷 -->
          <div v-if="about.educations?.length"
            class="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
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

          <div class="md:col-span-6 grid grid-cols-1 gap-5 md:grid-cols-12">
            <!-- 目前學習中 -->
            <div
              class="md:col-span-5 flex flex-col gap-5 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <font-awesome-icon icon="fa-solid fa-lightbulb" class="text-sky-600 dark:text-sky-400" size="lg" />
                </div>
                <span
                  class="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-mono text-amber-700 dark:text-amber-300">
                  Learning...
                </span>
              </div>
              <p class="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                在 Vue 3 的實作基礎上延伸學習 React 生態，熟悉不同框架的元件設計與狀態管理思維。
              </p>
              <ul class="flex flex-wrap gap-2">
                <li v-for="topic in learningTopics" :key="topic"
                  class="rounded-full border border-black/10 bg-neutral-50 px-3 py-1.5 text-xs font-mono text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                  {{ topic }}
                </li>
              </ul>
            </div>

            <!-- 我能做什麼 -->
            <div
              class="md:col-span-7 flex flex-col gap-5 rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xs/12 p-6">
              <div class="flex items-center gap-3">
                <font-awesome-icon icon="fa-solid fa-code" class="text-sky-600 dark:text-sky-400" size="lg" />
              </div>
              <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <li v-for="capability in capabilities" :key="capability.title" class="flex items-start gap-3">
                  <font-awesome-icon icon="fa-solid fa-check" class="mt-1 shrink-0 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p class="font-medium text-black dark:text-white">{{ capability.title }}</p>
                    <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
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

const learningTopics = [
  'React',
  'JSX',
  'Props / State',
  'Hooks',
  'React Router',
  'React × TypeScript',
]

const capabilities = [
  {
    title: '前端開發',
    description: '使用 Vue 3、TypeScript 與 Vue Router 建立元件化 SPA。',
  },
  {
    title: '設計稿切版',
    description: '將 Figma 設計稿轉成重視細節與一致性的網頁介面。',
  },
  {
    title: '響應式網頁',
    description: '規劃桌機、平板與手機版面，確保不同裝置的使用體驗。',
  },
  {
    title: 'UI/UX 設計',
    description: '製作 Wireframe、Prototype、User Flow 與基礎 Design System。',
  },
]

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
    Array.from(element.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return

      child.classList.add('fade-up-card')
      child.style.setProperty('--fade-up-delay', `${Math.min(index, 5) * 90}ms`)
      getFadeUpObserver().observe(child)
    })
  },
  unmounted(element) {
    Array.from(element.children).forEach((child) => {
      fadeUpObserver?.unobserve(child)
    })
  },
}

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
