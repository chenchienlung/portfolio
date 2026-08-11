import { BASE_TITLE } from './pageTitle'

export const SITE_URL = 'https://chenchienlung.com'
export const DEFAULT_DESCRIPTION = '具備 UI/UX 設計思維的前端工程師；又或者是具備前端技術的 UI/UX 設計師。'
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.png`

type SeoOptions = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  structuredData?: Record<string, unknown>
}

const absoluteUrl = (value: string) =>
  /^https?:\/\//i.test(value) ? value : new URL(value, `${SITE_URL}/`).toString()

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

const setCanonical = (url: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

const setStructuredData = (data: Record<string, unknown>) => {
  let script = document.head.querySelector<HTMLScriptElement>('script[data-dynamic-seo="true"]')
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.dynamicSeo = 'true'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

const removeMeta = (attribute: 'name' | 'property', key: string) => {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

export const setSeoMetadata = (options: SeoOptions = {}) => {
  const title = options.title ? `${options.title} | ${BASE_TITLE}` : BASE_TITLE
  const description = options.description?.trim() || DEFAULT_DESCRIPTION
  const image = absoluteUrl(options.image || DEFAULT_SOCIAL_IMAGE)
  const url = absoluteUrl(options.url || window.location.pathname)

  document.title = title
  setMeta('name', 'description', description)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:image', image)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:type', options.type || 'website')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', image)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setCanonical(url)

  if (options.keywords?.length) setMeta('name', 'keywords', options.keywords.join(', '))
  else removeMeta('name', 'keywords')
  if (options.publishedTime) setMeta('property', 'article:published_time', options.publishedTime)
  else removeMeta('property', 'article:published_time')
  if (options.modifiedTime) setMeta('property', 'article:modified_time', options.modifiedTime)
  else removeMeta('property', 'article:modified_time')
  if (options.structuredData) setStructuredData(options.structuredData)
  else document.head.querySelector('script[data-dynamic-seo="true"]')?.remove()
}
