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
    chosenChat: {},
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
    getchosenChat(state) {
      return state.chosenChat;
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
    async setChosenChat(state, chatUid) {
      let chosenChat = {};
      for (let chat of state.chats) {
        if (chat.uid === chatUid) {
          chosenChat = chat;
          break;
        }
      }
      if (chosenChat === {}) {
        chosenChat = state.chats[0];
      }
      chosenChat.usersInfo = {};
      for (const userUid of chosenChat.users) {
        const result = await userCollection.doc(userUid).get();
        const foundUser = { ...result.data() };
        chosenChat.usersInfo[userUid] = {
          name: foundUser.fname + " " + foundUser.lname,
          photoUrl: foundUser.photoUrl,
        };
      }
      state.chosenChat = chosenChat;
    },
  },
  actions: {
    async loginEmail({ dispatch }, form) {
      const { user } = await auth
        .signInWithEmailAndPassword(form.email, form.password)
        .catch((e) => console.error(e));
      dispatch("fetchUser", user);
      router.push("/contacts");
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
        photoUrl: "user.webp",
      });

      // fetch user profile and set in state
      dispatch("fetchUser", user);
      router.push("/contacts");
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
            chats.push({ ...chat.data(), uid: chat.id });
          });
          commit("setChats", chats);
        });
    },
    async fetchMessagesByChatUid({ commit }, chatUid) {
      let messages = [];
      await chatCollection
        .doc(chatUid)
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot((querySnap) => {
          messages = querySnap.docs.map((msg) => {
            return { ...msg.data(), uid: msg.id };
          });
          commit("setMessages", messages);
          commit("setChosenChat", chatUid);
        });
    },
    sendMessage({ state }, message) {
      chatCollection
        .doc(state.chosenChat.uid)
        .collection("messages")
        .add(message);
    },
  },
});
