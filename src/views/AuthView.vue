<template>
  <div class="auth__container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AuthView",
};
</script>

<style lang="less">
.auth__container div {
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
