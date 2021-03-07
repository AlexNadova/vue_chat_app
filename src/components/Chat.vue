<template>
  <div class="wrapper">
    <section>
      <main>
        <chat-header :title="chatInfo.title"></chat-header>
        <div
          v-for="(msg, index) in messages"
          v-bind:key="'index-' + index"
          :class="['message', sentOrReceived(msg.userUid)]"
          :title="chatInfo.usersInfo[msg.userUid].name"
        >
          <img :src="chatInfo.usersInfo[msg.userUid].photoUrl" />
          <p>{{ msg.text }}</p>
        </div>
        <div ref="scrollable"></div>
      </main>
      <form v-on:submit.prevent="sendMessage">
        <input v-model="message" type="text" placeholder="type here..." />
        <button :disabled="!message">Send</button>
      </form>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChatHeader from "./ChatHeader.vue";

export default {
  name: "Chat",
  props: {
    messages: Array,
    chatInfo: Object,
  },
  components: {
    ChatHeader,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
  methods: {
    // logout() {
    //   firebase.auth().signOut();
    // },
    async sendMessage() {
      const messageInfo = {
        userUid: this.user.uid,
        text: this.message,
        createdAt: Date.now(),
      };
      this.$store.dispatch("sendMessage", messageInfo);
      this.message = "";
      this.$refs["scrollable"].scrollIntoView({ arg: { behavior: "smooth" } });
    },
    sentOrReceived(userUid) {
      return userUid === this.user.uid ? "sent" : "received";
    },
  },
};
</script>

<style lang="less">
.wrapper {
  text-align: center;
  width: -moz-available; /* For Mozzila */
  width: -webkit-fill-available; /* For Chrome */
  width: stretch;
  > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    > main {
      padding: 10px;
      height: 75vh;
      margin: 10vh 0 10vh;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar {
        width: 0.25rem;
      }
      &::-webkit-scrollbar-track {
        background: #1e1e24;
      }
      &::-webkit-scrollbar-thumb {
        background: #6649b8;
      }
    }
    > form {
      height: 60px;
      position: fixed;
      bottom: 0;
      display: flex;
      width: -moz-available; /* For Mozzila */
      width: -webkit-fill-available; /* For Chrome */
      width: stretch;
      padding: 20px 35px;
      > button {
        width: 10%;
        background-color: #0b93f6;
        background-color: #0b93f6;
        border: none;
        border-radius: 40px;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        font-size: 1.25rem;
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      > input {
        line-height: 1.5;
        width: 100%;
        background: #f3f3f3;
        border: 1px solid #ccc;
        border-radius: 40px;
        padding: 0 30px;
        margin-right: 15px;
        font-size: 20px;
        outline: none;
      }
    }
  }
  .message {
    display: flex;
    align-items: center;
    &.received {
      p {
        background: #e5e5ea;
        color: #000;
      }
    }
    &.sent {
      flex-direction: row-reverse;
      p {
        color: #fff;
        background: #0b93f6;
        align-self: flex-end;
      }
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 2px 5px;
    }
    p {
      max-width: 500px;
      margin-bottom: 12px;
      line-height: 24px;
      padding: 10px 20px;
      border-radius: 25px;
      position: relative;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
