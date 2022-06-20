<template>
  <default-button class="btn">
    <slot></slot>
  </default-button>
</template>

<script>
export default {
  name: "success-button",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.btn {
  background-color: $success;
  border: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #80f0a6;
  }
  &:active {
    background-color: #4bd379;
  }
}
</style>