<template>
  <default-button class="btn">
    <slot></slot>
  </default-button>
</template>

<script>
export default {
  name: "disabled-button",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.btn {
  background-color: $inner-shadow;
  border: none;
  color: $label-text;
  &:hover {
    background-color: $inner-shadow;
  }
  &:active {
    background-color: $inner-shadow;
  }
}
</style>