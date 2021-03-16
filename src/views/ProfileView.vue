<template>
  <div class="profile__container">
    <chat-header></chat-header>
    <div class="profile__card">
      <h1>{{ user.fname }} {{ user.lname }}</h1>
      <img :src="user.photoUrl" />
      <p>{{ user.address }}, {{ user.city }}</p>
      <p>{{ user.country }}</p>
      <button @click="changeModalVisibility(true)">Edit</button>
      <button @click="deleteAccount">Delete account</button>
      <edit-profile-modal
        v-if="showModal"
        @changeModalVisibility="changeModalVisibility"
        :user="user"
      ></edit-profile-modal>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import EditProfileModal from "../components/EditProfileModal.vue";
import ChatHeader from "../components/ChatHeader.vue";
export default {
  name: "ProfileView",
  components: {
    EditProfileModal,
    ChatHeader,
  },
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
    },
    changeModalVisibility(visible) {
      this.showModal = visible;
    },
  },
};
</script>
<style lang="less">
.profile {
  &__container {
    height: 100%;
  }
  &__card {
    margin-top: 70px;
    text-align: center;
  }
}
</style>
