<template>
  <dialog-form
    @closeModal="closeModal"
    :show="showModal"
    title="Запись о работе"
  >
    <template v-slot:submit>
      <div class="button__holder" @click="handlePatchTime">Добавить</div>
    </template>
    <slot>
      <div class="modal__container">
        <div class="input">
          <label>Затраченное время</label>
          <primary-input @update="fillTime"></primary-input>
        </div>
        <div class="input">
          <label>Единица измерения</label>
          <select-input
            :params="selectData"
            name="Выберите единицы измерения"
            :value="timeValue"
            @onChange="changeTimeValue"
          />
        </div>
        <div class="input">
          <label>Комментарий</label>
          <text-area @update="fillComment"></text-area>
        </div>
      </div>
    </slot>
  </dialog-form>
  <container-wrapper>
    <div class="card__header">
      <h1 :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
        {{ task.title }}
        <div v-if="task.status === 'inProgress'" class="tasks__status__table">
          <label class="status at__work">В работе</label>
        </div>
        <div v-if="task.status === 'testing'" class="tasks__status__table">
          <label class="status at__work">Тестирование</label>
        </div>
        <div v-if="task.status === 'complete'" class="tasks__status__table">
          <label class="status done">Сделано</label>
        </div>
        <div v-if="task.status === 'opened'" class="tasks__status__table">
          <label class="status open">Открыто</label>
        </div>
      </h1>
      <div class="card__header__buttons">
        <ok-button
          @click="patchStatus('inProgress')"
          v-if="task.status === 'opened'"
        >
          Взять в работу
        </ok-button>
        <ok-button
          @click="patchStatus('opened')"
          v-if="
            task.status === 'inProgress' ||
            task.status === 'testing' ||
            task.status === 'complete'
          "
        >
          Переоткрыть
        </ok-button>
        <ok-button
          @click="patchStatus('testing')"
          v-if="task.status === 'inProgress'"
        >
          На тестирование
        </ok-button>
        <ok-button
          @click="patchStatus('complete')"
          v-if="
            task.status === 'inProgress' ||
            task.status === 'testing' ||
            task.status === 'opened'
          "
        >
          Готово
        </ok-button>
        <primary-button
          @click="
            $router.push({ name: 'edit', params: { id: $route.params.id } })
          "
          >Редактировать</primary-button
        >
        <error-button>Удалить</error-button>
      </div>
    </div>
    <form-container>
      <div class="container__content">
        <div class="input__container left">
          <div class="input">
            <label>Исполнитель</label>
            {{ getUserName(task.assignedId) }}
          </div>
          <div class="input">
            <label>Автор задачи</label>
            {{ getUserName(task.userId) }}
          </div>
          <div class="input">
            <label>Тип запроса</label>
            {{ task.type === "task" ? "Задача" : "Ошибка" }}
          </div>
          <div class="input">
            <label>Приоритет</label>
            {{
              task.rank === "low"
                ? "Низкий"
                : task.rank === "medium"
                ? "Средний"
                : "Высокий"
            }}
          </div>
          <div class="input">
            <label>Дата создания</label>
            {{ new Date(task.dateOfCreation).toLocaleString() }}
          </div>
          <div class="input">
            <label>Дата изменения</label>
            {{ new Date(task.dateOfUpdate).toLocaleString() }}
          </div>
          <div class="input">
            <label>Затрачено времени</label>
            {{ formatTime(task.timeInMinutes) }}
          </div>
          <primary-button @click="openModal" class="btn"
            >Сделать запись о работе</primary-button
          >
        </div>
        <div class="input__container middle">
          <div class="input">
            <label>Название</label>
            {{ task.title }}
          </div>
          <div class="input area">
            <label>Описание</label>
            {{ task.description }}
          </div>
        </div>
        <div class="input__container right">
          <div class="input area">
            <label>Комментарии ({{ comments.length }})</label>
            <text-area
              rows="4"
              class="area"
              @update="fillText"
              :model-value="text"
            >
            </text-area>
            <success-button @click="addComment"
              >Добавить комментарий</success-button
            >
          </div>
          <div class="input" v-for="com in comments" :key="com.id">
            <div class="comment">
              <label
                >{{ getUserName(com.userId) }} ({{
                  new Date(com.dateOfCreation).toLocaleString()
                }})</label
              >
              <button v-if="com.userId === userData().id" class="btn__delete">
                Удалить
              </button>
            </div>
            {{ com.text }}
          </div>
        </div>
      </div>
    </form-container>
  </container-wrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import PrimaryButton from "@/components/UI/PrimaryButton.vue";
