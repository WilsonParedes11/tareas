<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-content">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
        <div class="task-priority" :class="priorityClass">
          {{ task.priority }}
        </div>
      </div>

      <div class="task-description" v-if="task.description">
        {{ task.description }}
      </div>

      <div class="task-meta">
        <div class="task-date" v-if="task.due_date" :class="{ overdue: isOverdue }">
          <span v-if="isOverdue">¡Vencida! </span>
          Fecha límite: {{ formatDate(task.due_date) }}
        </div>
      </div>
    </div>

    <div class="task-actions">
      <button
        @click="toggleComplete"
        class="toggle-button"
        :class="{ 'complete-button': !task.completed, 'incomplete-button': task.completed }"
      >
        {{ task.completed ? 'Marcar como pendiente' : 'Completar' }}
      </button>

      <div class="action-buttons">
        <router-link :to="{ name: 'task-detail', params: { id: task.id } }" class="view-button">
          Ver
        </router-link>
        <router-link :to="{ name: 'edit-task', params: { id: task.id } }" class="edit-button">
          Editar
        </router-link>
        <button @click="confirmDelete" class="delete-button">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const taskStore = useTaskStore()

const priorityClass = computed(() => {
  const classes = {
    baja: 'priority-low',
    media: 'priority-medium',
    alta: 'priority-high',
  }
  return classes[props.task.priority]
})

const isOverdue = computed(() => {
  if (!props.task.due_date || props.task.completed) return false
  return new Date(props.task.due_date) < new Date()
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const toggleComplete = async () => {
  try {
    await taskStore.toggleTaskComplete(props.task.id)
  } catch (error) {
    console.error('Error al cambiar el estado de la tarea:', error)
  }
}

const confirmDelete = () => {
  if (confirm('¿Estás seguro que deseas eliminar esta tarea?')) {
    taskStore.deleteTask(props.task.id)
  }
}
</script>

<style scoped>
.task-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: white;
  transition: all 0.3s ease;
}

.task-item.completed {
  opacity: 0.7;
  border-left: 5px solid #28a745;
}

.task-content {
  margin-bottom: 15px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-title {
  margin: 0;
  font-size: 1.2rem;
}

.task-priority {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.priority-low {
  background-color: #d1e7dd;
  color: #0f5132;
}

.priority-medium {
  background-color: #fff3cd;
  color: #856404;
}

.priority-high {
  background-color: #f8d7da;
  color: #842029;
}

.task-description {
  margin: 10px 0;
  color: #6c757d;
}

.task-meta {
  font-size: 0.85rem;
  color: #6c757d;
}

.task-date.overdue {
  color: #dc3545;
  font-weight: bold;
}

.task-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.complete-button {
  background-color: #198754;
  color: white;
}

.incomplete-button {
  background-color: #ffc107;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.view-button,
.edit-button,
.delete-button {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}

.view-button {
  background-color: #0dcaf0;
  color: white;
}

.edit-button {
  background-color: #6c757d;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
}
</style>
