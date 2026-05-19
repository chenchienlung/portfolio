import { supabase } from '../lib/supabaseClient'

export type ArticleCategory = 'frontend' | 'ui-ux' | 'tools' | 'other'

export interface Article {
  id: number
  slug: string
  title: string
  subtitle?: string
  excerpt?: string
  cover_image?: string
  cover_image_wide?: string
  category?: ArticleCategory[]
  tags: string[]
  content?: string
  read_time?: number
  series?: string
  series_order?: number
  featured: boolean
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface ArticleListItem {
  id: number
  slug: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  category?: ArticleCategory[]
  tags: string[]
  read_time?: number
  series?: string
  series_order?: number
  featured: boolean
  date?: string
}

export const fetchArticles = async (): Promise<ArticleListItem[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select(
      `
      id,
      slug,
      title,
      subtitle,
      description:excerpt,
      image:cover_image,
      category,
      tags,
      read_time,
      series,
      series_order,
      featured,
      date:published_at
    `,
    )
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as unknown as ArticleListItem[]
}

export const fetchArticleBySlug = async (slug: string): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data as Article
}

export const fetchArticlesByCategory = async (
  category: ArticleCategory | ArticleCategory[],
): Promise<Article[]> => {
  const list = Array.isArray(category) ? category : [category]
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .overlaps('category', list)
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Article[]
}

export const fetchArticlesByTags = async (tags: string[]): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .contains('tags', tags)
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Article[]
}

export const fetchFeaturedArticles = async (limit = 3): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, slug, title, subtitle, excerpt, cover_image, category, tags, read_time, published_at',
    )
    .eq('published', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as Article[]
}
