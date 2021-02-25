<template>
  <div id="app">
    <chat v-if="user"></chat>
    <login v-else></login>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Chat from "./components/Chat.vue";
import firebase from "firebase";

export default {
  name: "App",
  components: {
    Login,
    Chat,
  },
  data() {
    return {
      user: firebase.auth().currentUser,
    };
  },
};
</script>

<style lang="less">
body {
  background-color: #313131;
}
</style>
