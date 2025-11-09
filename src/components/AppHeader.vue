<!--
Path: src/components/AppHeader.vue
-->

<script setup lang="ts">
import { defineEmits } from 'vue'
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
const emit = defineEmits(['open-sidebar'])
</script>

<template>
  <header class="app-header">
    <div class="app-header__content">
      <!-- Botón menú móvil SOLO visible en mobile -->
      <button
        class="app-header__menu"
        @click="emit('open-sidebar')"
        aria-label="Abrir menú"
      >
        <svg
          class="app-header__icon"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="4" y="8" width="16" height="2" rx="1" fill="currentColor"/>
          <rect x="4" y="16" width="10" height="2" rx="1" fill="currentColor"/>
        </svg>
      </button>
      <span class="app-header__brand">
        {{ appName }}
        <span class="app-header__beta">• beta</span>
      </span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--bg-main);
  color: var(--text-primary);
  padding: 0 1rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
}

.app-header__content {
  display: flex;
  align-items: center;
  width: 100%;
}

.app-header__menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-primary);
  padding: 0;
  margin-right: 1.25rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.15s;
}
.app-header__menu:focus,
.app-header__menu:hover {
  opacity: 0.7;
  outline: none;
}
@media (min-width: 768px) {
  .app-header__menu {
    display: none;
  }
}

.app-header__icon {
  display: block;
  width: 1.75rem;
  height: 1.75rem;
}

.app-header__brand {
  font-size: 1rem; /* 16px */
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
}

.app-header__beta {
  font-size: 0.75rem; /* 12px */
  font-weight: 400;
  color: var(--text-muted);
  margin-left: 0.5em;
  opacity: 0.75;
}

@media (min-width: 768px) {
  .app-header {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
