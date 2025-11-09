<!--
Path: src/components/AppHeader.vue
-->

<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
defineProps<{ openSidebar: () => void }>()
</script>

<template>
  <header
    class="p-3 border-bottom"
    style="background: var(--bg-main); color: var(--text-primary); border-color: var(--text-muted);"
  >
    <div class="d-flex align-items-center">
      <button
        class="btn btn-link d-md-none me-5 p-0"
        @click="openSidebar"
        aria-label="Abrir menú"
        style="color: var(--text-primary);"
      >
        <i class="bi bi-list fs-5"></i>
      </button>
      <span class="fs-6 fw-medium" style="color: var(--text-primary);">
        {{ appName }} <span class="fw-normal opacity-75 small">• beta</span>
      </span>
    </div>
  </header>
</template>
