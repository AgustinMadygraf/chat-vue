/*
Path: src/router.ts
*/

import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
]

const base = import.meta.env.BASE_URL // Vite inyecta esto según config

export const router: Router = createRouter({
  history: createWebHistory(base),
  routes,
})
