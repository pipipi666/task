<template>
  <dialog-form :show="showModal" title="Редактирование пользователя" @closeModal="closeModal">
    <template v-slot:submit>
      <div class="button__holder" @click="editProfile">Добавить</div>
    </template>
    <slot>
      <div class="modal__container">
        <div class="input">
          <label>Имя пользователя время</label>
          <primary-input
            :model-value="username"
            @update="fillUsername"
          ></primary-input>
        </div>
        <div class="input">
          <label>URL фотографии</label>
          <primary-input :model-value="url" @update="fillURL"></primary-input>
        </div>
        <div class="input">
          <label>О себе</label>
          <text-area :model-value="about" @update="fillAbout"></text-area>
        </div></div
    ></slot>
  </dialog-form>
  <container-wrapper>
    <div class="card__header">
      <h1>Редактирование</h1>
      <div class="card__header__buttons">
        <primary-button
          @click="openModal"
          v-if="$route.params.id === userData().id"
          >Редактировать</primary-button
        >
        <ok-button
          @click="
            $router.push({ name: 'create', params: { id: $route.params.id } })
          "
          >Добавить задачу</ok-button
        >
      </div>
    </div>
    <form-container>
      <div class="container">
        <div class="input__container left">
          <div>
            <img class="avatar" :src="user.photoUrl" alt="" />
          </div>
          <div class="input">
            <label>О себе</label>
            <p>{{ user.about }}</p>
          </div>
        </div>
        <div class="input__container middle">
          <div class="input">
            <label>Задачи</label>
            <div class="table__wrapper main__table__wrapper">
              <task-table :tasks="tasks" :users="getUsers" />
            </div>
            <pagination-items
              :itemsPerPage="limit"
              :page="page"
              :total="total"
              @onChange="changePage"
            />
          </div>
        </div>
      </div>
    </form-container>
  </container-wrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
import TaskTable from "@/components/TaskTable.vue";
import PaginationItems from "@/components/UI/PaginationItems.vue";
export default {
  components: { TaskTable, PaginationItems },
  props: {
    id: String,
  },
  data() {
    return {
      showModal: false,
      user: {},
      username: "",
      url: "",
      about: "",
      password: "",
      login: "",
      tasks: [],
      page: 0,
      limit: 10,
      total: 0,
    };
  },
  methods: {
    ...mapActions({
      fetchUsers: "users/fetchUsers",
      fetchTasks: "tasks/fetchTasks",
      fetchPaginationTasks: "tasks/fetchPaginationTasks",
    }),
    async editProfile() {
      await axios.put("http://93.95.97.34/api/users/edit", {
        login: this.login,
        username: this.username,
        about: this.about,
        photoUrl: this.url,
        password: this.password,
      });
    },
    fillUsername(e) {
      this.username = e;
    },
    closeModal() {
      this.showModal = false;
    },
    fillURL(e) {
      this.url = e;
    },
    fillAbout(e) {
      this.about = e;
    },
    fillAllInfo() {
      this.username = this.userData().username;
      this.url = this.userData().photoUrl;
      this.about = this.userData().abou;
      this.password = this.userData().password;
      this.login = this.userData().login;
    },
    changePage(page) {
      this.page = page;
      this.getAllTasks();
    },
    userData() {
      return JSON.parse(localStorage.getItem("userData"));
    },
    async fetchUser() {
      try {
        const response = await axios.get(
          "http://93.95.97.34/api/users/" + this.id
        );
        this.user = response.data;
      } catch (e) {
        alert("Ошибка");
      }
    },
    getUserTasks(id) {
      console.log(this.tasks);
      return this.getTasks.filter((x) => x.assignedId === id);
    },
    getAllTasks() {
      axios
        .post("http://93.95.97.34/api/tasks", {
          filter: {
            query: "",
            assignedUsers: [this.$route.params.id],
            userIds: [],
            type: [],
            status: [],
            rank: [],
          },
          page: this.page,
          limit: this.limit,
        })
        .then((res) => {
          const { data, page, limit, total } = res.data;
          this.tasks = data;
          this.page = page;
          this.limit = limit;
          this.total = total;
        });
    },
    openModal() {
      this.showModal = !this.showModal;
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchUser();
    this.getAllTasks();
    this.fillAllInfo();
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      tasks: (state) => state.tasks.tasks,
    }),
    ...mapGetters({
      getUsers: "users/getUsers",
      getTasks: "tasks/getTasks",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.table__wrapper {
  padding: 2px;
  box-shadow: inset 0px 0px 2px 1px #b5b5b5;
  border-radius: 5px;
  overflow: auto;
}

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
  padding-left: 20px;
}
.avatar {
  height: 186px;
  width: 186px;
  border-radius: 50%;
  background: $gradient;
  padding: 2px;
  object-fit: cover;
}

.modal__container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  row-gap: 20px;
  .input {
    display: flex;
    row-gap: 5px;
    flex-direction: column;
  }
}

.button__holder {
  color: white;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
