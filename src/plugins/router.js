import { createRouter, createWebHistory } from 'vue-router'
import ResearchView from '@/views/ResearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ResearchView,
    },
    {
      path: "/translator",
      name: "translator",
      component: () => import("../views/TranslatorView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router