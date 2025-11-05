<!--
Path: src/components/AppSidebar.vue
-->

<script setup lang="ts">
import { ref } from 'vue'
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
const showSidebar = ref(false)
function openSidebar() { showSidebar.value = true }
function closeSidebar() { showSidebar.value = false }

defineExpose({ openSidebar, closeSidebar, showSidebar })
</script>

<template>
  <!-- Botón menú móvil -->
  <button
    class="btn btn-dark d-md-none position-fixed top-0 start-0 m-3 z-3"
    @click="openSidebar"
    aria-label="Abrir menú"
  >
    <i class="bi bi-list fs-2"></i>
  </button>
  <!-- Offcanvas Sidebar -->
  <div
    class="offcanvas offcanvas-start bg-dark text-light"
    tabindex="-1"
    :class="{ show: showSidebar }"
    :style="{ visibility: showSidebar ? 'visible' : 'hidden' }"
    @click.self="closeSidebar"
  >
    <div class="offcanvas-header border-bottom border-secondary">
      <h5 class="offcanvas-title">{{ appName }}</h5>
      <button type="button" class="btn-close btn-close-white" @click="closeSidebar"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column h-100 p-0">
      <div class="p-3">
        <button class="btn btn-secondary w-100 mb-3">
          <i class="bi bi-plus-lg"></i> Nuevo Chat
        </button>
        <nav>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <a class="nav-link text-light" href="#"><i class="bi bi-clock-history"></i> Historial</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="mt-auto border-top border-secondary p-3">
        <a class="nav-link text-secondary" href="#"><i class="bi bi-gear"></i> Configuración</a>
      </div>
    </div>
  </div>
  <!-- Sidebar fijo desktop -->
  <aside class="d-none d-md-flex flex-column bg-dark text-light p-3" style="width:260px;">
    <div>
      <button class="btn btn-secondary w-100 mb-3">
        <i class="bi bi-plus-lg"></i> Nuevo Chat
      </button>
    </div>
    <nav>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <a class="nav-link text-light" href="#"><i class="bi bi-clock-history"></i> Historial</a>
        </li>
      </ul>
    </nav>
    <div class="mt-auto border-top border-secondary pt-3">
      <a class="nav-link text-secondary" href="#"><i class="bi bi-gear"></i> Configuración</a>
    </div>
  </aside>
</template>
