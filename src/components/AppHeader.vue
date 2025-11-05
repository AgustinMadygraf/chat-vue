<!--
Path: src/components/AppHeader.vue
-->

<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
defineProps<{ openSidebar: () => void }>()
</script>

<template>
  <header class="p-3 border-bottom border-secondary bg-dark-subtle">
    <div class="d-flex align-items-center">
      <button
        class="btn btn-dark d-md-none me-2"
        @click="openSidebar"
        aria-label="Abrir menú"
        style="padding: 0.25rem 0.5rem;"
      >
        <i class="bi bi-list fs-2"></i>
      </button>
      <span class="fs-4 fw-semibold text-dark-emphasis">{{ appName }}</span>
    </div>
  </header>
</template>
