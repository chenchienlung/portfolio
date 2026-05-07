import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
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
      component: ProjectView,
      meta: { title: '作品' },
    },
    {
      path: '/portfolio/:slug',
      name: 'project-detail',
      component: ProjectDetailView,
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
  if (to.name === 'project-detail') return
  setPageTitle(to.meta.title)
})

export default router
