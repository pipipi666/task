<template>
  <table>
    <tbody>
      <tr v-for="task in tasks" :task="task" :key="task.id">
        <td class="cell__type">
          <div class="type__icon" :class="task.type">
            <div class="ellipse"></div>
          </div>
        </td>
        <td class="cell__title">
          <router-link
            class="link"
            :to="{ name: 'task', params: { id: task.id } }"
          >
            {{ task.title }}
          </router-link>
        </td>
        <td v-if="$route.name !== 'user'" class="cell__user">
          {{ getUserName(task.assignedId) }}
        </td>
        <td class="cell__status">
          <div class="status" :class="task.status">
            <template v-if="task.status === 'inProgress'">В работе</template>
            <template v-else-if="task.status === 'opened'">Открыто</template>
            <template v-else-if="task.status === 'testing'"
              >Тест</template
            >
            <template v-else-if="task.status === 'complete'">Сделано</template>
          </div>
        </td>
        <td class="cell__status">
          <div
            v-show="task.rank === 'high'"
            class="tasks__priority__table priority__high"
          >
            <img src="../img/High.svg" alt="" class="priority" />
            Высокий
          </div>
          <div
            v-show="task.rank === 'medium'"
            class="tasks__priority__table priority__middle"
          >
            <img src="../img/Mid.svg" alt="" class="priority" />Средний
          </div>
          <div
            v-show="task.rank === 'low'"
            class="tasks__priority__table priority__low"
          >
            <img src="../img/Low.svg" alt="" class="priority" />Низкий
          </div>
        </td>
        <td v-if="$route.name !== 'user'" class="cell__menu">
          <div class="dropdown" @click="setMenu(task.id)">
            <button class="menu__btn" :class="{ menu: !!isMenuVisible[task.id] }">
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="#7b61ff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1C10 1.55228 9.55228 2 9 2H1C0.447716 2 0 1.55228 0 1Z"
                />
                <path
                  d="M0 6C0 5.44772 0.447715 5 1 5H9C9.55228 5 10 5.44772 10 6C10 6.55228 9.55228 7 9 7H1C0.447716 7 0 6.55228 0 6Z"
                />
                <path
                  d="M0 11C0 10.4477 0.447715 10 1 10H9C9.55228 10 10 10.4477 10 11C10 11.5523 9.55228 12 9 12H1C0.447716 12 0 11.5523 0 11Z"
                />
              </svg>
            </button>
            <div class="dropdown-content" :class="{ active: !!isMenuVisible[task.id] }">
              <ul>
                <router-link
                  class="link"
                  :to="{ name: 'task', params: { id: task.id } }"
                >
                  <li>Редактировать</li></router-link
                >
                <li :style="{ color: 'red' }" @click="handleDelete(task.id)">
                  Удалить
                </li>
                <li
                  @click="patchStatus(task.id, 'inProgress')"
                  v-show="task.status === 'opened'"
                >
                  Взять в работу
                </li>
                <li
                  @click="patchStatus(task.id, 'testing')"
                  v-show="task.status === 'inProgress'"
                >
                  Тестирование
                </li>
                <li
                  v-show="
                    task.status === 'complete' ||
                    task.status === 'inProgress' ||
                    task.status === 'testing'
                  "
                  @click="patchStatus(task.id, 'opened')"
                >
                  Переоткрыть
                </li>
                <li
                  v-show="
                    task.status === 'opened' ||
                    task.status === 'inProgress' ||
                    task.status === 'testing'
                  "
                  @click="patchStatus(task.id, 'complete')"
                >
                  Готово
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  name: "task-table",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMenuVisible: {}
    }
  },
  methods: {
    getUserName(id) {
      return this.users.find((x) => x.id === id).username;
    },
    handleDelete(id) {
      axios.delete("http://93.95.97.34/api/tasks/" + id).then(() => {
        this.$store.dispatch('tasks/fetchPaginationTasks', this.$store.state.tasks.page)
      })
    },
    patchStatus(id, status) {
      axios.patch(
        "http://93.95.97.34/api/tasks/" + id + "/status/" + status
      ).then(() => {
        this.$store.dispatch('tasks/fetchPaginationTasks', this.$store.state.tasks.page)
      })
    },
    setMenu(key) {
      let currentValue = !!this.isMenuVisible[key]
      this.isMenuVisible = {}
      this.isMenuVisible[key] = !currentValue
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
table {
  width: 100%;
  border-collapse: collapse;
  overflow: auto;

  tr {
    height: 64px;
  }
  tbody tr:nth-child(even) {
    background: #f2f2f2;
  }
  td:first-child {
    padding-left: 30px;
  }
  td:last-child {
    padding-right: 30px;
  }
  .cell__type {
    width: 112px;
  }
  .cell__user {
    width: 194px;
  }
  .cell__status {
    width: 134px;
  }
  .cell__title {
    width: 541px;
  }

  .cell__menu {
    width: 125px;
  }
}

svg {
  height: 12px;
}

.priority {
  margin-right: 4px;
  margin-bottom: 1px;
}

.priority__low {
  color: #3ca961;
}

.priority__middle {
  color: #e9b500;
  img {
    margin-bottom: 2px;
  }
}

.priority__high {
  color: #d14343;
}

.type__icon {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
.task {
  background-color: #00d1ff;
}

.bug {
  background-color: $error;
}

.ellipse {
  background-color: #fff;
  width: 12px;
  height: 12px;
  margin: auto;
  border-radius: 10px;
}

.status {
  padding: 2px 10px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 14px;
  // width: fit-content;
  width: 80px;
  text-align: center;
}

.inProgress,
.testing {
  border-color: #846f00;
  color: #846f00;
  background-color: #ffc700;
}

.complete {
  border-color: #157536;
  color: #157536;
  background-color: #4bd379;
}

.opened {
  border-color: $text-color;
  color: $text-color;
  background-color: $label-text;
}

.dropdown {
  position: relative;
  float: right;
  cursor: pointer;
}
.dropdown-content {
  ul {
    padding: 2px 0;
  }
  .link {
    text-decoration: none;
  }
  li {
    text-decoration: none;
    font-size: 12px;
    padding: 0 5px;
    list-style-type: none;
    cursor: pointer;
    .logout__link {
      color: $error;
    }
  }
  display: none;
  position: absolute;
  top: 20px;
  right: 0;
  z-index: 1;
  box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
  border-radius: 5px;
  background-color: #fff;
}

.menu__btn {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  padding: 0;
  background: none;
  cursor: pointer;
}

.menu {
  background: $primary;
  svg {
    fill: white;
  }
}
.active {
  display: block;
}

a {
  text-decoration: none;
}
</style>