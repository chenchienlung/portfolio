<template>
  <main class="relative flex flex-col gap-5">
    <button type="button" @click="$router.back()"
      class="md:hidden sticky top-5 left-5 md:absolute md:top-15 md:left-8 detail-back-button flex items-center justify-center text-sm text-content-primary bg-surface-muted/40 border border-detail-back backdrop-blur-md rounded-full z-10">
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-1" />
      上一頁
    </button>

    <section class="detail-banner md:aspect-4/1">
      <picture>
        <source v-if="article.cover_image_wide" media="(min-width: 768px)" :srcset="article.cover_image_wide" />
        <img :src="article.cover_image || siteSettings.default_banner" :alt="article.title"
          @error="handleImageError($event, DEFAULT_BANNER)" width="1200" height="600" fetchpriority="high"
          decoding="async" class="w-full h-full object-cover" />
      </picture>
    </section>
    <article
      class="detail-content card-surface bg-detail-content flex flex-col gap-10">
      <header class="flex flex-col gap-4">
        <div v-if="article.category?.length || article.series" class="flex flex-wrap gap-2">
          <span v-for="c in article.category" :key="c"
            class="w-fit badge-sm text-xs font-normal bg-action-subtle text-action-primary">
            {{ c }}
          </span>
          <span v-if="article.series"
            class="w-fit badge-sm text-xs font-normal bg-surface-muted text-content-secondary">
            {{ article.series }}
            <template v-if="article.series_order"> #{{ article.series_order }}</template>
          </span>
        </div>

        <h1 class="text-detail-title-lg md:text-detail-title-xl font-bold text-content-primary leading-tight">
          {{ article.title }}
        </h1>

        <p v-if="article.subtitle" class="text-lg text-content-secondary leading-relaxed">
          {{ article.subtitle }}
        </p>

        <div class="flex flex-wrap gap-4 text-sm text-content-tertiary font-mono">
          <span v-if="article.published_at">
            <font-awesome-icon icon="fa-solid fa-calendar" />
            {{ formatDate(article.published_at) }}
          </span>
          <span v-if="article.read_time">
            <font-awesome-icon icon="fa-solid fa-clock" />
            約 {{ article.read_time }} 分鐘
          </span>
        </div>

        <div v-if="article.tags?.length" class="flex flex-wrap gap-2">
          <span v-for="tag in article.tags" :key="tag"
            class="badge-lg text-sm bg-surface-muted border border-strong text-content-secondary">
            #{{ tag }}
          </span>
        </div>
      </header>

      <p v-if="article.excerpt" class="text-lg text-content-secondary leading-article border-l-4 border-sky-700 dark:border-sky-400 pl-5">
        {{ article.excerpt }}
      </p>

      <div class="border-b border-subtle"></div>

      <div class="article-content text-content-primary" v-html="renderedContent"></div>

      <section v-if="article.sources?.length" class="flex flex-col gap-4">
        <h2 class="text-section-title md:text-section-title-lg font-bold text-content-primary">資料來源</h2>
        <div class="flex flex-col gap-3">
          <div v-for="source in article.sources" :key="source.url"
            class="group flex items-center gap-4 p-5 rounded-xl border border-subtle bg-detail-muted transition hover:ring-2 hover:ring-sky-500/40 dark:hover:ring-sky-400/40">
            <img v-if="source.image" :src="source.image" :alt="source.title" loading="lazy" decoding="async"
              class="w-24 h-16 sm:w-32 sm:h-20 shrink-0 rounded-xl object-cover" />
            <div class="flex min-w-0 flex-col gap-1">
              <span class="font-medium text-content-primary">{{ source.title }}</span>
              <a :href="source.url" target="_blank" rel="noopener noreferrer"
                class="inline-flex min-w-0 items-center gap-2 text-sm text-action-primary hover:underline">
                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="shrink-0 text-xs" />
                <span class="truncate" :title="source.url">{{ source.url }}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
    <section class="flex flex-col">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <component :is="prev ? RouterLink : 'div'" :to="prev ? `/blog/${prev.slug}` : undefined" :class="[
          'detail-nav-link gap-4 detail-nav',
          prev
            ? 'group md:hover:ring md:hover:ring-surface md:hover:shadow-card-hover'
            : 'opacity-40 cursor-not-allowed',
        ]">
          <font-awesome-icon icon="fa-solid fa-arrow-left"
            class="shrink-0 text-content-tertiary group-hover:text-action-primary transition-colors" />
          <div class="flex flex-col min-w-0">
            <span class="text-xs text-content-tertiary">上一篇</span>
            <span
              class="text-sm font-medium text-content-primary group-hover:text-action-primary truncate transition-colors">
              {{ prev?.title || '已是最新文章' }}
            </span>
          </div>
        </component>

        <component :is="next ? RouterLink : 'div'" :to="next ? `/blog/${next.slug}` : undefined" :class="[
          'detail-nav-link justify-end text-right gap-3 detail-nav',
          next
            ? 'group md:hover:ring md:hover:ring-surface md:hover:shadow-card-hover'
            : 'opacity-40 cursor-not-allowed',
        ]">
          <div class="flex flex-col min-w-0">
            <span class="text-xs text-content-tertiary">下一篇</span>
            <span
              class="text-sm font-medium text-content-primary group-hover:text-action-primary truncate transition-colors">
              {{ next?.title || '已是最早文章' }}
            </span>
          </div>
          <font-awesome-icon icon="fa-solid fa-arrow-right"
            class="shrink-0 text-content-tertiary group-hover:text-action-primary transition-colors" />
        </component>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import '../lib/fontawesomeDetail'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import type { Article, ArticleNavigationItem } from '../data/articles'
