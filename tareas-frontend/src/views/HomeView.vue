<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Gestiona tus tareas con facilidad</h1>
        <p>Organiza tus actividades, establece prioridades y mantén el control de tus proyectos.</p>
        <div class="hero-actions">
          <router-link v-if="!isAuthenticated" to="/register" class="btn btn-primary">Comenzar ahora</router-link>
          <router-link v-else to="/tasks" class="btn btn-primary">Ver mis tareas</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Características</h2>
        <div class="feature-grid">
          <div class="feature">
            <h3>Organización</h3>
            <p>Crea, gestiona y organiza tus tareas de manera intuitiva.</p>
          </div>
          <div class="feature">
            <h3>Prioridades</h3>
            <p>Establece prioridades para tus tareas y filtra por importancia.</p>
          </div>
          <div class="feature">
            <h3>Fechas límite</h3>
            <p>Agrega fechas de vencimiento y recibe alertas para tareas próximas a vencer.</p>
          </div>
          <div class="feature">
            <h3>Colaboración</h3>
            <p>Comenta en tus tareas y mantén un registro de la actividad.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<style scoped>
.hero {
  background-color: #f8f9fa;
  padding: 80px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  margin-top: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.btn-primary {
  background-color: #0d6efd;
  color: white;
}

.features {
  padding: 80px 0;
}

.features h2 {
  text-align: center;
  margin-bottom: 50px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature h3 {
  margin-bottom: 15px;
}

.feature p {
  color: #6c757d;
}
</style>
