<template>
  <div v-if="show" class="modal">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-window",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  background: rgba(181, 181, 181, 0.35);
}
.modal__content {
  background: #fff;
  width: 430px;
}
</style>