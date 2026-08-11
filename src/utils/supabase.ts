export const isNotFoundError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false
  return 'code' in error && error.code === 'PGRST116'
}
