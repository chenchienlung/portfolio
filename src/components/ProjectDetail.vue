<template>
  <main class="relative flex flex-col gap-5">
    <button type="button" @click="$router.back()"
      class="md:hidden sticky top-5 left-5 md:absolute md:top-15 md:left-8 detail-back-button flex items-center justify-center text-sm text-content-primary bg-surface-muted/40 border border-detail-back backdrop-blur-md rounded-full z-10">
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-1" />
      上一頁
    </button>
    <section class="detail-banner md:aspect-4/1">
      <img :src="project.banner || siteSettings.default_banner" :alt="project.title"
        @error="handleImageError($event, DEFAULT_BANNER)" width="1200" height="600" fetchpriority="high"
        decoding="async" class="w-full h-full object-cover" />
    </section>
    <section
      class="detail-content card-surface bg-detail-content flex flex-col gap-20">
      <div class="flex flex-col gap-5">
        <div class="flex flex-col md:flex-row gap-2 justify-between md:items-center text-content-secondary">
          <h1 class="text-detail-title font-bold text-content-primary">{{ project.title }}</h1>
          <ProjectLinks :website="project.website" :github="project.github" :figma="project.figma"
            :figma_prototype="project.figma_prototype" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in project.tags" :key="tag"
            class="badge-lg text-sm bg-surface-muted border border-subtle text-content-secondary">
            {{ tag }}
          </span>
        </div>
      </div>

      <div v-if="project.points?.length"
        class="p-5 text-content-primary text-lg bg-detail-muted rounded-xl flex flex-col gap-2">
        <font-awesome-icon icon="fa-solid fa-lightbulb" class="mb-2" />
        <p v-for="point in project.points" :key="point">
          {{ point }}
        </p>
      </div>

      <div>
        <p v-for="(para, i) in project.detail_description" :key="para"
          class="text-lg text-content-secondary whitespace-pre-line mb-2">
          {{ para }}
        </p>
      </div>

      <div>
        <h2
          class="mb-2 text-section-title font-bold text-action-primary before:content-[''] before:border-detail-heading before:border-subtle before:rounded-full before:mr-1">
          技能 / 工具
        </h2>
        <div class="flex flex-row flex-wrap gap-5">
          <ThemeIcon v-for="(skill, i) in project.skills" :key="skill.name || skill.icon.light" :icon="skill.icon"
            :is-dark="isDark" :alt="skill.name" class-name="size-detail-icon object-contain" />
        </div>
      </div>

      <div v-if="project.AI?.length">
        <h2
          class="mb-2 text-section-title font-bold text-action-primary before:content-[''] before:border-detail-heading before:border-subtle before:rounded-full before:mr-1">
          AI 工具
        </h2>
        <div class="flex flex-row flex-wrap gap-5">
          <ThemeIcon v-for="(ai, i) in project.AI" :key="ai.name || ai.icon.light" :icon="ai.icon" :is-dark="isDark"
            :alt="ai.name" class-name="size-detail-icon object-contain" />
        </div>
      </div>

      <div v-if="project.deploys?.length">
        <h2
          class="mb-2 text-section-title font-bold text-action-primary before:content-[''] before:border-detail-heading before:border-subtle before:rounded-full before:mr-1">
          部署
        </h2>
        <div class="flex flex-col md:flex-row gap-5 md:gap-10 text-content-primary">
          <div v-for="deploy in project.deploys" :key="deploy.name" class="flex flex-row items-center gap-3">
            <h3 class="w-1/4 md:w-fit text-nowrap font-bold">{{ deploy.title }}</h3>
            <div class="flex flex-row gap-2 items-center">
              <ThemeIcon :key="deploy.name" :icon="deploy.icon" :is-dark="isDark" :alt="deploy.name"
                class-name="h-6 w-auto max-w-20 object-contain" />
              <p class="text-sm font-bold">{{ deploy.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="project.development_blocks?.length">
        <h2
          class="mb-2 text-section-title font-bold text-action-primary before:content-[''] before:border-detail-heading before:border-subtle before:rounded-full before:mr-1">
          開發過程
        </h2>
        <div class="flex flex-col gap-10">
          <div v-for="block in project.development_blocks" :key="`${block.image}-${block.title || block.description}`"
            class="flex flex-col md:flex-row gap-5 items-center" :class="[
              block.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
              !block.image && (block.title || block.description)
                ? 'detail-content-block'
                : '',
            ]">
            <div v-if="block.image" class="w-full shrink-0" :class="block.title || block.description ? 'md:w-1/2' : ''">
              <div class="aspect-3/2 w-full overflow-hidden rounded-xl">
                <img :src="block.image" :alt="block.title || project.title"
                  @error="handleImageError($event, DEFAULT_IMAGE)" width="1200" height="800" loading="lazy"
                  decoding="async" class="w-full h-full object-cover" />
              </div>
            </div>
            <div v-if="block.title || block.description" class="w-full flex flex-col gap-2 text-center"
              :class="block.image ? 'text-left md:w-1/2' : ''">
              <h3 v-if="block.title" class="text-section-title font-semibold text-content-primary whitespace-pre-line">
                {{ block.title }}
              </h3>
              <p v-if="block.description" class="text-lg text-content-secondary whitespace-pre-line">
                {{ block.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2
          class="mb-2 text-section-title font-bold text-action-primary before:content-[''] before:border-detail-heading before:border-subtle before:rounded-full before:mr-1">
          設計理念
        </h2>
        <div class="flex flex-col gap-10">
          <div v-for="block in project.detail_blocks" :key="`${block.image}-${block.title || block.description}`"
            class="flex flex-col md:flex-row gap-6 items-center" :class="[
              block.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
              !block.image && (block.title || block.description)
                ? 'detail-content-block'
                : '',
            ]">
            <div v-if="block.image" class="w-full shrink-0" :class="block.title || block.description ? 'md:w-1/2' : ''">
              <div class="aspect-3/2 w-full overflow-hidden rounded-xl">
                <img :src="block.image" :alt="block.title || project.title" width="1200" height="800" loading="lazy"
                  decoding="async" class="w-full h-full object-cover" />
              </div>
            </div>
            <div v-if="block.title || block.description" class="w-full flex flex-col gap-2 text-center"
              :class="block.image ? 'text-left md:w-1/2' : ''">
              <h3 v-if="block.title" class="text-section-title font-semibold text-content-primary whitespace-pre-line">
                {{ block.title }}
              </h3>
              <p v-if="block.description" class="text-lg text-content-secondary whitespace-pre-line">
                {{ block.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2
          class="mb-2 text-section-title font-bold text-action-primary before:content-[''] before:border-detail-heading before:border-subtle before:rounded-full before:mr-1">
          作品圖片
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <div v-for="img in project.detail_img" :key="img" class="aspect-3/2 overflow-hidden rounded-xl">
            <img :src="img" :alt="project.title" @error="handleImageError($event, DEFAULT_IMAGE)" width="1200"
              height="800" loading="lazy" decoding="async" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="text-content-secondary text-lg">
        <p v-for="content in project.content" :key="content">
                  <font-awesome-icon icon="fa-solid fa-check" class="mr-1 text-feedback-success" />
          {{ content }}
        </p>
      </div>
    </section>

    <section class="flex flex-col">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <component :is="prev ? RouterLink : 'div'" :to="prev ? `/portfolio/${prev.slug}` : undefined" :class="[
          'detail-nav-link gap-4 detail-nav',
          prev
            ? 'group md:hover:ring md:hover:ring-surface md:hover:shadow-card-hover'
            : 'opacity-40 cursor-not-allowed',
        ]">
          <font-awesome-icon icon="fa-solid fa-arrow-left"
            class="shrink-0 text-content-tertiary group-hover:text-action-primary transition-colors" />
          <div class="flex flex-col min-w-0">
            <span
              class="text-sm font-medium text-content-primary group-hover:text-action-primary truncate transition-colors">
              {{ prev?.title || '已是最新作品' }}
            </span>
          </div>
        </component>

        <component :is="next ? RouterLink : 'div'" :to="next ? `/portfolio/${next.slug}` : undefined" :class="[
          'detail-nav-link justify-end text-right gap-3 detail-nav',
          next
            ? 'group md:hover:ring md:hover:ring-surface md:hover:shadow-card-hover'
            : 'opacity-40 cursor-not-allowed',
        ]">
          <div class="flex flex-col min-w-0">
            <span
              class="text-sm font-medium text-content-primary group-hover:text-action-primary truncate transition-colors">
              {{ next?.title || '已是最早作品' }}
            </span>
          </div>
          <font-awesome-icon icon="fa-solid fa-arrow-right"
            class="shrink-0 text-content-tertiary group-hover:text-action-primary transition-colors" />
        </component>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import '../lib/fontawesomeDetail'
import { RouterLink } from 'vue-router'
import type { Project, ProjectNavigationItem } from '../data/projects'
import ProjectLinks from './ProjectLinks.vue'
import ThemeIcon from './ThemeIcon.vue'
import { useDarkMode } from '../composables/useDarkMode'
import { DEFAULT_BANNER, DEFAULT_IMAGE, handleImageError } from '../utils/imageFallback'
import { siteSettings } from '../data/siteSettings'

defineProps<{
  project: Project
  prev?: ProjectNavigationItem | null
  next?: ProjectNavigationItem | null
}>()

const { isDark } = useDarkMode()
</script>
