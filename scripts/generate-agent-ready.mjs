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
const [
  { data: projects, error: projectsError },
  { data: articles, error: articlesError },
  { data: about, error: aboutError },
] = await Promise.all([
  supabase
    .from('projects')
    .select(
      'id, slug, title, description, image, banner, tags, points, skills, detail_description, content, detail_blocks, development_blocks, detail_img, website, github, figma, figma_prototype',
    )
    .eq('public', true)
    .order('id', { ascending: false }),
  supabase
    .from('articles')
    .select(
      'id, slug, title, subtitle, excerpt, content, cover_image, category, tags, read_time, published_at, updated_at',
    )
    .eq('published', true)
    .order('published_at', { ascending: false }),
  supabase
    .from('about')
    .select(
      'profile_name, profile_title, location, job_status, contacts, experiences, resources, educations, skill_texts, skill_groups, work_preferences, daily_tools, stats, learning, capabilities',
    )
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle(),
])

if (projectsError) throw projectsError
if (articlesError) throw articlesError
if (aboutError) throw aboutError

const publicProjects = projects ?? []
const publicArticles = articles ?? []
const profile = about ?? {}
const projectUrl = (slug) => `${siteUrl}/portfolio/${slug}`
const articleUrl = (slug) => `${siteUrl}/blog/${slug}`
const projectMarkdownPath = (slug) => `/markdown/portfolio/${slug}.md`
const articleMarkdownPath = (slug) => `/markdown/blog/${slug}.md`
const homeMarkdownPath = '/markdown/home.md'
const portfolioMarkdownPath = '/markdown/portfolio.md'
const blogMarkdownPath = '/markdown/blog.md'
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
const markdownDir = resolve(outputDir, 'markdown')
await mkdir(outputDir, { recursive: true })
await mkdir(resolve(markdownDir, 'portfolio'), { recursive: true })
await mkdir(resolve(markdownDir, 'blog'), { recursive: true })

const listSection = (title, values) => {
  if (!Array.isArray(values) || values.length === 0) return ''
  return `\n## ${title}\n\n${values.map((value) => `- ${value}`).join('\n')}\n`
}

const blockSection = (title, blocks) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return ''
  const content = blocks
    .map((block) =>
      [
        block.title && `### ${block.title}`,
        block.description,
        block.image && `![${block.title || '作品圖片'}](${block.image})`,
      ]
        .filter(Boolean)
        .join('\n\n'),
    )
    .filter(Boolean)
    .join('\n\n')
  return content ? `\n## ${title}\n\n${content}\n` : ''
}

const projectMarkdown = (
  project,
) => `# ${project.title}｜Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

${project.description || ''}

${listSection('重點', project.points)}${listSection('標籤', project.tags)}${listSection(
  '技能與工具',
  Array.isArray(project.skills)
    ? project.skills.map((skill) => skill.name || skill.icon?.light).filter(Boolean)
    : [],
)}${listSection('詳細說明', project.detail_description)}${listSection('成果', project.content)}${blockSection(
  '開發過程',
  project.development_blocks,
)}${blockSection('設計理念', project.detail_blocks)}
## 連結

${[
  project.website && `- 網站：${project.website}`,
  project.github && `- GitHub：${project.github}`,
  project.figma && `- Figma：${project.figma}`,
  project.figma_prototype && `- Figma Prototype：${project.figma_prototype}`,
  `- 網頁版：${projectUrl(project.slug)}`,
]
  .filter(Boolean)
  .join('\n')}
`

const articleMarkdown = (
  article,
) => `# ${article.title} | Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

${article.subtitle ? `> ${article.subtitle}\n` : ''}

${article.excerpt || ''}

${article.content || ''}

---

- 網頁版：${articleUrl(article.slug)}
- 分類：${article.category?.join(', ') || '未分類'}
- 標籤：${article.tags?.join(', ') || '無'}
- 發布時間：${article.published_at || '未提供'}
- 閱讀時間：約 ${article.read_time || '未提供'} 分鐘
`

const markdownLinkLabel = (value) =>
  String(value ?? '')
    .replaceAll('[', '\\[')
    .replaceAll(']', '\\]')

const markdownList = (values) =>
  Array.isArray(values) && values.length > 0
    ? values.map((value) => `- ${value}`).join('\n')
    : '- 未提供'

const profileSkills = Array.isArray(profile.skill_groups)
  ? profile.skill_groups
      .map((group) => {
        const items = Array.isArray(group.items) ? group.items.join('、') : ''
        return items ? `- **${group.title}**：${items}` : ''
      })
      .filter(Boolean)
      .join('\n')
  : ''

const profileCapabilities = Array.isArray(profile.capabilities)
  ? profile.capabilities.map((item) => `- **${item.title}**：${item.description}`).join('\n')
  : ''

const profileExperiences = Array.isArray(profile.experiences)
  ? profile.experiences
      .map(
        (item) =>
          `- **${item.date}｜${item.title}**：${item.description_before || ''}${item.link ? `[${item.link.text}](${item.link.url})` : ''}${item.description_after || ''}`,
      )
      .join('\n')
  : ''

const profileEducation = Array.isArray(profile.educations)
  ? profile.educations.map((item) => `- **${item.year}**：${item.description}`).join('\n')
  : ''

const profileLearning = profile.learning
  ? `${profile.learning.description || ''}\n\n學習主題：${Array.isArray(profile.learning.topics) ? profile.learning.topics.join('、') : '未提供'}`
  : ''

