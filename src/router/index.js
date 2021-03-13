import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/ch/:chatUid?",
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
          import(/* webpackChunkName: "authView" */ "../components/Login.vue"),
      },
      {
        path: "registration",
        name: "Registration",
        component: () =>
          import(
            /* webpackChunkName: "authView" */ "../components/Registration.vue"
          ),
      },
    ],
  },
  {
    path: "/contacts",
    name: "ContactsView",
    component: () =>
      import(/* webpackChunkName: "contactsView" */ "../views/ContactsView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: () =>
      import(/* webpackChunkName: "profileView" */ "../views/ProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "NotFoundView",
    component: () =>
      import(/* webpackChunkName: "notFoundView" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
