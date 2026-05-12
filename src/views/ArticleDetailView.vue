<template>
  <main class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-24">
      <div v-if="loading" class="animate-pulse space-y-6 mb-10">
        <div
          class="aspect-video rounded-4xl bg-black/15 dark:bg-white/15 border border-black/10 dark:border-white/10"
        />
        <div
          class="px-5 py-8 md:px-12 md:py-16 bg-white dark:bg-white/5 rounded-4xl border border-black/15 dark:border-white/10 space-y-6"
        >
          <div class="flex gap-2">
            <span class="h-5 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-5 w-20 bg-black/15 dark:bg-white/15 rounded-full" />
          </div>
          <div class="h-9 bg-black/15 dark:bg-white/15 rounded w-4/5" />
          <div class="h-9 bg-black/15 dark:bg-white/15 rounded w-2/5" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-full" />
          <div class="flex gap-3">
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-24" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-20" />
          </div>
          <div class="flex gap-2 flex-wrap">
            <span class="h-6 w-16 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-6 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-6 w-18 bg-black/15 dark:bg-white/15 rounded-full" />
          </div>
          <div class="space-y-3 pt-6">
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-full" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-5/6" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-full" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-4/5" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-3/5" />
          </div>
        </div>
      </div>

      <ArticleDetail v-else-if="article" :article="article" />

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-10">找不到該文章</h2>
        <RouterLink
          to="/article"
          class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
        >
          回到文章列表
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { fetchArticleBySlug, type Article } from '../data/articles'
import ArticleDetail from '../components/ArticleDetail.vue'
import { setPageTitle } from '../utils/pageTitle'

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)

const loadArticle = async () => {
  const slug = route.params.slug as string
  if (!slug) return
  loading.value = true
  try {
    article.value = await fetchArticleBySlug(slug)
    setPageTitle(article.value?.title)
  } catch (err) {
    article.value = null
    setPageTitle('找不到該文章')
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadArticle)
watch(() => route.params.slug, loadArticle)
</script>
