import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    name: 'Home',
    meta: { title: '測試頁面' } // 沒有特別寫 meta.layout，App.vue 就會自動給它 DefaultLayout
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    name: 'LoginPage',
    meta: {
      title: '登入',
      layout: 'BlankLayout' // 宣告這個頁面使用 BlankLayout
    }
  },
  {
    path: '/forbidden',
    component: () => import('@/views/ForbiddenView.vue'),
    name: 'Forbidden',
    meta: { title: '權限不足', layout: 'BlankLayout' }
  },
  { path: '/:notFound(.*)', redirect: '/' }
];

export default routes;
