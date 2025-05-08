<template>
  <div class="create-task-container">
    <div class="form-header">
      <h1>Nueva Tarea</h1>
      <router-link to="/tasks" class="back-link">← Volver a tareas</router-link>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="createTask" class="task-form">
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
            <option value="media" selected>Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div class="form-group">
          <label for="due_date">Fecha de vencimiento</label>
          <input id="due_date" v-model="formData.due_date" type="date" />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="goBack" class="cancel-btn">Cancelar</button>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Guardando...' : 'Guardar Tarea' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'

const router = useRouter()
const taskStore = useTaskStore()

const formData = reactive({
  title: '',
  description: '',
  priority: 'media',
  due_date: '',
})

const errorMessage = ref('')
const isLoading = ref(false)

const createTask = async () => {
  try {
    errorMessage.value = ''
    isLoading.value = true

    await taskStore.createTask(formData)
    router.push({ name: 'tasks' })
  } catch (error) {
    console.error('Error al crear tarea:', error)

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else if (error.response && error.response.data && error.response.data.errors) {
      // Mostrar el primer error de validación
      const errorMessages = Object.values(error.response.data.errors)
      if (errorMessages.length > 0 && errorMessages[0].length > 0) {
        errorMessage.value = errorMessages[0][0]
      } else {
        errorMessage.value = 'Ha ocurrido un error de validación'
      }
    } else {
      errorMessage.value = 'Ha ocurrido un error al crear la tarea. Por favor, inténtalo de nuevo.'
    }
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.create-task-container {
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

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.cancel-btn,
.submit-btn {
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

/* Responsive */
@media (max-width: 576px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
