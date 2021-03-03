import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { auth } from "./firebase";
import store from "./store/index";

Vue.config.productionTip = false;

//to make sure app is only rendered after the firebase user has been loaded,
//as well as any time the auth state changes
let app;
auth.onAuthStateChanged((user) => {
  if (!app)
    app = new Vue({ router, store, render: (h) => h(App) }).$mount("#app");
  if (user) {
    store.dispatch("fetchUser", user);
  }
});
