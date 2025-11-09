<!--
Path: src/components/AppHeader.vue
-->

<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
defineProps<{ openSidebar: () => void }>()
</script>

<template>
  <header class="p-3 border-bottom border-secondary bg-dark">
    <div class="d-flex align-items-center">
      <button
        class="btn btn-link text-light d-md-none me-5 p-0"
        @click="openSidebar"
        aria-label="Abrir menú"
      >
        <i class="bi bi-list fs-5"></i>
      </button>
      <span class="fs-6 fw-medium text-light">{{ appName }} <span class="fw-normal opacity-75 small">• beta</span></span>
    </div>
  </header>
</template>
