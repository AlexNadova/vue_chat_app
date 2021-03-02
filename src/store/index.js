import Vue from "vue";
import Vuex from "vuex";
import { auth, userCollection } from "../firebase";
import firebase from "firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async loginEmail({ dispatch }, form) {
      const { user } = await auth
        .signInWithEmailAndPassword(form.email, form.password)
        .catch((e) => console.error(e));
      dispatch("getUser", user);
    },
    async loginGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
      auth
        .getRedirectResult()
        .then((result) => {
          dispatch("getUser", result);
        })
        .catch((error) => console.error(error));
    },
    async getUser({ commit }, userInfo) {
      const user = await userCollection
        .doc(userInfo.uid)
        .get()
        .catch((e) => console.error(e));
      commit("setUser", user.data());
      //change route to chat
      router.push("/");
    },
    async register({ dispatch }, form) {
      const { user } = await auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .catch((err) => console.error(err));
      await userCollection.doc(user.uid).set({
        fname: form.fname,
        lname: form.lname,
        address: form.address,
        county: form.country,
        city: form.city,
      });

      // fetch user profile and set in state
      dispatch("getUser", user);
    },
  },
});
