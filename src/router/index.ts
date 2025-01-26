import { createRouter, createWebHistory } from "vue-router"

const HomePage = () => import("../pages/HomePage.vue")
const AddTaskPage = () => import("../pages/AddTaskPage.vue")
const EditTaskPage = () => import("../pages/EditTaskPage.vue")
const TaskDetailsPage = () => import("../pages/TaskDetailsPage.vue")
const NotFound = () => import("../pages/NotFound.vue")

const routes = [
  { path: "/", component: HomePage },
  { path: "/add", component: AddTaskPage },
  { path: "/tasks/:id", component: TaskDetailsPage },
  { path: "/tasks/edit/:id", component: EditTaskPage }, // Edit Task route
  { path: "/:catchAll(.*)", component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
