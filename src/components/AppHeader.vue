<!--
Path: src/components/AppHeader.vue
-->

<script setup lang="ts">
import { useSidebarStore } from '../stores/sidebarStore'
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
const sidebar = useSidebarStore()
</script>

<template>
  <header class="app-header">
    <div class="app-header__content">
      <!-- Zona izquierda: menú -->
      <button
        class="app-header__menu"
        @click="sidebar.open()"
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

      <!-- Zona centro-izquierda: bloque modelo -->
      <button class="app-header__model" aria-label="Seleccionar modelo">
        <span class="app-header__model-name">{{ appName }}</span>
        <span class="app-header__model-beta">beta</span>
        <svg class="app-header__chevron" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M5 7l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Zona derecha: ícono acción (refresh) -->
      <button class="app-header__action" aria-label="Refrescar">
        <svg class="app-header__refresh" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10a6 6 0 1 1 2.2 4.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 14v-4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>

.app-header {
  background: var(--bg-main);
  color: var(--text-primary);
  padding: 0 1.25rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  box-shadow: none;
  border: none;
}

.app-header__content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 0.5rem;
}

.app-header__menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-primary);
  padding: 0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}
.app-header__menu:focus,
.app-header__menu:hover {
  opacity: 0.7;
  outline: none;
  transform: scale(1.08);
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

.app-header__model {
  display: flex;
  align-items: center;
  gap: 0.5em;
  background: none;
  border: none;
  color: var(--text-primary);
  padding: 0.25em 0.75em;
  border-radius: 0.5em;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  font-size: 1rem;
  font-weight: 500;
  margin-right: auto;
  margin-left: 0.25rem;
}
.app-header__model:focus,
.app-header__model:hover {
  background: var(--bg-placeholder);
  opacity: 0.92;
}
.app-header__model-name {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
}
.app-header__model-beta {
  color: var(--text-muted);
  font-size: 0.85em;
  font-weight: 400;
  margin-left: 0.3em;
  opacity: 0.8;
}
.app-header__chevron {
  width: 1.1em;
  height: 1.1em;
  color: var(--text-muted);
  margin-left: 0.2em;
}

.app-header__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 0.15em;
  border-radius: 0.3em;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}
.app-header__action:focus,
.app-header__action:hover {
  opacity: 0.8;
  transform: scale(1.08);
  color: var(--text-primary);
}
.app-header__refresh {
  width: 1.25em;
  height: 1.25em;
  display: block;
}



@media (min-width: 768px) {
  .app-header {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
