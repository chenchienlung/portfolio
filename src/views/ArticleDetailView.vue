<template>
  <main class="mx-5 mt-12 md:mt-24">
    <div v-if="loading" class="animate-pulse flex flex-col gap-5">
      <div
        class="detail-banner-skeleton bg-skeleton md:aspect-4/1" />
      <div
        class="detail-content card-skeleton flex flex-col gap-10">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            <span class="h-5 w-14 bg-skeleton rounded-full" />
            <span class="h-5 w-20 bg-skeleton rounded-full" />
          </div>
          <div class="h-10 md:h-11 bg-skeleton rounded-sm w-4/5" />
          <div class="h-10 md:h-11 bg-skeleton rounded-sm w-2/5" />
          <div class="h-6 bg-skeleton rounded-sm w-3/5" />
          <div class="h-6 bg-skeleton rounded-sm w-full" />
          <div class="flex flex-wrap gap-4">
            <div class="h-4 bg-skeleton rounded-sm w-24" />
            <div class="h-4 bg-skeleton rounded-sm w-20" />
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="n in 3" :key="`tag-${n}`" class="h-7 w-16 bg-skeleton rounded-full" />
          </div>
        </div>

        <div class="border-l-4 border-subtle pl-5 flex flex-col gap-3">
          <div class="h-5 bg-skeleton rounded-sm w-full" />
          <div class="h-5 bg-skeleton rounded-sm w-4/5" />
        </div>

        <div class="border-b border-subtle"></div>

        <div class="flex flex-col gap-3">
          <div class="h-5 bg-skeleton rounded-sm w-full" />
          <div class="h-5 bg-skeleton rounded-sm w-5/6" />
          <div class="h-5 bg-skeleton rounded-sm w-full" />
          <div class="h-5 bg-skeleton rounded-sm w-4/5" />
          <div class="h-5 bg-skeleton rounded-sm w-3/5" />
        </div>
      </div>

      <section class="flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="n in 1" :key="n"
        class="flex items-center gap-3 detail-nav-skeleton">
            <div class="w-4 h-4 bg-skeleton rounded-sm shrink-0" />
            <div class="flex flex-col gap-1.5 flex-1 min-w-0">
              <div class="h-3 bg-skeleton rounded-sm w-16" />
              <div class="h-4 bg-skeleton rounded-sm w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="error" class="text-center py-empty-state">
      <h1 class="text-state-title font-bold text-feedback-error mb-10">{{ error }}</h1>
      <RouterLink to="/blog"
        class="button-primary rounded-full button-action hover:bg-action-primary-hover">
        回到文章列表
      </RouterLink>
    </div>
    <ArticleDetail v-else-if="article" :article="article" :prev="prevArticle" :next="nextArticle" />

    <div v-else class="text-center py-empty-state">
      <h1 class="text-state-title font-bold text-content-tertiary mb-10">找不到該文章</h1>
      <RouterLink to="/blog"
        class="button-primary rounded-full button-action hover:bg-action-primary-hover">
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
