<template>
  <div class="chat__container">
    <chats-list :chats="usersChats"></chats-list>
    <chat :messages="messages" :chatInfo="chosenChat"></chat>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chat from "../components/Chat.vue";
import ChatsList from "../components/ChatsList.vue";
export default {
  name: "ChatView",
  components: {
    Chat,
    ChatsList,
  },
  computed: {
    ...mapGetters({
      usersChats: "getChats",
      messages: "getMessages",
      chosenChat: "getchosenChat",
    }),
  },
  watch: {
    $route() {
      this.$store.dispatch(
        "fetchMessagesByChatUid",
        this.$route.params.chatUid
      );
    },
  },
  created() {
    this.$store.dispatch("fetchUsersChats");
    this.$store.dispatch("fetchMessagesByChatUid", this.$route.params.chatUid);
  },
};
</script>

<style lang="less">
.chat {
  &__container {
    height: 100%;
    display: flex;
  }
}
</style>
