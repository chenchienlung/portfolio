<template>
    <main class="mx-5">
    <h1 class="text-page-title font-bold text-center text-content-primary py-10">我的文章</h1>
    <h2 class="sr-only">文章列表</h2>
    <div v-if="loading" class="flex flex-col">
      <template v-for="n in 6" :key="n">
        <div class="animate-pulse w-full md:p-5 rounded-3xl">
          <div class="w-full flex flex-col-reverse sm:flex-row gap-4 sm:justify-between items-stretch">
            <div class="flex flex-col justify-between gap-2.5">
              <div class="flex flex-col gap-2">
                <div class="h-7 bg-skeleton rounded-sm w-full sm:w-80 md:w-96 max-w-full" />
                <div class="h-7 bg-skeleton rounded-sm w-3/5 sm:hidden" />
                <div class="flex flex-row flex-wrap gap-1">
                  <span class="h-6 w-16 sm:w-14 bg-skeleton rounded-full" />
                  <span class="h-6 w-14 sm:w-12 bg-skeleton rounded-full" />
                </div>
              </div>
              <div class="h-4 bg-skeleton rounded-sm w-24" />
            </div>
            <div class="h-fit shrink-0 w-full sm:w-48 aspect-video rounded-xl bg-skeleton" />
          </div>
        </div>
        <hr class="w-full md:w-[96%] mx-auto my-8 md:my-2.5 border-surface" />
      </template>
    </div>
    <div v-else-if="error" class="text-center text-feedback-error">{{ error }}</div>
    <div v-else-if="articles.length" class="flex flex-col">
      <ArticleCard v-for="(article, index) in articles" :key="article.id" v-bind="article" :priority="index === 0" />
    </div>
    <div v-else class="text-center py-empty-state">
      <p class="text-state-title font-bold text-content-tertiary mb-10">
        目前還沒有文章...
      </p>
      <RouterLink to="/blog"
        class="button-primary rounded-full button-action hover:bg-action-primary-hover">
        回到文章列表
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
