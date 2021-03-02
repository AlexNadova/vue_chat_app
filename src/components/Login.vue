<template>
  <div class="login-component">
    <form v-on:submit.prevent="emailLogin">
      <input
        type="text"
        name="email"
        placeholder="email"
        v-model="form.email"
      />
      <input
        type="text"
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
// import firebase from "firebase";
// // import { auth } from "../firebase";
// import router from "../router/index";

export default {
  data() {
    return {
      form: {
        email: "alexandra7nadova@gmail.com",
        password: "password",
      },
    };
  },
  methods: {
    googleLogin() {
      this.$store.dispatch("loginGoogle");
      // const provider = new firebase.auth.GoogleAuthProvider();
      // firebase
      //   .auth()
      //   .signInWithRedirect(provider)
      //   .catch((err) => console.error(err));
    },
    emailLogin() {
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.form.email, this.form.password)
      //   .catch((err) => console.error(err));
      // this.form.email = "";
      // this.form.password = "";
      // router.push("/")
      this.$store.dispatch("loginEmail", this.form);
    },
  },
};
</script>

<style lang="less">
.login-container {
  width: 100%;
  text-align: center;
  padding-top: 50px;
  button {
    margin: 0 auto 10px;
    display: block;
    width: 90%;
    max-width: 310px;
    background-color: #4e37fc;
    color: white;
    font-weight: bold;
    font-size: 18pt;
    padding: 15px 25px;
    border-radius: 5px;
    border: none;
    box-shadow: #00000040 0px 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #7562ff;
    }
  }
  input {
    display: block;
    width: 90%;
    max-width: 300px;
    margin: 0 auto 10px;
    font-size: 15pt;
    padding: 15px 5px;
    border-radius: 5px;
    border: none;
  }
  p {
    color: white;
    a {
      color: white;
    }
  }
}
</style>
