<template>
  <div class="task-filter">
    <h3>Filtrar Tareas</h3>

    <div class="filter-section">
      <label>Prioridad:</label>
      <select v-model="filters.priority" @change="applyFilters">
        <option :value="null">Todas</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
    </div>

    <div class="filter-section">
      <label>Estado:</label>
      <select v-model="filters.completed" @change="applyFilters">
        <option :value="null">Todos</option>
        <option :value="true">Completadas</option>
        <option :value="false">Pendientes</option>
      </select>
    </div>

    <div class="filter-section checkbox">
      <input type="checkbox" id="overdue" v-model="filters.overdue" @change="applyFilters">
      <label for="overdue">Mostrar solo vencidas</label>
    </div>

    <button @click="resetFilters" class="reset-button">Limpiar Filtros</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();

const filters = reactive({
  priority: null,
  completed: null,
  overdue: false
});

const applyFilters = () => {
  taskStore.setFilters(filters);
  taskStore.fetchTasks();
};

const resetFilters = () => {
  filters.priority = null;
  filters.completed = null;
  filters.overdue = false;
  taskStore.clearFilters();
  taskStore.fetchTasks();
};
</script>

<style scoped>
.task-filter {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.filter-section.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-section.checkbox label {
  margin-bottom: 0;
}

.reset-button {
  width: 100%;
  padding: 8px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.reset-button:hover {
  background-color: #5a6268;
}
</style>
