import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import HomePage from '@/pages/HomePage.vue';

const DetailPage = defineAsyncComponent(() => import('@/pages/DetailPage.vue'));

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export { router };
