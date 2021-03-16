<template>
  <div class="login-container">
    <form v-on:submit.prevent="emailLogin">
      <input
        type="text"
        name="email"
        placeholder="email"
        v-model="form.email"
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        v-model="form.password"
      />
      <button>Log in</button>
    </form>
    <button @click="googleLogin">Log in with Google</button>
    <p>
      Don't have an account?
      <router-link to="/auth/registration">Register here!</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    googleLogin() {
      this.$store.dispatch("loginGoogle");
    },
    emailLogin() {
      this.$store.dispatch("loginEmail", this.form);
    },
  },
};
</script>
