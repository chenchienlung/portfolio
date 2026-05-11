<template>
  <section class="min-h-[calc(100dvh-168px)] max-w-6xl mx-auto mb-4">
    <div class="mx-5 mt-12 md:mt-28">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">我的文章</h2>
      <div v-if="loading" class="grid grid-cols-1 gap-2.5">
        <div
          v-for="n in 6"
          :key="n"
          class="animate-pulse rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <div class="aspect-3/2 bg-gray-200 dark:bg-gray-700" />
          <div class="p-4 space-y-3">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
            <div class="flex gap-2">
              <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          </div>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else-if="articles.length" class="flex flex-col gap-5">
        <ArticleCard v-for="article in articles" :key="article.id" v-bind="article" />
      </div>
      <div v-else class="text-center py-20">
        <h3 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-10">目前還沒有文章...</h3>
        <RouterLink
          to="/"
          class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
        >
          回到首頁
        </RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import ArticleCard from '../components/ArticleCard.vue'
import { fetchArticles, type ArticleListItem } from '../data/articles'
import { onMounted, ref } from 'vue'

const articles = ref<(ArticleListItem & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    loading.value = true
    const data = await fetchArticles()

    articles.value = data.map((article) => ({
      ...article,
      link: `/article/${article.slug}`,
    }))
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})
</script>
