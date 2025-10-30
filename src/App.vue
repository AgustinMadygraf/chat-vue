<!--
Path: src/App.vue
-->

<script setup lang="ts">
import { RouterView } from 'vue-router'

const appName = 'MadyBot'
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <button class="new-chat-btn">
          <i class="bi bi-plus-lg"></i> Nuevo Chat
        </button>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <a href="#"><i class="bi bi-clock-history"></i> Historial</a>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <a href="#"><i class="bi bi-gear"></i> Configuración</a>
      </div>
    </aside>

    <!-- Main content -->
    <div class="main-content">
      <header class="main-header">
        <span class="app-title">{{ appName }}</span>
      </header>
      <main class="main-area">
        <RouterView />
      </main>
      <footer class="main-footer">
        <small>&copy; {{ new Date().getFullYear() }} · v0.1.0</small>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f7f7f8;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}

.sidebar {
  width: 260px;
  background: #343541;
  color: #ececf1;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
}

.sidebar-header {
  padding: 0 24px 24px 24px;
}

.new-chat-btn {
  width: 100%;
  background: #444654;
  color: #ececf1;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 16px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0 24px;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 12px;
}

.sidebar-nav a {
  color: #ececf1;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.sidebar-footer {
  margin-top: auto;
  padding: 24px;
  border-top: 1px solid #444654;
}

.sidebar-footer a {
  color: #c5c5d2;
  font-size: 0.95rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f7f7f8;
}

.main-header {
  padding: 18px 32px;
  background: #fff;
  border-bottom: 1px solid #ececf1;
  font-size: 1.2rem;
  font-weight: 500;
}

.app-title {
  color: #343541;
}

.main-area {
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.main-footer {
  padding: 12px 0;
  background: #fff;
  border-top: 1px solid #ececf1;
  text-align: center;
  color: #b4b4c7;
  font-size: 0.95rem;
}
</style>
