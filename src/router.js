import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
]

const base = import.meta.env.BASE_URL // Vite inyecta esto según config

export const router = createRouter({
  history: createWebHistory(base),
  routes,
})