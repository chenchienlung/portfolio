<template>
  <main class="mx-5 mb-4">
    <h2 class="text-3xl font-bold text-center text-neutral-900 dark:text-white py-10">我的文章</h2>
    <div v-if="loading" class="flex flex-col">
      <template v-for="n in 6" :key="n">
        <div class="animate-pulse w-full md:p-5 rounded-3xl">
          <div class="w-full flex flex-col-reverse sm:flex-row gap-4 sm:justify-between items-stretch">
            <div class="flex flex-col justify-between gap-2.5">
              <div class="flex flex-col gap-2">
                <div class="h-7 bg-black/15 dark:bg-white/15 rounded w-full sm:w-80 md:w-96 max-w-full" />
                <div class="h-7 bg-black/15 dark:bg-white/15 rounded w-3/5 sm:hidden" />
                <div class="flex flex-row flex-wrap gap-1">
                  <span class="h-6 w-16 sm:w-14 bg-black/15 dark:bg-white/15 rounded-full" />
                  <span class="h-6 w-14 sm:w-12 bg-black/15 dark:bg-white/15 rounded-full" />
                </div>
              </div>
              <div class="h-4 bg-black/15 dark:bg-white/15 rounded w-24" />
            </div>
            <div class="h-fit shrink-0 w-full sm:w-48 aspect-video rounded-xl bg-black/15 dark:bg-white/15" />
          </div>
        </div>
        <hr class="w-full md:w-[96%] mx-auto my-8 md:my-2.5 dark:border-white/15 border-black/15" />
      </template>
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="articles.length" class="flex flex-col">
      <ArticleCard v-for="article in articles" :key="article.id" v-bind="article" />
    </div>
    <div v-else class="text-center py-20">
      <h3 class="text-2xl font-bold text-neutral-400 dark:text-neutral-500 mb-10">
        目前還沒有文章...
      </h3>
      <RouterLink to="/"
        class="px-6 py-3.5 inline-flex items-center justify-center text-sm text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200">
        回到首頁
      </RouterLink>
    </div>
  </main>
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
      link: `/blog/${article.slug}`,
    }))
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})
</script>
