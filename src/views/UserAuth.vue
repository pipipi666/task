<template>
  <div class="wrapper">
    <login-container class="container">
      <h1 id="ss">Авторизация</h1>
      <div class="input__container">
        <div class="input">
          <label htmlFor="login">Логин</label>
          <!-- <primary-input
            :model-value="login"
            @update:model-value="updateLogin"
            type="email"
          ></primary-input> -->
          <input
            v-model="login"
            class="form__item"
            type="email"
            name="login"
            required
          />
        </div>
        <div class="input">
          <label htmlFor="password">Пароль</label>
          <!-- <primary-input
            :model-value="password"
            @update:model-value="updatePassword"
            type="password"
          ></primary-input> -->
          <input
            v-model="password"
            class="form__item"
            type="password"
            name="password"
            required
          />
        </div>
      </div>
      <success-button type="submit" @click="handleSubmit">Вход</success-button>
    </login-container>
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapState } from "vuex";
import LoginContainer from '@/components/UI/LoginContainer.vue'
export default {
  components: { LoginContainer },
  // data() {},
  // methods: {
  //   ...mapMutations({
  //     updateLogin: "login/updateLogin",
  //     updatePassword: "login/updatePassword",
  //   }),
  //   ...mapActions({
  //     submitLogin: "login/submitLogin",
  //   }),
  //   handleSubmit() {
  //     this.submitLogin();
  //     this.$router.push("/");
  //   },
  // },
  // computed: {
  //   ...mapState({
  //     userData: (state) => state.login.userData,
  //     isAuth: (state) => state.login.loggedIn,
  //     login: (state) => state.login.login,
  //     password: (state) => state.login.password,
  //   }),
  // },
  data() {
    return {
      login: "",
      password: "",
    };
  },
  computed: {
    errorMsg() {
      return this.$store.state.login.error;
    },
  },
  methods: {
    handleSubmit(evt) {
      evt.preventDefault();
      this.$store
        .dispatch("login/login", {
          login: this.login,
          password: this.password,
        })
        .then((success) => {
          if (success) {
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style lang="scss"  scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  display: flex;
}

.form__item {
  box-shadow: inset 0px 0px 2px 1px #b5b5b5;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 24px;
  padding: 5px 10px;
  font-size: 14px;
}

.form__item:hover {
  border-color: #7b61ff;
}

.form__item:focus {
  box-shadow: 0px 0px 2px 2px #7b61ff;
  outline: #7b61ff;
}

.container {
  width: 300px;
  margin: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
  }
  h1 {
    text-align: center;
    font-weight: 300;
  }
}
</style>