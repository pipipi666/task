<template>
  <div class="__select" :data-state="showOptions ? 'active' : ''">
    <div
      :class="`__select__title ${valueOption.length > 0 && 'active'}`"
      :style="{ 'z-index': zTitle, 'max-width': width + 'px' }"
      @click="showOptions = !showOptions"
    >
      {{
        (valueOption.length > 0 &&
          valueOption
            .map((n) => params.find((x) => x.value === n).title)
            .join(", ")) ||
        `${str}`
      }}
    </div>
    <div class="__select__content" :style="{ 'z-index': zContent }">
      <div class="checkbox" v-for="x in params" :key="x.value">
        <input
          value="indigo"
          class="custom-checkbox"
          type="checkbox"
          :id="x.value"
        />
        <label
          :class="`checkbox-label ${
            valueOption.indexOf(x.value) > -1 ? 'active' : ''
          }`"
          :for="x.value"
          @click="changeOption(x.value)"
          >{{ x.title }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
      select_label: "__select__label",
      select_title: "__select__title",
      activeClass: "active",
    };
  },
  computed: {
    selectTitleActive() {
      return this.showOptions || (this.value && this.value.title)
        ? this.activeClass
        : "";
    },
  },
  props: {
    name: {
      type: String,
    },
    params: {
      type: Array,
    },
    str: {
      type: String,
    },
    valueOption: {
      type: String || Number,
    },
    zTitle: {
      type: Number,
      default: 2,
    },
    zContent: {
      type: Number,
      default: 1,
    },
    width: {
      type: Number
    }
  },
  methods: {
    changeOption(value) {
      const index = this.valueOption.indexOf(value);
      if (index === -1) {
        const newArr = [...this.valueOption, value];
        this.$emit("onChange", newArr);
        return
      }
      const newArr = [...this.valueOption];
      newArr.splice(index, 1);
      this.$emit("onChange", newArr);
    },
  },
};
</script>

<style lang="scss">
.__select {
  position: relative;
  max-width: 100%;
  height: 24px;
  box-sizing: border-box;
  &[data-state="active"] {
    .__select__title {
      &::before {
        transform: translate(-3px, -50%) rotate(-45deg);
        box-sizing: border-box;
      }
      &::after {
        transform: translate(3px, -50%) rotate(45deg);
        box-sizing: border-box;
      }
    }

    .__select__content {
      display: unset;
      opacity: 1;
      box-sizing: border-box;
    }

    .__select__label + .__select__input + .__select__label {
      max-height: 100px;
      border-top-width: 1px;
      box-sizing: border-box;
      font-size: 14px;
    }
  }
}
.__select__title {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  color: #cccccc;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 2px 1px #b5b5b5;
  border: 1px solid #ccc;
  cursor: pointer;
  &.active {
    color: black;
    border-color: #7b61ff;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    display: block;
    box-sizing: border-box;
    width: 10px;
    height: 2px;
    transition: all 0.2s ease-out;
    background-color: #b5b5b5;
    transform: translate(-3px, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(3px, -50%) rotate(-45deg);
    box-sizing: border-box;
  }

  &:active {
    border-color: #7b61ff;
    box-sizing: border-box;

    &::before,
    &::after {
      background-color: #b5b5b5;
      box-sizing: border-box;
    }
  }
}
.__select__content {
  display: none;
  position: absolute;
  top: -5px;
  padding-top: 34px;
  padding-bottom: 5px;
  left: -5px;
  flex-direction: column;
  width: calc(100% + 10px);
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #7b61ff;
  border-radius: 3px;
  box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
  transition: all 0.4s ease-out;
  opacity: 0;
  z-index: 1;
}
.__select__input {
  display: none;
  box-sizing: border-box;

  &:checked + label {
    background-color: #7b61ff;
    color: white;
    box-sizing: border-box;
  }
}
.__select__label {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 18px;
  padding: 0 5px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  overflow: hidden;
  font-size: 14px;
  &:hover {
    background-color: #e6e1ff;
    color: black;
  }
  &.active {
    background-color: #7b61ff;
    color: white;
    box-sizing: border-box;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

.custom-checkbox {
  position: absolute;
  z-index: -2;
  opacity: 0;
}

.custom-checkbox + label {
  align-items: center;
  user-select: none;
}

.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid black;
  border-radius: 6px;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center center;
}

.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #7b61ff;
}

.custom-checkbox:checked + label::before {
  background-image: url("../../img/Check.svg");
  background-size: cover;
  border-color: #7b61ff;
}

.checkbox {
  margin-bottom: 0.5em;
  font-size: 16px;
}
.checkbox-label {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 5px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  overflow: hidden;
  &.active {
    color: black;
  }
}
</style>