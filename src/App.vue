<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less">
body {
  background-color: #313131;
}
</style>
