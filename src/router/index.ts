import { createRouter, createWebHistory } from 'vue-router'
// 首頁 eager import(LCP 路由,訪客最常進來的入口)
import HomeView from '../views/HomeView.vue'
// 其他 view 用 lazy load,訪問該路由才下載對應 JS chunk
import { setPageTitle } from '@/utils/pageTitle'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/views/ProjectView.vue'),
      meta: { title: '作品' },
    },
    {
      path: '/portfolio/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/ArticleView.vue'),
      meta: { title: '文章' },
    },
    {
      path: '/blog/:slug',
      name: 'article',
      component: () => import('@/views/ArticleDetailView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '找不到頁面' },
    },
  ],
})

router.afterEach((to) => {
  // 詳情頁等資料載入後再由 view 設定 title
  if (to.name === 'project-detail' || to.name === 'article') return
  setPageTitle(to.meta.title)
})

export default router
