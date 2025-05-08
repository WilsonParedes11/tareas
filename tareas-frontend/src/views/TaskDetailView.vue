<template>
  <div class="task-detail-container">
    <div class="detail-header">
      <router-link to="/tasks" class="back-link">← Volver a tareas</router-link>

      <div class="actions">
        <router-link :to="{ name: 'edit-task', params: { id } }" class="edit-btn">
          Editar
        </router-link>
        <button @click="confirmDelete" class="delete-btn">Eliminar</button>
      </div>
    </div>

    <div v-if="isLoading && !taskStore.currentTask" class="loading">
      Cargando tarea...
    </div>

    <template v-else-if="taskStore.currentTask">
      <div class="task-card" :class="{ 'completed': taskStore.currentTask.completed }">
        <div class="task-header">
          <h1>{{ taskStore.currentTask.title }}</h1>

          <div class="status-badge" :class="statusClass">
            {{ taskStore.currentTask.completed ? 'Completada' : 'Pendiente' }}
          </div>
        </div>

        <div class="task-meta">
          <div class="priority-badge" :class="priorityClass">
            Prioridad: {{ taskStore.currentTask.priority }}
          </div>

          <div v-if="taskStore.currentTask.due_date" class="due-date" :class="{ 'overdue': isOverdue }">
            <span v-if="isOverdue && !taskStore.currentTask.completed">¡Vencida! </span>
            Fecha límite: {{ formatDate(taskStore.currentTask.due_date) }}
          </div>
        </div>

        <div v-if="taskStore.currentTask.description" class="task-description">
          <h3>Descripción</h3>
          <p>{{ taskStore.currentTask.description }}</p>
        </div>

        <div class="task-action">
          <button
            @click="toggleComplete"
            class="toggle-btn"
            :class="{ 'complete-btn': !taskStore.currentTask.completed, 'reopen-btn': taskStore.currentTask.completed }"
          >
            {{ taskStore.currentTask.completed ? 'Marcar como pendiente' : 'Marcar como completada' }}
          </button>
        </div>
      </div>

      <CommentList :task-id="id" />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/tasks';
import CommentList from '@/components/CommentList.vue';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const id = computed(() => route.params.id);
const isLoading = computed(() => taskStore.loading);

const priorityClass = computed(() => {
  if (!taskStore.currentTask) return '';

  const classes = {
    'baja': 'priority-low',
    'media': 'priority-medium',
    'alta': 'priority-high'
  };
  return classes[taskStore.currentTask.priority];
});

const statusClass = computed(() => {
  if (!taskStore.currentTask) return '';
  return taskStore.currentTask.completed ? 'status-completed' : 'status-pending';
});

const isOverdue = computed(() => {
  if (!taskStore.currentTask || !taskStore.currentTask.due_date || taskStore.currentTask.completed) {
    return false;
  }
  return new Date(taskStore.currentTask.due_date) < new Date();
});

onMounted(async () => {
  try {
    await taskStore.fetchTask(id.value);
  } catch (error) {
    console.error('Error al cargar la tarea:', error);
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const toggleComplete = async () => {
  try {
    await taskStore.toggleTaskComplete(id.value);
  } catch (error) {
    console.error('Error al cambiar el estado de la tarea:', error);
  }
};

const confirmDelete = () => {
  if (confirm('¿Estás seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer.')) {
    deleteTask();
  }
};

const deleteTask = async () => {
  try {
    await taskStore.deleteTask(id.value);
    router.push({ name: 'tasks' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    alert('No se pudo eliminar la tarea. Por favor, inténtalo de nuevo.');
  }
};
</script>

<style scoped>
.task-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 15px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.back-link {
  color: #6c757d;
  text-decoration: none;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}

.edit-btn {
  background-color: #6c757d;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.task-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
}

.task-card.completed {
  border-left: 5px solid #28a745;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.task-header h1 {
  margin: 0;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
}

.status-completed {
  background-color: #d1e7dd;
  color: #0f5132;
}

.status-pending {
  background-color: #cfe2ff;
  color: #084298;
}

.task-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.priority-badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
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

.due-date {
  font-size: 0.9rem;
  color: #6c757d;
}

.due-date.overdue {
  color: #dc3545;
  font-weight: bold;
}

.task-description {
  margin-bottom: 30px;
}

.task-description h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.task-action {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.toggle-btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.complete-btn {
  background-color: #198754;
  color: white;
}

.reopen-btn {
  background-color: #ffc107;
  color: #212529;
}

.loading {
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>
