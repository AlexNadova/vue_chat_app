<template>
  <div class="contacts-list__container">
    <router-link to="/profile">Profile</router-link>
    <router-link to="/contacts">Contacts</router-link>
    <!-- <button @click="logout">Logout</button> -->
    <ul class="contacts-list__list">
      <li
        v-for="(contact, index) in contacts"
        :key="index"
        class="contacts-list__item"
        @click="changeContact(index)"
      >
        {{ contact.fname }} {{ contact.lname }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContactsList",
  props: {
    contacts: Array,
  },
  methods: {
    changeContact(index) {
      this.$emit("changeContact", index);
    },
  },
};
</script>

<style lang="less">
.contacts-list {
  &__container {
    // max-width: 350px;
    border-right: 1px solid #ccc;
    height: 100%;
  }
  &__list {
    list-style: none;
    padding: 0;
  }
  &__item {
    cursor: pointer;
    padding: 20px 40px;
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