const profileContacts = Array.isArray(profile.contacts)
  ? profile.contacts.map((item) => `- [${item.label}](${item.url})`).join('\n')
  : ''

const profileDailyTools = Array.isArray(profile.daily_tools)
  ? profile.daily_tools
      .map((item) => item.name)
      .filter(Boolean)
      .join('、')
  : ''

const homeMarkdown = `# Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

## 個人簡介

${profile.profile_name || '陳仟龍 Chris'} 是 ${profile.profile_title || 'Frontend Engineer | UI/UX Designer'}。${profile.location ? `目前位於${profile.location}。` : ''}${profile.job_status ? `目前狀態：${profile.job_status}` : ''}

## 技能與工具

${profileSkills || '- Vue 3、TypeScript、Tailwind CSS、Supabase、Figma'}

## 能力摘要

${profileCapabilities || '- 前端開發、UI/UX 設計、響應式網頁與設計稿切版'}

## 技能重點

${markdownList(profile.skill_texts)}

## 工作偏好

${Array.isArray(profile.work_preferences) && profile.work_preferences.length > 0 ? profile.work_preferences.map((item) => `- **${item.label}**：${item.value}`).join('\n') : '- 未提供'}

## 經歷

${profileExperiences || '- 未提供'}

## 學歷

${profileEducation || '- 未提供'}

## 持續學習

${profileLearning || '- 未提供'}

## 常用工具

${profileDailyTools || 'VSCode、Figma、Vue、Vite、Claude、Codex'}

## 作品集

${publicProjects.map((project) => `- [${markdownLinkLabel(project.title)}](${siteUrl}${projectMarkdownPath(project.slug)})${project.description ? `：${project.description}` : ''}`).join('\n') || '- 目前沒有公開作品。'}

## 文章

${publicArticles.map((article) => `- [${markdownLinkLabel(article.title)}](${siteUrl}${articleMarkdownPath(article.slug)})${article.excerpt ? `：${article.excerpt}` : ''}`).join('\n') || '- 目前沒有已發布文章。'}

## 其他資源

- [作品集索引](${siteUrl}${portfolioMarkdownPath})
- [文章索引](${siteUrl}${blogMarkdownPath})
- [完整 Agent Ready 索引](${siteUrl}/llms-full.txt)
- [機器可讀資料](${siteUrl}/portfolio.json)
- [GitHub](https://github.com/chenchienlung)
- 聯絡信箱：chris@chenchienlung.com

## 聯絡方式

${profileContacts || '- Email：mailto:chris@chenchienlung.com'}
`

const portfolioMarkdown = `# 作品集｜Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

${publicProjects.map((project) => `- [${markdownLinkLabel(project.title)}](${siteUrl}${projectMarkdownPath(project.slug)})${project.description ? `：${project.description}` : ''}`).join('\n') || '- 目前沒有公開作品。'}
`

const blogMarkdown = `# 文章｜Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

${publicArticles.map((article) => `- [${markdownLinkLabel(article.title)}](${siteUrl}${articleMarkdownPath(article.slug)})${article.excerpt ? `：${article.excerpt}` : ''}`).join('\n') || '- 目前沒有已發布文章。'}
`

await Promise.all([
  writeFile(resolve(outputDir, homeMarkdownPath.slice(1)), homeMarkdown, 'utf8'),
  writeFile(resolve(outputDir, portfolioMarkdownPath.slice(1)), portfolioMarkdown, 'utf8'),
  writeFile(resolve(outputDir, blogMarkdownPath.slice(1)), blogMarkdown, 'utf8'),
  ...publicProjects.map((project) =>
    writeFile(
      resolve(outputDir, projectMarkdownPath(project.slug).slice(1)),
      projectMarkdown(project),
      'utf8',
    ),
  ),
  ...publicArticles.map((article) =>
    writeFile(
      resolve(outputDir, articleMarkdownPath(article.slug).slice(1)),
      articleMarkdown(article),
      'utf8',
    ),
  ),
])

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
  `# Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

## 個人簡介

陳仟龍是 Junior Frontend Developer / UI/UX Designer，主要使用 Vue 3、TypeScript、Tailwind CSS、Supabase 與 Figma。

## 作品

${projectLines || '- 目前沒有公開作品。'}

## 文章

${articleLines || '- 目前沒有已發布文章。'}

## 詳細 Markdown 資源

${[
  `- [首頁 Markdown](${siteUrl}${homeMarkdownPath})`,
  `- [作品集索引 Markdown](${siteUrl}${portfolioMarkdownPath})`,
  `- [文章索引 Markdown](${siteUrl}${blogMarkdownPath})`,
  ...publicProjects.map(
    (project) => `- [${project.title} Markdown](${siteUrl}${projectMarkdownPath(project.slug)})`,
  ),
  ...publicArticles.map(
    (article) => `- [${article.title} Markdown](${siteUrl}${articleMarkdownPath(article.slug)})`,
  ),
].join('\n')}

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
  projects: publicProjects.map((project) => ({
    ...project,
    url: projectUrl(project.slug),
    markdown_url: `${siteUrl}${projectMarkdownPath(project.slug)}`,
  })),
  articles: publicArticles.map((article) => ({
    ...article,
    url: articleUrl(article.slug),
    markdown_url: `${siteUrl}${articleMarkdownPath(article.slug)}`,
  })),
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
