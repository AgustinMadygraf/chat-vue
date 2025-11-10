<template>
  <!-- Overlay -->
  <div v-if="showSidebar" class="sidebar-overlay" @click="sidebar.close"></div>
  <!-- Offcanvas Sidebar -->
  <div
    class="sidebar-offcanvas"
    :class="{ show: showSidebar }"
    tabindex="-1"
  >
    <div class="sidebar-offcanvas-header">
      <span class="sidebar-title">{{ appName }}</span>
      <button type="button" class="sidebar-close-btn" @click="sidebar.close" aria-label="Cerrar menú">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div class="sidebar-offcanvas-body">
      <button class="sidebar-action-btn">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Nuevo Chat
      </button>
      <nav>
        <ul class="sidebar-nav">
          <li>
            <a class="sidebar-nav-link" href="#">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
                <path d="M9 5v4l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Historial
            </a>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <a class="sidebar-nav-link muted" href="#">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
            <path d="M9 6v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="9" cy="12" r="1" fill="currentColor"/>
          </svg>
          Configuración
        </a>
      </div>
    </div>
  </div>
  <!-- Sidebar fijo desktop -->
  <aside class="sidebar-desktop">
    <div>
      <button class="sidebar-action-btn">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Nuevo Chat
      </button>
    </div>
    <nav>
      <ul class="sidebar-nav">
        <li>
          <a class="sidebar-nav-link" href="#">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M9 5v4l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Historial
          </a>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <a class="sidebar-nav-link muted" href="#">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
          <path d="M9 6v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="9" cy="12" r="1" fill="currentColor"/>
        </svg>
        Configuración
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAppSidebar } from './AppSidebar'

const { appName, sidebar, showSidebar } = useAppSidebar()
</script>

<style scoped src="./AppSidebar.css"></style>
