<template>
  <container-wrapper>
    <div class="card__header">
      <h1>Задачи</h1>
      <div class="card__header__buttons">
        <primary-button
          ><router-link to="/create"
            >Добавить задачу</router-link
          ></primary-button
        >
      </div>
    </div>
    <form-container>
      <div class="filter">
        <select-checkbox
          :params="typeArr"
          str="Выберите тип"
          :valueOption="type"
          @onChange="changeType"
          :width="100"
        />
        <primary-input
          placeholder="Название задачи"
          class="query"
          @update="changeQuery"
        ></primary-input>
        <select-checkbox
          :params="userss"
          str="Выберите пользователя"
          :valueOption="assignedUsers"
          @onChange="changeAssignedUser"
          :width="170"
        />
        <select-checkbox
          :params="statusArr"
          str="Выберите статус"
          :valueOption="status"
          @onChange="changeStatus"
          :width="150"
        />
        <select-checkbox
          :params="priorityArr"
          str="Выберите приоритет"
          :valueOption="priority"
          @onChange="changePriority"
          :width="150"
        />
        <primary-button @click="confirmFilter">Применить</primary-button>
      </div>
      <div class="table__wrapper main__table__wrapper">
        <task-table :tasks="getPaginationTasks" :users="getUsers"></task-table>
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
import TaskTable from "@/components/TaskTable.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import PrimaryButton from "@/components/UI/PrimaryButton.vue";
import PrimaryInput from "@/components/UI/PrimaryInput.vue";
import PaginationItems from "@/components/UI/PaginationItems.vue";
import SelectCheckbox from "@/components/UI/SelectCheckbox.vue";
export default {
  data() {
    return {
      typeArr: [
        { title: "Задача", value: "task" },
        { title: "Ошибка", value: "bug" },
      ],
      priorityArr: [
        { title: "Низкий", value: "low" },
        { title: "Средний", value: "medium" },
        { title: "Высокий", value: "high" },
      ],
      statusArr: [
        { title: "Сделано", value: "complete" },
        { title: "В работе", value: "inProgress" },
        { title: "На тестировании", value: "testing" },
        { title: "Открыто", value: "opened" },
      ],
    };
  },
  components: {
    TaskTable,
    PrimaryButton,
    PrimaryInput,
    PaginationItems,
    SelectCheckbox,
  },
  mounted() {
    this.fetchPaginationTasks();
    this.fetchUsers();
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks.tasks,
      users: (state) => state.users.users,
      page: (state) => state.tasks.page,
      limit: (state) => state.tasks.limit,
      total: (state) => state.tasks.totalPages,
      query: (state) => state.tasks.filter.query,
      status: (state) => state.tasks.filter.status,
      priority: (state) => state.tasks.filter.rank,
      type: (state) => state.tasks.filter.type,
      assignedUsers: (state) => state.tasks.filter.assignedUsers,
    }),
    ...mapGetters({
      getPaginationTasks: "tasks/getPaginationTasks",
      getUsers: "users/getUsers",
    }),
    userss() {
      return this.getUsers.map((x) => ({ title: x.username, value: x.id }));
    },
  },
  methods: {
    changeAssignedUser(e) {
      this.$store.commit('tasks/setFilterAssignedUsers', e);
    },
    ...mapActions({
      fetchPaginationTasks: "tasks/fetchPaginationTasks",
      fetchUsers: "users/fetchUsers",
    }),
    changePage(page) {
      this.fetchPaginationTasks(page);
    },
    changeType(e) {
      this.$store.commit('tasks/setFilterType', e);
    },
    changeStatus(e) {
      this.$store.commit('tasks/setFilterStatus', e);
    },
    changePriority(e) {
      this.$store.commit('tasks/setFilterRank', e);
    },
    changeQuery(e) {
      this.$store.commit('tasks/setFilterQuery', e);
    },
    confirmFilter() {
      this.fetchPaginationTasks()
    }
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
.card__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .card__header__buttons {
    display: flex;
    gap: 10px;
  }
}

a {
  text-decoration: none;
  color: #fff;
}

.filter {
  display: flex;
  gap: 14px;
  .type {
    width: 98px;
  }
  .user {
    width: 180px;
  }
  .rank,
  .status {
    width: 120px;
  }
  .query {
    width: 527px;
  }
}
</style>