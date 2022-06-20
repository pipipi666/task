<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "login-container",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.container {
  background-color: #fff;
  box-shadow: 0px 0px 5px 3px $inner-shadow;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  height: 288px
}
</style>