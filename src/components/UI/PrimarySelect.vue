<template>
  <select :value="modelValue" @change="updateSelect" class="form__item">
    <option value="" disabled selected>
      {{ placeholder }}
    </option>
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: "primary-select",
  props: {
    modelValue: [String, Number],
    placeholder: String,
  },
  methods: {
    updateSelect(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.form__item {
  box-shadow: inset 0px 0px 2px 1px #b5b5b5;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 24px;
  padding: 0 10px;
  font-size: 14px;
}

.form__item:hover {
  border-color: $primary;
}

.form__item:focus {
  box-shadow: 0px 0px 2px 2px $primary;
  outline: $primary;
}
</style>