import { DEFAULT_BANNER, handleImageError } from '../utils/imageFallback'
import { siteSettings } from '../data/siteSettings'

const props = defineProps<{
  article: Article
  prev?: ArticleNavigationItem | null
  next?: ArticleNavigationItem | null
}>()

const renderedContent = computed(() => {
  if (!props.article.content) return ''
  const html = marked.parse(props.article.content, { breaks: true, async: false }) as string
  // 把 <table> 包一層 wrapper，讓手機版可以橫向捲動
  return DOMPurify.sanitize(
    html
      .replace(/<table>/g, '<div class="article-table-wrap"><table>')
      .replace(/<\/table>/g, '</table></div>'),
  )
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
@reference '../assets/main.css';

.article-content {
  font-size: var(--text-body);
  line-height: var(--leading-article);
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  font-weight: 700;
  color: var(--semantic-action-primary);
  line-height: var(--leading-body);
  margin-top: calc(var(--spacing) * 20);
  margin-bottom: var(--spacing-article-block);
}

html.dark .article-content h1,
html.dark .article-content h2,
html.dark .article-content h3,
html.dark .article-content h4 {
  color: var(--semantic-action-primary);
}

.article-content h1 {
  font-size: var(--text-heading-xl);
}

.article-content h2 {
  font-size: var(--text-heading-lg);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--semantic-border-subtle);
}

.article-content h3 {
  font-size: var(--text-heading-md);
}

.article-content h4 {
  font-size: var(--text-heading-sm);
}

.article-content p {
  margin-bottom: var(--spacing-article-block);
}

.article-content a {
  color: var(--semantic-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.article-content a:hover {
  color: var(--semantic-action-primary-hover);
}

html.dark .article-content a {
  color: var(--semantic-action-primary);
}

.article-content ul,
.article-content ol {
  padding-left: var(--spacing-article-list-pl);
  margin: var(--spacing-article-block) 0;
}

.article-content ul {
  list-style: disc;
}

.article-content ol {
  list-style: decimal;
}

.article-content li {
  margin-bottom: var(--spacing-badge-default-py);
}

.article-content li>p {
  margin-bottom: var(--spacing-badge-sm-py);
}

.article-content code {
  @apply code-block;
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  padding: var(--spacing-badge-sm-py) var(--spacing-badge-sm-px);
  border-radius: var(--radius-sm);
  font-size: 0.875em;
}

.article-content pre {
  @apply code-block;
  border: 1px solid var(--semantic-border-surface);
  padding: var(--spacing-article-code-py) var(--spacing-article-code-px);
  border-radius: var(--radius-xl);
  overflow-x: auto;
  margin: var(--spacing-article-table-my) 0;
  font-size: var(--text-ui);
  line-height: var(--leading-code);
}

html.dark .article-content pre {
  background-color: var(--semantic-article-code-bg);
  color: var(--semantic-article-code-text);
}

.article-content pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.article-content blockquote {
  border-left: 4px solid var(--semantic-border-strong);
  padding-left: var(--spacing-article-block);
  color: var(--semantic-text-secondary);
  font-style: italic;
  margin: var(--spacing-article-block) 0;
}

.article-content img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  margin: var(--spacing-article-image-my) 0;
  border: 1px solid var(--semantic-border-subtle);
}

.article-content img:not([width]):not([height]) {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: contain;
}

.article-content figure {
  margin: var(--spacing-article-image-my) 0;
}

html.dark .article-content img {
  border-color: var(--semantic-border-subtle);
}

.article-content figure img {
  margin: 0;
}

.article-content figcaption {
  margin-top: var(--spacing-badge-default-py);
  text-align: center;
  font-size: var(--text-ui);
  color: var(--semantic-text-tertiary);
  line-height: var(--leading-body);
}

.article-content hr {
  border: 0;
  border-top: 1px solid var(--semantic-border-subtle);
  margin: calc(var(--spacing) * 10) 0;
}

.article-content .article-table-wrap {
  overflow-x: auto;
  margin: var(--spacing-article-table-my) 0;
  -webkit-overflow-scrolling: touch;
}

.article-content table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--semantic-border-subtle);
  border-radius: var(--radius-xl);
  margin: 0;
  font-size: var(--text-table);
}

.article-content th,
.article-content td {
  padding: var(--spacing-badge-default-py) var(--spacing-badge-lg-px);
  border-right: 1px solid var(--semantic-border-subtle);
  border-bottom: 1px solid var(--semantic-border-subtle);
  text-align: left;
  text-wrap: nowrap;
}

.article-content th:last-child,
.article-content td:last-child {
  border-right: none;
}

.article-content tr:last-child td {
  border-bottom: none;
}

.article-content th {
  background-color: var(--semantic-article-table-header-bg);
  font-weight: 600;
}
</style>
