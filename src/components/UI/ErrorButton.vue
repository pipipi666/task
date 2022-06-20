<template>
  <default-button class="btn">
    <slot></slot>
  </default-button>
</template>

<script>
export default {
  name: "error-button",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.btn {
  background-color: $error;
  border: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ff8080;
  }
  &:active {
    background-color: #d65d5d;
  }
}
</style>