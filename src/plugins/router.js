import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tags/',
      name: 'tags',
      component: () => import('@/views/TagView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tags/:tag',
      name: 'tag',
      component: () => import('@/views/TagView.vue'),
      meta: {
        requiresAuth: true
      }
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuth()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authStore.isLoggedIn === undefined) {
      await authStore.update()
    }
    if (!authStore.isLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router