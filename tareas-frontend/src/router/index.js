import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TasksView from '../views/TasksView.vue'
import TaskDetailView from '../views/TaskDetailView.vue'
import CreateTaskView from '../views/CreateTaskView.vue'
import EditTaskView from '../views/EditTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/:id',
      name: 'task-detail',
      component: TaskDetailView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/create',
      name: 'create-task',
      component: CreateTaskView,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/:id/edit',
      name: 'edit-task',
      component: EditTaskView,
      props: true,
      meta: { requiresAuth: true },
    },
  ],
})

// Navegación guard para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'tasks' })
  } else {
    next()
  }
})

export default router
