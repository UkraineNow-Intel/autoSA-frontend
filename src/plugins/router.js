import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/tags/',
      name: 'tags',
      component: () => import('@/views/TagView.vue'),
    },
    {
      path: '/tags/:tag',
      name: 'tag',
      component: () => import('@/views/TagView.vue'),
    },
    {
      path: '/translator',
      name: 'translator',
      component: () => import('@/views/TranslatorView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
  linkActiveClass: 'active',
  linkActiveExactClass: 'active-exact',
});

export default router