<template>
  <menu-header></menu-header>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MenuHeader from "./components/UI/MenuHeader.vue";
export default {
  components: { MenuHeader },
  beforeCreate() {
    if (!this.$store.state.login.loggedIn && this.$route.path !== '/login') {
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="scss">
@import "@/fonts/font.css";
@import "@/style/variables";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: $text-color;
}
.input__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .input {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}

html,
body {
  background-color: $background-color;
  display: flex;
}
h1 {
  font-size: 24px;
  font-weight: 300;
}
button {
  height: 24px;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0 20px;
}

label {
  color: $label-text;
}
table {
  width: 100%;
  border-collapse: collapse;
  overflow: auto;
  //border-collapse: separate;
  //border-spacing: 14px 0;
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
}
</style>
