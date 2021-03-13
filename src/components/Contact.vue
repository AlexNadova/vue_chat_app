<template>
  <div class="contact">
    <chat-header></chat-header>
    <div class="contact__info">
      <h1>{{ contact.fname }} {{ contact.lname }}</h1>
      <img :src="contact.photoUrl" />
      <p>{{ contact.address }}, {{ contact.city }}</p>
      <p>{{ contact.country }}</p>
      <button @click="goToChat(contact)">Go to chat</button>
      <button @click="changeModalVisibility(true)">Create group chat</button>
    </div>
    <div class="chat-list__container">
      <ul class="chat-list__list">
        <li
          v-for="(chat, index) in contact.chats"
          :key="index"
          class="chat-list__item"
        >
          <router-link
            :to="{ name: 'ChatView', params: { chatUid: chat.uid } }"
          >
            {{ chat.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader.vue";
export default {
  name: "Contact",
  props: {
    contact: Object,
  },
  components: {
    ChatHeader,
  },
  methods: {
    goToChat(contact) {
      this.$store.dispatch("createGroupChat", [contact]);
    },
    changeModalVisibility(visibility) {
      this.$emit("changeModalVisibility", visibility);
    },
  },
};
</script>

<style lang="less">
.contact {
  text-align: center;
  display: inline-block;
  width: -moz-available; /* For Mozzila */
  width: -webkit-fill-available; /* For Chrome */
  width: stretch;
  display: flex;
  &__info {
    width: -moz-available; /* For Mozzila */
    width: -webkit-fill-available; /* For Chrome */
    width: stretch;
    & > img {
      border-radius: 50%;
    }
  }
}
.chat-list {
  &__container {
    max-width: 350px;
    border-left: 1px solid #ccc;
    height: 100%;
  }
  &__list {
    list-style: none;
    padding: 0;
  }
  &__item {
    cursor: pointer;
    padding: 25px 40px;
    &:hover {
      background-color: #f5f5f5;
    }
    & > a {
      text-decoration: none;
      padding: 25px 40px;
    }
  }
}
</style>
