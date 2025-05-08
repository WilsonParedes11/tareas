<template>
  <div class="edit-task-container">
    <div class="form-header">
      <h1>Editar Tarea</h1>
      <router-link :to="{ name: 'task-detail', params: { id } }" class="back-link">← Volver a la tarea</router-link>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading && !taskStore.currentTask" class="loading">
      Cargando tarea...
    </div>

    <form v-else-if="taskStore.currentTask" @submit.prevent="updateTask" class="task-form">
      <div class="form-group">
        <label for="title">Título *</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          placeholder="Título de la tarea"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          placeholder="Describe la tarea (opcional)"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="priority">Prioridad *</label>
          <select id="priority" v-model="formData.priority" required>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div class="form-group">
          <label for="due_date">Fecha de vencimiento</label>
          <input
            id="due_date"
            v-model="formData.due_date"
            type="date"
          />
        </div>
      </div>

      <div class="form-group">
        <div class="checkbox-group">
          <input
            id="completed"
            v-model="formData.completed"
            type="checkbox"
          />
          <label for="completed">Marcar como completada</label>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="goBack" class="cancel-btn">Cancelar</button>
        <button type="submit" class="submit-btn" :disabled="isSaving">
          {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/tasks';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const id = computed(() => route.params.id);
const errorMessage = ref('');
const isLoading = computed(() => taskStore.loading);
const isSaving = ref(false);

const formData = reactive({
  title: '',
  description: '',
  priority: 'media',
  due_date: '',
  completed: false
});

onMounted(async () => {
  try {
    await taskStore.fetchTask(id.value);

    if (taskStore.currentTask) {
      // Llenar el formulario con los datos de la tarea
      formData.title = taskStore.currentTask.title;
      formData.description = taskStore.currentTask.description || '';
      formData.priority = taskStore.currentTask.priority;
      formData.completed = taskStore.currentTask.completed;

      // Formatear la fecha para el input type="date"
      if (taskStore.currentTask.due_date) {
        // Obtener solo la parte de la fecha (YYYY-MM-DD)
        formData.due_date = taskStore.currentTask.due_date.split('T')[0];
      }
    }
  } catch (error) {
    console.error('Error al cargar la tarea:', error);
    errorMessage.value = 'No se pudo cargar la tarea. Por favor, inténtalo de nuevo.';
  }
});

const updateTask = async () => {
  try {
    errorMessage.value = '';
    isSaving.value = true;

    await taskStore.updateTask(id.value, formData);
    router.push({ name: 'task-detail', params: { id: id.value } });
  } catch (error) {
    console.error('Error al actualizar tarea:', error);

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else if (error.response && error.response.data && error.response.data.errors) {
      // Mostrar el primer error de validación
      const errorMessages = Object.values(error.response.data.errors);
      if (errorMessages.length > 0 && errorMessages[0].length > 0) {
        errorMessage.value = errorMessages[0][0];
      } else {
        errorMessage.value = 'Ha ocurrido un error de validación';
      }
    } else {
      errorMessage.value = 'Ha ocurrido un error al actualizar la tarea. Por favor, inténtalo de nuevo.';
    }
  } finally {
    isSaving.value = false;
  }
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* Reutilizamos los estilos de CreateTaskView.vue */
.edit-task-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 15px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.back-link {
  color: #6c757d;
  text-decoration: none;
}

.task-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-group input {
  width: auto;
}

.checkbox-group label {
  margin-bottom: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.cancel-btn, .submit-btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  color: #212529;
}

.submit-btn {
  background-color: #0d6efd;
  border: none;
  color: white;
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  background-color: #f8d7da;
  color: #842029;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.loading {
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 576px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
