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
    chosenContact: {},
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
    getChosenContact(state) {
      return state.chosenContact;
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
    setChosenContact(state, contact) {
      state.chosenContact = contact;
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    async setChosenChat(state, chosenChat) {
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
      auth.signInWithPopup(provider).then(async (result) => {
        const user = await userCollection
          .doc(result.user.uid)
          .get()
          .catch((e) => console.error(e));
        if (!user.data()) {
          const displayName = result.user.displayName;
          await userCollection.doc(result.user.uid).set({
            fname: displayName.substring(0, displayName.indexOf(" ") + 1),
            lname: displayName.substring(displayName.indexOf(" ") + 1),
            photoUrl: result.user.photoURL,
          });
          dispatch("fetchUser", result.user);
        }
        router.push("/contacts");
      });
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
        country: form.country,
        city: form.city,
        photoUrl: "user.webp",
      });

      // fetch user profile and set in state
      dispatch("fetchUser", user);
      router.push("/contacts");
    },
    logout() {
      auth.signOut();
      router.push("/auth/login");
    },
    async fetchContacts({ commit }) {
      let contacts = [];
      await userCollection.get().then((result) => {
        result.forEach((user) => {
          if (user.id !== auth.currentUser.uid)
            contacts.push({ uid: user.id, ...user.data() });
        });
        commit("setContacts", contacts);
      });
    },
    async chooseContact({ state, dispatch, commit }, index) {
      await dispatch("fetchUsersChats");
      let contact = state.contacts[index];
      const chats = state.chats;
      let chatsWithContact = [];
      for (let chat of chats) {
        for (let user of chat.users) {
          if (user === contact.uid) {
            chatsWithContact.push(chat);
            break;
          }
        }
      }
      contact.chats = chatsWithContact;
      commit("setChosenContact", contact);
    },
    async createGroupChat({ state }, contacts) {
      let newChat = {};
      if (contacts.length === 1) {
        let chatFound = false;
        for (let chat of contacts[0].chats) {
          if (chat.users.length === 2) {
            router.push("/ch/" + chat.uid);
            chatFound = true;
            break;
          }
        }
        if (!chatFound) {
          newChat = await chatCollection.add({
            title: "Private chat: " + contacts[0].fname,
            users: [auth.currentUser.uid, contacts[0].uid],
          });
          router.push("/ch/" + newChat.id);
        }
      } else if (contacts.length > 1) {
        let users = [state.user.fname];
        let contactsUids = [auth.currentUser.uid];
        for (let contact of contacts) {
          users.push(contact.fname);
          contactsUids.push(contact.uid);
        }
        const title = users.join(", ");
        newChat = await chatCollection.add({
          title: title,
          users: contactsUids,
        });
        router.push("/ch/" + newChat.id);
      }
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
        .onSnapshot(async (querySnap) => {
          messages = querySnap.docs.map((msg) => {
            return { ...msg.data(), uid: msg.id };
          });
          commit("setMessages", messages);
        });
    },
    async chooseChat({ commit, dispatch }, chatUid) {
      const fetchChat = await chatCollection.doc(chatUid).get();
      const chosenChat = { uid: fetchChat.id, ...fetchChat.data() };
      chosenChat.usersInfo = {};
      for (const userUid of chosenChat.users) {
        const result = await userCollection.doc(userUid).get();
        const foundUser = { ...result.data() };
        chosenChat.usersInfo[userUid] = {
          name: foundUser.fname + " " + foundUser.lname,
          photoUrl: foundUser.photoUrl,
        };
      }
      commit("setChosenChat", chosenChat);
      dispatch("fetchMessagesByChatUid", chatUid);
    },
    sendMessage({ state }, message) {
      chatCollection
        .doc(state.chosenChat.uid)
        .collection("messages")
        .add(message);
    },
    deleteAccount() {
      const user = auth.currentUser;
      userCollection
        .doc(user.uid)
        .delete()
        .then(() => {
          user.delete().then(router.push("/auth/login"));
        });
    },
    async updateUser({ commit }, form) {
      await userCollection
        .doc(auth.currentUser.uid)
        .update({
          fname: form.fname,
          lname: form.lname,
          address: form.address,
          city: form.city,
          country: form.country,
        })
        .then(commit("setUser", form));
    },
  },
});
