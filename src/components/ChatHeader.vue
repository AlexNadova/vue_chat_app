<template>
  <header>
    <header>
      <h1>{{ title }}</h1>
    </header>
  </header>
</template>

<script>
export default {
  name: "ChatHeader",
  props: {
    title: String,
  },
};
</script>

<style lang="less" scoped>
header {
  height: 10vh;
  min-height: 50px;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  padding: 10px;
  box-sizing: border-box;
}
</style>
