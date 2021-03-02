<template>
  <div>
    <ul>
      <li v-for="(contact, index) in contacts" :key="index">
        {{ contact.fname }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ContactsView",
  computed: {
    ...mapGetters({ contacts: "getContacts" }),
  },
  mounted() {
    this.$store.dispatch("fetchContacts");
  },
};
</script>
