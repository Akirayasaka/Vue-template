import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/components/HelloWorld.vue'),
    name: 'HelloWorld',
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
    path: '/error',
    component: () => import('@/views/ErrorPage.vue'),
    name: 'ErrorPage',
    meta: { title: '權限不足' }
  },
  { path: '/:notFound(.*)', redirect: '/' }
];

export default routes;
