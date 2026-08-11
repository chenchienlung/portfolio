export const DEFAULT_IMAGE = '/default_img.webp'
export const DEFAULT_BANNER = '/default_banner.webp'

export const handleImageError = (event: Event, fallback: string) => {
  const image = event.currentTarget as HTMLImageElement | null
  if (!image || image.src === fallback) return

  image.src = fallback
}
