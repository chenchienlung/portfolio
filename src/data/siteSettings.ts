import { reactive, readonly } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { DEFAULT_BANNER, DEFAULT_IMAGE } from '../utils/imageFallback'

interface SiteSettingRow {
  key: string
  value: string
}

const settings = reactive({
  default_image: DEFAULT_IMAGE,
  default_banner: DEFAULT_BANNER,
})

let loading: Promise<void> | null = null

export const siteSettings = readonly(settings)

export const loadSiteSettings = (): Promise<void> => {
  if (loading) return loading

  loading = (async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['default_image', 'default_banner'])

    if (error) throw error

    for (const setting of (data ?? []) as SiteSettingRow[]) {
      if (setting.key === 'default_image' && setting.value) {
        settings.default_image = setting.value
      }
      if (setting.key === 'default_banner' && setting.value) {
        settings.default_banner = setting.value
      }
    }
  })().catch((error: unknown) => {
    console.warn('Site settings fetch failed, using local fallbacks:', error)
  })

  return loading
}
