<template>
  <main class="mx-5 mt-12 md:mt-24">
    <div v-if="loading" class="animate-pulse flex flex-col gap-5 mb-10">
      <div
        class="aspect-2/1 md:aspect-4/1 rounded-4xl bg-black/15 dark:bg-white/15 border border-black/15 dark:border-white/10 shadow-xs/12" />
      <div
        class="px-5 py-8 md:px-12 md:py-16 bg-white dark:bg-white/5 rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12 flex flex-col gap-10">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            <span class="h-5 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-5 w-20 bg-black/15 dark:bg-white/15 rounded-full" />
          </div>
          <div class="h-10 md:h-11 bg-black/15 dark:bg-white/15 rounded w-4/5" />
          <div class="h-10 md:h-11 bg-black/15 dark:bg-white/15 rounded w-2/5" />
          <div class="h-6 bg-black/15 dark:bg-white/15 rounded w-full" />
          <div class="flex flex-wrap gap-4">
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-24" />
            <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-20" />
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="h-7 w-16 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-7 w-14 bg-black/15 dark:bg-white/15 rounded-full" />
            <span class="h-7 w-20 bg-black/15 dark:bg-white/15 rounded-full" />
          </div>
        </div>

        <div class="border-l-4 border-black/10 dark:border-white/10 pl-5 space-y-3">
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-full" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-4/5" />
        </div>

        <div class="border-b border-black/10 dark:border-white/10"></div>

        <div class="space-y-3">
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-full" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-5/6" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-full" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-4/5" />
          <div class="h-5 bg-black/15 dark:bg-white/15 rounded w-3/5" />
        </div>
      </div>

      <section class="flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="n in 2" :key="n"
            class="h-18 flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12">
            <div class="w-4 h-4 bg-black/15 dark:bg-white/15 rounded shrink-0" />
            <div class="flex flex-col gap-1.5 flex-1 min-w-0">
              <div class="h-3 bg-black/15 dark:bg-white/15 rounded w-16" />
              <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <h1 class="text-2xl font-bold text-red-500 mb-10">{{ error }}</h1>
      <RouterLink to="/blog"
        class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200">
        回到文章列表
      </RouterLink>
    </div>
    <ArticleDetail v-else-if="article" :article="article" :prev="prevArticle" :next="nextArticle" />

    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-neutral-400 dark:text-neutral-500 mb-10">找不到該文章</h1>
      <RouterLink to="/blog"
        class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200">
        回到文章列表
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  fetchArticleBySlug,
  fetchArticleNavigation,
  type Article,
  type ArticleNavigationItem,
} from '../data/articles'
import ArticleDetail from '../components/ArticleDetail.vue'
import { setSeoMetadata, SITE_URL } from '../utils/seo'
import { isNotFoundError } from '../utils/supabase'

const route = useRoute()
const article = ref<Article | null>(null)
const articleList = ref<ArticleNavigationItem[]>([])
const loading = ref(true)
const error = ref('')
let requestId = 0

const currentIndex = computed(() => {
  if (!article.value) return -1
  return articleList.value.findIndex((a) => a.slug === article.value!.slug)
})

const prevArticle = computed((): ArticleNavigationItem | null => {
  const i = currentIndex.value
  if (i <= 0) return null
  return articleList.value[i - 1] ?? null
})

const nextArticle = computed((): ArticleNavigationItem | null => {
  const i = currentIndex.value
  if (i < 0 || i + 1 >= articleList.value.length) return null
  return articleList.value[i + 1] ?? null
})

const loadArticle = async () => {
  const slug = route.params.slug as string
  if (!slug) return
  const currentRequestId = ++requestId
  loading.value = true
  error.value = ''
  article.value = null
  try {
    const [articleData, listData] = await Promise.all([
      fetchArticleBySlug(slug),
      fetchArticleNavigation(),
    ])
    if (currentRequestId !== requestId) return
    article.value = articleData
    articleList.value = listData
    setSeoMetadata({
      title: article.value.title,
      description: article.value.excerpt || article.value.subtitle,
      image: article.value.cover_image_wide || article.value.cover_image,
      url: `${SITE_URL}/blog/${article.value.slug}`,
      type: 'article',
      publishedTime: article.value.published_at,
      modifiedTime: article.value.updated_at,
      keywords: article.value.tags,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.value.title,
        description: article.value.excerpt || article.value.subtitle,
        url: `${SITE_URL}/blog/${article.value.slug}`,
        image: article.value.cover_image_wide || article.value.cover_image,
        datePublished: article.value.published_at,
        dateModified: article.value.updated_at,
        author: { '@type': 'Person', name: '陳仟龍 Chris Chen', url: SITE_URL },
        keywords: article.value.tags?.join(', '),
      },
    })
  } catch (err) {
    if (currentRequestId !== requestId) return
    if (isNotFoundError(err)) {
      setSeoMetadata({ title: '找不到該文章', url: '/blog' })
      return
    }
    error.value = '文章載入失敗，請稍後再試。'
    setSeoMetadata({ title: '找不到該文章', url: '/blog' })
    console.error(err)
  } finally {
    if (currentRequestId === requestId) loading.value = false
  }
}

onMounted(loadArticle)
watch(() => route.params.slug, loadArticle)
</script>
