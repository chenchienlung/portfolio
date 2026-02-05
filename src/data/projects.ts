export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  content?: string
}

export const projects: Project[] = [
  {
    id: '5',
    title: '個人作品集網站',
    description: '使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。',
    image: 'https://picsum.photos/seed/portfolio/1200/400',
    tags: ['UI/UX', 'Web Design'],
  },
  {
    id: '4',
    title: 'WanTrip:國內旅遊訂房網站',
    description: '產業新尖兵專題，透過團隊合作了解網站開發流程。',
    image: 'https://picsum.photos/seed/shop/1200/400',
    tags: ['網站開發', 'UI/UX', '團隊專案'],
  },
  {
    id: '3',
    title: 'App Redesign: 壽司郎App介面設計',
    description: '針對壽司郎App進行介面優化，提升使用者體驗，功能更明確。',
    image: 'https://picsum.photos/seed/sushiro/1200/400',
    tags: ['UI/UX', 'Figma', 'Redesign'],
  },
  {
    id: '2',
    title: 'App Redesign: 財政部統一發票兌獎App介面設計',
    description: '針對財政部統一發票兌獎App進行介面優化，提升使用者體驗，減少操作步驟。',
    image: 'https://picsum.photos/seed/invoice/1200/400',
    tags: ['UI/UX', 'Figma', 'Redesign'],
  },
  {
    id: '1',
    title: 'App UI/UX Design: 運動賽事App介面設計',
    description: '針對運動賽事App進行介面設計。',
    image: 'https://picsum.photos/seed/sports/1200/400',
    tags: ['UI/UX', 'Figma'],
  },
]

export const getProjectById = (id: string) => {
  return projects.find((p) => p.id === id)
}
