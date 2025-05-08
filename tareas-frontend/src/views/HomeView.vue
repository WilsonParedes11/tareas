<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Gestiona tus tareas con facilidad</h1>
        <p class="hero-subtitle">Organiza tus actividades, establece prioridades y mantén el control de tus proyectos.</p>
        <div class="hero-actions">
          <router-link
            v-if="!isAuthenticated"
            to="/register"
            class="btn btn-primary"
            :class="{ 'btn-animated': !isAuthenticated }"
          >
            Comenzar ahora
          </router-link>
          <router-link
            v-else
            to="/tasks"
            class="btn btn-primary"
            :class="{ 'btn-animated': isAuthenticated }"
          >
            Ver mis tareas
          </router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="features-title">Características</h2>
        <div class="feature-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon" :class="feature.iconClass"></div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const features = ref([
  {
    title: 'Organización',
    description: 'Crea, gestiona y organiza tus tareas de manera intuitiva.',
    iconClass: 'icon-organize'
  },
  {
    title: 'Prioridades',
    description: 'Establece prioridades para tus tareas y filtra por importancia.',
    iconClass: 'icon-priority'
  },
  {
    title: 'Fechas límite',
    description: 'Agrega fechas de vencimiento y recibe alertas para tareas próximas a vencer.',
    iconClass: 'icon-deadline'
  },
  {
    title: 'Colaboración',
    description: 'Comenta en tus tareas y mantén un registro de la actividad.',
    iconClass: 'icon-collaborate'
  }
]);
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  padding: 100px 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="rgba(255,255,255,0.1)" d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/></svg>') repeat;
  opacity: 0.3;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #ffffff;
  color: #1e3a8a;
  border: 2px solid transparent;
}

.btn-primary:hover {
  background-color: transparent;
  color: #ffffff;
  border-color: #ffffff;
  transform: translateY(-2px);
}

.btn-animated {
  position: relative;
  overflow: hidden;
}

.btn-animated::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.btn-animated:hover::after {
  width: 200px;
  height: 200px;
}

.features {
  padding: 100px 0;
  background-color: #f8fafc;
}

.features-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e3a8a;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}


.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-organize {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/></svg>');
}

.icon-priority {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 24 24"><path d="M12 2l10 20H2L12 2zm0 3.5L4.5 19h15L12 5.5zM12 9v6h-1V9h1zm0 7v2h-1v-2h1z"/></svg>');
}

.icon-deadline {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/></svg>');
}

.icon-collaborate {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>');
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e3a8a;
}

.feature-card p {
  color: #4b5563;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>
