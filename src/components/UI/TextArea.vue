<template>
  <textarea
    :value="modelValue"
    @input="updateInput"
    class="form__item"
  ></textarea>
</template>

<script>
export default {
  name: "text-area",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
textarea {
  resize: none;
}
::placeholder {
  color: #ccc;
}
.form__item {
  box-shadow: inset 0px 0px 2px 1px #b5b5b5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  height: 100%;
}
.form__item:hover {
  border-color: $primary;
}
.form__item:focus {
  box-shadow: 0px 0px 2px 2px $primary;
  outline: $primary;
}
</style>