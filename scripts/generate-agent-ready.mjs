import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'

const root = process.cwd()
const env = loadEnv('production', root, '')
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY
const siteUrl = (env.VITE_SITE_URL || 'https://chenchienlung.com').replace(/\/$/, '')

if (!supabaseUrl || !supabaseKey) {
  throw new Error('缺少 VITE_SUPABASE_URL 與 VITE_SUPABASE_PUBLISHABLE_KEY。')
}

const supabase = createClient(supabaseUrl, supabaseKey)
const [{ data: projects, error: projectsError }, { data: articles, error: articlesError }] =
  await Promise.all([
    supabase
      .from('projects')
      .select('id, slug, title, description, image, banner, tags, website, github')
      .eq('public', true)
      .order('id', { ascending: false }),
    supabase
      .from('articles')
      .select(
        'id, slug, title, subtitle, excerpt, cover_image, category, tags, published_at, updated_at',
      )
      .eq('published', true)
      .order('published_at', { ascending: false }),
  ])

if (projectsError) throw projectsError
if (articlesError) throw articlesError

const publicProjects = projects ?? []
const publicArticles = articles ?? []
const projectUrl = (slug) => `${siteUrl}/portfolio/${slug}`
const articleUrl = (slug) => `${siteUrl}/blog/${slug}`
const escapeXml = (value) =>
  String(value ?? '').replace(
    /[<>&'\"]/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;',
      })[char],
  )

const outputDir = resolve(root, 'public')
await mkdir(outputDir, { recursive: true })

const projectLines = publicProjects
  .map(
    (project) =>
      `- [${project.title}](${projectUrl(project.slug)})${project.description ? `：${project.description}` : ''}`,
  )
  .join('\n')
const articleLines = publicArticles
  .map(
    (article) =>
      `- [${article.title}](${articleUrl(article.slug)})${article.excerpt ? `：${article.excerpt}` : ''}`,
  )
  .join('\n')

await writeFile(
  resolve(outputDir, 'llms-full.txt'),
  `# 陳仟龍 Chris Chen｜作品集與文章

## 個人簡介

陳仟龍是 Junior Frontend Developer / UI/UX Designer，主要使用 Vue 3、TypeScript、Tailwind CSS、Supabase 與 Figma。

## 作品

${projectLines || '- 目前沒有公開作品。'}

## 文章

${articleLines || '- 目前沒有已發布文章。'}

## 其他連結

- [首頁](${siteUrl}/)
- [作品集](${siteUrl}/portfolio)
- [部落格](${siteUrl}/blog)
- [GitHub](https://github.com/chenchienlung)
- 聯絡信箱：chris@chenchienlung.com
`,
  'utf8',
)

const portfolio = {
  name: '陳仟龍 Chris Chen',
  role: 'Junior Frontend Developer / UI/UX Designer',
  url: siteUrl,
  github: 'https://github.com/chenchienlung',
  email: 'chris@chenchienlung.com',
  skills: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Figma'],
  pages: { home: siteUrl, portfolio: `${siteUrl}/portfolio`, blog: `${siteUrl}/blog` },
  projects: publicProjects.map((project) => ({ ...project, url: projectUrl(project.slug) })),
  articles: publicArticles.map((article) => ({ ...article, url: articleUrl(article.slug) })),
}
await writeFile(
  resolve(outputDir, 'portfolio.json'),
  `${JSON.stringify(portfolio, null, 2)}\n`,
  'utf8',
)

const urls = [
  { loc: siteUrl },
  { loc: `${siteUrl}/portfolio` },
  { loc: `${siteUrl}/blog` },
  ...publicProjects.map((project) => ({ loc: projectUrl(project.slug) })),
  ...publicArticles.map((article) => ({
    loc: articleUrl(article.slug),
    lastmod: article.updated_at || article.published_at,
  })),
]
const sitemapEntries = urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>${
      lastmod
        ? `
    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : ''
    }
  </url>`,
  )
  .join('\n')
await writeFile(
  resolve(outputDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`,
  'utf8',
)

console.log(
  `Agent Ready 資源已產生：${publicProjects.length} 個公開作品、${publicArticles.length} 篇已發布文章。`,
)
