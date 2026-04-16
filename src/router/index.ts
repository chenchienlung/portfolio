import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHistory(''),
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'project') return { top: 0 }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView,
    // },
    {
      path: '/project',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
