<template>
  <header>
    <header>
      <h1>{{ title }}</h1>
      <router-link to="/contacts">Contacts</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link
        v-if="chat"
        :to="{ name: 'ChatView', params: { chatUid: chat.uid } }"
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
    chat: Object,
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
  justify-content: space-between;
  z-index: 99;
  padding: 10px;
  box-sizing: border-box;
}
</style>