import TextArea from "@/components/UI/TextArea.vue";
import SuccessButton from "@/components/UI/SuccessButton.vue";
import SelectInput from "@/components/UI/SelectInput.vue";
import axios from "axios";
export default {
  components: { PrimaryButton, TextArea, SuccessButton, SelectInput },
  data() {
    return {
      task: {},
      user: "",
      showModal: false,
      comments: [],
      text: "",
      selectData: [
        { title: "Дни", value: 1 },
        { title: "Часы", value: 2 },
        { title: "Минуты", value: 3 },
      ],
      timeValue: {},
      timeInMinutes: 0,
      comment: "",
    };
  },
  methods: {
    ...mapActions({
      fetchUsers: "users/fetchUsers",
    }),
    closeModal() {
      this.showModal = false;
    },
    async handlePatchTime() {
      await axios.patch(
        "http://93.95.97.34/api/tasks/" + this.task.id + "/worktime",
        {
          timeInMinutes: this.calculateTime(
            this.timeValue.value,
            this.timeInMinutes
          ),
          comment: this.comment,
          currentUser: this.userData().id,
        }
      );
      this.closeModal();
      this.fetchTask();
    },
    fillComment(e) {
      this.comment = e;
    },
    fillTime(e) {
      this.timeInMinutes = e;
    },
    changeTimeValue(e) {
      this.timeValue = e;
    },
    calculateTime(value, timeInMinutes) {
      if (value === 1) {
        return timeInMinutes * 1440;
      } else if (value === 2) {
        return timeInMinutes * 60;
      } else if (value === 3) {
        return timeInMinutes;
      }
    },
    async addComment() {
      await axios.put("http://93.95.97.34/api/comments/createoredit", {
        taskId: this.task.id,
        userId: this.userData().id,
        text: this.text,
      });
    },
    patchStatus(status) {
      axios
        .patch(
          "http://93.95.97.34/api/tasks/" + this.task.id + "/status/" + status
        )
        .then(() => {
          this.fetchTask();
        });
    },
    fillText(e) {
      this.text = e;
    },
    userData() {
      return JSON.parse(localStorage.getItem("userData"));
    },
    async fetchTask() {
      try {
        const response = await axios.get(
          "http://93.95.97.34/api/tasks/" + this.$route.params.id
        );
        this.task = response.data;
      } catch (e) {
        alert("Ошибка");
      }
    },
    async fetchComments() {
      try {
        const response = await axios.get(
          "http://93.95.97.34/api/comments/" + this.$route.params.id
        );
        this.comments = response.data;
      } catch (e) {
        alert("Ошибка");
      }
    },
    getUserName(id) {
      let user = this.getUsers.find((x) => x.id === id);
      return (user && user.username) || "Unknown user";
    },
    formatTime(minutes) {
      const days =
        minutes % 1440 === 0
          ? Math.round(minutes / 1440)
          : Math.floor(minutes / 1440);
      minutes = minutes - days * 1440;
      const hours =
        minutes % 60 === 0
          ? Math.round(minutes / 60)
          : Math.floor(minutes / 60);
      const mins = minutes - hours * 60;
      let daysSuffix = "ень",
        hoursSuffix = "";
      if (days > 1 && days < 5) {
        daysSuffix = "ня";
      } else if (days !== 1) {
        daysSuffix = "ней";
      }
      if (hours > 1 && hours < 5) {
        hoursSuffix = "а";
      } else if (hours !== 1) {
        hoursSuffix = "ов";
      }
      return `${days} д${daysSuffix}, ${hours} час${hoursSuffix}, ${mins} минут`;
    },
    openModal() {
      this.showModal = !this.showModal;
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchTask();
    this.fetchComments();
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
    ...mapGetters({
      getUsers: "users/getUsers",
    }),
    // assUser() {
    //   return this.getUserName(this.task.assignedId);
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.container__content {
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 0;
}
.area {
  margin-bottom: 5px;
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
  .btn {
    width: fit-content;
  }
}
.middle {
  width: 440px;
  padding: 0 20px;
}

.right {
  border-left: 1px solid $inner-shadow;
  padding-left: 20px;
  width: 478px;
  height: 100%;
  display: flex;
}

.status {
  padding: 2px 10px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 14px;
}

.open {
  border-color: $text-color;
  color: $text-color;
  background-color: $label-text;
}

.at__work {
  border-color: #846f00;
  color: #846f00;
  background-color: #ffc700;
}

.done {
  border-color: #157536;
  color: #157536;
  background-color: #4bd379;
}

.tasks__status__table {
  width: calc(120px + 14px);
}

.comment {
  display: flex;
  justify-content: space-between;
  .btn__delete {
    color: $error;
    background: none;
    cursor: pointer;
  }
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