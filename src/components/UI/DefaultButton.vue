<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "default-button",
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.btn {
  width: fit-content;
  padding: 2px 20px;
  border-radius: 5px;
  text-decoration: none;
  height: 24px;
  text-align: center;
  cursor: pointer;
}
</style>