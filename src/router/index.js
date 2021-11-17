import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/field',
    name: 'Field',
    component: () => import('../views/Field.vue')
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: () => import('../views/Result.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
