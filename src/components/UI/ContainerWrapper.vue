<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "container-wrapper",
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1280px;
}
</style>