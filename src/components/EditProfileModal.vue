<template>
  <div class="modal">
    <div class="modal__bg" @click="changeModalVisibility(false)"></div>
    <div class="modal__container">
      <div class="modal__line">
        <span @click="changeModalVisibility(false)">X</span>
        <form v-on:submit.prevent="updateUser" class="modal__form">
          <div class="modal__input">
            <label for="fname">First name</label>
            <input type="text" name="fname" v-model="form.fname" />
          </div>
          <div class="modal__input">
            <label for="lname">Last name</label>
            <input type="text" name="fname" v-model="form.lname" />
          </div>
          <div class="modal__input">
            <label for="address">Address</label>
            <input type="text" name="fname" v-model="form.address" />
          </div>
          <div class="modal__input">
            <label for="city">City</label>
            <input type="text" name="fname" v-model="form.city" />
          </div>
          <div class="modal__input">
            <label for="country">Country</label>
            <input type="text" name="fname" v-model="form.country" />
          </div>
          <button class="modal__confirm-btn" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewChatModal",
  props: {
    user: Object,
  },
  data() {
    return {
      form: {
        fname: this.user.fname,
        lname: this.user.lname,
        address: this.user.address,
        country: this.user.country,
        city: this.user.city,
      },
    };
  },
  methods: {
    updateUser() {
      this.$store.dispatch("updateUser", this.form);
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
  top: 0;
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
  &__input {
    text-align: center;
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
