import { createStore } from 'vuex';
import { moduleAuth } from './moduleAuth';
import { moduleTasks } from './moduleTasks';
import { moduleUsers } from './moduleUsers';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login: moduleAuth,
    users: moduleUsers,
    tasks: moduleTasks
  }
})
