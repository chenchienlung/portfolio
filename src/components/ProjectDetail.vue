<template>
  <div class="flex flex-col gap-5">
    <div class="aspect-2/1 md:aspect-4/1 overflow-hidden rounded-4xl border border-black/15">
      <img
        :src="project.banner"
        :alt="project.title"
        fetchpriority="high"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="px-8 py-12 bg-white rounded-4xl border border-black/15">
      <div class="flex flex-col md:flex-row gap-2 justify-start md:items-center text-gray-600 mb-4">
        <h2 class="text-2xl font-bold text-black">{{ project.title }}</h2>
        <ProjectLinks
          class="gap-1"
          :website="project.website"
          :github="project.github"
          :figma="project.figma"
          :figma_prototype="project.figma_prototype"
        />
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-3 py-1 text-xs bg-gray-100 border border-black/5 rounded-full text-gray-500"
        >
          {{ tag }}
        </span>
      </div>
      <p
        v-for="(para, i) in project.detail_description"
        :key="i"
        class="text-lg text-gray-600 leading-relaxed"
        :class="i < project.detail_description.length - 1 ? 'mb-4' : 'mb-8'"
      >
        {{ para }}
      </p>

      <h3 class="ml-2 mb-2 mt-25 text-xl font-bold text-sky-600">設計理念</h3>
      <div v-if="project.detail_blocks?.length" class="flex flex-col gap-10">
        <div
          v-for="(block, index) in project.detail_blocks"
          :key="index"
          class="flex flex-col md:flex-row gap-6 items-center"
          :class="block.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'"
        >
          <div class="w-full md:w-1/2 shrink-0">
            <img
              :src="block.image"
              :alt="block.title || project.title"
              class="w-full rounded-2xl object-cover"
            />
          </div>
          <div class="w-full md:w-1/2 flex flex-col gap-2">
            <h3 v-if="block.title" class="text-xl font-semibold text-black">
              {{ block.title }}
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {{ block.description }}
            </p>
          </div>
        </div>
      </div>

      <h3 class="ml-2 mb-2 mt-25 text-xl font-bold text-sky-600">作品圖片</h3>
      <div
        v-if="project.detail_img?.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5"
      >
        <img
          v-for="img in project.detail_img"
          :key="img"
          :src="img"
          :alt="project.title"
          fetchpriority="high"
          class="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div class="prose prose-gray max-w-none mt-25">
        <slot>
          <p v-for="content in project.content" :key="content">
            <font-awesome-icon icon="fa-solid fa-check" class="mr-1 text-green-600" />
            {{ content }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../data/projects'
import ProjectLinks from './ProjectLinks.vue'

defineProps<{
  project: Project
}>()
</script>
