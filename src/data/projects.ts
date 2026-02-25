export interface Project {
  id: string
  title: string
  description: string
  detail_description: string
  image: string
  tags: string[]
  content: string[]
  detail_img?: string[]
  website?: string
  github?: string
  figma?: string
}

export const projects: Project[] = [
  {
    id: '5',
    title: '個人作品集網站',
    description: '使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。',
    detail_description: '使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。',
    image: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    tags: ['UI/UX', 'Web Design'],
    content: ['使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    ],
    github: 'https://github.com/chenchienlung/portfolio',
  },
  {
    id: '4',
    title: 'WanTrip:國內旅遊訂房網站',
    description: '產業新尖兵專題，透過團隊合作了解網站開發流程。',
    detail_description: '產業新尖兵專題，透過團隊合作了解網站開發流程。',
    image: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    tags: ['網站開發', 'UI/UX', '團隊專案'],
    content: ['產業新尖兵專題，透過團隊合作了解網站開發流程。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    ],
    website: 'https://wantrip.store',
    github: 'https://github.com/WanTrip-2026/WanTrip.git',
  },
  {
    id: '3',
    title: 'App Redesign: 壽司郎App介面設計',
    description: '針對壽司郎App進行介面優化，提升使用者體驗，功能更明確。',
    detail_description: '針對壽司郎App進行介面優化，提升使用者體驗，功能更明確。',
    image: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    tags: ['UI/UX', 'Figma', 'Redesign'],
    content: ['針對壽司郎App進行介面優化，提升使用者體驗，功能更明確。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    ],
  },
  {
    id: '2',
    title: 'App Redesign: 財政部統一發票兌獎App介面設計',
    description: '針對財政部統一發票兌獎App進行介面優化，提升使用者體驗，減少操作步驟。',
    detail_description: '針對財政部統一發票兌獎App進行介面優化，提升使用者體驗，減少操作步驟。',
    image: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    tags: ['UI/UX', 'Figma', 'Redesign'],
    content: ['針對財政部統一發票兌獎App進行介面優化，提升使用者體驗，減少操作步驟。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    ],
  },
  {
    id: '1',
    title: 'App UI/UX Design: 運動賽事App介面設計',
    description: '針對運動賽事App進行介面設計。',
    detail_description: '針對運動賽事App進行介面設計。',
    image: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    tags: ['UI/UX', 'Figma'],
    content: ['針對運動賽事App進行介面設計。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
    ],
  },
]

export const getProjectById = (id: string) => {
  return projects.find((p) => p.id === id)
}
