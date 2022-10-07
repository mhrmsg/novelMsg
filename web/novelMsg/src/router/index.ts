import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  // {
  //   path:'/login',
  //   name: 'login',
  //   component: () => import('@/views/login/login.vue')
  // }
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
});

// 登录验证

export default router;
