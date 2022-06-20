<template>
  <div class="pagination">
    <div class="pagination__buttons">
      <button
        :class="`${page > 0 ? 'cancel' : 'disabled'}__button`"
        @click="onChange(page - 1)"
      >
        Назад
      </button>
      <button
        v-for="num in pageNumbers"
        :key="num"
        :class="`page__num ${page + 1 === num ? 'active' : ''}`"
        @click="onChange(num - 1)"
      >
        {{ num }}
      </button>
      <button
        :class="`${
          page === Math.ceil(total / itemsPerPage - 1) || total === 0
            ? 'disabled'
            : 'cancel'
        }__button`"
        @click="onChange(page + 1)"
      >
        Вперёд
      </button>
    </div>
    <label
      >Показано {{ total === 0 ? 0 : firstItemNum + 1 }} -
      {{ lastItemNum > total ? total : lastItemNum }} из {{ total }}</label
    >
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
    },
    total: {
      type: Number,
    },
    itemsPerPage: {
      type: Number,
    },
  },
  methods: {
    onChange(page) {
      if (page < 0 || Math.ceil(this.total / this.itemsPerPage) <= page) return;
      this.$emit("onChange", page);
    },
  },
  computed: {
    firstItemNum() {
      return this.page * this.itemsPerPage;
    },
    lastItemNum() {
      return (this.page + 1) * this.itemsPerPage;
    },
    pageNumbers() {
      const arr = [];
      for (let i = 1; i <= Math.ceil(this.total / this.itemsPerPage); i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  // computed: {
  //   page() {
  //     return this.$store.state.tasks.page;
  //   },
  //   totalPages() {
  //     return this.$store.state.tasks.totalPages;
  //   },
  //   limit() {
  //     return this.$store.state.tasks.limit;
  //   },
  // },
};
</script>

<style lang="scss">
@import "@/style/variables";
.disabled__button {
  background-color: $inner-shadow;
  border: none;
  color: $label-text;
  cursor: not-allowed;
  &:hover {
    background-color: $inner-shadow;
  }
  &:active {
    background-color: $inner-shadow;
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
  .pagination__buttons {
    display: flex;
    gap: 5px;
    .page__num {
      width: 24px;
      padding: 0;
      border-radius: 5px;
      border: 1px solid #333333;
      color: black;
      cursor: pointer;
      &.active {
        border: none;
        background: #7b61ff;
        color: white;
      }
    }
    .cancel__button {
      cursor: pointer;
      padding: 2px 20px;
      text-decoration: none;
      height: 24px;
      text-align: center;
      color: black;
      background: #f4f4f4;
      border: 1px solid #333333;
      border-radius: 5px;
    }
    button {
      padding: 0 10px;
    }
  }
}
</style>