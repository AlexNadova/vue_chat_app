<template>
  <div class="contact__container">
    <contacts-list
      :contacts="contacts"
      @changeContact="changeContact"
    ></contacts-list>
    <contact
      :contact="chosenContact"
      @changeModalVisibility="changeModalVisibility"
    ></contact>
    <new-chat-modal
      v-if="showModal"
      :firstContact="chosenContact"
      :contacts="groupChatUsers"
      @changeModalVisibility="changeModalVisibility"
    ></new-chat-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContactsList from "../components/ContactsList.vue";
import Contact from "../components/Contact.vue";
import NewChatModal from "../components/NewChatModal.vue";

export default {
  name: "ContactsView",
  components: {
    ContactsList,
    Contact,
    NewChatModal,
  },
  computed: {
    ...mapGetters({
      contacts: "getContacts",
      chosenContact: "getChosenContact",
    }),
    groupChatUsers() {
      const groupChatUsers = this.contacts.filter(
        (contact) => contact.uid !== this.chosenContact.uid
      );
      return groupChatUsers;
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    changeContact(index) {
      this.$store.dispatch("chooseContact", index);
    },
    changeModalVisibility(visible) {
      this.showModal = visible;
    },
  },
  created() {
    this.$store.dispatch("fetchContacts");
    this.$store.dispatch("chooseContact", 0);
  },
};
</script>

<style lang="less">
.contact__container {
  height: 100%;
  display: flex;
}
</style>
