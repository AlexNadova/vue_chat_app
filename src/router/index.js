import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/ch/:chatUid",
    name: "ChatView",
    component: () =>
      import(/* webpackChunkName: "chat" */ "../views/ChatView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth",
    component: () =>
      import(/* webpackChunkName: "authView" */ "../views/AuthView.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../components/Login.vue"),
      },
      {
        path: "registration",
        name: "Registration",
        component: () =>
          import(
            /* webpackChunkName: "registration" */ "../components/Registration.vue"
          ),
      },
    ],
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () =>
      import(/* webpackChunkName: "contacts" */ "../views/ContactsView.vue"),
    meta: {
      requiresAuth: true,
    },
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
