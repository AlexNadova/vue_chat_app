import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Chat",
    component: () =>
      import(/* webpackChunkName: "chat" */ "../components/Chat.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Login.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../components/Registration.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
