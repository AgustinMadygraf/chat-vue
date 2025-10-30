<!--
Path: src/App.vue
-->

<script setup lang="ts">
import { RouterView } from 'vue-router'

const appName = 'chat-vue'
console.log('App.vue montado')
</script>

<template>
  <div class="app min-vh-100 d-flex bg-light">
    <!-- Sidebar -->
    <aside class="sidebar bg-dark text-white d-flex flex-column p-3" style="width: 260px;">
      <div class="mb-4">
        <h2 class="h5 text-center">
          <i class="bi bi-chat-dots me-2"></i>{{ appName }}
        </h2>
      </div>
      <nav class="flex-grow-1">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item mb-2">
            <a class="nav-link active bg-secondary d-flex align-items-center" href="#">
              <i class="bi bi-plus-lg me-2"></i> Nuevo Chat
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-white d-flex align-items-center" href="#">
              <i class="bi bi-clock-history me-2"></i> Historial
            </a>
          </li>
        </ul>
      </nav>
      <div class="mt-auto pt-3 border-top border-secondary">
        <a href="#" class="d-flex align-items-center text-white-50 small">
          <i class="bi bi-gear me-2"></i> Configuración
        </a>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-grow-1 d-flex flex-column position-relative">
      <header class="app-header navbar navbar-light bg-white border-bottom" role="banner">
        <div class="container-fluid">
          <h1 class="brand navbar-brand mb-0">{{ appName }}</h1>
        </div>
      </header>

      <main class="app-main flex-fill py-4" role="main" style="padding-bottom: 90px;">
        <div class="container-fluid h-100">
          <RouterView />
        </div>
      </main>

      <footer class="app-footer bg-white border-top py-3 mt-auto" role="contentinfo">
        <div class="container-fluid text-center">
          <small>&copy; {{ new Date().getFullYear() }} · v0.1.0</small>
        </div>
      </footer>
    </div>
  </div>
</template>
