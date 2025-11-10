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

<script setup lang="ts">
import { useAppHeader } from './AppHeader'

const { appName, sidebar } = useAppHeader()
</script>

<style scoped src="./AppHeader.css"></style>
