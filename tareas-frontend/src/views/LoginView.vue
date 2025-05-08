<template>
  <div class="login-container">
    <div class="auth-card">
      <h1>Iniciar Sesión</h1>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login" class="auth-form">
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
            placeholder="Tu contraseña"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </div>
      </form>

      <div class="auth-footer">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
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
  email: '',
  password: ''
});

const errorMessage = ref('');
const isLoading = ref(false);

const login = async () => {
  try {
    errorMessage.value = '';
    isLoading.value = true;

    await authStore.login(formData);
    router.push({ name: 'tasks' });
  } catch (error) {
    console.error('Error de inicio de sesión:', error);

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
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
