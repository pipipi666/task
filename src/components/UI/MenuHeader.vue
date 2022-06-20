<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      <img src="@/img/Logo.svg" alt="" />
    </div>
    <template v-if="loggedIn">
      <nav class="nav">
        <ul>
          <li>
            <router-link to="/"> Задачи </router-link>
          </li>
          <li>
            <router-link to="/users"> Пользователи </router-link>
          </li>
        </ul>
      </nav>
      <div class="user__profile">
        <div class="username">{{ userData().username }}</div>
        <div class="dropdown">
          <a href="#" class="user__menu">
            <img class="userpic" :src="userData().photoUrl" alt="avatar" />
          </a>
          <div class="dropdown-content">
            <ul>
              <li>
                <router-link
                  :to="{
                    name: 'user',
                    params: { id: userData().id },
                  }"
                >
                  Посмотреть профиль
                </router-link>
              </li>
              <li>
                <router-link to="/login" @click="handleExit" class="logout__link">
                  Выйти из системы
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters['login/getLoggedIn']
    }
  },
  methods: {
    isTasksActive() {
      this.$route.name === "home" ||
      this.$route.name === "task" ||
      this.$route.name === "create";
    },
    isUsersActive() {
      this.$route.name === "users" || this.$route.name === "user";
    },
    handleExit(e) {
      e.preventDefault();
      this.$store.state.login.loggedIn = false;
      localStorage.clear();
    },
    userData() {
      return JSON.parse(localStorage.getItem("userData"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
.navbar {
  background-color: #fff;
  height: 60px;
  min-width: 100vw;
  display: flex;
  margin: 0;
  padding: 0;
  box-shadow: 0px 4px 4px $inner-shadow;
  .logo {
    margin: auto 20px;
  }
  .nav {
    margin: auto;
    height: 100%;
    ul {
      display: flex;
      gap: 10px;
      list-style-type: none;
      height: 100%;
      align-items: center;
      li {
        height: 100%;
        align-items: center;
        display: flex;
        a {
          height: 100%;
          display: flex;
          align-items: center;
          text-decoration: none;
          font-family: "Open Sans", sans-serif;
          font-size: 24px;
          &.active {
            border-bottom: 2px solid $primary;
          }
        }
        a:visited {
          color: $text-color;
        }
        a:active {
          color: $primary;
        }
      }
    }
  }
  .user__profile {
    display: flex;
    gap: 10px;
    margin-right: 20px;
    .username {
      margin: auto;
    }
    .user__menu {
      margin: auto;
      width: 42px;
      height: 42px;
      display: flex;
      .userpic {
        border-radius: 50%;
        background: $gradient;
        padding: 1px;
      }
    }
  }
}
.dropdown {
  display: flex;
}
.dropdown-content {
  ul {
    padding: 2px 0;
  }
  li {
    list-style-type: none;
    a {
      font-size: 12px;
      padding: 0 5px;
      text-decoration: none;
    }
    .logout__link {
      color: $error;
    }
  }
  display: none;
  position: absolute;
  top: 51px;
  right: 20px;
  box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
  border-radius: 5px;
  background-color: #fff;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.router-link-active {
  border-bottom: 2px solid $primary
}
</style>