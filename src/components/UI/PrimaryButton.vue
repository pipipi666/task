<template>
  <default-button class="btn">
    <slot></slot>
  </default-button>
</template>

<script>
export default {
  name: "primary-button",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.btn {
  background-color: $primary;
  border: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #8a73ff;
  }
  &:active {
    background-color: #715be3;
  }
}
</style>