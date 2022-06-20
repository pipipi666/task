<template>
  <container-wrapper>
    <h1>Пользователи</h1>
    <form-container>
      <div class="table__wrapper main__table__wrapper">
      <user-table :users="paginationUsers"></user-table>
      </div>
      <pagination-items
        :itemsPerPage="limit"
        :page="page"
        :total="total"
        @onChange="changePage"
      />
    </form-container>
  </container-wrapper>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import PaginationItems from "@/components/UI/PaginationItems.vue";
export default {
  components: { UserTable, PaginationItems },
  data() {},
  methods: {
    ...mapActions({
      filtredPage: "users/filtredPage",
    }),
    changePage(page) {
      this.filtredPage(page);
      console.log(page);
    },
  },
  mounted() {
    this.filtredPage();
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      page: (state) => state.users.page,
      limit: (state) => state.users.limit,
      total: (state) => state.users.totalPages,
    }),
    ...mapGetters({
      getUsers: "users/getUsers",
      paginationUsers: "users/paginationUsers",
    }),
  },
};
</script>

<style lang="scss" scoped>
.table__wrapper {
  padding: 2px;
  box-shadow: inset 0px 0px 2px 1px #b5b5b5;
  border-radius: 5px;
  overflow: auto;
}

.main__table__wrapper {
  height: calc(100% - 44px);
}
</style>