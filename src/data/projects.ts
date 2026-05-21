import { supabase } from '../lib/supabaseClient'

export interface ImageTextBlock {
  image: string
  title?: string
  description: string
  imagePosition?: 'left' | 'right' // 預設為 'left'
}

export interface Deploy {
  title: string
  name: string
  image: string
}

export interface Project {
  id: number
  slug: string
  public: boolean
  title: string
  points: string[]
  skills?: string[]
  AI?: string[]
  description: string
  detail_description: string[]
  image: string
  banner: string
  tags: string[]
  content: string[]
  detail_img?: string[]
  detail_blocks?: ImageTextBlock[]
  development_blocks?: ImageTextBlock[]
  website?: string
  github?: string
  figma?: string
  figma_prototype?: string
  deploys?: Deploy[]
}

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('public', true)
    .order('id', { ascending: false })

  if (error) throw error
  return (data ?? []) as Project[]
}

export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('public', true)
    .single()

  if (error) throw error
  return data as Project
}

export const fetchProjectById = async (id: number): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('public', true)
    .single()

  if (error) throw error
  return data as Project | null
}
