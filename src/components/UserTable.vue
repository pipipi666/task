<template>
    <table>
      <tbody>
        <tr v-for="user in users" :user="user" :key="user.id">
          <td>
            <router-link
              class="user"
              :to="{
                name: 'user',
                params: { id: user.id },
                props: { id: user.id },
              }"
              >{{ user.username }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  name: "user-table",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  text-decoration: none;
}
</style>