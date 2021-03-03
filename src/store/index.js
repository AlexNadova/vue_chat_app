import Vue from "vue";
import Vuex from "vuex";
import { auth, userCollection, chatCollection } from "../firebase";
import firebase from "firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    contacts: [],
    chats: [],
    messages: [],
    chatUid: "",
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getContacts(state) {
      return state.contacts;
    },
    getChats(state) {
      return state.chats;
    },
    getMessages(state) {
      return state.messages;
    },
    getChatUid(state) {
      return state.chatUid;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    setChatUid(state, chatUid) {
      state.chatUid = chatUid;
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
      commit("setUser", { ...user.data(), uid: userInfo.uid });
      //change route to chat
      router.push("/contacts");
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
        contacts = querySnap.docs.map((doc) => {
          return { ...doc.data(), uid: doc.id };
        });
        commit("setContacts", contacts);
      });
    },
    async fetchUsersChats({ commit }) {
      let chats = [];
      await chatCollection
        .where("users", "array-contains", auth.currentUser.uid)
        .get()
        .then((result) => {
          result.forEach((chat) => {
            chats.push({ ...chat.data(), chatUid: chat.id });
          });
          commit("setChats", chats);
        });
    },
    async fetchChatByUid({ commit }, chatUid) {
      let messages = [];
      commit("setChatUid", chatUid);
      await chatCollection
        .doc(chatUid)
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot((querySnap) => {
          messages = querySnap.docs.map((msg) => {
            return { ...msg.data(), uid: msg.id };
          });
          commit("setMessages", messages);
        });
    },
    sendMessage({ state }, message) {
      chatCollection
        .doc(state.chatUid)
        .collection("messages")
        .add(message);
    },
  },
});
