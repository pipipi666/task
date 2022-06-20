<template>
  <container-wrapper>
    <div class="card__header">
      <h1>Редактирование</h1>
      <div class="card__header__buttons">
        <primary-button @click="handleEdit(task)">Сохранить</primary-button>
        <ok-button @click="handleCancel">Отмена</ok-button>
      </div>
    </div>
    <form-container>
      <div class="container">
        <div class="input__container left">
          <div class="input">
            <label>Исполнитель</label>
            <select-input
              :params="getUsersList"
              name="Выберите пользователя"
              :value="assignedUser"
              @onChange="changeAssignedUser"
            />
          </div>
          <div class="input">
            <label>Тип запроса</label>
            <select-input
              :params="taskType"
              name="Выберите тип запроса"
              :value="type"
              @onChange="changeType"
            />
          </div>
          <div class="input">
            <label>Приоритет</label>
            <select-input
              :params="priorityType"
              name="Выберите ранк задачи"
              :value="priority"
              @onChange="changePriority"
            />
          </div>
        </div>
        <div class="input__container middle">
          <div class="input">
            <label>Название</label>
            <primary-input
              @update="fillTitle"
              :model-value="task.title"
            ></primary-input>
          </div>
          <div class="input area">
            <label>Описание</label>
            <text-area
              @update="fillDescription"
              :model-value="task.description"
            ></text-area>
          </div>
        </div>
      </div>
    </form-container>
  </container-wrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import SelectInput from "@/components/UI/SelectInput.vue";
import axios from "axios";
export default {
  components: { SelectInput },
  props: {
    id: String,
  },
  data() {
    return {
      dialogVisible: false,
      task: {},
      assignedUser: {},
      rank: "",
      title: "",
      description: "",
      status: "",
      priority: {},
      type: {},
      priorityType: [
        { title: "Низкий", value: "low" },
        { title: "Средний", value: "medium" },
        { title: "Высокий", value: "high" },
      ],
      taskType: [
        { title: "Задача", value: "task" },
        { title: "Ошибка", value: "bug" },
      ],
    };
  },
  methods: {
    ...mapActions({
      fetchUsers: "users/fetchUsers",
    }),
    changeAssignedUser(value) {
      this.assignedUser = value;
    },
    changePriority(value) {
      this.priority = value;
    },
    changeType(value) {
      this.type = value;
    },
    async fetchTask() {
      try {
        const response = await axios.get(
          "http://93.95.97.34/api/tasks/" + this.id
        );
        this.task = response.data;
        this.assignedUser =
          this.getUsersList.find((x) => x.value === response.data.assignedId) ||
          {};
        this.priority =
          this.priorityType.find((x) => x.value === response.data.rank) || {};
        this.type =
          this.taskType.find((x) => x.value === response.data.type) || {};
      } catch (e) {
        alert("Ошибка");
      }
    },
    async handleEdit(task) {
      await axios.put("http://93.95.97.34/api/tasks/createoredit", {
        id: task.id,
        userId: task.userId,
        assignedId: this.assignedUser.value,
        title: this.title || task.title,
        description: this.description || task.description,
        type: this.type.value,
        rank: this.priority.value,
        status: task.status,
      });
      this.$router.push("/");
    },
    fillDescription(e) {
      this.description = e;
    },
    fillTitle(e) {
      this.title = e;
    },
    handleCancel() {
      let check = confirm(
        "Вы уверены что хотите отменить изменения? Вы будете перенаправлены на главную страницу"
      );
      if (check) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchTask();
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
    ...mapGetters({
      getUsers: "users/getUsers",
      getUsersList: "users/getUsersList",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.area {
  height: 100%;
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
.left {
  width: 321px;
  border-right: 1px solid $inner-shadow;
  padding-right: 20px;
}
.middle {
  width: 421px;
  padding-left: 20px;
}
</style>