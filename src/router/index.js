import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/TaskList.vue'
import CreateTask from '../views/CreateTask.vue'
import AboutUser from '../views/AboutUser.vue'
import EditTask from '../views/EditTask.vue'
import TaskPage from '../views/TaskPage.vue'
import UserAuth from '../views/UserAuth.vue'
import UserList from '../views/UserList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TaskList
  },
  {
    path: '/create',
    name: 'create',
    component: CreateTask,
    props: true
  },
  {
    path: '/user/:id',
    name: 'user',
    component: AboutUser,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditTask,
    props: true
  },
  {
    path: '/task/:id',
    name: 'task',
    component: TaskPage
  },
  {
    path: '/login',
    name: 'login',
    component: UserAuth
  },
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
