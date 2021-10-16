import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
