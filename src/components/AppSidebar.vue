<!--
Path: src/components/AppSidebar.vue
-->

<script setup lang="ts">
import { computed } from 'vue'
import { useSidebarStore } from '../stores/sidebarStore'
const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
const sidebar = useSidebarStore()
const showSidebar = computed(() => sidebar.isOpen)
</script>

<template>
  <!-- ...el resto del template permanece igual... -->
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

<style scoped>


/* Offcanvas Sidebar */
.sidebar-offcanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: var(--bg-main);
  color: var(--text-primary);
  box-shadow: 2px 0 16px #0006;
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(.4,0,.2,1);
  z-index: 1040;
  display: flex;
  flex-direction: column;
}
.sidebar-offcanvas.show {
  transform: translateX(0);
}
.sidebar-offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem 1rem 1rem;
  border-bottom: 1px solid var(--bg-placeholder);
}
.sidebar-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
}
.sidebar-close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.15s;
}
.sidebar-close-btn:focus,
.sidebar-close-btn:hover {
  background: var(--bg-placeholder);
}
.sidebar-offcanvas-body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.sidebar-action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5em;
  background: var(--bg-placeholder);
  color: var(--text-primary);
  border: none;
  border-radius: 0.5em;
  padding: 0.75em 1em;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1.5em;
  cursor: pointer;
  transition: background 0.15s;
}
.sidebar-action-btn:focus,
.sidebar-action-btn:hover {
  background: var(--accent);
  color: #fff;
}
.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-nav-link {
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5em 0;
  font-size: 1rem;
  border-radius: 0.25em;
  transition: background 0.15s, color 0.15s;
}
.sidebar-nav-link:focus,
.sidebar-nav-link:hover {
  background: var(--bg-placeholder);
  color: var(--accent);
}
.sidebar-nav-link.muted {
  color: var(--text-muted);
}
.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--bg-placeholder);
  padding-top: 1em;
  padding-bottom: 1em;
}

/* Sidebar fijo desktop */
.sidebar-desktop {
  display: none;
}
@media (min-width: 768px) {
  .sidebar-offcanvas {
    display: none;
  }
  .sidebar-desktop {
    display: flex;
    flex-direction: column;
    width: 260px;
    background: var(--bg-main);
    color: var(--text-primary);
    height: 100vh;
    padding: 1.5rem 1rem 1rem 1rem;
    box-shadow: 2px 0 16px #0006;
  }
}
</style>

/* Overlay oscuro para sidebar tipo ChatGPT */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.35);
  z-index: 1039;
  transition: opacity 0.2s cubic-bezier(.4,0,.2,1);
  opacity: 1;
}
