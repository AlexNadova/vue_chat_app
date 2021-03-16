<template>
  <div class="chat-list__container">
    <ul class="chat-list__list">
      <li v-for="(chat, index) in chats" :key="index" class="chat-list__item">
        <router-link :to="{ name: 'ChatView', params: { chatUid: chat.uid } }">
          <span v-if="chat.title">{{ chat.title }}</span>
          <span v-else>{{ chat.users[0] }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatsList",
  props: {
    chats: Array,
  },

};
</script>

<style lang="less">
.chat-list {
  &__container {
    max-width: 350px;
    border-right: 1px solid #ccc;
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
