import { supabase } from '../lib/supabaseClient'

export interface ExperienceLink {
  url: string
  text: string
  alt?: string
}

export interface Experience {
  date: string
  title: string
  description_before: string
  link?: ExperienceLink
  description_after?: string
}

export interface Resource {
  iconType: 'fa' | 'img'
  icon: string
  iconDark?: string
  prefix?: string
  text: string
  url?: string
}

export interface Contact {
  iconType: 'fa' | 'img'
  icon: string
  iconDark?: string
  label: string
  url: string
}

export interface Education {
  year: string
  description: string
}

export interface SkillIcon {
  src: string
  dark?: string
}

export type JobStatusColor = 'green' | 'blue' | 'rose' | 'gray'

export interface About {
  id: number
  location?: string
  job_status?: string
  job_status_color?: JobStatusColor
  contacts: Contact[]
  experiences: Experience[]
  resources: Resource[]
  educations: Education[]
  skill_icons: SkillIcon[]
  skill_texts: string[]
}

export const fetchAbout = async (): Promise<About> => {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .order('id', { ascending: true })
    .limit(1)
    .single()

  if (error) throw error
  return data as About
}
