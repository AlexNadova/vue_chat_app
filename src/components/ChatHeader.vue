<template>
  <header>
    <header>
      <h1>{{ title }}</h1>
      <router-link to="/contacts">Contacts</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link
        v-if="chat"
        :to="{ name: 'ChatView', params: { chatUid: chat } }"
      >
        Chats
      </router-link>
      <router-link v-else :to="{ name: 'ChatView' }">
        Chats
      </router-link>
      <span @click="logout">Logout</span>
    </header>
  </header>
</template>

<script>
export default {
  name: "ChatHeader",
  props: {
    title: String,
    chat: String,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  height: 10vh;
  min-height: 50px;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 99;
  padding: 10px;
  box-sizing: border-box;
  & a,
  & span {
    text-decoration: none;
    cursor: pointer;
    padding: 5px 15px;
    &:hover {
      color: #0b93f6;
    }
  }
}
</style>
