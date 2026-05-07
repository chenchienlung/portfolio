export const BASE_TITLE = "Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站"

export const setPageTitle = (title?: string) => {
  document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE
}
