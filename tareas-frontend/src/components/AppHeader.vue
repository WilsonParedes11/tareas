<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          Administrador de tareas
        </router-link>
      </div>

      <nav class="nav-menu">
        <template v-if="isAuthenticated">
          <router-link to="/tasks" class="nav-link">Mis Tareas</router-link>
          <router-link to="/tasks/create" class="nav-link">Nueva Tarea</router-link>
          <button @click="logout" class="nav-button">Cerrar Sesión</button>
        </template>

        <template v-else>
          <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
          <router-link to="/register" class="nav-button">Registrarse</router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const logout = async () => {
  try {
    await authStore.logout();
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<style scoped>
.app-header {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
}

.nav-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
}

.nav-link:hover {
  color: #007bff;
}

.nav-button:hover {
  background-color: #0069d9;
}
</style>
