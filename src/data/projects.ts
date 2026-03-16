export interface Project {
  id: string
  title: string
  description: string
  detail_description: string
  image: string
  banner: string
  tags: string[]
  content: string[]
  detail_img?: string[]
  website?: string
  github?: string
  figma?: string
  figma_prototype?: string
}

export const projects: Project[] = [
  // {
  //   id: '5',
  //   title: '個人作品集網站',
  //   description: '使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。',
  //   detail_description: '使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。',
  //   image: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
  //   banner:
  //     'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
  //   tags: ['UI/UX', 'Web Design'],
  //   content: ['使用 Vue 3 + Tailwind CSS 開發的個人作品集展示平台。'],
  //   detail_img: [
  //     'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
  //     'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1772008378/default_cover_cbtwal.png',
  //   ],
  //   github: 'https://github.com/chenchienlung/portfolio',
  // },
  {
    id: '4',
    title: 'WanTrip:國內旅遊訂房網站',
    description: '產業新尖兵專題，透過團隊合作了解網站開發流程。',
    detail_description: '產業新尖兵專題，透過團隊合作了解網站開發流程。',
    image:
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773390069/project_4_cover_hcj5l9.png',
    banner: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773649811/4_banner_n4uz0w.png',
    tags: ['網站開發', 'UI/UX', '團隊專案'],
    content: [
      '產業新尖兵專題，透過團隊合作了解網站開發流程。',
      '開發前期使用Figma設計網站介面。',
      '響應式網頁設計。',
      '前端與後端分別部署在AWS EC2、Render上。',
      '使用Node.js + Express 開發後端。',
      '使用Vue 3 + Tailwind CSS 開發前端。',
      '使用Supabase製作後端資料庫、圖片儲存於Cloudinary。',
      '利用Git進行版本控制。',
      '串接綠界金流與LINE Pay Sandbox模擬結帳流程。',
    ],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647057/4_01_sh5wrm.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647058/4_02_ipdzgs.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647057/4_03_exozyb.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647058/4_04_mdqyya.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647058/4_05_xvwtvt.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647058/4_06_qi3sue.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647057/4_07_qcgaxq.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647058/4_08_aji9zz.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647059/4_09_zincx7.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647059/4_10_uncidg.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773647059/4_11_drecpu.png',
    ],
    website: 'https://wantrip.store',
    github: 'https://github.com/WanTrip-2026/WanTrip.git',
  },
  {
    id: '3',
    title: 'App Redesign: 壽司郎App介面設計',
    description: '針對壽司郎App進行介面現代化，提升使用者體驗，功能更明確。',
    detail_description: '針對壽司郎App進行介面現代化，提升使用者體驗，功能更明確。',
    image:
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773390069/project_3_cover_qznacv.png',
    banner: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773649809/3_banner_aa1hvc.png',
    tags: ['UI/UX', 'Figma', 'Redesign'],
    content: ['重新設計App介面。', 'Prototype操作流程。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645872/3_01_kibcgl.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645875/3_02_z6jtys.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645878/3_03_wpwjhe.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645881/3_04_azpfsm.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645884/3_05_gy8txm.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645887/3_06_hvd0br.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645889/3_07_lu8rtn.png',
    ],
    figma:
      'https://www.figma.com/design/mUsC1REpcfLAdgEy7rui65/Redesign---Sushiro-Taiwan-App?node-id=99-2282&t=vMtzUeNrkm5hmy5f-1',
    figma_prototype:
      'https://www.figma.com/proto/mUsC1REpcfLAdgEy7rui65/Redesign---Sushiro-Taiwan-App?node-id=0-1&t=vMtzUeNrkm5hmy5f-1',
  },
  {
    id: '2',
    title: 'App Redesign: 財政部統一發票兌獎App介面設計',
    description:
      '針對財政部統一發票兌獎App介面修改成現代化的介面排版，提升使用者體驗，減少操作步驟。',
    detail_description:
      '針對財政部統一發票兌獎App介面修改成現代化的介面排版，提升使用者體驗，減少操作步驟。',
    image:
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773390069/project_2_cover_gezkxf.png',
    banner: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773649808/2_banner_soznu7.png',
    tags: ['UI/UX', 'Figma', 'Redesign'],
    content: ['重新設計App介面。', 'Prototype操作流程。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645852/2_01_wvwior.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645854/2_02_qisnuq.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645857/2_03_uzakqd.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645860/2_04_qqxqpm.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645863/2_05_dlteyn.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645866/2_06_ynfodk.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645868/2_07_gq8lpc.png',
    ],
    figma:
      'https://www.figma.com/design/VE9WDBfWeYBbR1667UwesZ/Redesign---%E8%B2%A1%E6%94%BF%E9%83%A8%E7%B5%B1%E4%B8%80%E7%99%BC%E7%A5%A8%E5%85%8C%E7%8D%8EApp?node-id=1-2&t=OMcazGikvgnE8o9U-1',
    figma_prototype:
      'https://www.figma.com/proto/VE9WDBfWeYBbR1667UwesZ/Redesign---%E8%B2%A1%E6%94%BF%E9%83%A8%E7%B5%B1%E4%B8%80%E7%99%BC%E7%A5%A8%E5%85%8C%E7%8D%8EApp?node-id=1-2&t=OMcazGikvgnE8o9U-1',
  },
  {
    id: '1',
    title: 'App UI/UX Design: 運動賽事App介面設計',
    description: '針對運動賽事App進行介面設計。',
    detail_description: '針對運動賽事App進行介面設計。',
    image:
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773390068/project_1_cover_urtj8l.png',
    banner: 'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773649807/1_banner_b5sfim.png',
    tags: ['UI/UX', 'Figma'],
    content: ['針對運動賽事App進行介面設計。'],
    detail_img: [
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645777/1_01_r9obom.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645778/1_02_isvlvm.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645779/1_03_wpefnp.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645781/1_04_qnyvgd.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645785/1_05_rnncgw.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645787/1_06_p7opa1.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645789/1_07_mo94hp.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645791/1_08_pyeqx3.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645792/1_09_cgdmmq.png',
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1773645794/1_10_oyhcec.png',
    ],
    figma:
      'https://www.figma.com/design/nkNNgBLaTXLASpb6w3R6a6/%E5%8F%B0%E7%81%A3%E7%B1%83%E7%90%83%E8%81%AF%E8%B3%BD-app%E8%A8%AD%E8%A8%88?node-id=0-1&t=GUn6wf5Pgiy50Qff-1',
    figma_prototype:
      'https://www.figma.com/proto/nkNNgBLaTXLASpb6w3R6a6/%E5%8F%B0%E7%81%A3%E7%B1%83%E7%90%83%E8%81%AF%E8%B3%BD-app%E8%A8%AD%E8%A8%88?page-id=1%3A2&node-id=6-1398&p=f&viewport=1989%2C1348%2C0.35&t=KjjaE7RcUeosP3no-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=113%3A16901',
  },
]

export const getProjectById = (id: string) => {
  return projects.find((p) => p.id === id)
}
