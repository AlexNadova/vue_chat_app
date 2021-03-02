import Vue from "vue";
import Vuex from "vuex";
import { auth, userCollection } from "../firebase";
import firebase from "firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    contacts: [],
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getContacts(state) {
      return state.contacts;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
  },
  actions: {
    async loginEmail({ dispatch }, form) {
      const { user } = await auth
        .signInWithEmailAndPassword(form.email, form.password)
        .catch((e) => console.error(e));
      dispatch("fetchUser", user);
    },
    async loginGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
      auth
        .getRedirectResult()
        .then((result) => {
          dispatch("fetchUser", result);
        })
        .catch((error) => console.error(error));
    },
    async fetchUser({ commit }, userInfo) {
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
      dispatch("fetchUser", user);
    },
    async fetchContacts({ commit }) {
      let contacts = [];
      await userCollection.onSnapshot((querySnap) => {
        contacts = querySnap.docs.map((doc) => doc.data());
        commit("setContacts", contacts);
      });
    },
  },
});
