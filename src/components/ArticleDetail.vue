<template>
  <div class="flex flex-col gap-5 mb-10">
    <div
      v-if="article.cover_image"
      class="aspect-2/1 md:aspect-4/1 overflow-hidden rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12"
    >
      <img
        :src="article.cover_image"
        :alt="article.title"
        fetchpriority="high"
        class="w-full h-full object-cover"
      />
    </div>

    <article
      class="px-5 py-8 md:px-12 md:py-16 bg-white dark:bg-white/5 rounded-4xl border border-black/15 dark:border-white/10 shadow-xs/12 flex flex-col gap-10"
    >
      <header class="flex flex-col gap-4">
        <div v-if="article.category?.length || article.series" class="flex flex-wrap gap-2">
          <span
            v-for="c in article.category"
            :key="c"
            class="w-fit px-2 py-0.5 text-xs font-normal bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-full"
          >
            {{ c }}
          </span>
          <span
            v-if="article.series"
            class="w-fit px-2 py-0.5 text-xs font-normal bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full"
          >
            {{ article.series
            }}<template v-if="article.series_order"> #{{ article.series_order }}</template>
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
          {{ article.title }}
        </h1>

        <p v-if="article.subtitle" class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ article.subtitle }}
        </p>

        <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
          <span v-if="article.published_at">
            <font-awesome-icon icon="fa-regular fa-calendar" class="mr-1" />
            {{ formatDate(article.published_at) }}
          </span>
          <span v-if="article.read_time">
            <font-awesome-icon icon="fa-regular fa-clock" class="mr-1" />
            約 {{ article.read_time }} 分鐘
          </span>
        </div>

        <div v-if="article.tags?.length" class="flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-gray-100 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full text-gray-600 dark:text-gray-300"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <p
        v-if="article.excerpt"
        class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-sky-500 dark:border-sky-400 pl-5"
      >
        {{ article.excerpt }}
      </p>

      <div class="border-b border-black/10 dark:border-white/10"></div>

      <div class="article-content text-gray-800 dark:text-gray-200" v-html="renderedContent"></div>

      <div class="border-t border-black/10 dark:border-white/10 pt-8">
        <RouterLink
          to="/article"
          class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          ← 回到文章列表
        </RouterLink>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { marked } from 'marked'
import type { Article } from '../data/articles'

const props = defineProps<{
  article: Article
}>()

const renderedContent = computed(() => {
  if (!props.article.content) return ''
  return marked.parse(props.article.content, { breaks: true, async: false }) as string
})

const formatDate = (iso: string) => {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}
</script>

<style>
.article-content {
  font-size: 1rem;
  line-height: 1.8;
}
.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  font-weight: 700;
  color: oklch(0.588 0.158 241.966);
  line-height: 1.4;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
html.dark .article-content h1,
html.dark .article-content h2,
html.dark .article-content h3,
html.dark .article-content h4 {
  color: #fff;
}
.article-content h1 {
  font-size: 1.875rem;
}
.article-content h2 {
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(0 0 0 / 0.1);
}
html.dark .article-content h2 {
  border-bottom-color: rgb(255 255 255 / 0.1);
}
.article-content h3 {
  font-size: 1.25rem;
}
.article-content h4 {
  font-size: 1.125rem;
}
.article-content p {
  margin-bottom: 1rem;
}
.article-content a {
  color: rgb(2 132 199);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.article-content a:hover {
  color: rgb(3 105 161);
}
html.dark .article-content a {
  color: rgb(56 189 248);
}
html.dark .article-content a:hover {
  color: rgb(125 211 252);
}
.article-content ul,
.article-content ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
}
.article-content ul {
  list-style: disc;
}
.article-content ol {
  list-style: decimal;
}
.article-content li {
  margin-bottom: 0.5rem;
}
.article-content li > p {
  margin-bottom: 0.25rem;
}
.article-content code {
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background-color: rgb(0 0 0 / 0.06);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
html.dark .article-content code {
  background-color: rgb(255 255 255 / 0.1);
}
.article-content pre {
  background-color: rgb(243 244 246); /* gray-100 */
  color: rgb(17 24 39); /* gray-900 */
  border: 1px solid rgb(0 0 0 / 0.08);
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  font-size: 0.875rem;
  line-height: 1.7;
}
html.dark .article-content pre {
  background-color: rgb(17 24 39); /* gray-900 */
  color: rgb(229 231 235); /* gray-200 */
  border-color: rgb(255 255 255 / 0.08);
}
.article-content pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}
.article-content blockquote {
  border-left: 4px solid rgb(209 213 219);
  padding-left: 1rem;
  color: rgb(75 85 99);
  font-style: italic;
  margin: 1rem 0;
}
html.dark .article-content blockquote {
  border-left-color: rgb(75 85 99);
  color: rgb(156 163 175);
}
.article-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}
.article-content hr {
  border: 0;
  border-top: 1px solid rgb(0 0 0 / 0.1);
  margin: 2rem 0;
}
html.dark .article-content hr {
  border-top-color: rgb(255 255 255 / 0.1);
}
.article-content table {
  width: 100%;
  border-collapse: separate; /* collapse 會讓 border-radius 失效 */
  border-spacing: 0;
  border: 1px solid rgb(0 0 0 / 0.1);
  border-radius: 0.75rem; /* 12px */
  overflow: hidden;
  margin: 20px 0;
  font-size: 0.9375rem;
}
html.dark .article-content table {
  border-color: rgb(255 255 255 / 0.1);
}
.article-content th,
.article-content td {
  padding: 0.5rem 0.75rem;
  border-right: 1px solid rgb(0 0 0 / 0.1);
  border-bottom: 1px solid rgb(0 0 0 / 0.1);
  text-align: left;
}
html.dark .article-content th,
html.dark .article-content td {
  border-right-color: rgb(255 255 255 / 0.1);
  border-bottom-color: rgb(255 255 255 / 0.1);
}
/* 最後一欄不畫右邊框、最後一列不畫下邊框，避免跟外框重疊 */
.article-content th:last-child,
.article-content td:last-child {
  border-right: none;
}
.article-content tr:last-child td {
  border-bottom: none;
}
.article-content th {
  background-color: rgb(0 0 0 / 0.04);
  font-weight: 600;
}
html.dark .article-content th {
  background-color: rgb(255 255 255 / 0.05);
}
</style>
