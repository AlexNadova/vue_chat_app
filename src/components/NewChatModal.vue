<template>
  <div class="modal">
    <div class="modal__bg" @click="changeModalVisibility(false)"></div>
    <div class="modal__container">
      <div class="modal__line">
        <span @click="changeModalVisibility(false)">X</span>
        <ul class="modal__list modal__chosen-contacts">
          <h2 class="modal__list-title">Chosen contacts</h2>
          <li
            v-for="(contact, index) in chosenContacts"
            :key="contact.uid"
            @click="removeContact(contact, index)"
          >
            {{ contact.fname }} {{ contact.lname }}
          </li>
        </ul>
        <ul class="modal__list modal__given-contacts">
          <h2 class="modal__list-title">Contacts</h2>
          <li
            v-for="(contact, index) in givenContacts"
            :key="contact.uid"
            @click="addContactToChat(contact, index)"
          >
            {{ contact.fname }} {{ contact.lname }}
          </li>
        </ul>
        <button
          class="modal__confirm-btn"
          @click="createGroupChat"
          :disabled="chosenContacts.length === 0"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "NewChatModal",
  props: {
    firstContact: Object,
    contacts: Array,
  },
  data() {
    return {
      chosenContacts: [{ ...this.firstContact }],
      givenContacts: Vue.util.extend([], this.contacts),
    };
  },
  methods: {
    addContactToChat(contact, index) {
      this.chosenContacts.push(contact);
      this.givenContacts.splice(index, 1);
    },
    removeContact(contact, index) {
      this.givenContacts.push(contact);
      this.chosenContacts.splice(index, 1);
    },
    createGroupChat() {
      this.$store.dispatch("createGroupChat", this.chosenContacts);
    },
    changeModalVisibility(visibility) {
      this.$emit("changeModalVisibility", visibility);
    },
  },
};
</script>

<style lang="less">
.modal {
  position: absolute;
  height: 100%;
  width: 100%;
  &__bg {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  &__container {
    display: block;
    max-width: 500px;
    width: 90%;
    min-height: 300px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: absolute;
    top: 10%;
    left: calc(50% - 250px);
  }
  &__line {
    padding: 15px 10px;
    & > span {
      float: right;
    }
  }
  &__chosen-contacts {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    padding: 0 0 10px 0;
  }
  &__given-contacts {
    padding: 0;
  }
  &__list {
    list-style: none;
    margin: 0;
    & > h2 {
      margin: 10px 0 20px;
      font-size: 22px;
      font-weight: 300;
      text-align: center;
    }
    & > li {
      border: 1px solid #ccc;
      border-radius: 5px;
      display: inline-block;
      padding: 4px 8px;
      cursor: pointer;
      &:hover {
        background-color: #ededed;
      }
    }
  }
  &__confirm-btn {
    max-width: 150px;
    width: 100%;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: transparent;
    position: absolute;
    bottom: 10px;
    left: calc(50% - 75px);
  }
}
</style>
