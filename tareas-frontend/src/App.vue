<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
</script>

<style>
/* Estilos globales */
:root {
  --primary-color: #0d6efd;
  --success-color: #198754;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #0dcaf0;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-color: #6c757d;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--dark-color);
  background-color: #f8f9fa;
}

.main-content {
  min-height: calc(100vh - 70px);
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

button {
  cursor: pointer;
}
</style>
