<template>
  <main class="relative flex flex-col gap-5 mb-10">
    <div
      @click="$router.back()"
      class="md:hidden sticky top-5 left-5 md:absolute md:top-15 md:left-8 w-24 h-12 flex items-center justify-center text-sm text-black dark:text-white bg-neutral-100/40 dark:bg-black/15 border border-black/5 dark:border-white/10 backdrop-blur-md rounded-full z-10"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-1" />
      上一頁
    </div>

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
            class="w-fit px-2 py-0.5 text-xs font-normal bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 rounded-full"
          >
            {{ article.series
            }}<template v-if="article.series_order"> #{{ article.series_order }}</template>
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
          {{ article.title }}
        </h1>

        <p
          v-if="article.subtitle"
          class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
        >
          {{ article.subtitle }}
        </p>

        <div class="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400 font-mono">
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
            class="px-3 py-1 text-sm bg-neutral-100 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full text-neutral-600 dark:text-neutral-300"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <p
        v-if="article.excerpt"
        class="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed border-l-4 border-sky-500 dark:border-sky-400 pl-5"
      >
        {{ article.excerpt }}
      </p>

      <div class="border-b border-black/10 dark:border-white/10"></div>

      <div
        class="article-content text-neutral-800 dark:text-neutral-200"
        v-html="renderedContent"
      ></div>
    </article>
    <section class="flex flex-col gap-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <component
          :is="prev ? RouterLink : 'div'"
          :to="prev ? `/article/${prev.slug}` : undefined"
          :class="[
            'flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12 min-w-0 transition-all duration-300',
            prev ? 'group md:hover:shadow-lg/12' : 'opacity-40 cursor-not-allowed',
          ]"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-left"
            class="shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
          />
          <div class="flex flex-col min-w-0">
            <span class="text-xs text-neutral-500 dark:text-neutral-400">上一篇</span>
            <span
              class="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate transition-colors"
            >
              {{ prev?.title || '' }}
            </span>
          </div>
        </component>

        <component
          :is="next ? RouterLink : 'div'"
          :to="next ? `/article/${next.slug}` : undefined"
          :class="[
            'flex items-center justify-end text-right gap-3 p-4 bg-white dark:bg-white/5 rounded-3xl border border-black/15 dark:border-white/10 shadow-xs/12 min-w-0 transition-all duration-300',
            next ? 'group md:hover:shadow-lg/12' : 'opacity-40 cursor-not-allowed',
          ]"
        >
          <div class="flex flex-col min-w-0">
            <span class="text-xs text-neutral-500 dark:text-neutral-400">下一篇</span>
            <span
              class="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate transition-colors"
            >
              {{ next?.title || '' }}
            </span>
          </div>
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
          />
        </component>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { marked } from 'marked'
import type { Article, ArticleListItem } from '../data/articles'

const props = defineProps<{
  article: Article
  prev?: ArticleListItem | null
  next?: ArticleListItem | null
}>()

const renderedContent = computed(() => {
  if (!props.article.content) return ''
  const html = marked.parse(props.article.content, { breaks: true, async: false }) as string
  // 把 <table> 包一層 wrapper，讓手機版可以橫向捲動
  return html
    .replace(/<table>/g, '<div class="article-table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
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
  color: oklch(0.588 0.158 241.966);
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
  background-color: #f5f5f5;
  color: #171717;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
html.dark .article-content code {
  background-color: #171717;
  color: #e5e5e5;
}

.article-content pre {
  background-color: #f5f5f5;
  color: #171717;
  border: 1px solid #e5e5e5;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  font-size: 0.875rem;
  line-height: 1.7;
}
html.dark .article-content pre {
  background-color: #171717;
  color: #e5e5e5;
  border-color: #262626;
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
  border: 1px solid rgb(0 0 0 / 0.08);
}
.article-content figure {
  margin: 1.5rem 0;
}
html.dark .article-content img {
  border: none;
}
.article-content figure img {
  margin: 0;
}
.article-content figcaption {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgb(107 114 128);
  line-height: 1.5;
}
html.dark .article-content figcaption {
  color: rgb(156 163 175);
}
.article-content hr {
  border: 0;
  border-top: 1px solid rgb(0 0 0 / 0.1);
  margin: 2rem 0;
}
html.dark .article-content hr {
  border-top-color: rgb(255 255 255 / 0.1);
}

.article-content .article-table-wrap {
  overflow-x: auto;
  margin: 20px 0;
  -webkit-overflow-scrolling: touch;
}

.article-content table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid rgb(0 0 0 / 0.1);
  border-radius: 0.75rem;
  margin: 0;
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
  text-wrap: nowrap;
}
html.dark .article-content th,
html.dark .article-content td {
  border-right-color: rgb(255 255 255 / 0.1);
  border-bottom-color: rgb(255 255 255 / 0.1);
}
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
