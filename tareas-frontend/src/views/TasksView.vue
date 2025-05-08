<template>
  <div class="tasks-container">
    <div class="tasks-header">
      <h1>Mis Tareas</h1>
      <router-link to="/tasks/create" class="add-task-btn">Nueva Tarea</router-link>
    </div>

    <div class="tasks-content">
      <aside class="sidebar">
        <TaskFilter />
      </aside>

      <main class="main-content">
        <div v-if="isLoading" class="loading">Cargando tareas...</div>

        <div v-else-if="tasks.length === 0" class="no-tasks">
          <p>No hay tareas que mostrar.</p>
          <p v-if="hasActiveFilters">Prueba a cambiar los filtros o <button @click="clearFilters">limpiar filtros</button></p>
          <router-link v-else to="/tasks/create" class="create-first-task">
            Crear mi primera tarea
          </router-link>
        </div>

        <div v-else class="tasks-list">
          <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import TaskItem from '@/components/TaskItem.vue';
import TaskFilter from '@/components/TaskFilter.vue';

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasks);
const isLoading = computed(() => taskStore.loading);
const hasActiveFilters = computed(() => {
  const filters = taskStore.filters;
  return filters.priority !== null || filters.completed !== null || filters.overdue;
});

onMounted(async () => {
  try {
    await taskStore.fetchTasks();
  } catch (error) {
    console.error('Error al cargar tareas:', error);
  }
});

const clearFilters = () => {
  taskStore.clearFilters();
  taskStore.fetchTasks();
};
</script>

<style scoped>
.tasks-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 15px;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-task-btn {
  background-color: #0d6efd;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
}

.tasks-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
}

.sidebar {
  height: fit-content;
}

.loading, .no-tasks {
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.no-tasks p {
  margin-bottom: 15px;
}

.no-tasks button {
  background: none;
  border: none;
  color: #0d6efd;
  cursor: pointer;
  text-decoration: underline;
}

.create-first-task {
  display: inline-block;
  background-color: #0d6efd;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 15px;
}

/* Responsive */
@media (max-width: 768px) {
  .tasks-content {
    grid-template-columns: 1fr;
  }
}
</style>
