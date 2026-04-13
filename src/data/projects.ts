import { supabase } from '../lib/supabaseClient'

export interface ImageTextBlock {
  image: string
  title?: string
  description: string
  imagePosition?: 'left' | 'right' // 預設為 'left'
}

export interface Project {
  id: string
  title: string
  skills?: string[]
  description: string
  detail_description: string[]
  image: string
  banner: string
  tags: string[]
  content: string[]
  detail_img?: string[]
  detail_blocks?: ImageTextBlock[]
  website?: string
  github?: string
  figma?: string
  figma_prototype?: string
}

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw error
  return (data ?? []) as Project[]
}

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()

  if (error) throw error
  return data as Project | null
}
