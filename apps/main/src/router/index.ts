import { createRouter, RouteRecordRaw, createWebHistory } from "modules/vue-router";
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/micro-child:page*',
    name: 'child',
    meta: {
      title: 'home',
      layout: true
    },
    component: () => import('../pages/child.vue')
  },
  {
    path: "/",
    name: "Home",
    meta: {
      title: '主应用 首页',
      layout: true
    },
    component: () => import('../pages/home.vue')
  },
  {
    path: "/welcome",
    name: "welcome",
    meta: {
      title: '主应用 welcome',
      layout: true
    },
    component: () => import('../pages/welcome.vue')

  },
  {
    path: '/403',
    component: () => import('../pages/403.vue')

  }
];

const router = createRouter({
  // 设置主应用基础路由为main-vite(用于后续部署)，则子应用基础路由(baseroute)为/main-vite/xxx
  history: createWebHistory('/v2'),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
