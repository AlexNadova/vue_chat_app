import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCoW8P9UD-vCFWi37Ri0r6KeRNVug7ZyLY",
  authDomain: "chat-app-7777.firebaseapp.com",
  databaseURL: "https://chat-app-7777-default-rtdb.firebaseio.com",
  projectId: "chat-app-7777",
  storageBucket: "chat-app-7777.appspot.com",
  messagingSenderId: "772453656330",
  appId: "1:772453656330:web:6867165c54dd95713ebcf3",
};

firebase.initializeApp(firebaseConfig);
//to make sure app is only rendered after the firebase user has been loaded,
//as well as any time the auth state changes
firebase.auth().onAuthStateChanged(() =>
  new Vue({
    render: (h) => h(App),
  }).$mount("#app")
);
