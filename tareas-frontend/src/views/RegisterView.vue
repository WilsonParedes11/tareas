<template>
  <div class="register-container">
    <div class="auth-card">
      <h1>Crear Cuenta</h1>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="register" class="auth-form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Tu nombre"
          />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="tu@email.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            minlength="8"
            placeholder="Al menos 8 caracteres"
          />
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirmar contraseña</label>
          <input
            id="password_confirmation"
            v-model="formData.password_confirmation"
            type="password"
            required
            placeholder="Repite tu contraseña"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ isLoading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </div>
      </form>

      <div class="auth-footer">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const errorMessage = ref('');
const isLoading = ref(false);

const register = async () => {
  try {
    // Validación simple de cliente
    if (formData.password !== formData.password_confirmation) {
      errorMessage.value = 'Las contraseñas no coinciden';
      return;
    }

    errorMessage.value = '';
    isLoading.value = true;

    await authStore.register(formData);
    router.push({ name: 'tasks' });
  } catch (error) {
    console.error('Error de registro:', error);

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
      errorMessage.value = 'Ha ocurrido un error al registrarse. Por favor, inténtalo de nuevo.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Reutilizamos los estilos de LoginView.vue */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 480px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  margin-top: 30px;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-submit:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 20px;
  color: #6c757d;
}

.auth-footer a {
  color: #0d6efd;
  text-decoration: none;
}

.error-message {
  background-color: #f8d7da;
  color: #842029;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
