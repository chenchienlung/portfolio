<template>
  <main class="relative flex flex-col gap-5">
    <div @click="$router.back()"
      class="md:hidden sticky top-5 left-5 md:absolute md:top-15 md:left-8 w-24 h-12 flex items-center justify-center text-sm text-black dark:text-white bg-neutral-100/40 dark:bg-black/15 border border-black/5 dark:border-white/10 backdrop-blur-md rounded-full z-10">
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-1" />
      上一頁
    </div>
    <section
      class="aspect-2/1 md:aspect-4/1 overflow-hidden rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12">
      <img :src="project.banner" :alt="project.title" fetchpriority="high" class="w-full h-full object-cover" />
    </section>
    <section
      class="px-5 py-8 md:px-8 md:py-12 bg-white dark:bg-white/5 rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12 flex flex-col gap-20">
      <div class="flex flex-col gap-5">
        <div
          class="flex flex-col md:flex-row gap-2 justify-between md:items-center text-neutral-600 dark:text-neutral-300 mb-4">
          <h2 class="text-2xl font-bold text-black dark:text-white">{{ project.title }}</h2>
          <ProjectLinks :website="project.website" :github="project.github" :figma="project.figma"
            :figma_prototype="project.figma_prototype" />
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in project.tags" :key="tag"
            class="px-3 py-1 text-sm bg-neutral-100 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full text-neutral-600 dark:text-neutral-300">
            {{ tag }}
          </span>
        </div>
      </div>

      <div v-if="project.points?.length"
        class="p-5 text-neutral-800 dark:text-neutral-200 text-lg bg-neutral-100 dark:bg-neutral-700/60 rounded-xl flex flex-col gap-2">
        <font-awesome-icon icon="fa-solid fa-lightbulb" class="mb-2" />
        <p v-for="(point, i) in project.points" :key="i" class="leading-relaxed">
          {{ point }}
        </p>
      </div>

      <div>
        <p v-for="(para, i) in project.detail_description" :key="i"
          class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line"
          :class="i < project.detail_description.length - 1 ? 'mb-4' : 'mb-8'">
          {{ para }}
        </p>
      </div>

      <div>
        <h3
          class="mb-2 text-xl font-bold text-sky-600 before:content-[''] before:border-l-5 before:border-neutral-300 dark:before:border-neutral-500 before:rounded-full before:mr-1">
          技能 / 工具
        </h3>
        <div class="flex flex-row flex-wrap gap-5">
          <img v-for="skill in project.skills" :key="skill" :src="resolveIcon(skill)" :alt="skill" loading="lazy"
            class="w-8 h-8 object-fill" />
        </div>
      </div>

      <div v-if="project.AI?.length">
        <h3
          class="mb-2 text-xl font-bold text-sky-600 before:content-[''] before:border-l-5 before:border-neutral-300 dark:before:border-neutral-500 before:rounded-full before:mr-1">
          AI 工具
        </h3>
        <div class="flex flex-row flex-wrap gap-5">
          <img v-for="ai in project.AI" :key="ai" :src="resolveIcon(ai)" :alt="ai" loading="lazy"
            class="w-8 h-8 object-fill" />
        </div>
      </div>

      <div v-if="project.deploys?.length">
        <h3
          class="mb-2 text-xl font-bold text-sky-600 before:content-[''] before:border-l-5 before:border-neutral-300 dark:before:border-neutral-500 before:rounded-full before:mr-1">
          部署
        </h3>
        <div class="flex flex-col md:flex-row gap-5 md:gap-10 text-neutral-800 dark:text-neutral-200">
          <div v-for="(deploy, i) in project.deploys" :key="i" class="flex flex-row items-center gap-3">
            <h4 class="w-1/4 md:w-fit text-nowrap font-bold">{{ deploy.title }}</h4>
            <div class="flex flex-row gap-2 items-center">
              <img :key="deploy.image" :src="resolveIcon(deploy.image)" :alt="deploy.name" loading="lazy" width="80"
                height="24" class="h-6 w-auto max-w-20 object-contain" />
              <p class="text-sm font-bold">{{ deploy.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="project.development_blocks?.length">
        <h3
          class="mb-2 text-xl font-bold text-sky-600 before:content-[''] before:border-l-5 before:border-neutral-300 dark:before:border-neutral-500 before:rounded-full before:mr-1">
          開發過程
        </h3>
        <div class="flex flex-col gap-10">
          <div v-for="(block, index) in project.development_blocks" :key="index"
            class="flex flex-col md:flex-row gap-5 items-center" :class="[
              block.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
              !block.image && (block.title || block.description)
                ? 'bg-black/5 dark:bg-white/5 rounded-xl my-10 py-10 px-5'
                : '',
            ]">
            <div v-if="block.image" class="w-full shrink-0" :class="block.title || block.description ? 'md:w-1/2' : ''">
              <div class="aspect-3/2 w-full overflow-hidden rounded-xl">
                <img :src="block.image" :alt="block.title || project.title" loading="lazy"
                  class="w-full h-full object-cover" />
              </div>
            </div>
            <div v-if="block.title || block.description" class="w-full flex flex-col gap-2 text-center"
              :class="block.image ? 'text-left md:w-1/2' : ''">
              <h4 v-if="block.title" class="text-xl font-semibold text-black dark:text-white whitespace-pre-line">
                {{ block.title }}
              </h4>
              <p v-if="block.description"
                class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {{ block.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3
          class="mb-2 text-xl font-bold text-sky-600 before:content-[''] before:border-l-5 before:border-neutral-300 dark:before:border-neutral-500 before:rounded-full before:mr-1">
          設計理念
        </h3>
        <div class="flex flex-col gap-10">
          <div v-for="(block, index) in project.detail_blocks" :key="index"
            class="flex flex-col md:flex-row gap-6 items-center" :class="[
              block.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
              !block.image && (block.title || block.description)
                ? 'bg-black/5 dark:bg-white/5 rounded-xl my-10 py-10 px-5'
                : '',
            ]">
            <div v-if="block.image" class="w-full shrink-0" :class="block.title || block.description ? 'md:w-1/2' : ''">
              <div class="aspect-3/2 w-full overflow-hidden rounded-xl">
                <img :src="block.image" :alt="block.title || project.title" loading="lazy"
                  class="w-full h-full object-cover" />
              </div>
            </div>
            <div v-if="block.title || block.description" class="w-full flex flex-col gap-2 text-center"
              :class="block.image ? 'text-left md:w-1/2' : ''">
              <h4 v-if="block.title" class="text-xl font-semibold text-black dark:text-white whitespace-pre-line">
                {{ block.title }}
              </h4>
              <p v-if="block.description"
                class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {{ block.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3
          class="mb-2 text-xl font-bold text-sky-600 before:content-[''] before:border-l-5 before:border-neutral-300 dark:before:border-neutral-500 before:rounded-full before:mr-1">
          作品圖片
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <div v-for="img in project.detail_img" :key="img" class="aspect-3/2 overflow-hidden rounded-xl">
            <img :src="img" :alt="project.title" loading="lazy" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="text-neutral-600 dark:text-neutral-300 text-lg">
        <p v-for="content in project.content" :key="content">
          <font-awesome-icon icon="fa-solid fa-check" class="mr-1 text-green-600" />
          {{ content }}
        </p>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <component :is="prev ? RouterLink : 'div'" :to="prev ? `/portfolio/${prev.slug}` : undefined" :class="[
          'h-18 flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12 min-w-0 transition-all duration-300',
          prev
            ? 'group md:hover:ring md:hover:ring-black/15 dark:md:hover:ring-white/10 md:hover:shadow-lg/12'
            : 'opacity-40 cursor-not-allowed',
        ]">
          <font-awesome-icon icon="fa-solid fa-arrow-left"
            class="shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          <div class="flex flex-col min-w-0">
            <span
              class="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate transition-colors">
              {{ prev?.title || '上一個作品' }}
            </span>
          </div>
        </component>

        <component :is="next ? RouterLink : 'div'" :to="next ? `/portfolio/${next.slug}` : undefined" :class="[
          'h-18 flex items-center justify-end text-right gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12 min-w-0 transition-all duration-300',
          next
            ? 'group md:hover:ring md:hover:ring-black/15 dark:md:hover:ring-white/10 md:hover:shadow-lg/12'
            : 'opacity-40 cursor-not-allowed',
        ]">
          <div class="flex flex-col min-w-0">
            <span
              class="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate transition-colors">
              {{ next?.title || '下一個作品' }}
            </span>
          </div>
          <font-awesome-icon icon="fa-solid fa-arrow-right"
            class="shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </component>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Project } from '../data/projects'
import ProjectLinks from './ProjectLinks.vue'
import { useDarkMode } from '../composables/useDarkMode'

defineProps<{
  project: Project
  prev?: Project | null
  next?: Project | null
}>()

const { isDark } = useDarkMode()

const darkIconMap: Record<string, string> = {
  'https://thesvg.org/icons/github/mono.svg': 'https://thesvg.org/icons/github/dark.svg',
  'https://thesvg.org/icons/openai/light.svg': 'https://thesvg.org/icons/openai/dark.svg',
  'https://thesvg.org/icons/expressdotjs/light.svg':
    'https://thesvg.org/icons/expressdotjs/dark.svg',
  'https://thesvg.org/icons/render/default.svg':
    'https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1776570186/render_1_xw5dex.svg',
  'https://thesvg.org/icons/godaddy/light.svg': 'https://thesvg.org/icons/godaddy/dark.svg',
}

const resolveIcon = (src: string) => (isDark.value && darkIconMap[src] ? darkIconMap[src] : src)
</script>
