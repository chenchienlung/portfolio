import { supabase } from '../lib/supabaseClient'
import type { ThemeIcon } from '../types/icon'

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
  icon: ThemeIcon
  prefix?: string
  text: string
  url?: string
}

export interface Contact {
  icon: ThemeIcon
  label: string
  url: string
}

export interface Education {
  year: string
  description: string
}

export interface SkillIcon {
  type: 'fa' | 'img'
  light: string
  dark?: string
}

export interface SkillGroup {
  title: string
  icon: string
  items: string[]
  checklist?: string[]
}

export interface WorkPreference {
  label: string
  value: string
}

export interface DailyTool {
  name: string
  icon: ThemeIcon
}

export interface Stat {
  label: string
  value: string
}

export interface Learning {
  status: string
  description: string
  topics: string[]
}

export interface Capability {
  title: string
  description: string
}

export type JobStatusColor = 'green' | 'blue' | 'rose' | 'yellow' | 'purple' | 'neutral'

export interface About {
  id: number
  profile_name: string
  profile_title: string
  location?: string
  job_status?: string
  job_status_color?: JobStatusColor
  contacts: Contact[]
  experiences: Experience[]
  resources: Resource[]
  educations: Education[]
  skill_icons: SkillIcon[]
  skill_texts: string[]
  skill_groups: SkillGroup[]
  work_preferences?: WorkPreference[]
  daily_tools?: DailyTool[]
  stats?: Stat[]
  learning: Learning
  capabilities: Capability[]
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
