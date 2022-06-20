<template>
  <div class="container" v-if="show">
    <div class="content">
      <div class="header">
        <h2>{{ title }}</h2>
      </div>
      <div class="main">
        <slot> </slot>
      </div>
      <div class="btns">
        <primary-button>
          <slot name="submit">Сохранить</slot>
        </primary-button>
        <ok-button @click="closeModal">Отмена</ok-button>
      </div>
    </div>
  </div>
</template>

<script>
import OkButton from "./OkButton.vue";
import PrimaryButton from "./PrimaryButton.vue";
export default {
  components: { PrimaryButton, OkButton },
  name: "dialog-form",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: String,
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.main {
  padding: 20px 30px;
}
.container {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background: rgba(181, 181, 181, 0.35);
  display: flex;
}
.content {
  background: #fff;
  width: 430px;
  border-radius: 5px;
  margin: auto;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  .header {
    height: 63px;
    border-bottom: 1px solid $inner-shadow;
    display: flex;
    h2 {
      font-weight: 400;
      font-size: 20px;
      margin: auto 30px;
      color: #000;
    }
  }
  .btns {
    height: 63px;
    border-top: 1px solid $inner-shadow;
    display: flex;
    align-items: center;
    padding: 0 30px;
    gap: 10px;
  }
}
</style>