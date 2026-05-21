<template>
  <main class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-24">
      <div v-if="loading" class="animate-pulse flex flex-col gap-5 mb-10">
        <div
          class="aspect-2/1 md:aspect-4/1 rounded-4xl bg-black/15 dark:bg-white/15 border border-black/15 dark:border-white/10 shadow-xs/12"
        />
        <div
          class="px-5 py-8 md:px-12 md:py-16 bg-white dark:bg-white/5 rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12 flex flex-col gap-10"
        >
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
            <div
              v-for="n in 2"
              :key="n"
              class="h-18 flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12"
            >
              <div class="w-4 h-4 bg-black/15 dark:bg-white/15 rounded shrink-0" />
              <div class="flex flex-col gap-1.5 flex-1 min-w-0">
                <div class="h-3 bg-black/15 dark:bg-white/15 rounded w-16" />
                <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-3/4" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <ArticleDetail
        v-else-if="article"
        :article="article"
        :prev="prevArticle"
        :next="nextArticle"
      />

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-neutral-400 dark:text-neutral-500 mb-10">
          找不到該文章
        </h2>
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
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  fetchArticleBySlug,
  fetchArticles,
  type Article,
  type ArticleListItem,
} from '../data/articles'
import ArticleDetail from '../components/ArticleDetail.vue'
import { setPageTitle } from '../utils/pageTitle'

const route = useRoute()
const article = ref<Article | null>(null)
const articleList = ref<ArticleListItem[]>([])
const loading = ref(true)

const currentIndex = computed(() => {
  if (!article.value) return -1
  return articleList.value.findIndex((a) => a.slug === article.value!.slug)
})

const prevArticle = computed((): ArticleListItem | null => {
  const i = currentIndex.value
  if (i < 0 || i + 1 >= articleList.value.length) return null
  return articleList.value[i + 1] ?? null
})

const nextArticle = computed((): ArticleListItem | null => {
  const i = currentIndex.value
  if (i <= 0) return null
  return articleList.value[i - 1] ?? null
})

const loadArticle = async () => {
  const slug = route.params.slug as string
  if (!slug) return
  loading.value = true
  try {
    const [articleData, listData] = await Promise.all([
      fetchArticleBySlug(slug),
      articleList.value.length ? Promise.resolve(articleList.value) : fetchArticles(),
    ])
    article.value = articleData
    articleList.value = listData
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
