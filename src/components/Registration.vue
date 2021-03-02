<template>
  <div class="registration-component">
    <form v-on:submit.prevent="register">
      <input
        type="text"
        name="email"
        placeholder="Email"
        v-model="signupForm.email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="signupForm.password"
      />
      <input
        type="text"
        name="fname"
        placeholder="First name"
        v-model="signupForm.fname"
      />
      <input
        type="text"
        name="lname"
        placeholder="Last name"
        v-model="signupForm.lname"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        v-model="signupForm.address"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        v-model="signupForm.city"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        v-model="signupForm.country"
      />
      <button>Register</button>
    </form>
    <p>
      Already have an account?
      <router-link to="/auth/login">Login in here!</router-link>
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      signupForm: {
        email: "alexandra7nadova@gmail.com",
        password: "password",
        fname: "Alex",
        lname: "Nadova",
        address: "SNP 340",
        country: "Slovakia",
        city: "Hran",
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        fname: this.signupForm.fname,
        lname: this.signupForm.lname,
        address: this.signupForm.address,
        country: this.signupForm.country,
        city: this.signupForm.city,
      });
      this.signupForm.email = "";
      this.signupForm.password = "";
      this.signupForm.fname = "";
      this.signupForm.lname = "";
      this.signupForm.address = "";
      this.signupForm.country = "";
      this.signupForm.city = "";
    },
  },
};
</script>
