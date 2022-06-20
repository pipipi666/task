<template>
  <default-button class="btn">
    <slot></slot>
  </default-button>
</template>

<script>
export default {
  name: "ok-button",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.btn {
  color: $text-color;
  background-color: $disabled-text;
  border: 1px solid $text-color;
  cursor: pointer;
  &:hover {
    background-color: #e1e1e1;
  }
  &:active {
    background-color: #cfcfcf;
  }
}
</style>